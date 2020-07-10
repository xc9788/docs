# Linux

## UNIX用户基础

Linux系统是一个多用户多任务的分时操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。

用户的账号一方面可以帮助系统管理员对使用系统的用户进行跟踪，并控制他们对系统资源的访问；另一方面也可以帮助用户组织文件，并为用户提供安全性保护。

每个用户账号都拥有一个惟一的用户名和各自的口令。

用户在登录时键入正确的用户名和口令后，就能够进入系统和自己的主目录。

1、添加新的用户账号使用useradd命令，其语法如下

```bash
useradd –d /home/demo -m -s /bin/bash demo # 指定home目录为/home/demo 默认启动shell为/bin/bash
```

2、删除帐号

```bash
userdel -r demo #把用户和他的主目录一起删除
```

`PS 详细知识和操作 查阅[archlinux]上的教程` [click to jump](https://www.archlinux.org/)

## Ubuntu 18+开启Google BBR的方法

GoogleBBR算法需要linux内核为4.9+，Ubuntu18中内核版本为4.15，直接符合开启bbr的要求，只需要简单的两步即可开启BBR算法。

```bash
vim /etc/sysctl.conf

#添加
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr

# 生效配置
sysctl -p

# 查看BBR算法时候是否开启
lsmod |grep bbr

#如果又状态信息，即为开启成功1
```

## 虚拟主机添加配置swap，增加性能

工作中，我们常常在使用虚拟机中，发现内存不够用。尤其数据库经常因为内存不足而down掉。这时候我们就需要swap来临时救济一把。本文记录了设置swap的方法。

#### 查看内存状况

```bash
free -m

#如下
total        used        free      shared  buff/cache   available
Mem:           1839         190         219           4        1428        1447
Swap:             0           0           0
```

#### 配置swap 2G的空间

```bash
dd if=/dev/zero of=/var/swap bs=1M count=2048
# 在/var目录创建swap为2G的交换文件

mkswap /var/swap
# 设置交换文件

swapon /var/swap 
# 启用交换文件 关闭使用swapoff
```

#### 使开机自动挂载

```bash
vim /etc/fstab 

/var/swap swap swap defaults  0 0
```

#### 关闭swap空间

```bash
swapoff -a
#关闭所有

swapoff /var/swap
#关闭指定路径的swap分区
```

## PS1 目录高亮, 显示git分支

重写默认的PS1

使用方法, 文件最后添加下面代码

``vim ~/.bashrc``

```bash
#shell 目录高亮, git显示分支名(带状态)
function git_branch {
    ref=$(git symbolic-ref HEAD 2> /dev/null) || return;
        echo -e "Git\e[1;35m:\033[0m\033[32m"${ref#refs/heads/}"\033[0m";
}

function parse_git_dirty {
    local git_status=$(git status 2> /dev/null | tail -n1) || $(git status 2> /dev/null | head -n 2 | tail -n1);
    if [[ "$git_status" != "" ]]; then
        local git_now; # 当前标示

        if [[ "$git_status" =~ nothing\ to\ commit || "$git_status" =~  Your\ branch\ is\ up\-to\-date\ with ]]; then
            git_now="\033[33mo";
        elif [[ "$git_status" =~ Changes\ not\ staged || "$git_status" =~ no\ changes\ added ]]; then
            git_now="\033[31m~";
        elif [[ "$git_status" =~ Changes\ to\ be\ committed ]]; then #Changes to be committed
            git_now='*';
        elif [[ "$git_status" =~ Untracked\ files ]]; then
            git_now="+";
        elif [[ "$git_status" =~ Your\ branch\ is\ ahead ]]; then
            git_now="#";
        fi

        echo -e ":"${git_now}"\033[0m";
    fi
}

# \[\]屏蔽显示字符的长度
P1="\n\[\t\]\[\e[1;35m:\]\[\033[33m\]\u\[\e[1;35m:\]\[\033[32m\]\h\[\033[0m\] "
P2="\[Path\]\[\e[1;35m:\]\[\033[36m\]\w\[\033[0m\] "
P3="\[\$(git_branch)\]\[\$(parse_git_dirty)\]"
P4="\nDoing\[\e[1;35m\] :) \[\033[0m\]"

PS1=$P1$P2$P3$P4
```

Editor: xc

## 解决WSL中bash入口无法拉起zsh的问题

通过直接切换进程, 不拉起新的进程。可以这样认为，exec系统调用并没有创建新的进程，只是替换了原来进程上下文的内容

`vim ~/.bashrc` 添加下面内容

```bash
if [ -t 1 ]; then
exec zsh
fi
```

## 常用alias记录

使用方法, 文件最后添加下面代码

``vim ~/.bashrc``

```bash
alias ls='ls --color=auto'
alias dir='dir --color=auto'
alias vdir='vdir --color=auto'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias untar='tar -xzvf' # 权限问题自行编辑
alias occ="du -hs" # 当前目录占用空间
```

## 时间参数

```bash
date +%s # Timestamp: 1535723215 

date -u +"%Y-%m-%dT%H:%M:%SZ" # UTC: 2018-08-31T13:50:55Z

date +%Y-%m-%dT%H:%M:%S%z # Local: 2018-08-31T21:52:17+0800
```

## 网络相关

```bash
ifconfig # 列出当前服务器可用端口和IP

lsof -i :80 # 查看80端口的网络服务 (只可以查看当前用户下服务)

netstat -ie # 列出当前服务器可用端口IP

netstat -at # 列出TCP通信的端口, au为UDP
```

## awk相关知识

```bash
awk '{print "Welcome to awk command tutorial "}' # awk 基础写法

ps aux |grep php |grep -v grep |awk '{print $2}' # 列出所有php进程的pid $0 $1 ... 未指定-F分割字符 默认空格为分割符
```

## shell终端下常用快捷键

1. 移动光标
    * ctrl+b `前移一个字符`
    * ctrl+f `后移一个字符`
    * alt+b `前移一个单词`
    * alt+f `后移一个单词`
    * ctrl+a `移到行首`
    * ctrl+e `移到行尾`
    * ctrl+xx `行首到当前光标替换`

1. 编辑命令
    * alt+. `粘帖最后一次命令最后的参数`
    * alt+d `删除当前光标到临近右边单词开始`
    * ctrl+w `删除当前光标到临近左边单词结束`
    * ctrl+h `删除光标前一个字符`
    * ctrl+d `删除光标后一个字符`
    * ctrl+u `删除光标左边所有`
    * ctrl+k `删除光标右边所有`
    * ctrl+l `清屏`
    * ctrl+shift+c `复制`
    * ctrl+shift+v `粘贴`

1. 其它
    * ctrl+n `下一条命令`
    * ctrl+p `上一条命令`
    * alt+n `下一条命令`
    * alt+p `上一条命令`
    * shift+PageUp `向上翻页`
    * shift+PageDown `向下翻页`
    * ctrl+r `进入历史查找命令记录， 输入关键字。 多次按返回下一个匹配项`
    
## Centos无损扩容LVM空间


查看系统分区信息
```bash
df -h

Filesystem               Size  Used Avail Use% Mounted on
/dev/mapper/centos-root   17G  1.2G   16G   7% /
devtmpfs                 476M     0  476M   0% /dev
tmpfs                    488M     0  488M   0% /dev/shm
tmpfs                    488M  7.7M  480M   2% /run
tmpfs                    488M     0  488M   0% /sys/fs/cgroup
/dev/sda1               1014M  130M  885M  13% /boot
tmpfs                     98M     0   98M   0% /run/user/0
```

查看系统卷组信息

```bash
vgdisplay

  --- Volume group ---
  VG Name               centos
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  3
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               2
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               <19.00 GiB
  PE Size               4.00 MiB
  Total PE              4863
  Alloc PE / Size       4863 / <19.00 GiB
  Free  PE / Size       0 / 0
  VG UUID               fg5gaa-FHB7-ktE1-dBbO-pRXI-q7Bl-n5Uhc2
```

查看系统逻辑卷信息

```bash
lvdisplay

  --- Logical volume ---
  LV Path                /dev/centos/swap
  LV Name                swap
  VG Name                centos
  LV UUID                dRqNfP-xTc7-ssv7-JkTl-vwu4-ErR2-muwuKi
  LV Write Access        read/write
  LV Creation host, time localhost, 2018-11-16 15:45:17 +0800
  LV Status              available
  # open                 2
  LV Size                2.00 GiB
  Current LE             512
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:1

  --- Logical volume ---
  LV Path                /dev/centos/root
  LV Name                root
  VG Name                centos
  LV UUID                ZQMYfy-bdML-V5XF-e8bl-Ds4m-Ud3M-UUFL36
  LV Write Access        read/write
  LV Creation host, time localhost, 2018-11-16 15:45:18 +0800
  LV Status              available
  # open                 1
  LV Size                <17.00 GiB
  Current LE             4351
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:0
```

现在我们需要扩容逻辑卷/dev/centos/root，先插入一块10G磁盘，并查看

```bash
fdisk -l

Disk /dev/sda: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000b399f

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     2099199     1048576   83  Linux
/dev/sda2         2099200    41943039    19921920   8e  Linux LVM

Disk /dev/sdb: 10.7 GB, 10737418240 bytes, 20971520 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/centos-root: 18.2 GB, 18249416704 bytes, 35643392 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/centos-swap: 2147 MB, 2147483648 bytes, 4194304 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

给该磁盘分区并格式化为LVM格式

```bash
fdisk /dev/sdb

Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table
Building a new DOS disklabel with disk identifier 0xac8fe1ca.

Command (m for help): n
Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended
Select (default p):
Using default response p
Partition number (1-4, default 1):
First sector (2048-20971519, default 2048):
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-20971519, default 20971519):
Using default value 20971519
Partition 1 of type Linux and of size 10 GiB is set

Command (m for help): t
Selected partition 1
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'

Command (m for help): p

Disk /dev/sdb: 10.7 GB, 10737418240 bytes, 20971520 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0xac8fe1ca

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048    20971519    10484736   8e  Linux LVM

Command (m for help):w
```

将新加的分区/dev/sdb1创建为物理卷

```bash
pvcreate /dev/sdb1

Physical volume "/dev/sdb1" successfully created.
```

将物理卷加入到centos卷组中

```bash
vgextend centos /dev/sdb1

Volume group "centos" successfully extended
```

将centos卷组的剩余空间全部扩展至/

```bash
lvextend -l +100%FREE /dev/mapper/centos-root

Size of logical volume centos/root changed from <17.00 GiB (4351 extents) to 26.99 GiB (6910 extents).
Logical volume centos/root successfully resized.
```

查看原有的文件系统

```bash
cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Fri Nov 16 15:45:18 2018
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
/dev/mapper/centos-root /                       xfs     defaults        0 0
UUID=b035b27c-d474-45f6-b4c2-a96c9ab2117a /boot                   xfs     defaults        0 0
/dev/mapper/centos-swap swap                    swap    defaults        0 0
```

写入文件系统，使扩容生效

```bash
resize2fs /dev/mapper/centos-root
#文件系统为ext4

xfs_growfs /dev/mapper/centos-root
#文件系统为xfs
```

## Centos配置桥接网卡(主要用于KVM)

配置网卡

```bash
vim /etc/sysconfig/network-scripts/ifcfg-enp0s31f6

TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=none
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
NAME=enp0s31f6
UUID=374cfda7-c3e1-4a93-8826-fd0cde7781f8
DEVICE=enp0s31f6
ONBOOT=yes
BRIDGE=br0
```

新建桥接网卡
```bash
vim /etc/sysconfig/network-scripts/ifcfg-br0

TYPE=Bridge
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=none
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
NAME=br0
DEVICE=br0
ONBOOT=yes
IPADDR=172.16.214.110
NETMASK=255.255.255.0
GATEWAY=172.16.214.1
```

## Linux 自建 service 相关

先贴上一个自动轮询的脚本, 配合crontab 可以尝试减缓服务怠机带来的影响

#### 都以frpc脚本为示例

*autoStartFrpc* `自动启动frpc客户端`

crontab 为 `*/1 * * * * autoStartFrpc` 每一分钟检查服务状态

```bash
ps aux |grep './frpc -c frpc1.ini' |grep -v grep >> /dev/null
if [ $? -ne 0 ]
    then
        echo "start f1 process....."
        cd /.x/frp_0.21.0_linux_amd64
        nohup ./frpc -c frpc1.ini >> /var/log/frpc1.log 2>&1 &
    else
        echo "f1 runing....."
fi


ps aux |grep './frpc -c frpc2.ini' |grep -v grep >> /dev/null
if [ $? -ne 0 ]
    then
        echo "start f2 process....."
        cd /.x/frp_0.21.0_linux_amd64
        nohup ./frpc -c frpc2.ini >> /var/log/frpc2.log 2>&1 &
    else
        echo "f2 runing....."
fi
```

#### 自建 serveice 脚本

`在 /etc/init.d/ 目录下创建文件并编辑`

```bash
#!/bin/bash

### BEGIN INIT INFO
#
# Provides:  kubestack
# Required-Start:   $openvswitch-switch $neutron-openvswitch-agent
# Required-Stop:
# Default-Start:    2 3 4 5
# Default-Stop:     0 1 6
# Short-Description:    start kubestack service
# Description:  This file should be used to construct scripts to be placed in /etc/init.d.
#
### END INIT INFO

start() {
    ps aux |grep './frpc -c frpc2.ini' |grep -v grep >> /dev/null
    if [ $? -ne 0 ]
    then
        echo 'start f2 process.....'
        cd /.x/frp_0.21.0_linux_amd64
        nohup ./frpc -c frpc2.ini >> /var/log/frpc2.log 2>&1 &
    else
        echo 'f2 runing.....'
    fi
}
stop() {
    ps aux |grep './frpc -c frpc2.ini' |grep -v grep >> /dev/null
    if [ $? -ne 0 ]
    then
        echo 'stop f2 error'
    else
        kill -s 9 `ps -ef |grep frpc2 | awk '{print $2}'`
        echo 'stop f2 ok'
    fi
}
restart() {
        stop
        start
}
status() {
    echo 'This frpc2 status command'
    echo 'noting to tell you'
}
case "$1" in
    start)
        start
        exit 0
        ;;
    stop)
        stop
        exit 0
        ;;
    restart)
        restart
        exit 0
        ;;
    status)
        status
        ;;
    *)
        echo 'Usage: service frpc2 {start|status|stop|restart}'
        exit 1
esac
exit 0
```

`chmod +x filename` 基于执行权限

`update-rc.d filename defaults` 加入服务项目

`service filename start` 启动项目

*如果重新编辑脚本后 需要`systemctl daemon-reload` 重新载入*

## Linux ps 命令

<strong>Linux作为Unix的衍生操作系统，Linux内建有查看当前进程的工具ps。这个工具能在命令行中使用。</strong>

ps命令支持三种使用的语法格式

UNIX 风格，选项可以组合在一起，并且选项前必须有“-”连字符
BSD 风格，选项可以组合在一起，但是选项前不能有“-”连字符
GNU 风格的长选项，选项前有两个“-”连字符

1. 不加参数执行ps命令
    结果默认会显示4列信息。
    这是一个基本的 ps 使用。在控制台中执行这个命令并查看结果。
    PID: 运行着的命令(CMD)的进程编号
    TTY: 命令所运行的位置(终端)
    TIME: 运行着的该命令所占用的CPU处理时间
    CMD: 该进程所运行的命令

2. 显示所有当前进程  $ ps -ax 或 $ ps -ax | less
    使用 -a 参数。-a 代表 all。同时加上x参数会显示没有控制终端的进程。
    这个命令的结果或许会很长。为了便于查看，可以结合less命令和管道来使用。

3. 根据用户过滤进程  ps -u pungki
    在需要查看特定用户进程的情况下，我们可以使用 -u 参数。比如我们要查看用户'pungki'的进程，可以通过下面的命令：

4. 通过cpu和内存使用来过滤进程 $ ps -aux | less 或 ps -aux --sort -pcpu | less
    也许你希望把结果按照 CPU 或者内存用量来筛选，这样你就找到哪个进程占用了你的资源。要做到这一点，我们可以使用 aux 参数，来显示全面的信息:
    当结果很长时，我们可以使用管道和less命令来筛选。
    默认的结果集是未排好序的。可以通过 --sort命令来排序。
    根据 CPU 使用来升序排序
    经常我们通过管道显示前10个结果：
    `ps -aux --sort -pcpu,+pmem | head -n 10`

5. 通过进程名和PID过滤 ps -C commond
    使用 -C 参数，后面跟你要找的进程的名字。比如想显示一个名为getty的进程的信息，就可以使用下面的命令

6. 根据线程来过滤进程 ps -L 1213

7. 树形显示进程 ps -axjf
    but我觉得有一个更好用程序是pstree

8. 显示安全信息ps -eo pid,user,args
    参数 -e 显示所有进程信息，-o 参数控制输出。Pid,User 和 Args参数显示PID，运行应用的用户和该应用。
    能够与-e 参数 一起使用的关键字是args, cmd, comm, command, fname, ucmd, ucomm, lstart, bsdstart 和 start。

9. 格式化输出root用户(真实的或有效的UID)创建的进程  ps -U root -u root u
    -U 参数按真实用户ID(RUID)筛选进程，它会从用户列表中选择真实用户名或 ID。真实用户即实际创建该进程的用户。
    -u 参数用来筛选有效用户ID(EUID)。
    最后的u参数用来决定以针对用户的格式输出，由User, PID, %CPU, %MEM, VSZ, RSS, TTY, STAT, START, TIME 和 COMMAND这几列组成。

10. 使用PS实时监控进程状态 watch -n 1 'ps -aux --sort -pmem, -pcpu'
    ps 命令会显示你系统当前的进程状态，但是这个结果是静态的。
    当有一种情况，我们需要像上面第四点中提到的通过CPU和内存的使用率来筛选进程，并且我们希望结果能够每秒刷新一次。为此，我们可以将ps命令和watch命令结合起来。

## shell 中 if 比较 -a ~ -z的介绍

```
[ -a unix_file ] unix_file 存在为true。
[ -b unix_file ] unix_file 存在且是一个块特殊文件为true。
[ -c unix_file ] unix_file 存在且是一个字特殊文件为true。
[ -d unix_file ] unix_file 存在且是一个目录为true。
[ -e unix_file ] unix_file 存在为true。
[ -f unix_file ] unix_file 存在且是一个普通文件为true。
[ -g unix_file ] unix_file 存在且已经设置了SGID为true。
[ -h unix_file ] unix_file 存在且是一个符号连接为true。
[ -k unix_file ] unix_file 存在且已经设置了粘制位为true。
[ -p unix_file ] unix_file 存在且是一个名字管道(FO)为true。
[ -r unix_file ] unix_file 存在且是可读的为true。
[ -s unix_file ] unix_file 存在且大小不为o为true。
[ -t FD ] 文件描述符 FD 打开且指向一个终端为true。
[ -u unix_file ] unix_file 存在且设置了SUID (set user ID)为true。
[ -w unix_file ] unix_file  unix_file 存在且是可写的为true。
[ -x unix_file ] unix_file 存在且是可执行的为true。
[ -O unix_file ] unix_file 存在且属有效用户ID为true。
[ -G unix_file ] unix_file 存在且属有效用户组为true。
[ -L unix_file ] unix_file 存在且是一个符号连接为true。
[ -N unix_file ] unix_file 存在 and has been modied since it was last read为true。
[ -S unix_file ] unix_file 存在且是一个套接字为true。
[ unix_file1 -nt unix_file2 ]  unix_file1 has been changed more recently than unix_file2, or  unix_file1 exists and unix_file2 does not为true。
[ unix_file1 -ot unix_file2 ]  unix_file1 比 unix_file2 要老, 或者 unix_file2 存在且 unix_file1 不存在为true。
[ unix_file1 -ef unix_file2 ]  unix_file1 和 unix_file2 指向相同的设备和节点号为true。
[ -o OPTIONNAME ]  shell选项 “OPTIONNAME” 开启为true。
[ -z STRING ] “STRING” 的长度为零为true。
[ -n STRING ] or [ STRING ] “STRING” 的长度为非零 non-zero为true。
[ STRING1 == STRING2 ] 2个字符串相同。 “=” may be used instead of “==” for strict POSIX compliance为true。
[ STRING1 != STRING2 ] 字符串不相等为true。
[ STRING1 < STRING2 ]  “STRING1” sorts before “STRING2” lexicographically in the current locale为true。
[ STRING1 > STRING2 ]  “STRING1” sorts after “STRING2” lexicographically in the current locale为true。
```

## Centos yum只下载不安装程序

--downloaddir 指定下载文件储存的目录

--downloadonly 只下载不安装

```bash
yum install --downloaddir=/vim --downloadonly vim
```

## Centos 安装离线rpm包

方法一：使用rpm命令，强制安装

```bash
cd /vim
rpm -ivh --force *.rpm
```

方法二：使用createrepo命令生成yum源，使用yum安装

```bash
cd /vim
createrepo ./
vim /etc/yum.repos.d/vim.repo

[vim]
name=vim
baseurl=file:///vim
enabled=1
gpgcheck=0

mv /etc/yum.repos.d/CentOS-* /opt
yum install vim
```

## Certbot申请https证书

**场景:** 申请https证书

[官方地址](https://certbot.eff.org/)

使用前安装certbot, 安装方式官方地址有说明

`certbot certonly --standalone -n --agree-tos --email you@gmail.com -d you.domain.com --server https://acme-v02.api.letsencrypt.org/directory`

`certbot certonly --standalone -d *.rat.red --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
`

会在`/etc/letsencrypt/live/you.domain.com/`生成对应的证书文件

配置crontab 自动刷新

`0 3 1 * * certbot renew --renew-hook "shell"`
