---
title: 安全最佳实践
prev:
  text: '测试'
  link: '/documentation/section_testing'
next: false
---

# 安全最佳实践

## 安全模型

NiceGUI 提供了安全的默认设置和内置保护机制，但**开发者必须编写安全的代码**。并非所有 UI 组件都能安全地处理不受信任的输入，因此了解哪些组件需要验证是至关重要的。

**框架提供的：**

- 尽可能的安全默认设置
- 内置保护机制
- 及时的漏洞修复

**开发者的责任：**

- 审查应用逻辑中的不安全模式
- 保持对不受信任内容的清理功能为启用状态
- 在必要时验证用户输入
- 保持 NiceGUI 为最新版本

## 安全的输入解析

NiceGUI 应用本质上是 Python 代码，许多安全问题源于不安全的 Python 模式。审查您的应用逻辑可以发现不应出现在生产环境中的漏洞。

例如，使用 `ast.literal_eval()` 来安全地将用户输入解析为 Python 数据结构：

```python:line-numbers
import ast
from nicegui import ui

def evaluate_safely():
    try:
        value = ast.literal_eval(user_input.value)
        ui.notify(f'结果: {value}')
    except (ValueError, SyntaxError):
        ui.notify('无效的 Python 字面量', type='negative')

user_input = ui.input('输入 Python 字面量', placeholder='[1, 2]')
ui.button('解析', on_click=evaluate_safely)

ui.run()
```

::: danger 警告
**绝对不要这样做：**
```python
value = eval(user_input.value)  # 可以执行任意 Python 代码！
```
:::

## 组件选择

选择正确的组件可以减少手动验证的需求。

**默认安全**（在 `sanitize=True` 的默认设置下）：

- `ui.html()`
- `ui.markdown()`
- `ui.chat_message()`
- `ui.interactive_image()`
- 其他具有明确用途的元素，框架可以自动保护。

**需要开发者验证**（框架无法区分安全值和不安全值）：

- `ui.navigate.to()`
- `ui.link()`
- `element.style()`

**绝对不要与不受信任的输入一起使用：**

- `ui.add_head_html()`
- `ui.add_body_html()`
- `ui.add_css()`
- `ui.run_javascript()`

```python:line-numbers
from nicegui import ui

username = ui.input('输入姓名')

ui.label().bind_text_from(username, 'value')
ui.markdown().bind_content_from(username, 'value')

ui.run()
```

::: danger 警告
**绝对不要这样做：**
```python
ui.add_body_html(f"<div>欢迎 {username}</div>")  # XSS: "<img src=x onerror=alert(1)>"
ui.add_head_html(f"<script>alert('{username}')</script>")  # XSS: "');alert(1);//"
```
:::

## URL 验证

NiceGUI 不会验证 URL 方案（scheme），因为 `javascript:` URL 有合法的用途。当接受来自用户输入的 URL 时，请验证方案以防止 `javascript:` 注入：

```python:line-numbers
from urllib.parse import urlparse
from nicegui import ui

def is_safe_url(url: str) -> bool:
    return urlparse(url.strip()).scheme in ('', 'http', 'https')

def open_link(url: str) -> None:
    if is_safe_url(url):
        ui.navigate.to(url)
    else:
        ui.notify('无效或不安全的 URL', type='negative')

def show_link(url: str) -> None:
    if is_safe_url(url):
        ui.link(target=url)
    else:
        ui.notify('无效或不安全的 URL', type='negative')

user_url = ui.input('输入 URL', placeholder='javascript:alert(1)')
ui.button('导航', on_click=lambda: open_link(user_url.value))
ui.button('显示链接', on_click=lambda: show_link(user_url.value))

ui.run()
```

::: danger 警告
**绝对不要这样做：**
```python
ui.navigate.to(user_url.value)  # 允许 javascript: URL 注入！
ui.link(user_url.value)  # 渲染 javascript: URL 而不进行验证！
```
:::

## CSS 注入

元素样式属性不会被转义，因为框架无法区分合法的 CSS 和 [CSS 数据窃取技术](https://portswigger.net/research/blind-css-exfiltration)。在应用用户输入之前请验证样式值：

```python:line-numbers
import re
from nicegui import ui

def is_safe_color(color: str) -> bool:
    hex_pattern = r'^#[0-9a-fA-F]+$'
    rgb_pattern = r'^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$'
    return bool(re.match(hex_pattern, color) or re.match(rgb_pattern, color))

def apply_color():
    if is_safe_color(user_color.value):
        label.style['color'] = user_color.value
    else:
        ui.notify('无效的颜色', type='negative')

user_color = ui.input('输入颜色', placeholder='#0000ff')
label = ui.label('示例文本')
ui.button('应用颜色', on_click=apply_color)

ui.run()
```

::: danger 警告
**绝对不要这样做：**
```python
label.style['color'] = user_color.value  # 允许 CSS 注入和数据窃取
```
:::

## 客户端密钥

NiceGUI 为每个客户端会话分配一个唯一的 `client_id`（随机 UUID）。此 ID 用于在浏览器和服务器之间路由 Socket.IO 消息。如果 `client_id` 或客户端 cookie 被暴露给攻击者，则该客户端会话被视为**已遭入侵**。

**保护客户端会话的方法：**

- **在生产环境中通过 HTTPS 提供页面**，以防止流量嗅探。
- **不要从相同来源提供不受信任的内容**（例如，提供用户上传的 HTML 文件可能通过 JavaScript 泄露密钥）。
- **不要在日志、URL 或对其他用户可见的 API 响应中暴露 `client_id`**。
- **将 `client_id` 视为会话令牌**：任何知道它的人都可以代表该客户端发送事件。

## 其他资源

**安全公告：**

- [NiceGUI 安全公告](https://github.com/zauberzeug/nicegui/security/advisories)

**外部资源：**

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP XSS 防护](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [DOMPurify](https://github.com/cure53/DOMPurify)

**关键原则：**

1. 保持清理功能为启用状态（这是默认设置）
2. 验证 URL 方案（框架不会限制它们）
3. 验证 CSS 值（框架不会转义它们）
4. 仅对您控制的受信任内容禁用清理功能
5. 应用纵深防御（iframe 阻止头、输入验证）
6. 保持 NiceGUI 为最新版本
