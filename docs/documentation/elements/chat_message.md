# 聊天消息 `Chat Message`

基于 Quasar 的 [Chat Message↗](https://quasar.dev/vue-components/chat/) 组件。

| 参数 Param | 说明 Description |
| ---------- | ---------------- |
| text       | 消息内容(可以是一个列表的多条消息) |
| name       | 消息发送者名称 |
| label      | 仅呈现标签标题/部分 |
| stamp      | 消息的时间戳 |
| avatar     | 头像 URL |
| sent       | 是否为消息发送者(默认值：`False`) |
| text_html  | 是否以 HTML 渲染消息(默认值：`False`) |

```python:line-numbers
from nicegui import ui

ui.chat_message('Hello NiceGUI!',
                name='Robot',
                stamp='now',
                avatar='https://robohash.org/ui')

ui.run()
```

## 渲染 HTML

使用 `text_html` 参数，可以启用 HTML 渲染功能。

```python:line-numbers
from nicegui import ui

ui.chat_message('此段未启用 <strong>HTML</strong> 渲染')
ui.chat_message('此段启用 <strong>HTML</strong> 渲染', text_html=True)

ui.run()
```

## 换行显示

使用 `\n` 即可启用换行显示。

```python:line-numbers
from nicegui import ui

ui.chat_message('This is a\nlong line!')

ui.run()
```

## 多个消息

你可以在 `text` 参数中传入一个列表，这样多个消息气泡就会合并在一起。

```python:line-numbers
from nicegui import ui

ui.chat_message(['Hi! 😀', 'How are you?']
                )

ui.run()
```

## 带子元素的消息

你可以在气泡中添加子元素。

```python:line-numbers
from nicegui import ui

with ui.chat_message():
    ui.label('Guess where I am!')
    ui.image('https://picsum.photos/id/249/640/360').classes('w-64')

ui.run()
```
