# 按钮 `Button`

此元素基于 Quasar 的 [QBtn](https://quasar.dev/vue-components/button) 组件。

color 参数接受 Quasar 颜色、Tailwind 颜色或 CSS 颜色。 如果使用 Quasar 颜色，按钮将根据 Quasar 主题进行样式设置，包括文本颜色。

::: tip 注意
存在像 `red` 这种同时属于 Quasar 颜色和 CSS 颜色的名称。
此类情况下将优先使用 Quasar 颜色。
:::

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 按钮的标签       |
| on_click   | 按钮被点击时的回调函数 |
| color      | 按钮颜色（可以是 Quasar、TailWind 或者 CSS 颜色，或设为 None。 默认值： `'primary'` |
| icon| 显示在按钮上的图标名称 (默认值: `None`) |

```python:line-numbers
from nicegui import ui

ui.button('点我', on_click=lambda: ui.notify('您点了我'))

ui.run()
```

### 图标

您也可以给按钮添加一个图标。

```python:line-numbers
from nicegui import ui

with ui.row():
    ui.button('演示', icon='history')
    ui.button(icon='thumb_up')
    with ui.button():
        ui.label('子元素')
        ui.image('https://picsum.photos/id/377/640/360') \
            .classes('rounded-full w-16 h-16 ml-4')

ui.run()
```

### 等待按钮点击

有时，在继续执行之前等待按钮点击会非常方便。

```python:line-numbers
from nicegui import ui

@ui.page('/')
async def index():
    b = ui.button('下一步')
    await b.clicked()
    ui.label('第一步')
    await b.clicked()
    ui.label('第二步')
    await b.clicked()
    ui.label('第三步')

ui.run()
```

### 使用上下文管理器禁用按钮

这里展示了一个上下文管理器，可用于在异步处理期间禁用按钮。

```python:line-numbers
import httpx
from contextlib import contextmanager
from nicegui import ui

@contextmanager
def disable(button: ui.button):
    button.disable()
    try:
        yield
    finally:
        button.enable()

async def get_slow_response(button: ui.button) -> None:
    with disable(button):
        async with httpx.AsyncClient() as client:
            response = await client.get('https://httpbin.org/delay/1', timeout=5)
            ui.notify(f'响应状态码: {response.status_code}')

ui.button('获取慢响应', on_click=lambda e: get_slow_response(e.sender))

ui.run()
```

### 自定义切换按钮

与所有其他元素一样，您可以实现带有专门逻辑的自定义子类。例如这个带有内部布尔状态的红/绿切换按钮。

```python:line-numbers
from nicegui import ui

class ToggleButton(ui.button):

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._state = False
        self.on('click', self.toggle)

    def toggle(self) -> None:
        """切换按钮状态。"""
        self._state = not self._state
        self.update()

    def update(self) -> None:
        self.props(f'color={"green" if self._state else "red"}')
        super().update()

ToggleButton('切换我')

ui.run()
```

### 浮动操作按钮

正如 [Quasar 文档](https://quasar.dev/vue-components/floating-action-button) 中所述，浮动操作按钮 (FAB) 只是一个内部带有按钮的“页面固定”元素。通过 `fab` 属性，按钮将变为圆形并带有阴影。颜色可以自由选择，但最常用的是强调色。

```python:line-numbers
from nicegui import ui

ui.colors(accent='#6AD4DD')
with ui.page_sticky(x_offset=18, y_offset=18):
    ui.button(icon='home', on_click=lambda: ui.notify('主页')) \
        .props('fab color=accent')

ui.run()
```

### 可展开的浮动操作按钮

要创建一个带有多个操作项的浮动操作按钮 (FAB)，并且这些操作项在点击 FAB 时显示出来，您可以使用 `ui.fab` 和 `ui.fab_action` 元素，它们基于 Quasar 的 [QFab 组件](https://quasar.dev/vue-components/fab)。