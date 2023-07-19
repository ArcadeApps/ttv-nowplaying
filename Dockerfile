FROM node:lts-alpine3.18 AS build

RUN npm install -g pnpm
 
WORKDIR /build

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:lts-alpine3.18

WORKDIR /app
RUN rm -rf ./*

COPY --from=build /build/node_modules node_modules/
COPY --from=build /build/package.json .
COPY --from=build /build/build .

EXPOSE 3000/tcp
#ENV NODE_ENV=production
CMD ["node", "index.js"]