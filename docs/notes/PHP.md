# PHP 随笔

## 编译安装PHP

[PHP源码包下载](http://php.net/downloads.php)

[PHP7.3下载](https://downloads.php.net/~cmb/)

#### 示例以 php 7.2 安装
##### 强烈建议不再使用php7以下版本, php7和php5的性能是两个世界

***./configure*** 过程中, 出现error时, 浏览一下错误. 如果是缺少系统模块, 对应包管理安装就可以

```bash
# Notice
# --prefix=/usr/local/php7.2 指定安装目录  
# --with-config-file-path=/usr/local/php7.2 指定config目录

# 常用包扩展

./configure \
--prefix=/usr/local/php7.2 \
--with-config-file-path=/usr/local/php7.2 \
--enable-mysqlnd \
--enable-opcache \
--enable-sockets \
--enable-sysvmsg \
--enable-sysvsem \
--enable-sysvshm \
--enable-shmop \
--enable-zip \
--enable-ftp \
--enable-soap \
--enable-xml \
--enable-mbstring \
--enable-rpath  \
--enable-debug \
--enable-fileinfo \
--enable-fpm \
--enable-pcntl \
--enable-curl \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--with-pcre-regex \
--with-iconv \
--with-zlib \
--with-gd \
--with-openssl \
--with-xmlrpc \
--with-imap-ssl \
--with-freetype-dir\
--with-mhash

# 有些包或者扩展是有问题的(不影响复制运行), 记录不仔细莫见外
# 执行需要一段时间, 完后执行下面两条命令 ps: make && make install
make
make install

#OPS: 等待安装完成吧
```

## PHP本地常用指令

```bash
# 查看php版本
php -v 
```

```bash
# 运行本地cli
php -a
```

```bash
# 执行本地*.php文件
php xx.php
```

## nginx中配置php-fpm

这里先废话一下php-fpm, 引入php-fom.org首页的第一句话.

`是一种替代的PHP FastCGI实现，其中一些附加功能对任何大小的站点都有用，尤其是更繁忙的站点`

linux中查看fpm是否在运行中, 如果有进程在运行则运行正常

```bash
ps aux |grep php*.fpm
```

[详细内容](https://php-fpm.org/)

这里粘贴nginx默认php-fpm片段

```bash
# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
#
location ~ \.php$ {
    fastcgi_pass   unix:/var/run/php/php7.2-fpm.sock; # 127.0.0.1:9000 端口服务式进程 
    fastcgi_index  index.php; # fastgit 默认文件
    fastcgi_param  SCRIPT_FILENAME  $fastcgi_script_name;
    include        fastcgi_params;
}
```

这是一种简单的完整nginx 和 php-fpm 的写法

```bash
server {
    listen 80;
    server_name www.rat.red;

    root /var/www/www.rat.red;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php;
    }

    ocation ~ \.php$ {
        try_files $uri =404;

        include fastcgi.conf; # 引入默认nginx fastcgi_conf
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
    }
}
```

## PHP redis 扩展安装

[扩展包下载](http://pecl.php.net/)

```bash
# 使用 phpize, 默认目录如下
/usr/bin/phpize

./configure -with-php-config=/usr/local/php7.2

make install
```

一般会自动配置php.ini文件

PS: 如果未生效, 可以手动创建conf.d目录下redis.ini文件 (写入导入so文件的信息)

## PHP包管理 Composer

Composer 是 PHP 的一个依赖管理工具。它允许你申明项目所依赖的代码库，它会在你的项目中为你安装他们。

#### 依赖管理

Composer 不是一个包管理器。是的，它涉及 "packages" 和 "libraries"，但它在每个项目的基础上进行管理，在你项目的某个目录中(例如 vendor)进行安装。默认情况下它不会在全局安装任何东西。因此，这仅仅是一个依赖管理。

这种想法并不新鲜，Composer 受到了 node's npm 和 ruby's bundler 的强烈启发。而当时 PHP 下并没有类似的工具。

Composer 将这样为你解决问题：

1. 你有一个项目依赖于若干个库
2. 其中一些库依赖于其他库
3. 你声明你所依赖的东西
4. Composer 会找出哪个版本的包需要安装，并安装它们(将它们下载到你的项目中)

#### 声明依赖关系

比方说，你正在创建一个项目，你需要一个库来做日志记录。你决定使用 monolog。为了将它添加到你的项目中，你所需要做的就是创建一个 `composer.json` 文件，其中描述了项目的依赖关系。

```php
{
    "require": {
        "monolog/monolog": "1.2.*"
    }
}
```

我们只要指出我们的项目需要一些 monolog/monolog 的包，从 1.2 开始的任何版本。

#### 使用 Composer

现在我们将使用 Composer 来安装项目的依赖。如果在当前目录下没有一个 composer.json 文件，请查看基本用法章节。

要解决和下载依赖，请执行 install 命令：

```bash
php composer.phar install
```

如果你进行了全局安装，并且没有 phar 文件在当前目录，请使用下面的命令代替：

```bash
composer install
```

继续 上面的例子，这里将下载 monolog 到 vendor/monolog/monolog 目录。

#### 自动加载

除了库的下载，Composer 还准备了一个自动加载文件，它可以加载 Composer 下载的库中所有的类文件。使用它，你只需要将下面这行代码添加到你项目的引导文件中：

```php
require 'vendor/autoload.php';
```

现在我们就可以使用 monolog 了！想要学习更多关于 Composer 的知识，请查看“基本用法”章节。

## 常用日期，时间函数

#### date()

date函数需要format参数指定如何格式化日期， 第二个参数可以指定时间戳来获取格式化时间。

如: `date('Y-m-d H:i:s', time())` // 默认即为time()

由于支持得format参数过多， 这么不做详细介绍, [详细](https://www.php.net/manual/en/function.date.php)

#### strtotime()

strtotime函数是将format格式化日期或者指定得英文文本日期时间描述解析为Unix时间戳

这里写些指定英文文本日期时间描述操作

`strtotime("+1 week 2 days 4 hours 2 seconds")` 当前时间 + 1周后2天4小时2秒

`strtotime( "2009-01-31 +1 month" )` 2009年01月31号 + 下个月 （ps: 这里不是31或者30天 会自动为28天 及 2月28日

`strtotime("first day of next month")` 下个月第一天

[详细](https://www.php.net/manual/en/function.strtotime.php)

## json_encode 和 json_decode

`json_encode(arr || obj)` 将数组或者对象 转成json字符串 [详细](https://www.php.net/manual/en/function.json-encode.php)

`json_decode((json)str)` 将json字符串转成数组或者对象(取决于第二个(bool)assoc参数) [详细](https://www.php.net/manual/en/function.json-decode.php)
