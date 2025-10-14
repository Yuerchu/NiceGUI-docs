# 颜色选择器 Color Picker

此元素基于 Quasar 的 [QMenu](https://quasar.dev/vue-components/menu) 和 [QColor](https://quasar.dev/vue-components/color-picker) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| on_pick    | 当选择了一个色号执行的回调函数 |
| value      | 选择器是否打开 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

with ui.button(icon='colorize') as button:
    ui.color_picker(on_pick=lambda e: button.classes(f'!bg-[{e.color}]'))

ui.run()
```

## 自定义颜色选择器

您可以通过 props、classes 和 style 属性自定义颜色选择器。由于 QColor 组件嵌套在菜单内部，您不能直接使用 `props` 方法，而要通过 `q_color` 属性访问。

```python:line-numbers
from nicegui import ui

with ui.button(icon='palette'):
    picker = ui.color_picker(on_pick=lambda e: ui.notify(f'您选择了 {e.color}'))
    picker.q_color.props('default-view=palette no-header no-footer')

ui.run()
```
