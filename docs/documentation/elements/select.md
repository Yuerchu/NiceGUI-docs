# 下拉选择器 Dropdown Selection

基于 Quasar 的 [QSelect](https://quasar.dev/vue-components/select) 组件。

选项可以指定为值列表，或作为将值映射到标签的字典。操作选项后，调用 `update()` 以更新用户界面中的选项。

若 `with_input` 为 `True`，则显示输入框用于筛选选项。

若 `new_value_mode` 不为 `None`，则隐含 `with_input=True`，用户可在输入框中输入新值。详情参见 [Quasar 文档](https://quasar.dev/vue-components/select#the-new-value-mode-prop)。注意，当以编程方式设置 `value` 属性时，此模式无效。

可通过 validation 参数定义验证规则字典，当输入内容与验证过程不一致则触发验证失败。例如我们需要保证内容长度小于3，则可以用 `{'内容过长！': lambda value: len(value) < 3}` 进行验证。如果有多个验证规则则将首个验证失败的规则键作为错误信息显示。您也可传递返回可选错误信息的可调用对象。若要禁用每次值变更时的自动验证，可使用 `without_auto_validation` 方法。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| options    | 一个列表 `['value1', ...]` 或一个字典(值) `{'value1':'label1', ...}` |
| label      | 选择器的标题     |
| value      | 初始选中的的值   |
| on_change  | 当选中项改变时的回调函数 |
| with_input | 是否显示用于筛选选项的输入框 |
| new_value_mode | 是否接受用户输入新的值 (默认值: `None`，代表不接受新值) |
| multiple   | 是否允许多选     |
| clearable  | 是否添加清除选择的按钮 |
| validation | 验证规则字典或返回错误信息的可调用对象 (默认值: `None`，代表不验证) |
| key_generator | 为新增值生成字典键的回调函数或迭代器 |

```python:line-numbers
from nicegui import ui

select1 = ui.select([1, 2, 3], value=1)
select2 = ui.select({1: 'One', 2: 'Two', 3: 'Three'}).bind_value(select1, 'value')

ui.run()
```