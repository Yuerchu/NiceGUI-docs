# 多行文本输入 Textarea

此元素基于 Quasar 的 [QInput](https://quasar.dev/vue-components/input) 组件，与 [单行文本输入 Text Input](#单行文本输入-text-input) 相比，它被设计为可以进行多行输入。

可通过 validation 参数定义验证规则字典，当输入内容与验证过程不一致则触发验证失败。例如我们需要保证内容长度小于3，则可以用 `{'内容过长！': lambda value: len(value) < 3}` 进行验证。如果有多个验证规则则将首个验证失败的规则键作为错误信息显示。您也可传递返回可选错误信息的可调用对象。若要禁用每次值变更时的自动验证，可使用 `without_auto_validation` 方法。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | 输入框的标题     |
| placeholder | 当输入框为空时显示的文字提示 |
| value      | 输入框的初始值   |
| on_change  | 当输入框的内容被改变时的回调函数 |
| validation | 验证规则字典或返回错误信息的可调用对象 (默认值: `None`，代表不验证) |

```python:line-numbers
from nicegui import ui

ui.textarea(label='Text', placeholder='开始输入',
            on_change=lambda e: result.set_text('您输入了: ' + e.value))
result = ui.label()

ui.run()
```

## 可清除

来自 [Quasar](https://quasar.dev/) 的 `clearable` 属性会在文本域中添加一个用于清除文本的按钮。

```python:line-numbers
from nicegui import ui

i = ui.textarea(value='一些文本').props('clearable')
ui.label().bind_text_from(i, 'value')

ui.run()
```