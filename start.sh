#!/bin/sh

# 启动nginx
nginx

# 保持容器存活
tail -f /var/log/nginx/access.log