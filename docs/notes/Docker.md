# Docker

## 安装Docker

### 获取最新版本的 Docker 安装包
```
wget -qO- https://get.docker.com/ | sh  # 脚本安装
docker -v # 查看版本号 是否成功安装
```

### 非root用户运行docker,
```
sudo usermod -aG docker runoob # 需要重新登入
sudo service docker start #启动docker
```

### 配置docker镜像

    vi /etc/docker/daemon.json
```
    {
        "registry-mirrors": ["http://hub-mirror.c.163.com"]
    }
```
    sudo service docker restart



## 卸载已安装的Docker版本

### 卸载Docker
    sudo apt-get purge docker-engine

### 卸载Docker及其依赖的不再需要的包
    sudo apt-get autoremove --purge docker-engine

### 删除所有的镜像、容器和数据卷
    rm -rf /var/lib/docker


