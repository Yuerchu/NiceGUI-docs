---
title: 动作与事件
prev:
  text: '造型与外观'
  link: '/documentation/section_styling_appearance'
next:
  text: '页面与路由'
  link: '/documentation/section_pages_routing'
---

# 动作与事件

## 定时刷新时钟 {#Timer}

使用 NiceGUI 的朋友应该都需要用一种简单的方法来定期更新界面，例如展示带有传入测量数据的图表。定时器会以给定的间隔重复执行回调函数。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| interval   | 定时器触发间隔 (运行时可以修改) |
| callback   | 间隔到期时执行的函数或协程 |
| active     | 是否执行回调 (运行时可以修改) |
| once       | 是否仅在指定间隔后执行一次 (默认值: `False`) |
| immediate  | 是否立即执行回调 (默认值: `True`, 当 `once` 为 `True` 时忽略) <Badge type="tip" text="^2.9.0" /> |

```python:line-numbers
from datetime import datetime
from nicegui import ui

label = ui.label()
ui.timer(1.0, lambda: label.set_text(f'{datetime.now():%X}'))

ui.run()
```

## 键盘事件 Keboard

添加全局键盘事件跟踪功能。

`on_key` 回调函数接收一个包含以下属性的 `KeyEventArguments` 对象：

- sender: 键盘元素  
- client: 客户端对象  
- action: 包含以下属性的 `KeyboardAction` 对象：  
    - keydown: 按键是否被按下  
    - keyup: 按键是否被释放  
    - repeat: 是否为重复按键事件  
- key: 包含以下属性的 `KeyboardKey` 对象：  
    - name: 键名（如 "a"、"Enter"、"ArrowLeft"；可取值列表[参见此处](https://developer.mozilla.org/zh-CN/docs/Web/API/UI_Events/Keyboard_event_key_values)）  
    - code: 键码（如 "KeyA"、"Enter"、"ArrowLeft"）  
    - location: 键位位置（ 0 表示标准键，1 表示左侧键，2 表示右侧键，3 表示数字小键盘键）  
- modifiers: 包含以下属性的 `KeyboardModifiers` 对象：  
    - alt: Alt 键是否被按下  
    - ctrl: Ctrl 键是否被按下  
    - meta: Meta 键是否被按下  
    - shift: Shift 键是否被按下  

为方便起见，`KeyboardKey` 对象还具有以下属性：  
- is_cursorkey: 是否为方向键  
- number: 数字键的整数值（0-9，非数字键为None）  
- backspace, tab, enter, shift, control, alt, pause, caps_lock, escape, space, page_up, page_down, end, home, arrow_left, arrow_up, arrow_right, arrow_down, print_screen, insert, delete, meta, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12: 是否为对应按键

```python:line-numbers
from nicegui import ui
from nicegui.events import KeyEventArguments

def handle_key(e: KeyEventArguments):
    if e.key == 'f' and not e.action.repeat:
        if e.action.keyup:
            ui.notify('f was just released')
        elif e.action.keydown:
            ui.notify('f was just pressed')
    if e.modifiers.shift and e.action.keydown:
        if e.key.arrow_left:
            ui.notify('going left')
        elif e.key.arrow_right:
            ui.notify('going right')
        elif e.key.arrow_up:
            ui.notify('going up')
        elif e.key.arrow_down:
            ui.notify('going down')

keyboard = ui.keyboard(on_key=handle_key)
ui.label('Key events can be caught globally by using the keyboard element.')
ui.checkbox('Track key events').bind_value_to(keyboard, 'active')

ui.run()
```

## UI 更新

NiceGUI 会尝试自动同步UI元素的状态与客户端，例如当标签文本、输入值或元素的 `style/classes/props` 发生变化时。在其他情况下，你可以显式调用 `element.update()` 或 `ui.update(*elements)` 来进行更新。演示代码展示了这两种方法在 `ui.echart` 中的应用，因为其选项字典中的变化难以被自动检测到。

```python:line-numbers
from nicegui import ui
from random import random

chart = ui.echart({
    'xAxis': {'type': 'value'},
    'yAxis': {'type': 'value'},
    'series': [{'type': 'line', 'data': [[0, 0], [1, 1]]}],
})

def add():
    chart.options['series'][0]['data'].append([random(), random()])
    chart.update()

def clear():
    chart.options['series'][0]['data'].clear()
    ui.update(chart)

with ui.row():
    ui.button('Add', on_click=add)
    ui.button('Clear', on_click=clear)

ui.run()
```

## 可刷新的 UI 功能

`@ui.refreshable` 装饰器允许你创建带有刷新方法的函数。该方法会自动删除该函数创建的所有元素并重新生成它们。

对于类中可刷新方法的装饰，有一个 `@ui.refreshable_method` 装饰器，功能相同但能避免静态类型检查错误。

```python:line-numbers
import random
from nicegui import ui

numbers = []

@ui.refreshable
def number_ui() -> None:
    ui.label(', '.join(str(n) for n in sorted(numbers)))

def add_number() -> None:
    numbers.append(random.randint(0, 100))
    number_ui.refresh()

number_ui()
ui.button('Add random number', on_click=add_number)

ui.run()
```

## 异步事件钩子

大多数元素还支持异步事件处理。

:::tip 提示
你也可以将 `functools.partial` 传入 `on_click` 属性，以包装带参数的异步函数。
:::

```python:line-numbers
import asyncio
from nicegui import ui

async def async_task():
    ui.notify('Asynchronous task started')
    await asyncio.sleep(5)
    ui.notify('Asynchronous task finished')

ui.button('start async task', on_click=async_task)

ui.run()
```

## 通用事件

大多数 UI 元素都预定义了事件。例如，演示中像 A 这样的 `ui.button` 有一个 `on_click` 参数，它需要一个协程或函数。但你也可以使用 `on` 方法来注册一个通用的事件处理器，如 B 所示。这允许你为 JavaScript 和 Quasar 支持的任何事件注册处理器。

例如，你可以为 `mousemove` 事件注册一个处理器，如 C 所示，尽管 `ui.button` 没有 `on_mousemove` 参数。像 `mousemove` 这样的事件会频繁触发。为了避免性能问题，你可以像 D 那样使用 `throttle` 参数来限制处理器每 `throttle` 秒才被调用一次。

通用事件处理器可以是同步的或异步的，并可选择性地接收 `GenericEventArguments` 作为参数（如 E）。你还可以指定应将 JavaScript 或 Quasar 事件的哪些属性传递给处理器（如 F）。这可以减少服务器和客户端之间需要传输的数据量。

以下链接提供了更多关于支持的事件的信息：

- [HTML 元素#事件](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#events)
- [用于基于Quasar的元素（参见单个组件页面上的“Events”标签）](https://quasar.dev/vue-components)

```python:line-numbers
from nicegui import ui

with ui.row():
    ui.button('A', on_click=lambda: ui.notify('You clicked the button A.'))
    ui.button('B').on('click', lambda: ui.notify('You clicked the button B.'))
with ui.row():
    ui.button('C').on('mousemove', lambda: ui.notify('You moved on button C.'))
    ui.button('D').on('mousemove', lambda: ui.notify('You moved on button D.'), throttle=0.5)
with ui.row():
    ui.button('E').on('mousedown', lambda e: ui.notify(e))
    ui.button('F').on('mousedown', lambda e: ui.notify(e), ['ctrlKey', 'shiftKey'])

ui.run()
```

## 执行 CPU 密集型任务

NiceGUI 提供了一个 `cpu_bound` 函数，用于在**独立进程中**运行 CPU 密集型任务。这对于耗时计算非常有用，否则这些计算会阻塞事件循环，导致用户界面无响应。该函数返回一个可等待的 future 对象。

:::tip 提示
此函数需要通过 pickle 将传入函数的完整状态传输到进程中。建议创建自由函数或静态方法，以简单参数形式接收所有数据（即不涉及类或 UI 逻辑）并返回结果，而非将结果写入类属性或全局变量中。
:::

```python:line-numbers
import time
from nicegui import run, ui

def compute_sum(a: float, b: float) -> float:
    time.sleep(1)  # simulate a long-running computation
    return a + b

async def handle_click():
    result = await run.cpu_bound(compute_sum, 1, 2)
    ui.notify(f'Sum is {result}')

ui.button('Compute', on_click=handle_click)

ui.run()
```

## 执行 I/O 密集型任务

NiceGUI 还提供了一个 `io_bound` 函数，用于在单独线程中运行 I/O 密集型任务。这对于耗时较长的 I/O 操作特别有用，否则这些操作会阻塞事件循环并导致界面失去响应。该函数返回一个可等待的 future 对象。

```python:line-numbers
import httpx
from nicegui import run, ui

async def handle_click():
    URL = 'https://httpbin.org/delay/1'
    response = await run.io_bound(httpx.get, URL, timeout=3)
    ui.notify(f'Downloaded {len(response.content)} bytes')

ui.button('Download', on_click=handle_click)

ui.run()
```

## 执行 JavaScript

这个函数能在浏览器中执行 JavaScript 代码（包括但不限于一些定义的函数）。调用此函数前，客户端必须已连接。

您可以通过 ID 访问客户端 Vue 组件或 HTML 元素，请使用 JavaScript 函数 `getElement()` 或 `getHtmlElement()`。<Badge type="tip" text="^2.9.0" />

若该函数被 await 调用，则返回 JavaScript 代码的执行结果；否则直接执行代码且不等待响应。

::: warning 注意
从客户端请求数据的功能仅支持页面函数，不适用于共享的自动索引页面。
:::

```python:line-numbers
from nicegui import ui

@ui.page('/')
def page():
    def alert():
        ui.run_javascript('alert("Hello!")')

    async def get_date():
        time = await ui.run_javascript('Date()')
        ui.notify(f'Browser time: {time}')

    def access_elements():
        ui.run_javascript(f'getHtmlElement({label.id}).innerText += " Hello!"')

    ui.button('fire and forget', on_click=alert)
    ui.button('receive result', on_click=get_date)
    ui.button('access elements', on_click=access_elements)
    label = ui.label()

ui.run()
```

## 读写剪贴板

以下演示展示了如何使用 `ui.clipboard.read()`、`ui.clipboard.write()` 和 `ui.clipboard.read_image()` 与剪贴板进行交互。

由于自动索引页面可被多个浏览器标签页同时访问，该页面不支持读取剪贴板。此功能仅能在通过 `ui.page` 装饰的页面构建函数内实现，如本示例所示。

请注意，您的浏览器可能会请求访问剪贴板的权限，或可能完全不支持此功能。（貌似只能在本地服务器[即Localhost]或者带有 https 的环境中才能使用，译者注）

```python:line-numbers
from nicegui import ui

@ui.page('/')
async def index():
    ui.button('Write Text', on_click=lambda: ui.clipboard.write('Hi!'))

    async def read() -> None:
        ui.notify(await ui.clipboard.read())
    ui.button('Read Text', on_click=read)

    async def read_image() -> None:
        img = await ui.clipboard.read_image()
        if not img:
            ui.notify('You must copy an image to clipboard first.')
        else:
            image.set_source(img)
    ui.button('Read Image', on_click=read_image)
    image = ui.image().classes('w-72')

ui.run()
```

## 事件 Events

NiceGUI 提供了一些异步事件，您可以根据需要来调用。

- `app.on_startup`: 当 NiceGUI 启动或重启后回调
- `app.on_shutdown`: 当 NiceGUI 将要关闭或将要重启时回调
- `app.on_connect`: 当 NiceGUI 连接每个客户端时回调（可选参数: `nicegui.Client`
- `app.on_disconnect`: 当 NiceGUI 断开连接每个客户端时回调（可选参数: `nicegui.Client`
- `app.on_exception`: 当 NiceGUI 发现异常被抛出时回调（可选参数: `exception`

当 NiceGUI 关闭或重启时，所有仍在执行的任务将被自动取消。

```python:line-numbers
from datetime import datetime
from nicegui import app, ui

dt = datetime.now()

def handle_connection():
    global dt
    dt = datetime.now()
app.on_connect(handle_connection)

label = ui.label()
ui.timer(1, lambda: label.set_text(f'Last new connection: {dt:%H:%M:%S}'))

ui.run()
```

## 自定义错误页面 <Badge type="tip" text="^2.20.0" />

你可以使用 `@app.on_page_exception` 来定义一个自定义错误页面。

装饰器包含的函数**必须是一个同步函数**，像普通页面函数一样创建页面。它可以接收异常作为参数，但不是必须的。它会覆盖默认的“悲伤表情”错误页面，除非错误页面的函数中仍抛出了错误。

以下示例展示了如何创建一个仅处理特定异常的自定义错误页面处理器。默认的错误页面处理器仍会用于所有其他异常。

::: warning 注意
在生产环境中显示回溯信息可能不是一个好主意，因为它可能会泄露敏感信息。

（点名 WordPress `该站点遇到了致命错误`，译者注）
:::

```python:line-numbers
import traceback
from nicegui import app, ui

@app.on_page_exception
def timeout_error_page(exception: Exception) -> None:
    if not isinstance(exception, TimeoutError):
        raise exception
    with ui.column().classes('absolute-center items-center gap-8'):
        ui.icon('sym_o_timer', size='xl')
        ui.label(f'{exception}').classes('text-2xl')
        ui.code(traceback.format_exc(chain=False))

@ui.page('/raise_timeout_error')
def raise_timeout_error():
    raise TimeoutError('This took too long')

@ui.page('/raise_runtime_error')
def raise_runtime_error():
    raise RuntimeError('Something is wrong')

ui.link('抛出超时错误 (自定义错误页面)', '/raise_timeout_error')
ui.link('抛出运行时错误 (默认错误页面)', '/raise_runtime_error')

ui.run()
```

你可以在点击下方页面前往 NiceGUI 英语官网查看（这将会离开 NiceGUI 中文网）

- [抛出超时错误 (自定义错误页面)](https://nicegui.io/raise_timeout_error)
- [抛出运行时错误 (默认错误页面)](https://nicegui.io/raise_runtime_error)

## 停止运行 NiceGUI

这将通过代码停止 NiceGUI 服务器的运行。

```python:line-numbers
from nicegui import app, ui

ui.button('shutdown', on_click=app.shutdown)

ui.run(reload=False)
```

## 持久化 Storage

NiceGUI 为应用程序内的数据持久化提供了简洁的机制，内置五种存储类型：

- `app.storage.tab`：存储于服务端内存中，每个独立标签页会话拥有专属字典，可保存任意对象。服务器重启时数据将丢失（直至 [https://github.com/zauberzeug/nicegui/discussions/2841](https://github.com/zauberzeug/nicegui/discussions/2841) 功能实现。该存储仅限页面构建函数内使用，需通过 `await client.connected()` 建立连接后访问。
- `app.storage.client`：同样存储于服务端内存，每个客户端连接拥有独立字典，可保存任意对象。页面刷新或跳转时数据将被清除。与可留存数日的标签页存储不同，此存储适合缓存高耗资源对象（如动态更新所需的流媒体或数据库连接），用户离开页面或关闭浏览器时立即释放。该存储仅限页面构建函数内使用。
- `app.storage.user`：基于服务端存储，通过浏览器会话 cookie 中的唯一标识符关联用户。跨标签页共享，`app.storage.browser['id']` 用于用户识别。需在 `ui.run()` 中配置 storage_secret 参数签署 cookie，仅限页面构建函数内使用。
- `app.storage.general`：服务端存储的共享字典，所有用户均可访问。
- `app.storage.browser`：直接存储为浏览器会话 cookie，同用户的所有标签页共享。需在 `ui.run()` 中配置 storage_secret 参数签署 cookie，仅限页面构建函数内使用。

通常更推荐使用 `app.storage.user`，因其具备数据负载更轻、安全性更高、容量更大的优势。默认情况下，NiceGUI 会在 `app.storage.browser['id']` 中保存会话唯一标识符。

下表将协助您选择合适的存储方案。

| 存储类型      | 客户端(client) | 标签页(tab) | 浏览器(browser) | 用户(user) | 通用(general) |
|---------------|---------|---------|---------|---------|---------|
| 位置          | 服务器  | 服务器  | 浏览器  | 服务器  | 服务器  |
| 跨标签页      | 否      | 否      | 是      | 是      | 是      |
| 跨浏览器      | 否      | 否      | 否      | 否      | 是      |
| 跨服务器重启  | 否      | 是      | 否      | 是      | 是      |
| 跨页面重载    | 否      | 是      | 是      | 是      | 是      |
| 需要页面构建函数 | 是      | 是      | 是      | 是      | 否      |
| 需要客户端连接 | 否      | 是      | 否      | 否      | 否      |
| 仅在响应前写入 | 否      | 否      | 是      | 否      | 否      |
| 需要可序列化数据 | 否      | 否      | 是      | 是      | 是      |
| 需要存储密钥   | 否      | 否      | 是      | 是      | 否      |

```python:line-numbers
from nicegui import app, ui

@ui.page('/')
def index():
    app.storage.user['count'] = app.storage.user.get('count', 0) + 1
    with ui.row():
       ui.label('your own page visits:')
       ui.label().bind_text_from(app.storage.user, 'count')

ui.run(storage_secret='private key to secure the browser session cookie')
```