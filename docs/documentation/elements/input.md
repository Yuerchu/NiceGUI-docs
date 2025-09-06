# 单行文本输入 Text Input

此元素基于 Quasar 的 [QInput](https://quasar.dev/vue-components/input) 组件。

每次按键都会响应 `on_change` 事件，并让相应的值更新。如果您希望等待到用户确认输入，那么您可以注册一个自定义事件回调，比如 `ui.input(...).on('keydown.enter', ...)` 或 `ui.input(...).on('blur', ...)`。

可通过 validation 参数定义验证规则字典，当输入内容与验证过程不一致则触发验证失败。例如我们需要保证内容长度小于3，则可以用 `{'内容过长！': lambda value: len(value) < 3}` 进行验证。如果有多个验证规则则将首个验证失败的规则键作为错误信息显示。您也可传递返回可选错误信息的可调用对象。若要禁用每次值变更时的自动验证，可使用 `without_auto_validation` 方法。

关于输入框样式的说明：Quasar 的 `QInput` 组件是对原生 `<input>` 元素的封装。这意味着您无法直接对输入框进行样式设置，但可以通过 `input-class` 和 `input-style` 属性来为原生 input 元素添加样式。更多详情请参阅 [`QInput`](https://quasar.dev/vue-components/input) 文档中的 Style 属性部分。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | 输入框的标题     |
| placeholder | 当输入框为空时显示的文字提示 |
| value      | 输入框的初始值   |
| password   | 是否需要隐藏输入内容 (默认值: `False`) |
| password_toggle_button | 是否需要显示一个用于切换输入内容显示和隐藏的按钮 (默认值: `False`) |
| on_change  | 当输入框的内容被改变时的回调函数 |
| autocomplete | 可选，一个用于自动完成的列表 |
| validation | 验证规则字典或返回错误信息的可调用对象 (默认值: `None`，代表不验证) |

```python:line-numbers
from nicegui import ui

ui.input(label='Text', placeholder='开始输入',
         on_change=lambda e: result.set_text('您输入了: ' + e.value),
         validation={'太长了!': lambda value: len(value) < 20})
result = ui.label()

ui.run()
```