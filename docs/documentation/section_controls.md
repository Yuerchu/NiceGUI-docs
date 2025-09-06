# 控制元素

## 按钮 `Button`

<!--@include: ./elements/button.md{3,29}-->

[查看更多...](./elements/button)

## 按钮组 `Button Group`

<!--@include: ./elements/button_group.md{3,18}-->

[查看更多...](./elements/button_group)

## 下拉按钮 `Dropdown Button`

<!--@include: ./elements/button_dropdown.md{3,23}-->

[查看更多...](./elements/button_dropdown)

## 浮动按钮（FAB）<Badge type="tip" text="^2.22.0" />

<!--@include: ./elements/fab.md{3,22}-->

## 标签 `Badge`

<!--@include: ./elements/badge.md{3,19}-->

[查看更多...](./elements/badge)

## 小标签 Chip

<!--@include: ./elements/chip.md{3,29}-->

[查看更多...](./elements/chip)

## 切换器 Toggle

<!--@include: ./elements/toggle.md{3,21}-->

[查看更多...](./elements/toggle)

## 单项选择器 Radio Selection

<!--@include: ./elements/radio.md{3,20}-->

[查看更多...](./elements/radio)

## 下拉选择器 Dropdown Selection

<!--@include: ./elements/select.md{3,33}-->

[查看更多...](./elements/select)

## 芯片输入器 Input Chips <Badge type="tip" text="^2.22.0" />

<!--@include: ./elements/input_chips.md{3,24}-->

[查看更多...](./elements/input_chips)

## 复选框 Checkbox

<!--@include: ./elements/checkbox.md{3,18}-->

[查看更多...](./elements/checkbox)

## 开关 Switch

<!--@include: ./elements/switch.md{3,18}-->

[查看更多...](./elements/switch)

## 滑块 Slider

<!--@include: ./elements/slider.md{3,20}-->

[查看更多...](./elements/slider)

## 范围选择器 Range

<!--@include: ./elements/range.md{3,21}-->

[查看更多...](./elements/range)

## 评分组件 Rating <Badge type="tip" text="^2.12.0" />

<!--@include: ./elements/rating.md{3,22}-->

[查看更多...](./elements/rating)

## 虚拟摇杆 Joystick

<!--@include: ./elements/joystick.md{3,50}-->

[查看更多...](./elements/joystick)

## 单行文本输入 Text Input

<!--@include: ./elements/input.md{3,31}-->

[查看更多...](./elements/input)

## 多行文本输入 Textarea

<!--@include: ./elements/textarea.md{3,23}-->

[查看更多...](./elements/textarea)

## 代码编辑器 CodeMirror

<!--@include: ./elements/codemirror.md{3,283}-->

[查看更多...](./elements/codemirror)

## 数字输入器 Number Input

<!--@include: ./elements/number.md{3,30}-->

[查看更多...](./elements/number)

## 旋钮 Knob

<!--@include: ./elements/knob.md{3,27}-->

[查看更多...](./elements/knob)

## 颜色输入器 Color Input

<!--@include: ./elements/color_input.md{3,21}-->

[查看更多...](./elements/color_input)

## 颜色选择器 Color Picker

此元素基于 Quasar 的 [QMenu](https://quasar.dev/vue-components/menu) 和 [QColor](https://quasar.dev/vue-components/color-picker) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| on_pick    | 当选择了一个色号执行的回调函数 |
| value      | 选择器是否打开 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

with ui.button(icon='colorize') as button:
    ui.color_picker(on_pick=lambda e: button.classes(f'!bg-[{e.color}]'))

ui.run()
```

## 日期选择器 Date Input

此元素基于 Quasar 的 [QDate](https://quasar.dev/vue-components/date) 组件。日期是以 `mask` 参数定义的格式字符串。

您还可以使用 `range` 或 `multiple` 属性来选择日期范围或多个日期。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始日期         |
| mask       | 日期的格式 (默认值: `'YYYY-MM-DD'`) |
| on_change  | 当选择了一个日期执行的回调函数 |

```python:line-numbers
from nicegui import ui

# 选择一个日期范围
ui.date({'from': '2023-01-01', 'to': '2023-01-05'}, on_change=lambda e: result_1.set_text(e.value)).props('range')

# 选择多个日期
ui.date(['2023-01-01', '2023-01-02', '2023-01-03'], on_change=lambda e: result_2.set_text(e.value)).props('multiple')

# 既要选择日期范围又要选择多个日期
ui.date([{'from': '2023-01-01', 'to': '2023-01-05'}, '2023-01-07'], on_change=lambda e: result_3.set_text(e.value)).props('multiple range')

result_1 = ui.label()
result_2 = ui.label()
result_3 = ui.label()

ui.run()
```

## 时间选择器 Time Input

此元素基于 Quasar 的 [QTime](https://quasar.dev/vue-components/time) 组件。时间是以 `mask` 参数定义的格式字符串。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| value      | 初始时间         |
| mask       | 时间的格式 (默认值: `'HH:mm'`) |
| on_change  | 当选择了一个时间执行的回调函数 |

```python:line-numbers
from nicegui import ui

ui.time(value='12:00', on_change=lambda e: result.set_text(e.value))
result = ui.label()

ui.run()
```

## 文件上传 File Upload

此元素基于 Quasar 的 [QUploader](https://quasar.dev/vue-components/uploader) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| multiple | 是否允许一次性上传多个文件 (默认值: `False`) |
| max_file_size | 单个文件的最大大小 (单位: 字节) (默认值: `0`) |
| max_total_size | 所有文件总大小的上限 (单位: 字节) (默认值: `0`) |
| max_files | 最大文件数量限制 (默认值: `0`) |
| on_upload | 每个文件上传完成后执行的回调函数 |
| on_multi_upload | 多个文件全部上传完成后执行的回调函数 |
| on_rejected | 每个被拒绝的文件执行的回调函数 |
| label | 上传组件的标签文字 (默认值: `''`) |
| auto_upload | 选择文件后自动上传 (默认值: `False`) |

```python:line-numbers
from nicegui import ui

ui.upload(on_upload=lambda e: ui.notify(f'已上传 {e.name}')).classes('max-w-full')

ui.run()
```