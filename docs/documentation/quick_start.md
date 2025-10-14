---
title: 快速开始
prev:
  text: 'NiceGUI 文档'
  link: '/documentation'
next:
  text: '文本元素'
  link: '/documentation/section_text_elements'
---

# 快速开始

## 最简单的方式

NiceGUI 非常容易上手。它只需要三步：

### 1. 创建 `main.py`

```python:line-numbers
from nicegui import ui

ui.label('你好 NiceGUI!')

ui.run()
```

### 2. 安装与启动

```bash
pip3 install nicegui
python3 main.py
```

### 3. 开始享受吧！

```text
你好 NiceGUI!
```

## 在 Docker 中运行 main.py

你还可以使用我们的
[预构建 Docker 镜像](https://hub.docker.com/repository/docker/zauberzeug/nicegui)
在不安装任何包的前提下运行服务。

该命令会在当前目录中查找 `main.py` 文件，并在 `http://localhost:8888` 启动应用服务。

```bash
docker run -it --rm -p 8888:8080 \
    -v "$PWD":/app zauberzeug/nicegui
```