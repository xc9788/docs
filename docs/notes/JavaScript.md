# JS 杂项

## nodejs环境部署

[nodejs下载](http://nodejs.cn/download/)

```bash
cd / && mkdir lang && cd lang

# linux 系统中 解压对应包, 添加环境变量

wget https://npm.taobao.org/mirrors/node/v10.12.0/node-v10.12.0-linux-x64.tar.xz

tar -xf node-v10.12.0-linux-x64.tar.xz

echo "export PATH=/lang/node-v10.12.0-linux-x64/bin:$PATH" >> /etc/profile
# or ==> vim /etc/profile 

source /etc/profile
```

## 修改npm下载源

直接更改npm下载地址

```bash
npm config set registry https://registry.npm.taobao.org
# 配置后可通过下面方式来验证是否成功
npm config get registry
```

添加cnpm

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## yarn安装

示例Ubuntu/Debian

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" |  tee /etc/apt/sources.list.d/yarn.list

apt-get update && apt-get install yarn

# 查看下载源
yarn config get registry

# 更换下载源
yarn config set registry https://registry.npm.taobao.org
```