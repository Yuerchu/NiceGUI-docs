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