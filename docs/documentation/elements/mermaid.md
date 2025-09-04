# 美人鱼图 `Mermaid Diagrams`

将采用基于 Markdown 语法扩展的 [Mermaid](https://mermaid.js.org/)
语言编写的图表进行可视化渲染。
通过在 `ui.markdown` 元素中添加扩展字符串 'mermaid'，可将mermaid语法嵌入Markdown 元素中使用。

可选配置字典会在首个图表渲染前直接传递给mermaid。
该参数可用于设置以下选项：

- 允许在节点被点击时执行JavaScript代码: `{'securityLevel': 'loose', ...} `
- 在控制台输出信息级日志: `{'logLevel': 'info', ...}`

有关完整配置选项列表，请参阅 Mermaid 文档中的 `mermaid.initialize()` 方法说明。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| content    | Mermaid 内容     |
| config     | 传递给 `mermaid.initialize()` 的配置字典 |

```python:line-numbers
from nicegui import ui

ui.mermaid('''
graph LR;
    A --> B;
    A --> C;
''')

ui.run()
```

### 处理点击事件

您可以通过向节点添加 `click` 指令并发出自定义事件来注册点击事件。请确保在 `config` 参数中将 `securityLevel` 设置为 `loose` 以允许执行 JavaScript。

```python:line-numbers
from nicegui import ui

ui.mermaid('''
graph LR;
    A((点我!));
    click A call emitEvent("mermaid_click", "你点了我!")
''', config={'securityLevel': 'loose'})
ui.on('mermaid_click', lambda e: ui.notify(e.args))

ui.run()
```

### 处理错误

您可以通过监听 `error` 事件来处理错误。事件的参数包含 `hash`、`message`、`str` 属性以及一个带有附加信息的 `error` 对象。

```python:line-numbers
from nicegui import ui

ui.mermaid('''
graph LR;
    A --> B;
    A -> C;
''').on('error', lambda e: print(e.args['message']))

ui.run()
```