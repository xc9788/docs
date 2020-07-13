FROM node:slim

ADD . /var/www

# node slim基础镜像基于debian系统，使用apt包管理
RUN apt update \
  && apt install -y nginx \
  && mv /var/www/nginx.conf /etc/nginx/conf.d/

RUN cd /var/www \
  && yarn install \
  && yarn docs:build

CMD ["/var/www/start.sh"]