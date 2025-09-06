# 旋钮 Knob

此元素基于 Quasar 的 [QKnob](https://quasar.dev/vue-components/knob) 组件。该元素用于通过鼠标/触摸滑动从用户处获取数字输入。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始值 (默认值: `0.0`) |
| min        | 最小值 (默认值: `0.0`) |
| max        | 最大值 (默认值: `1.0`) |
| step       | 步进 (默认值: `0.01`) |
| color      | 轨迹的颜色 (可以使用 Quasar、Tailwind、CSS 颜色或者 None，默认值: `"primary"`) |
| center_color | 组件中心的颜色，比如 `primary` 或 `teal-10` |
| track_color | 轨道的颜色，比如 `primary` 或 `teal-10` |
| size       | CSS单元尺寸，包括单位名称或标准尺寸名称 `xs/sm/md/lg/xl`，例如 `16px` 和 `2rem` |
| show_value | 是否显示旋钮的值 |
| on_change  | 当旋钮的值被改变时的回调函数 |

```python:line-numbers
from nicegui import ui

knob = ui.knob(0.3, show_value=True)

with ui.knob(color='orange', track_color='grey-2').bind_value(knob, 'value'):
    ui.icon('volume_up')

ui.run()
```