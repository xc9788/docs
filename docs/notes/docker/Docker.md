# Docker

## 安装Docker

### 1. 获取最新版本的 Docker 安装包
```bash
wget -qO- https://get.docker.com/ | sh  # 脚本安装
docker -v # 查看版本号 是否成功安装
```

### 2. 非root用户运行docker
```bash
sudo usermod -aG docker runoob # 需要重新登入
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


## 使用docker

```sh
docker ps

docker run -d xx:xx -p xxx:xxx image_id
```

## 清理镜像

```sh
#停止容器
docker stop $(docker ps -a | grep "Exited" | awk '{print $1 }')

#删除容器
docker rm $(docker ps -a | grep "Exited" | awk '{print $1 }')

#删除镜像
docker rmi $(docker images | grep "none" | awk '{print $3}')

#删除名称或标签为none的镜像
docker rmi -f  `docker images | grep '<none>' | awk '{print $3}'`

#删除异常停止的docker容器
docker rm `docker ps -a | grep Exited | awk '{print $1}'`
```