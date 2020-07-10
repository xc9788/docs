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

## PM2

PM2是一款托管服务的工具, 它允许您永久保持应用程序的活动，无需停机即可重新加载它们，并促进常见的Devops任务

`pm2 start app.js` 普通模式启动的任务输出的日志在当前用户的家目录下 `.pm2` 中, 不推荐此种方式，推荐使用配置文件`ecosystem.config.js` 去指定详细的任务需求

通过 `pm2 ls` 可以查看当前托管的任务明细

#### 安装

`npm install pm2 -g`

#### 基础配置文件 `ecosystem.config.js`

```js
module.exports = {
  apps : [{
    name: 'webhooks',
    script: 'autoBuild.js',
    instances: 1,
    autorestart: true,
    watch: false,
    output: 'logs/out.log',
    error: 'logs/error.log',
    log: 'logs/combined.outerr.log',
    env: {
      NODE_ENV: 'production'
    }
  }]
};

// script 可以为linux启动文件, 需要添加 args 字段来传参
// 启动可以通过直接pm2 start 也可以通过 pm2 start ecosystem.config.js
```

## Promise 对象

要想写好 `js` 离不开异步，但又不想陷入回调地狱， 这种时候我们会使用到 `promise` 对象

`Promise` 对象是 `JavaScript` 的异步操作解决方案，为异步操作提供统一接口。它起到代理作用，充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口。`Promise` 可以让异步操作写起来，就像在写同步操作的流程，而不必一层层地嵌套回调函数。

```js
// 伪代码不可实现 注释说明
// 实例化js对象
let asyncFunc = (resolve, reject) => {
    // 逻辑代码
    let s = 1
    let ss = 11
    if (s == ss) {
        // 异步操作成功
        resovle('success')
    } else {
        // 异步操作失败
        reject('error')
    }
}

let func = new Promise(asyncFunc)

// success
func
    .then(code => {
        console.log(code)
    })

// error
func
    .then(() => {})
    .catch(code => {
        console.log(code)
    })
```