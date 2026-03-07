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

## 自动完成

`autocomplete` 功能可在您输入时提供建议，使输入更轻松、更快捷。参数 `options` 是一个字符串列表，包含将显示的可用选项。

```python:line-numbers
from nicegui import ui

options = ['自动完成', 'NiceGUI', 'Python']
ui.input(label='Text', placeholder='开始输入', autocomplete=options)

ui.run()
```

## 可清除

来自 [Quasar](https://quasar.dev/) 的 `clearable` 属性会在输入框中添加一个用于清除文本的按钮。

```python:line-numbers
from nicegui import ui

i = ui.input(value='一些文本').props('clearable')
ui.label().bind_text_from(i, 'value')

ui.run()
```

## 样式定制

Quasar 提供了大量的 [属性来改变外观](https://quasar.dev/vue-components/input)。甚至可以使用 `input-style` 和 `input-class` 属性来为底层输入框添加样式，并使用提供的插槽来添加自定义元素。

```python:line-numbers
from nicegui import ui

ui.input(placeholder='开始输入').props('rounded outlined dense')
ui.input('样式', value='一些文本') \
    .props('input-style="color: blue" input-class="font-mono"')
with ui.input(value='自定义清除按钮').classes('w-64') as i:
    ui.button(color='orange-8', on_click=lambda: i.set_value(None), icon='delete') \
        .props('flat dense').bind_visibility_from(i, 'value')

ui.run()
```

## 输入验证

您可以通过两种方式验证输入：

- 传递一个返回错误信息或 `None` 的可调用对象，或者
- 传递一个字典，将错误信息映射到返回 `True`（表示输入有效）的可调用对象。

可调用验证函数也可以是异步协程。在这种情况下，验证将在后台异步执行。<Badge type="tip" text="^2.7.0" />

您可以使用 input 元素的 `validate` 方法手动触发验证。如果输入有效，它返回 `True`，否则返回错误信息。对于异步验证函数，必须通过设置 `return_result=False` 显式禁用返回值。

```python:line-numbers
from nicegui import ui

ui.input('姓名', validation=lambda value: '太短了' if len(value) < 5 else None)
ui.input('姓名', validation={'太短了': lambda value: len(value) >= 5})

ui.run()
```

## 前缀与后缀

您可以为 NiceGUI 的输入框添加一些前后缀。具体可参考 [前缀与后缀 - Quasar](https://quasar.dev/vue-components/input#prefix-and-suffix)

- **前缀**: 使用 `prefix`
- **后缀**: 使用 `suffix`

比如您有一个网站，需要用户填写邮箱，但限定了只能用 QQ 邮箱。那么此时您可以使用 `.props('suffix="@qq.com"')` 即可。

```python:line-numbers
from nicegui import ui

async def get_email():
    # 在这里需要把这个验证补回来
    return email.value + "@qq.com"

email = ui.input('QQ邮箱').props('suffix="@qq.com"')

ui.run()
```