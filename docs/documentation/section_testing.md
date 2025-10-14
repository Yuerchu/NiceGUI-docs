---
title: 测试
prev:
  text: '配置与部署'
  link: '/documentation/section_configuration_deployment'
next: false
---

# 测试

## 项目结构

NiceGUI 包提供了一个 [pytest 插件](https://docs.pytest.org/en/stable/how-to/writing_plugins.html)，可通过 `pytest_plugins = ['nicegui.testing.plugin']` 激活。这使得专门的[测试夹具](https://docs.pytest.org/en/stable/explanation/fixtures.html)可用于测试您的 NiceGUI 用户界面。使用 [`screen` 夹具]()，您可以通过无头浏览器运行测试（较慢），而使用 [`user` 夹具]()则完全在 Python 中模拟（较快）。如果只需要一种测试夹具，也可以使用插件 `nicegui.testing.user_plugin` 或 `nicegui.testing.screen_plugin`。

构建项目和测试的方式多种多样。这里我们仅介绍两种我们认为有用的方法，一种[适用于小型应用和实验]()，另一种模块化方法适用于大型项目。您可以在 [pytest 文档](https://pytest.cn/en/stable/contents.html)中找到更多信息。

## 用户夹具

我们建议尽可能使用用户夹具（user fixture）而非 [屏幕夹具（screen fixture）]()，因为其执行速度与单元测试相当，且通过 `pytest_plugins = ['nicegui.testing.user_plugin']` 加载时无需依赖 Selenium。用户夹具移除了浏览器，完全通过 Python 轻量级模拟实现。具体配置说明请参阅项目结构文档。

您可断言"看到"特定元素或内容、点击按钮、向输入框键入文本及触发事件。我们致力于提供简洁的API，使验收测试编写如故事般流畅易懂。由于执行速度极快，传统认为UI测试缓慢昂贵的[测试金字塔模型](https://martinfowler.com/bliki/TestPyramid.html)已不再适用。

```python
await user.open('/')
user.find('Username').type('user1')
user.find('Password').type('pass1').trigger('keydown.enter')
await user.should_see('Hello user1!')
user.find('logout').click()
await user.should_see('Log in')
```

:::tip 提示
用户夹具功能较新，目前仍缺少一些特性。请[在 GitHub 上通过单独的功能请求告知](https://github.com/zauberzeug/nicegui/discussions/new?category=ideas-feature-requests)我们。
:::

## 屏幕夹具

屏幕测试装置会启动一个真实的（无头）浏览器来与您的应用程序交互。仅当您需要测试特定于浏览器的行为时才需使用此功能。 NiceGUI 本身已通过该装置进行全面测试，确保每个组件都能按预期工作。因此，仅在必要时使用它。

```python
from selenium.webdriver.common.keys import Keys

screen.open('/')
screen.type(Keys.TAB) # to focus on the first input
screen.type('user1')
screen.type(Keys.TAB) # to focus the second input
screen.type('pass1')
screen.click('Log in')
screen.should_contain('Hello user1!')
screen.click('logout')
screen.should_contain('Log in')
```