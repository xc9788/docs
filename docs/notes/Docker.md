# Docker

## 安装Docker

### 1. 获取最新版本的 Docker 安装包
```bash
wget -qO- https://get.docker.com/ | sh  # 脚本安装
docker -v # 查看版本号 是否成功安装
```

### 2. 非root用户运行docker
```bash
sudo groupadd docker # 建立docker组
sudo usermod -aG docker $USER #1. 将当前用户加入用户组#2. 需要重新登入
sudo service docker start #启动docker
```

### 3. 配置docker镜像
```bash
vi /etc/docker/daemon.json
```

```json
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}   
```

```bash
sudo systemctl daemon-reload
sudo service docker restart
```

## 卸载已安装的Docker版本

### 1. 卸载Docker
```bash
sudo apt-get purge docker-engine
```

### 2. 卸载Docker及其依赖的不再需要的包
```bash
sudo apt-get autoremove --purge docker-engine
```

### 3. 删除所有的镜像、容器和数据卷
```bash
rm -rf /var/lib/docker
 ```
 
 ## Dockerfile
```
Dockerfile 是一些构建docker镜像指令的集合,docker通过读取dockerfile 指令自动构建镜像
,也是一种文本文件
```
docker 镜像构建命令
```bash
docker build .
 ```
 这条命令docker CLI 处理流程: # CLI : docker client 
 + 把当前目录及子目录当做上下文传递给 Docker Daemon #Daemon: docker 守护进程
 + 从当前目录（不包括子目录）中找到 Dockerfile 文件
 + 检查dockerfile语法
 + 依次执行 Dockerfile 中的指令,根据命令生成中间过度镜像(储存在本地,为之后的指令或构建作缓存)
 
 ```
 Docker 采用了C/S 架构，包括客户端和服务端。Docker 守护进程（Daemon）作为服务端 
接受来自客户端的请求，并处理这些请求（创建、运行、分发容器）。Docker 守护进程一般在宿主主机后台运行，等待接收来自客户端的消息；Docker 客户端则为用户提供一系列可执行命令，用户用这些命令实现跟Docker 守护进程交互。

```
 
 
