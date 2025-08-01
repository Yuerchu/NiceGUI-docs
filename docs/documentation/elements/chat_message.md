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