## 部署指南

> 本笔记基于 [vuepress](https://github.com/vuejs/vuepress) 

### ToDo

- [x] 基础介绍和使用方法

- [x] Dockerfile

- [ ] thinking

### 基础介绍和使用方法

> 笔记预览 [suyu.io](https://suyu.io)

安装流程 (交流学习（QQ 28240021))
- 服务器环境 node + yarn 
- 基于目录 docs 为笔记基础 (duck不必像我一样加一层目录
- 参考 docs/.vuepress/config.js 和 docs/notes目录下文件(如果需要更多功能可以查阅vuepress官方手册)
- 可通过yarn docs:dev 测试或直接yarn docs:build (docs: 指 ./docs 目录下)
- build后 docs/.vuepress/dist 为资源目录
- 通过nginx|apache提供web服务

### Dockerfile

> 基于node基础包 + nginx做web服务代理

```sh
docker build -t docs .
docker run -p 8080:8080 docs
```


### thinking
> TODO