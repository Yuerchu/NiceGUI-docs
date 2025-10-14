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

## 注入任意内容

借助 [`ui.teleport` 元素](teleport)，您可以为单选按钮选项使用任意内容。

```python:line-numbers
from nicegui import ui

options = ['star', 'good', 'love']
radio = ui.radio({x: '' for x in options}, value='star').props('inline')
with ui.teleport(f'#{radio.html_id} > div:nth-child(1) .q-radio__label'):
    ui.icon('star', size='md')
with ui.teleport(f'#{radio.html_id} > div:nth-child(2) .q-radio__label'):
    ui.icon('thumb_up', size='md')
with ui.teleport(f'#{radio.html_id} > div:nth-child(3) .q-radio__label'):
    ui.icon('favorite', size='md')
ui.label().bind_text_from(radio, 'value')

ui.run()
```