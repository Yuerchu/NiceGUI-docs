# reST 文本 `ReStructuredText`

在页面上渲染 ReStructuredText。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| content    | ReStructuredText 内容 |

```python:line-numbers
from nicegui import ui

ui.restructured_text('这是一段 **reStructuredText**.')

ui.run()
```

这是一段 **reStructuredText**.

### 带缩进的 reStructuredText

您可以对 reStructuredText 元素进行缩进以创建层次结构。每行开头的常见缩进会自动去除，以保留相对缩进，因此您可以对多行字符串进行缩进。

```python:line-numbers
from nicegui import ui

ui.restructured_text('''
    这是一个具有多个缩进级别的 reStructuredText 段落示例。

    您可以使用多个缩进级别来构建内容。
    每个缩进级别代表一个不同的层次。

    - 级别 1
        - 级别 2
            - 级别 3
                - 级别 4
                    - 级别 5
''')

ui.run()
```

### 带代码块的 reStructuredText

您可以使用代码块来展示代码示例。如果指定了语言，代码将会进行语法高亮。请参阅 [Pygments 支持的语言列表](https://pygments.org/languages/) 以获取支持的语言列表。

```python:line-numbers
from nicegui import ui

ui.restructured_text('''
    .. code-block:: python3

        from nicegui import ui

        ui.label('Hello World!')

        ui.run()
''')

ui.run()
```

### reStructuredText 表格

有关 reStructuredText 表格的更多信息，请参阅 [Sphinx 文档](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html#tables)。 [2]

```python:line-numbers
from nicegui import ui

ui.restructured_text('''
    +-------+-------+---------+--------+
    | A     | B     | A and B | A or B |
    +=======+=======+=========+========+
    | False | False | False   | False  |
    +-------+-------+---------+--------+
    | True  | False | False   | True   |
    +-------+-------+---------+--------+
    | False | True  | False   | True   |
    +-------+-------+---------+--------+
    | True  | True  | True    | True   |
    +-------+-------+---------+--------+
''')

ui.run()
```