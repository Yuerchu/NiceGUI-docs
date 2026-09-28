# 正例

**或者，交给你的 AI 吧**！大多数 LLM 已经了解 NiceGUI。

但你需注意，**此时分隔符为分号而非空格**。

**注意**：当你使用这个功能时要小心。

- **classes**: `Classes[Self]`
- **`style`**：直接使用 CSS。

可通过 [PyPI](https://pypi.org/project/nicegui/)、[Docker](https://hub.docker.com/r/zauberzeug/nicegui) 和 [GitHub](https://github.com/zauberzeug/nicegui) 获取。

上一段以句号结束。

下一段从空行之后开始。

## 标题以句号结尾。

正文紧跟在标题后面。

| 参数 | 说明 |
| ---- | ---- |
| text | 按钮的标签。 |

```python
ui.markdown('**吧！**大多数')
```

```python
ui.markdown('''
    ```mermaid
    graph TD;
    ```
    **吧！**大多数
''')
```
