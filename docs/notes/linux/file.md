# 文件相关

> 常用命令 `ls, dir, mkdir, ll, mv, cp, cd, rm, curl, pwd`

## 查看文件内容

```bash
tail –f /tmp/app.log # 监听app.log并打印内容，用于查看log

tail –5 /tmp/app.log # 打印app.log最后5行内容

tail –n +50 /tmp/app.log # 打印app.log从第50行开始的内容

cat /tmp/app.log |grep graphql # 列出app.log含有graphql的片段

head -n 10 /tmp/app.log # 查看文件前10行内容

head -n 10 /tmp/app.log |tail -n +1 # 查看文件前十行, 以第一条为始 (实际查询数量9条)

head -n 10 /tmp/app.log |tail -n 1 # 查看文件前十行, 只保留最后一条 (实际查询数量1条)
```

## 创建文件

```bash
echo 'hello' > test.txt # 往test.txt写入hello

echo 'world' >> test.txt # 往test.txt添加world

mkdir -p logs # 创建logs目录，目录已存在不报错
```

## 过滤搜索

```bash
grep -r graphql . # 列出当前目录下文件含有graphql字眼的文件

find ./ -name '*.go' # 找出当前目录下所有go文件

fgrep '2018-07-04' dev.log -c # 搜索dev.log文件里面含有`2018-07-04`的行的计数

fgrep '2018-07-04' dev.log |grep 'error' -c # 在上面命令的基础上增加行内含有`error`的条件

fgrep -rn '2018-07-04' ./* # 查找当前目录下所有文件中包含`2018-07-04`的文件和具体行数
```

## 删除文件

```bash
rm ./test.txt # 删除test.txt文件

rm -rfv ./node_modules # 删除整个node_modules目录
```