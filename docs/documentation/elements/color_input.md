# 颜色输入器 Color Input

此元素基于 Quasar 的 [QInput](https://quasar.dev/vue-components/input) 组件，但添加了一个颜色选择作为扩展。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | RGB 色号输入框的标题 |
| placeholder | 当输入框为空时显示的文字提示 |
| value      | 输入框的初始值   |
| on_change  | 当输入框中的色号被改变时的回调函数 |
| preview    | 将选择的颜色应用到按钮背景 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

label = ui.label('选一个颜色吧！')
ui.color_input(label='Color', value='#000000',
               on_change=lambda e: label.style(f'color:{e.value}'))

ui.run()
```