# 开关 Switch

基于 Quasar 的 [QToggle](https://quasar.dev/vue-components/toggle) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 显示在开关边上的文字 |
| value      | 是否默认被打开 (默认值: `False`) |
| on_change  | 当开启状态改变时的回调函数 |

```python:line-numbers
from nicegui import ui

switch = ui.switch('打开我')
ui.label('您打开了按钮').bind_visibility_from(switch, 'value')

ui.run()
```