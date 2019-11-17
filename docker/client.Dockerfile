# 1. Build react app
FROM node:10.16.0-alpine as build-react

WORKDIR /usr/src/client

COPY package.json ./
RUN npm install --production
COPY . .

RUN npm run build


# 2. Move built react files & Set nginx
FROM nginx:1.17.5-alpine

WORKDIR /usr/src/nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-react /usr/src/client/build ./code-avengers

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# 참고: https://docs.docker.com/develop/develop-images/multistage-build/