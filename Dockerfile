# syntax=docker/dockerfile:1
FROM node:19.3-alpine as build

WORKDIR /build
COPY . .
RUN npm i
RUN npm run build

FROM node:19.3-alpine as deploy-node

WORKDIR /app
RUN rm -rf ./*
COPY --from=build /build/package.json .
COPY --from=build /build/build .
EXPOSE 3000/tcp
ENTRYPOINT ["node", "index.js"]


# build
# sudo docker buildx build --platform linux/amd64,linux/arm64 -t --private registry--/ttv-now-playing:$CHANGEME -t --private registry--/ttv-now-playing:latest -f Dockerfile --target deploy-node --push .
# login
# sudo docker login --private registry-- -u arcadearchie -p --password--

