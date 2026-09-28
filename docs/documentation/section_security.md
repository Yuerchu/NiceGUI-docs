---
title: 安全最佳实践
prev:
  text: '测试'
  link: '/documentation/section_testing'
next:
  text: '技术栈'
  link: '/documentation/section_foundations'
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

NiceGUI 应用本质上是 Python 代码，许多安全问题源于不安全的 Python 模式。审查你的应用逻辑可以发现不应出现在生产环境中的漏洞。

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

NiceGUI 为每个客户端会话分配一个唯一的 `client_id`（随机 UUID）。

**`client_id` 从哪里来：页面是唯一的签发者。**

渲染页面时会生成一个新的 `client_id` 并将其嵌入响应 HTML 中，而该 HTML 中的元素决定了这个 `client_id` 拥有哪些能力。

- 用身份验证（中间件重定向、登录检查等）保护重要页面，使未经身份验证的访问者永远拿不到能访问受保护功能的 `client_id`。
- 除身份验证外，还要防范已验证用户的 HTML 通过旁路泄露（XSS、浏览器缓存暴露）。

**`client_id` 在哪里被使用：`/_nicegui/` 下的 NiceGUI 内部路由。**

- 按客户端划分的路由会携带 `client_id`（在 URL 中或在 Socket.IO 消息载荷中），并将其视为会话令牌。这包括 Socket.IO 传输通道和 `ui.upload()` 的 POST 端点，以及其他所有动态注册的按客户端划分的路由。其他 `/_nicegui/` 路由（库、组件、静态资源和自动挂载的资源）提供的是公开资源，不按客户端划分。
- 按客户端划分的路由没有单独的身份验证层。保护签发 `client_id` 的页面，就是在保护这些路由。

因此，如果 `client_id` 或客户端 cookie 被暴露给攻击者，则该客户端会话被视为**已遭入侵**。

**保护客户端会话的方法：**

- **在生产环境中通过 HTTPS 提供页面**，以防止流量嗅探。
- **绝不要让共享缓存存储页面响应**。每个页面都嵌入了一个新的 `client_id`，因此 CDN、反向代理缓存或任何其他会缓存 HTML 的中间层都会从两方面破坏安全模型：它会把一个访问者的会话令牌交给所有命中该缓存条目的人，并且会把任何被反射的输入变成缓存投毒的途径——一个恶意请求就能存入攻击者控制的 HTML（XSS、钓鱼、页面篡改），随后提供给之后的每一个访问者。正因如此，NiceGUI 会在页面上发送 `Cache-Control: no-store`——不要覆盖或剥离它（例如一条笼统的「全部缓存」规则）。这是上文提到的私有浏览器缓存泄露在共享缓存上的对应情形。
- **不要从相同来源提供不受信任的内容**（例如，提供用户上传的 HTML 文件可能通过 JavaScript 泄露密钥）。
- **不要在日志、URL 或对其他用户可见的 API 响应中暴露 `client_id`**。
- **将 `client_id` 视为会话令牌**：任何知道它的人都可以代表该客户端发送事件。
- **保护页面，而不是 `/_nicegui/`**：在凭据签发的地方加以保护，而不是在它被使用的地方。

**并非每个随机 ID 都是密钥。**

NiceGUI 会为几种不同的用途生成随机 UUID，它们承载的权限并不相同：

- **按设计公开**：事件监听器、Leaflet 图层和 3D 场景对象的 ID 会以明文形式发送到浏览器。它们只需要保证唯一，知道其中一个并不会带来任何权限。
- **持有者凭证**：上文的 `client_id`，以及作为 `app.storage.tab` 键的标签页 ID（由浏览器生成并随连接发送，而非由服务器签发）。任何知道其中之一的人都可以冒充该客户端，或读写该标签页的存储，因此两者都需要上述保护措施。
- **存储键**：`app.storage.user` 的 ID 保存在用你的 `storage_secret` 签名的会话 cookie 中。在这里，访问边界是签名而不是 ID，因此仅猜出 ID 并不能解锁其他用户的存储。

只有第二类需要作为密钥加以保护。实践中失效的不是随机性，而是泄露——上述做法防范的正是这一点。

## 示例只是起点

NiceGUI 提供了许多[示例](https://nicegui.io/examples)。它们以最小的可运行形式演示某一种特定机制（身份验证、文件上传、终端等）。它们**不是**生产模板，可能有意省略了你的部署所需的安全加固。

在把示例作为真实应用的基础之前：

- **阅读每一行代码，并理解它为什么存在**。在本地演示中安全的模式，放到公开 URL 后面可能并不安全。
- **重新评估每一条威胁模型假设**。例如，`xterm` 示例按设计将浏览器连接到 Bash PTY。它的目的是演示这种集成，而不是暴露在公共互联网上。
- **根据你的需求调整身份验证示例**。它演示了页面级别基于会话的身份验证，这是推荐的模式。但生产应用通常还需要速率限制、针对你添加的任何状态变更端点的 CSRF 防护、密码哈希和审计日志——而该示例并未提供其中任何一项。
- **在服务端验证上传的内容**。`ui.upload()` 元素只在浏览器中强制执行 `max_file_size`、`max_total_size` 和 `max_files` 限制。如果你的 `on_upload` 处理函数会写入磁盘或处理文件，也要在服务端验证大小和类型。
- **将重载模式（`reload=True`）视为仅供开发使用**。自动重载会监视工作目录并重新导入发生变化的文件。这在本地很方便，但不适合生产环境。

示例是起点，而不是成品。你发布的任何东西都由你自己负责维护。

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
4. 仅对你控制的受信任内容禁用清理功能
5. 应用纵深防御（iframe 阻止头、输入验证）
6. 保持 NiceGUI 为最新版本
