FROM mysql

ENV MYSQL_ROOT_PASSWORD 1111
ENV MYSQL_USER drstrange
ENV MYSQL_PASSWORD 1111
ENV MYSQL_DATABASE BooleanAvengers

COPY ./utf8.cnf /etc/mysql/conf.d/
COPY ./initdb.sql /docker-entrypoint-initdb.d/