---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "NiceGUI"
  text: 让任何浏览器成为你 Python 代码的前端
  tagline: 深受全球机器人、物联网和机器学习团队的喜爱。
  image:
    src: /static/favicon/android-chrome-384x384.png
    alt: NiceGUI
  actions:
    - theme: brand
      text: 快速上手
      link: /documentation/quick_start
    - theme: alt
      text: 阅读文档
      link: /documentation
    - theme: alt
      text: 官方网站 ↗
      link: https://nicegui.io

features:
  - icon: 🎯
    title: 交互
    details: '<a href="/documentation/elements/button">按钮</a>、<a href="/documentation/elements/switch">开关</a>、<a href="/documentation/elements/slider">滑块</a>、<a href="/documentation/elements/input">输入框</a>……<br><a href="/documentation/section_page_layout#通知-notification">通知</a>、<a href="/documentation/section_page_layout#对话框-dialog">对话框</a>和<a href="/documentation/section_page_layout#菜单-menu">菜单</a><br>支持 SVG 叠加的<a href="/documentation/section_audiovisual_elements#互动图片-interactive-image">交互式图像</a><br>网页与<a href="/documentation/section_configuration_deployment#本机模式-native-mode">原生窗口应用</a>'
  - icon: 🪟
    title: 布局
    details: '<a href="/documentation/section_page_layout">导航栏</a>、<a href="/documentation/section_page_layout#标签与标签页-tabs">标签页</a>、<a href="/documentation/section_page_layout#扩展元素-expansion-element">面板</a><br><a href="/documentation/section_page_layout#横向布局-row-element">行</a>、<a href="/documentation/section_page_layout#纵向布局-column-element">列</a>、<a href="/documentation/section_page_layout#网格布局-grid-element">网格</a>和<a href="/documentation/section_page_layout#卡片-card">卡片</a><br><a href="/documentation/elements/html">HTML</a> 和 <a href="/documentation/elements/markdown">Markdown</a> 元素<br>默认使用 Flex 布局'
  - icon: 👀
    title: 可视化
    details: '<a href="/documentation/section_data_elements#apache-echart">图表</a>、<a href="/documentation/section_data_elements#表格-table">表格</a>、<a href="/documentation/section_audiovisual_elements#音频-audio">音频</a>/<a href="/documentation/section_audiovisual_elements#视频-video">视频</a><br><a href="/documentation/section_data_elements#_3d-图形-3d-scene">3D 场景</a><br>简单直接的<a href="/documentation/section_binding_properties">数据绑定</a><br>内置<a href="/documentation/section_action_events#Timer">定时器</a>，轻松刷新数据'
  - icon: 🌅
    title: 样式
    details: '可定制的<a href="/documentation/section_styling_appearance#颜色主题-color-theming">颜色主题</a><br>自定义 CSS 和样式类<br>基于 Material Design 的现代外观<br><a href="https://tailwindcss.com/">Tailwind CSS</a>'
  - icon: 📑
    title: 编程
    details: '使用 <a href="/documentation/section_pages_routing#子页面-sub-pages">ui.sub_pages</a> 构建单页应用<br>代码变更时自动重载<br>持久化的<a href="/documentation/section_action_events#持久化-storage">用户会话</a><br>超强的<a href="/documentation/section_testing">测试框架</a>'
  - icon: 🛠️
    title: 技术栈
    details: '<a href="https://cn.vuejs.org/">Vue</a> 与 Python 之间的通用桥接<br>通过 <a href="https://quasar.dev/">Quasar</a> 实现动态界面<br>内容由 <a href="https://fastapi.tiangolo.com/zh/">FastAPI</a> 提供<br>Python 3.10+'
---

## 三行代码，应用就能跑起来。

写一个 Python 文件，安装并运行——就这么简单。

**1. 编写** `main.py`：

```python
from nicegui import ui

ui.label('Hello NiceGUI!')

ui.run()
```

**2. 运行**：

```bash
pip3 install nicegui
python3 main.py
```

**3. 尽情享受**：在浏览器中打开 `http://localhost:8080`，就能看到 `Hello NiceGUI!`。

### 或者用 Docker 运行你的 main.py

借助官方的[多架构 Docker 镜像](https://hub.docker.com/repository/docker/zauberzeug/nicegui)，无需安装任何软件包即可启动服务器。

```bash
docker run -it --rm -p 8888:8080 \
    -v "$PWD":/app zauberzeug/nicegui
```

该命令会在当前目录中查找 `main.py`，并使应用可通过 `http://localhost:8888` 访问。

## 或者，交给你的 AI 吧！

大多数 LLM 已经了解 NiceGUI。至于其他模型，可以把本站的 [LLM 参考](/llms-full.txt)（一个开箱即用的 Markdown 文件）直接粘贴给它，或将 RAG 流水线指向[文档索引](/documentation/section_configuration_deployment#documentation_index)，获取 JSON 格式的完整 API。

## 为什么？

> “我们喜欢 Streamlit，但发现它在状态管理上用了太多魔法。”
>
> [阅读完整故事 →](https://github.com/zauberzeug/nicegui/discussions/21)

- **纯 Python**：无需 HTML、CSS 或 JavaScript。使用熟悉的模式和现有工具，完全用 Python 构建 Web 界面。
- **伴你成长**：从 10 行的原型到多页面的生产应用——同样的模式、同一个代码库，无需重写。
- **功能齐备**：100 多个组件、响应式数据绑定、图表与绘图、3D 场景、原生桌面应用以及 Docker 支持——开箱即用。

前端基于 [Vue](https://cn.vuejs.org/) 和 [Quasar](https://quasar.dev/)，底层由 [FastAPI](https://fastapi.tiangolo.com/zh/)、[Starlette](https://www.starlette.io/) 和 [Uvicorn](https://www.uvicorn.org/) 驱动。[了解更多 →](/documentation/section_foundations)
