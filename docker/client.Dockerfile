# 1. Build react app
FROM node:10.16.0-alpine as build-react

ARG REACT_APP_LOCAL_CLIENT_ID
ARG REACT_APP_PRODUCTION_CLIENT_ID
ARG REACT_APP_JWT_SECRET_KEY
ARG REACT_APP_JWT_ALGORITHM

ENV REACT_APP_LOCAL_CLIENT_ID ${REACT_APP_LOCAL_CLIENT_ID}
ENV REACT_APP_PRODUCTION_CLIENT_ID ${REACT_APP_PRODUCTION_CLIENT_ID}
ENV REACT_APP_JWT_SECRET_KEY ${REACT_APP_JWT_SECRET_KEY}
ENV REACT_APP_JWT_ALGORITHM ${REACT_APP_JWT_ALGORITHM}

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

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

# 참고: https://docs.docker.com/develop/develop-images/multistage-build/