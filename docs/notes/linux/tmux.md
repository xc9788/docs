# tmux

## tmux 终端复用

tmux是一款优秀的终端复用软件，它比Screen更加强大。

`sessions` `windows` `panes` 多次复用

[推荐文档](http://louiszhai.github.io/2017/09/30/tmux/#%E4%BC%9A%E8%AF%9D)

个人使用 `~/.tmux.conf`

```sh
set -g prefix C-x
set -g default-terminal "screen-256color"
set -g status-bg black
set -g status-fg white
set-option -g status-justify centre
set-option -g status-left '#[bg=black,fg=green][#[fg=cyan]#S#[fg=green]]'
set-option -g status-left-length 20
setw -g automatic-rename on
set-window-option -g window-status-format '#[dim]#I:#[default]#W#[fg=grey,dim]'
set-window-option -g window-status-current-format '#[fg=cyan,bold]#I#[fg=blue]:#[fg=cyan]#W#[fg=dim]'
set -g status-right '#[fg=green][#[fg=cyan]%Y-%m-%d#[fg=green]]'
set -g mouse on
set -g renumber-windows on
set -g base-index 1
set -g pane-base-index 1
setw -g allow-rename off
setw -g automatic-rename off
setw -g mode-keys vi
```

如果需要tmux快捷指令, 推荐如下

```sh
alias tx='tmux'
alias txl='tmux ls'
alias txa='tmux a'
alias txcs='tmux new -s'
alias txk='tmux kill-server'
alias txks='tmux kill-session -t'
```

tmux 一些常用的指令推荐
```sh
# window篇
操作profix + c #创建新的窗口 
操作profix + & #关闭当前窗口 
操作profix + num(window编号) #切换到指定窗口
操作profix + p(window编号) #切换到上一窗口
操作profix + n(window编号) #切换到下一窗口
操作profix + w(window编号) #打开窗口列表

# pane篇
操作profix + “ #面板上下分
操作profix + % #面板左右分 
操作profix + x #关闭当前面板

# 更多不常用的可以自行搜索
# 例如 https://gist.github.com/MohamedAlaa/2961058
```
