FROM node:lts-alpine3.18 AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm clean-install --frozen-lockfile
COPY . .
RUN pnpm build
RUN pnpm prune --production

FROM node:lts-alpine3.18
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "-r", "dotenv/config" "build"]
### OLD TEST IMAGE DONT USE ###
# FROM node:lts-alpine3.18 AS builder
# RUN npm install -g pnpm

# WORKDIR /app
# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile

# COPY . .
# RUN pnpm build
# EXPOSE 3000
# CMD ["node", "build"]