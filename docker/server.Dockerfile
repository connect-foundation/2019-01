FROM node:10.16.0-alpine

# nginx는 /www/nginx 였음
WORKDIR /www/server

COPY ./package.json ./
RUN npm install --production
COPY . .

CMD ["npm", "run", "build"]

# https://github.com/bear2u/docker-exam-react
