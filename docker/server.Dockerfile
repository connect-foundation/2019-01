FROM node:10.16.0-alpine

# nginx는 /www/nginx 였음
WORKDIR /www/server

COPY ./package.json ./
RUN npm install --production
COPY . .

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && npm run build
# https://dev.to/hugodias/wait-for-mongodb-to-start-on-docker-3h8b
# https://github.com/bear2u/docker-exam-react
