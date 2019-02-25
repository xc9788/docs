# Docker

## 1. 安装Docker

### 获取最新版本的 Docker 安装包
```sh
wget -qO- https://get.docker.com/ | sh  # 脚本安装
docker -v # 查看版本号 是否成功安装
```

### 非root用户运行docker,
```sh
sudo usermod -aG docker runoob # 需要重新登入
sudo service docker start #启动docker
```

### 配置docker镜像
```sh
vi /etc/docker/daemon.json
```

```json
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}   
```

```sh
sudo service docker restart
```

## 2. 卸载已安装的Docker版本

### 卸载Docker
```sh
sudo apt-get purge docker-engine
```

### 卸载Docker及其依赖的不再需要的包
```sh
sudo apt-get autoremove --purge docker-engine
```

### 删除所有的镜像、容器和数据卷
```sh
rm -rf /var/lib/docker
 ```
