# SSH

## SSH使用

用户ssh服务的相关信息默认都在~/.ssh目录下

常用文件如下:

- authorized_keys `登入用户的公钥`
- id_rsa `当前用户的私钥`
- id_rsa.pub `当前用户的公钥`
- known_hosts `已知主机`
- config `自定义主机文件`

`PS: .ssh 目录权限为700 .ssh/* 文件权限为600`

```bash
ssh root@<remote-ip> # 登录远程服务器

scp -r root@<remote-ip>:/tmp/app.log ~/Downloads # 将远程服务器上的文件下载到本机Downloads目录下

scp ~/Downloads/go.tar.gz root@<remote-ip>:/tmp # 将本机文件上传到远程服务器上
```

## Linux中使用ssh-keygen生成密钥登录

密钥形式登录的原理是：利用密钥生成器制作一对密钥:公钥和私钥。将公钥添加到服务器的用户的对应~/.ssh/authorized_keys，然后在客户端利用私钥即可完成认证并登录。这样一来，没有私钥，任何人都无法通过 SSH 暴力破解你的密码来远程登录到系统。此外，如果将公钥复制到其他用户设置处甚至主机，利用私钥也可以登录。所以key的使用很方便哦，同时保护私钥很重要！

```bash
## 本地机器用户
## 使用ssh-keygen生成key后， 检查~/.ssh/id_rsa.pub 和 ~/.ssh/id_rsa 是否存在
ssh-keygen
## 成一个rsa密钥对 shell中, 自行设置参数，也可以直接跳过
## 将id_rsa.pub内容复制粘贴进入远程主机的 ~/.ssh/authorized_keys中
## notice: 有的vps商选择密码登入后，会默认关闭key登入，需要去/etc/sshd_config中修改一下
## 本地机器用户
ssh user@hostname
## 登入成功即可愉快玩耍了！！！
```

如果windows的小伙伴，使用的是putty, xshell等登入软件，可能使用key更简单吧，可我没有搞过呀。这里就不写了emmm
