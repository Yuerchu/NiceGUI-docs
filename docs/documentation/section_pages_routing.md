# 页面与路由

## 页面 Page

此装饰器用于标记一个函数作为页面构建器。每个访问给定路由的用户将看到该页面的一个新实例。这意味着该页面是用户私有的，不会与他人共享（与将元素放置在页面装饰器外部时的处理方式不同）。

::: warning 注意事项
- NiceGUI 不使用被装饰函数的名称，可以任意命名。
- 页面路由由路径参数决定，并在全局范围内注册。
- 该装饰器仅适用于自由函数和静态方法。实例方法或初始化器需要 self 参数，路由器无法关联此类参数。请参阅我们的[模块化示例]()以了解代码结构策略。
:::

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| path       | 页面的路由路径 (必须以'/'开头) |
| title      | 可选的页面标题 |
| viewport   | 可选的 viewport meta 标签内容 |
| favicon    | 可选的 favicon 相对路径或绝对 URL (默认值: `None`, 将使用 `ui.run` 的 favicon 参数，译者修复) |
| dark       | 是否使用 Quasar 的深色模式 (默认跟随 `ui.run` 命令的 dark 参数) |
| language   | 页面语言 (默认跟随 `ui.run` 命令的 language 参数) |
| response_timeout | 装饰函数构建页面的最长时间 (默认值: `3.0`秒) |
| reconnect_timeout | 服务器等待浏览器重新连接的最长时间 (默认跟随 `ui.run` 命令的 reconnect_timeout 参数) |
| api_router | 要使用的 APIRouter 实例，None 表示使用默认值 |
| kwargs     | 传递给 FastAPI 的 `@app.get` 方法的额外关键字参数 |

```python:line-numbers
from nicegui import ui

@ui.page('/other_page')
def other_page():
    ui.label('Welcome to the other side')

@ui.page('/dark_page', dark=True)
def dark_page():
    ui.label('Welcome to the dark side')

ui.link('Visit other page', other_page)
ui.link('Visit dark page', dark_page)

ui.run()
```

## 自动导航的页面 Auto-index page

使用 `@ui.page` 装饰器创建的页面是“私有”的。它们的内容会为每个客户端重新生成。因此，在下面的代码生成的页面中，私有页面上显示的 ID 会在浏览器重新加载页面时发生变化。

未被包裹在装饰页面函数中的UI元素会被放置在路由 `/` 处的自动生成索引页上。这个自动索引页在启动时创建一次，并在所有可能连接的客户端之间共享。因此，每个连接的客户端都会看到相同的元素。在右侧的演示中，自动索引页上显示的 ID 在浏览器重新加载页面时保持不变。

```python:line-numbers
from nicegui import ui
from uuid import uuid4

@ui.page('/private_page')
async def private_page():
    ui.label(f'private page with ID {uuid4()}')

ui.label(f'shared auto-index page with ID {uuid4()}')
ui.link('private page', private_page)

ui.run()
```

## 页面布局 Page Layout

通过 `ui.header`、`ui.footer`、`ui.left_drawer` 和 `ui.right_drawer`，您可以为页面添加额外的布局元素。fixed 参数控制元素是随页面滚动还是固定在屏幕上。 `top_corner` 和 `bottom_corner` 参数决定抽屉应从页面顶部还是底部展开。有关可用属性的更多信息，请参阅 https://quasar.dev/layout/header-and-footer 和 https://quasar.dev/layout/drawer 。使用 `ui.page_sticky` 可以将元素"粘性"固定在屏幕上。更多详情请见 https://quasar.dev/layout/page-sticky 。

```python:line-numbers
from nicegui import ui

@ui.page('/page_layout')
def page_layout():
    ui.label('CONTENT')
    [ui.label(f'Line {i}') for i in range(100)]
    with ui.header(elevated=True).style('background-color: #3874c8').classes('items-center justify-between'):
        ui.label('HEADER')
        ui.button(on_click=lambda: right_drawer.toggle(), icon='menu').props('flat color=white')
    with ui.left_drawer(top_corner=True, bottom_corner=True).style('background-color: #d7e3f4'):
        ui.label('LEFT DRAWER')
    with ui.right_drawer(fixed=False).style('background-color: #ebf1fa').props('bordered') as right_drawer:
        ui.label('RIGHT DRAWER')
    with ui.footer().style('background-color: #3874c8'):
        ui.label('FOOTER')

ui.link('show page with fancy layout', page_layout)

ui.run()
```

## 子页面 Sub Pages

子页面通过基于 URL 的导航实现不同视图间的切换，便于轻松构建单页应用（SPA）。`ui.sub_pages` 元素本身作为当前活动子页面的容器，您只需为每个视图构建函数提供路由配置。NiceGUI 会在 URL 变更时自动替换内容，无需触发整页重载。

::: warning 注意
这是一个实验性的特性。相关内容会随着更新而改动。
:::

```python:line-numbers
from nicegui import ui
from uuid import uuid4

@ui.page('/')
@ui.page('/{_:path}')  # NOTE: our page should catch all paths
def index():
    ui.label(f'This ID {str(uuid4())[:6]} changes only on reload.')
    ui.separator()
    ui.sub_pages({'/': main, '/other': other})

def main():
    ui.label('Main page content')
    ui.link('Go to other page', '/other')

def other():
    ui.label('Another page content')
    ui.link('Go to main page', '/')

ui.run()
```

## 参数注入 Parameter Injection

得益于 FastAPI，页面函数可接受可选参数，用于提供路径参数、查询参数或整个传入请求，以便访问请求体内容、头部信息、cookies 等。

```python:line-numbers
from nicegui import ui

@ui.page('/icon/{icon}')
def icons(icon: str, amount: int = 1):
    ui.label(icon).classes('text-h3')
    with ui.row():
        [ui.icon(icon).classes('text-h3') for _ in range(amount)]
ui.link('Star', '/icon/star?amount=5')
ui.link('Home', '/icon/home')
ui.link('Water', '/icon/water_drop?amount=3')

ui.run()
```

## 页面标题 Page title

设置当前客户端的页面标题。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| title      | 页面标题         |

## 导航功能 Navigation functions <Badge type="tip" text="^2.0.0" />

这些功能允许您在浏览器历史记录中导航以及跳转至外部 URL 。

```python:line-numbers
from nicegui import ui

with ui.row():
    ui.button('后退', on_click=ui.navigate.back)
    ui.button('前进', on_click=ui.navigate.forward)
    ui.button('刷新', on_click=ui.navigate.reload)
    ui.button(icon='savings',
              on_click=lambda: ui.navigate.to('https://github.com/sponsors/zauberzeug')) # 跳转到 NiceGUI 团队 Zauberzeug 赞助页

ui.run()
```

## ui.open

此方法已过时。我们推荐使用 [ui.navigate.to](#导航功能-navigation-functions) 方法。

## 下载函数 Download functions <Badge type="tip" text="^2.14.0" />

此函数将允许您将文件、URLs 或者 raw 数据下载到客户端中。

```python:line-numbers
from nicegui import ui

ui.button('Local file', on_click=lambda: ui.download.file('main.py'))
ui.button('From URL', on_click=lambda: ui.download.from_url('/logo.png'))
ui.button('Content', on_click=lambda: ui.download.content('Hello World', 'hello.txt'))

ui.run()
```

## 添加文件（夹）为静态文件

`add_static_files()` 可将本地目录映射到指定端点（如 `/static` ），便于向前端提供图片等本地数据。否则浏览器将无法访问这些文件。

::: danger 警告
请仅存放非敏感文件，因为所有人都能访问它们。

比如你用 NiceGUI 写了个网盘，你把一些学习资料传到了存储桶中，但直接把存储桶通过此方法挂载。除非你想把学习资料分享给大家一起看，不然还是别用这个方法了，因为这样谁都可以轻松拿到你的学习资料。译者注
:::

若需开放单个文件，可使用 `add_static_file()`。对于需要流式传输的媒体文件，则应改用 `add_media_files()` 或 `add_media_file()`。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| url_path   | 以斜杠"/"开头的字符串，标识静态文件的访问路径 |
| local_directory | 作为静态内容提供的本地文件夹路径 |
| follow_symlink | 是否跟随符号链接 (默认值: `False`) |
| max_cache_age | Cache-Control头中max-age的缓存时间设置 <Badge type="tip" text="^2.8.0" /> |

```python:line-numbers
from nicegui import app, ui

app.add_static_files('/examples', 'examples')
ui.label('Some NiceGUI Examples').classes('text-h5')
ui.link('AI interface', '/examples/ai_interface/main.py')
ui.link('Custom FastAPI app', '/examples/fastapi/main.py')
ui.link('Authentication', '/examples/authentication/main.py')

ui.run()
```

## 添加目录为媒体文件

`add_media_files()` 允许从指定端点（如`/media`）流式传输本地文件，此功能专为媒体文件设计以支持正确的流式传输。否则浏览器将无法逐步访问和加载文件或在流中跳转到不同位置。

::: danger 警告
请仅存放非敏感文件，因为所有人都能访问它们。

比如你用 NiceGUI 写了个网盘，你把一些学习资料传到了存储桶中，但直接把存储桶通过此方法挂载。除非你想把学习资料分享给大家一起看，不然还是别用这个方法了，因为这样谁都可以轻松拿到你的学习资料。译者注
:::

若要通过流式传输使单个文件可访问，可使用 `add_media_file()`。对于小型静态文件，建议改用 `add_static_files()` 或 `add_static_file()`。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| url_path   | 以斜杠 `/` 开头的字符串，指定媒体文件的访问路径 |
| local_directory | 存放媒体文件的本地文件夹路径 |

```python:line-numbers
import httpx
from nicegui import app, ui
from pathlib import Path

media = Path('media')
media.mkdir(exist_ok=True)
r = httpx.get('https://cdn.coverr.co/videos/coverr-cloudy-sky-2765/1080p.mp4')
(media  / 'clouds.mp4').write_bytes(r.content)
app.add_media_files('/my_videos', media)
ui.video('/my_videos/clouds.mp4')

ui.run()
```

## 添加 HTML 到页面

你可以通过调用 `ui.add_head_html` 或 `ui.add_body_html` 来向页面添加HTML。这对于添加自定义CSS样式或JavaScript代码非常有用。

```python:line-numbers
from nicegui import ui

ui.add_head_html('''
    <style>
        .my-red-label {
            color: Crimson;
            font-weight: bold;
        }
    </style>
''')
ui.label('RED').classes('my-red-label')

ui.run()
```

## API 响应

NiceGUI 基于 FastAPI 构建，这意味着你可以使用 FastAPI 的所有功能。例如，除了图形用户界面外，你还可以实现 RESTful API 。只需从 nicegui 导入 app 对象即可。或者，你可以通过使用 ui.run_with(app) 而非自动启动服务器的 ui.run()，将 NiceGUI 运行在你自己的 FastAPI 应用之上。

在页面函数中，你也可以返回任何其他 FastAPI 的响应对象。例如，当满足特定条件时，可以返回 RedirectResponse 将用户重定向到另一个页面。这一功能在我们的[单点登录演示](https://github.com/zauberzeug/nicegui/tree/main/examples/authentication/main.py)中得到了应用。（不过译者不建议用 NiceGUI 页面写过于敏感的内容，尤其是涉及隐私和金融这块，可能会造成重大损失。参见译者发起的[关于安全性的讨论](https://github.com/zauberzeug/nicegui/discussions/4386)，相信读者您会有更好的解决方案。）

```python:line-numbers
import random
from nicegui import app, ui

@app.get('/random/{max}')
def generate_random_number(max: int):
    return {'min': 0, 'max': max, 'value': random.randint(0, max)}

max = ui.number('max', value=100)
ui.button('generate random number',
          on_click=lambda: ui.navigate.to(f'/random/{max.value:.0f}'))

ui.run()
```