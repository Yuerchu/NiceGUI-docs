# 数字输入器 Number Input

此元素基于 Quasar 的 [QInput](https://quasar.dev/vue-components/input) 组件。

可通过 validation 参数定义验证规则字典，当输入内容与验证过程不一致则触发验证失败。例如我们需要保证内容长度小于3，则可以用 `{'太小啦！': lambda value: value > 3}` 进行验证。如果有多个验证规则则将首个验证失败的规则键作为错误信息显示。您也可传递返回可选错误信息的可调用对象。若要禁用每次值变更时的自动验证，可使用 `without_auto_validation` 方法。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | 数字输入框的标题 |
| placeholder | 当输入框为空时显示的文字提示 |
| value      | 输入框的初始值   |
| min        | 允许的最小值     |
| max        | 允许的最大值     |
| precision  | 允许的小数位数（默认: 无限制，负值表示小数点前的位数） |
| step       | 步进按钮的步长   |
| prefix     | 显示值前添加的前缀 |
| suffix     | 显示值后添加的后缀 |
| format | 格式化显示值的字符串，如 `%.2f` |
| on_change  | 当输入框中的内容被改变时的回调函数 |
| validation | 验证规则字典或返回错误信息的可调用对象 (默认值: `None`，代表不验证) |

```python:line-numbers
from nicegui import ui

ui.number(label='Number', value=3.1415927, format='%.2f',
          on_change=lambda e: result.set_text(f'您输入了: {e.value}'))
result = ui.label()

ui.run()
```

## 可清除

来自 [Quasar](https://quasar.dev/) 的 `clearable` 属性会在输入框中添加一个用于清除文本的按钮。

```python:line-numbers
from nicegui import ui

i = ui.number(value=42).props('clearable')
ui.label().bind_text_from(i, 'value')

ui.run()
```

## 小数位数

您可以使用 `precision` 参数指定小数位数。负值表示小数点前的位数。舍入发生在输入失去焦点时、当净化参数（如 min、max 或 precision）更改时，或手动调用 `sanitize()` 时。

```python:line-numbers
from nicegui import ui

n = ui.number(value=3.14159265359, precision=5)
n.sanitize()

ui.run()
```