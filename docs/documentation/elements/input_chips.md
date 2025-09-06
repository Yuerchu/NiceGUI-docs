# 芯片输入器 Input Chips <Badge type="tip" text="^2.22.0" />

一个以可视化“芯片”或标签形式管理值集合的输入字段。用户可通过键入添加新芯片，或通过点击或键盘快捷键移除现有项。

该组件基于 Quasar 的 [QSelect](https://quasar.dev/vue-components/select) 组件。与传统下拉选择不同，此变体专注于支持自由文本输入的芯片功能，非常适合用于标签、关键词或任何用户自定义值的列表。

您可通过 `validation` 参数定义验证规则字典，例如 `{'过长！': lambda value: len(value) < 3}`。首个验证失败的规则键名将作为错误信息显示。您也可以传递一个返回可选错误信息的可调用对象。若要禁用每次值变更时的自动验证，可使用 `without_auto_validation` 方法。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| label      | 选择框上方显示的标签文本 |
| value      | 初始选中的值 |
| on_change  | 当选择发生变化时执行的回调函数 |
| new_value_mode | 处理用户输入新值的方式 (默认值: `"toggle"`) |
| clearable  | 是否显示清除选择的按钮 |
| validation | 验证规则字典或返回错误信息的可调用对象 (默认值: `None`表示不验证) |

```python:line-numbers
from nicegui import ui

ui.input_chips('My favorite chips', value=['Pringles', 'Doritos', "Lay's"])

ui.run()
```