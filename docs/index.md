---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "NiceGUI"
  text: "基于 Python + FastAPI 的高性能 WebUI 框架"
  tagline: 让任意浏览器即刻成为您Python代码的前端交互界面。
  image:
    src: /static/favicon/android-chrome-384x384.png
    alt: NiceGUI
  actions:
    - theme: brand
      text: 阅读文档
      link: /documentation
    - theme: alt
      text: 官方网站↗
      link: https://nicegui.io

---
<h2>通过按钮、对话框、3D场景及可视化图表等丰富组件 —— 实现与Python代码的实时双向交互操作。</h2>

NiceGUI 为您封装底层 Web 开发细节，助您专注核心业务逻辑的 Python 实现，完美适配：

- 机器人控制系统开发
- 物联网(IoT)设备管理平台
- 智能家居中控系统
- 机器学习可视化界面
- 凭借原生硬件兼容特性（支持摄像头/GPIO接口等物联网外设），实现统一代码管理的高效开发范式。

NiceGUI 提供平滑的学习曲线 —— 新手可快速实现基础功能原型，资深开发者则能通过高阶 API 进行深度定制。这种双模开发范式实现：简单需求开箱即用，复杂场景灵活扩展。

您可以通过 [PyPI 包](https://pypi.org/project/nicegui/), [Docker 镜像](https://hub.docker.com/r/zauberzeug/nicegui) 和 [Github](https://github.com/zauberzeug/nicegui) 获取 NiceGUI。

# 特性

- **交互**
  - [按钮、开关、滑块、输入……](/documentation/section_controls)
  - [通知、对话框和菜单](/documentation/section_page_layout)
  - 通过 SVG 创建[动态图片](/documentation/section_audiovisual_elements#互动图片-interactive-image)
  - 网页视图与[窗口 APP 模式](/documentation/section_configuration_deployment#窗口模式_native_mode)
- **布局**
  - [导航栏、标签页……](/documentation/section_page_layout)
  - 横向布局、纵向布局、网格布局与卡片布局
  - [HTML]() 与 [Markdown]() 元素
  - 默认基于 flex 布局
- **可视化**
  - [图表]()、[表格]()、[音频与视频]()
  - [3D图形]()
  - 易于理解的[数据绑定]()
  - 定时[数据重载]()
- **样式**
  - 可客制化的[颜色主题]()
  - 自定义 CSS 与 classes
  - material design 风格的现代化样式
  - [Tailwind CSS](https://v3.tailwindcss.com/) 自动完成
- **代码**
  - 通过路由实现[多页面]()
  - 当代码被修改时自动重载
  - 多种[用户存储]()方式
  - 超棒的[测试框架]()
- **技术栈**
  - 通过 [Vue](https://vuejs.org/) 与Python绑定
  - 使用 [Quasar](https://quasar.dev/) 创建动态图形界面
  - 服务器基于高性能的[FastAPI](https://fastapi.tiangolo.com/zh)
  - Python 3.8+

# 为什么创造 NiceGUI？

我们 [Zauberzeug](https://zauberzeug.com) 团队认可 [Streamlit](https://streamlit.io/) 的价值，但发现其在 [状态管理方面存在过多隐式操作](https://github.com/zauberzeug/nicegui/issues/1#issuecomment-847413651)。
在寻求 Python 图形界面开发的替代方案时，我们发现了 [JustPy](https://justpy.io/)。我们虽然认同其设计理念，但其 *底层HTML操作* 特性不符合我们的日常开发需求。但是这个框架启发了我们采用 [Vue](https://vuejs.org/) 与 [Quasar](https://quasar.dev/) 构建前端体系。

NiceGUI 构建于 [FastAPI](https://fastapi.tiangolo.com/) 之上，其底层整合了 ASGI 框架 [Starlette](https://www.starlette.io/) 与高性能 ASGI 服务器 [Uvicorn](https://www.uvicorn.org/)。该组合在保证卓越性能的同时，显著提升开发效率。