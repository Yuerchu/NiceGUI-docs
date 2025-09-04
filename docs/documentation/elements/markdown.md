# Markdown 元素 `Markdown Element`

在页面上渲染 Markdown。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| content    | Markdown 内容    |
| extras     | 参考 [Markdown2 extensions](https://github.com/trentm/python-markdown2/wiki/Extras#implemented-extras) (默认值：`(default: ['fenced-code-blocks', 'tables'])`) |

```python:line-numbers
from nicegui import ui

ui.markdown('这是一段 **Markdown**.')

ui.run()
```

### 带缩进的Markdown

每行开头的常见缩进会自动去除。因此，你可以对 Markdown 元素进行缩进，它们仍能正确渲染。

```python:line-numbers
from nicegui import ui

ui.markdown('''
    ## Example

    This line is not indented.

        This block is indented.
        Thus it is rendered as source code.

    This is normal text again.
''')

ui.run()
```

### 带代码块的Markdown

您可以用代码块来展示代码片段。如果在开头的三个反引号后指定语言，代码将会进行语法高亮。请参阅 [Pygments网站](https://pygments.org/languages/) 以获取支持的语言列表。

```python:line-numbers
from nicegui import ui

ui.markdown('''
    ```python
    from nicegui import ui

    ui.label('Hello World!')

    ui.run(dark=True)
    ```
''')

ui.run()
```

### Markdown 表格

在激活 "tables" 扩展后，您可以使用 Markdown 表格。请参考 [Markdown2 文档](https://github.com/trentm/python-markdown2/wiki/Extras#implemented-extras) 来查阅所有受支持的扩展。

```python:line-numbers
from nicegui import ui

ui.markdown('''
    | First name | Last name |
    | ---------- | --------- |
    | Max        | Planck    |
    | Marie      | Curie     |
''', extras=['tables'])

ui.run()
```

### Mermaid 图表

通过 "mermaid" 扩展，您可以使用 Mermaid 图表。请参阅 [Markdown2 文档](https://github.com/trentm/python-markdown2/wiki/Extras#implemented-extras) 来查阅所有受支持的扩展。

```python:line-numbers
from nicegui import ui

ui.markdown('''
    ```mermaid
    graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->D;
    ```
''', extras=['mermaid'])

ui.run()
```

### LaTeX 公式

激活 "latex" 扩展后，您便可以使用 LaTeX 公式。这需要安装 markdown2 (版本 >=2.5) 以及 `latex2mathml`。

```python:line-numbers
from nicegui import ui

ui.markdown(r'''
    欧拉恒等式:

    $$e^{i\pi} = -1$$
''', extras=['latex'])

ui.run()
```

### 更改 Markdown 内容

您可以通过设置其 `content` 属性或调用 `set_content` 方法来更改 Markdown 元素的内容。

```python:line-numbers
from nicegui import ui

markdown = ui.markdown('示例文本')
ui.button('更改内容', on_click=lambda: markdown.set_content('这是新的内容'))

ui.run()
```

### 为 Markdown 内的元素添加样式

要为 `ui.markdown` 元素内的 HTML 元素设置样式，您可以为 "nicegui-markdown" 类添加自定义 CSS 规则。

```python:line-numbers
from nicegui import ui

ui.add_css('''
    .nicegui-markdown a {
        color: orange;
        text-decoration: none;
    }
    .nicegui-markdown a:hover {
        color: orange;
        text-decoration: underline;
    }
''')
ui.markdown('这是一个[链接](https://example.com)。')

ui.run()
```