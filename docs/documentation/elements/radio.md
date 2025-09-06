# 单项选择器 Radio Selection

基于 Quasar 的 [QRadio](https://quasar.dev/vue-components/radio) 组件。

选项可以指定为值列表，或作为将值映射到标签的字典。操作选项后，调用 `update()` 以更新用户界面中的选项。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| options    | 一个列表 `['value1', ...]` 或一个字典(值) `{'value1':'label1', ...}` |
| value      | 初始选中的的值  |
| on_change  | 当选中项改变时的回调函数 |

```python:line-numbers
from nicegui import ui

radio1 = ui.radio([1, 2, 3], value=1).props('inline')
radio2 = ui.radio({1: 'A', 2: 'B', 3: 'C'}).props('inline').bind_value(radio1, 'value')

ui.run()
```