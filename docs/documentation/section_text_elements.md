---
title: 文本元素
prev:
  text: '快速开始'
  link: '/documentation/quick_start'
next:
  text: '控制元素'
  link: '/documentation/section_controls'
---

# 文本元素

## 文本 `Label` {#label}

<!--@include: ./elements/label.md{3,13}-->

[查看更多...](./elements/label)

## 超链接 `Link` {#link}

<!--@include: ./elements/link.md{3,19}-->

[查看更多...](./elements/link)

## 聊天消息 `Chat Message` {#chat_message}

<!--@include: ./elements/chat_message.md{3,24}-->

[查看更多...](./elements/chat_message)

## 通用元素 {#generic_element}

<!--@include: ./elements/element.md{3,17}-->

[查看更多...](./elements/element)

## Markdown 元素 `Markdown Element` {#markdown_element}

<!--@include: ./elements/markdown.md{3,18}-->

[查看更多...](./elements/markdown)

## reST 文本 `ReStructuredText` {#restructuredtext}

<!--@include: ./elements/restructured_text.md{3,17}-->

[查看更多...](./elements/restructured_text)

## 美人鱼图 `Mermaid Diagrams` {#mermaid_diagrams}

<!--@include: ./elements/mermaid.md{3,30}-->

[查看更多...](./elements/mermaid)

## HTML 元素 `HTML Element` {@html_element}

<!--@include: ./elements/html.md{3,13}-->

[查看更多...](./elements/html)

## 其他 HTML 元素 `Other HTML Elements` <Badge type="tip" text="^2.5.0" /> {#other_html_elements}

还存在一个html模块，允许您插入其他HTML元素如`<span>`、`<div>`、`<p>`等。
其功能等同于使用带 tag 参数的 `ui.element` 方法。

与任何其他元素一样，您可以添加类名、样式、属性、工具提示和事件。
其中一项便利之处在于，关键字参数会自动添加到元素的 props 字典中。

```python:line-numbers
from nicegui import html, ui

with html.section().style('font-size: 120%'):
    html.strong('一段粗体') \
        .classes('cursor-pointer') \
        .on('click', lambda: ui.notify('粗体!'))
    html.hr()
    html.em('一段斜体').tooltip('真棒!')
    with ui.row():
        html.img().props('src=https://placehold.co/60')
        html.img(src='https://placehold.co/60')

ui.run()
```