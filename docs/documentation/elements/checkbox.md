# 复选框 Checkbox

基于 Quasar 的 [QCheckBox](https://quasar.dev/vue-components/checkbox) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 显示在复选框边上的文字 |
| value      | 是否默认被选中 (默认值: `False`) |
| on_change  | 当选中项改变时的回调函数 |

```python:line-numbers
from nicegui import ui

checkbox = ui.checkbox('check me')
ui.label('Check!').bind_visibility_from(checkbox, 'value')

ui.run()
```