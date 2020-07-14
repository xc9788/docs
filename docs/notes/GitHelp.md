# Git命令帮助

## git reset

--soft：移动头指针，已经add的缓存及工作空间不变

--mixed：移动头指针，删除add的缓存，工作空间不变

--hard：移动头指针，删除add的缓存及工作空间

## git remote

-v：查看关联的远程仓库的详细信息
```bash
git remote -v
```

add：添加远程仓库的关联

```bash
git remote add <name> <url>
```

remove：删除远程仓库的关联

```bash
git remote remove <name>
```

set-url：修改远程仓库的关联

```bash
git remote set-url <name> <newurl>
```

## git branch

-a：查看本地和远程所有的分支列表

-vv：查看本地分支对应的远程分支

查看当前所在分支

```bash
git branch
```

创建分支

```bash
git branch <name>
```

-m：修改分支名

```bash
git branch -m <oldname> <newname>
```

-d：删除分支

```bash
git branch -d <name>
```

-u：建立追踪关系

```bash
git branch --set-upstream-to=origin/<branchname>
```

## git checkout

-b：如果分支存在则只切换分支，若不存在则创建并切换到分支

```bash
git checkout -b <name>
```

切换到分支

```bash
git checkout <name>
```

放弃单个文件的修改

```bash
git checkout <filename>
```

放弃当前目录下的修改

```bash
git checkout .
```

## 删除.git历史下大文件
```bash

# 来源网络

git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -5 | awk '{print$1}')"

git filter-branch --force --index-filter 'git rm -rf --cached --ignore-unmatch 大文件名' --prune-empty --tag-name-filter cat -- --all

rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now
git gc --aggressive --prune=now
git push origin master --force

git remote prune origin
```