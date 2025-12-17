# NiceGUI 常见问题解答

## 社区

### 我在哪里可以获取帮助?

请查看此常见问题解答，在以下渠道寻求帮助:
- [GitHub 讨论](https://github.com/zauberzeug/nicegui/discussions)
- [Reddit](https://www.reddit.com/r/nicegui/)
- [StackOverflow](https://stackoverflow.com/questions/tagged/nicegui)
- [Discord 服务器](https://discord.gg/TEpFeAaF4f)

由于 NiceGUI 的后端基于 [FastAPI](https://fastapi.tiangolo.com/)，前端基于 [Vue3](https://vuejs.org/) 和 [Quasar](https://quasar.dev/)，您也可以通过查阅它们的文档来解决很多问题。

**当您开始新的问题或讨论时**，请花些心思来撰写您的帖子。会有不少人阅读并思考您的消息，请让他们的阅读时间变得有价值。

**如果您在使用 NiceGUI 时遇到错误或其他问题**，最好的报告方式是在我们的 [GitHub 仓库](https://github.com/zauberzeug/nicegui) 中打开一个新的问题。

### 为什么提供最小可复现示例很重要?

当您寻求帮助时，如果可能的话，提供一个 [最小可执行示例 (MRE)](https://en.wikipedia.org/wiki/Minimal_reproducible_example) 是很重要的。原因如下:

- 提供一个最小可复现示例能增加您问题得到快速准确回复的几率。当人们能够轻松重现问题并测试解决方案时，他们更愿意提供帮助。
- 它还有助于您更好地理解问题，通过隔离问题并移除不必要的代码，这可能会让您更清楚地了解问题及潜在的解决方案。

在创建最小可复现示例时，请确保移除与问题无关的任何代码，同时保持示例完整且可运行。这包括导入、函数和数据。尽量使示例尽可能简单，但仍能展示问题。

### 我的英语不太好，我该怎么办?

用您的母语写下您的问题/建议/信息，并使用在线工具如谷歌翻译、ChatGPT 或类似工具进行翻译。输出结果往往出奇地好。

> 如果有人要求，请包含原始文本或将其保存在可检索的地方，因为如果有说您母语的本地人士，这可能会提供一些额外的上下文并帮助理解语言中的细微差别。

---

## 性能

### 为什么我的长时间运行的函数会阻塞 UI 更新?

NiceGUI（以及底层的 FastAPI）是异步框架。这意味着，不应在主线程上直接执行任何 I/O 密集型或 CPU 密集型任务，而应使用 `await` 来等待它们。否则它们会阻塞主线程的执行。有关更深入的解释，请参阅 [Async - FastAPI](https://fastapi.tiangolo.com/async/)。

有很好的库，如:
- `aiofiles` (用于异步写文件)
- `httpx` (用于异步请求)
- NiceGUI 的通用 [`run.io_bound`](https://nicegui.io/documentation/section_action_events#running_i_o-bound_tasks) 可以用于执行 I/O 密集型工作

CPU 密集型任务需要在另一个进程中运行，这可以通过 NiceGUI 的 [`run.cpu_bound`](https://nicegui.io/documentation/section_action_events#running_cpu-bound_tasks) 来实现。

请查看我们的示例:
- [ffmpeg](https://github.com/zauberzeug/nicegui/blob/main/examples/ffmpeg_extract_images/main.py)
- [opencv 网络摄像头](https://github.com/zauberzeug/nicegui/blob/main/examples/opencv_webcam/main.py)
- [边输入边搜索](https://github.com/zauberzeug/nicegui/blob/6950a664f09889bb47fbe29ebe96690cbed89be1/examples/search_as_you_type/main.py)
- [进度](https://github.com/zauberzeug/nicegui/blob/main/examples/progress/main.py)
- [脚本执行器](https://github.com/zauberzeug/nicegui/blob/main/examples/script_executor/main.py)

**重要提示:** `run.cpu_bound` 任务不应访问类属性。正如在 [讨论 #2221](https://github.com/zauberzeug/nicegui/discussions/2221#discussioncomment-7920864) 中所解释的那样，`run.cpu_bound` 需要在单独的进程中执行函数。为此，它需要将传递的函数的整个状态传输到该进程（这是通过 pickle 完成的）。

建议创建静态方法（或自由函数），这些方法将所有数据作为简单参数获取（例如，不包含类/用户界面逻辑），并返回结果（而不是将其写入类属性或全局变量）。

**关于页面装饰器:** 如果使用 `@ui.page` 装饰的页面构建器未被标记为 `async`，FastAPI 将会在一个后台线程中运行它（详情请见 [FastAPI 文档](https://fastapi.tiangolo.com/async/#path-operation-functions)）。这意味着您可以非常放心地在这些函数中使用 IO 阻塞代码，例如文件读取、数据库访问或请求，而不会暂停主线程。只需注意，后续将其重构为异步的页面构建器将会破坏您的代码。这就是为什么我们建议尽可能避免依赖这种模式。

#### 调试阻塞代码

要查看任何阻塞主线程超过 50 毫秒的代码的警告，您可以使用以下代码片段:

```python
def startup():
    loop = asyncio.get_running_loop()
    loop.set_debug(True)
    loop.slow_callback_duration = 0.05

app.on_startup(startup)
```

**警告:** 不要在生产环境中使用此功能，因为它会显著减慢执行速度。

### 我可以做些什么来提高性能?

**1. 使用异步操作**

您所有的 [CPU 密集型任务](https://nicegui.io/documentation/section_action_events#running_cpu-bound_tasks)（例如计算 1000 位圆周率）和 [IO 密集型任务](https://nicegui.io/documentation/section_action_events#running_i_o-bound_tasks)（例如发出网络请求、读取文件等）都应该是 `async` 的。否则，它们将阻塞每个人的执行。

**2. 优化 UI 元素数量**

检查正在提供服务的 NiceGUI 元素数量是否尽可能少，采用诸如 [服务器端分页](https://github.com/zauberzeug/nicegui/discussions/2351) 等技术，或者在必要时采用一些潜在的特殊技术，例如 [将内容分组到高级自定义元素中](https://github.com/zauberzeug/nicegui/discussions/4434#discussioncomment-12450524)。

**3. 使用负载均衡器**

确保您的代码库中实现了步骤 (1) 和 (2)。只有在存在其他原因导致单个 CPU 计算量过大时，才继续执行步骤 (3)。也许您别无选择，只能以高频率显示 10,000 个元素，或者每秒需要处理大量页面访问。

在这种情况下，您需要一个支持粘性会话管理的负载均衡器，例如:
- [Traefik](https://doc.traefik.io/traefik/getting-started/install-traefik/)
- [NGINX](https://nginx.org/)
- [HAProxy](https://www.haproxy.org/)
- [proxy.py](https://github.com/abhinavsingh/proxy.py)

NiceGUI 要求浏览器"粘附"到最初提供内容的服务器实例。这无法通过 Uvicorn 工作进程实现（参见 [讨论 #1539](https://github.com/zauberzeug/nicegui/discussions/1539)）。

使用负载均衡器时，您应该注意:
- 不要使用全局状态（因为每个实例都有自己的状态）
- 只有 `app.storage.browser` 可以正常工作；对于所有其他存储类型，您需要 [激活 Redis 存储](https://nicegui.io/documentation/storage#redis_storage) 或创建自己的数据库

请参阅我们的 [Redis 示例](https://nicegui.io/documentation/storage#redis_storage)，了解如何设置带有粘性会话并通过 `app.storage` 同步状态的 Traefik 负载均衡器。

---

## 编程

### 为什么我的 for 循环的最后一个元素在每个步骤中都被使用?

### 为什么我所有的元素都具有相同的值?

您可能正在经历 Python 的"后期绑定"问题。

**问题示例:**

```python
for i in [1, 2, 3]:
    ui.button(i, on_click=lambda: ui.label(i))
```

**解决方案:**

```python
for i in [1, 2, 3]:
    ui.button(i, on_click=lambda i=i: ui.label(i))
```

`i=i` 捕获了 lambda 语句中的 `i`。当 lambda 最终被求值时，如果不使用 `i=i`，它会使用 `i` 的当前值（现在是 3）。但通过 `i=i`，标签是使用本地副本创建的。

### 为什么我的代码被执行了两次?

您可能正在使用 `reload=True`，它让主代码运行一次，然后生成一个子进程，该子进程在文件更改时会被终止并重新启动。为了避免在第一次"init"中评估您的代码，您有几个选择:

**选项 1: 禁用自动重新加载**

```python
ui.run(reload=False)
```

当然，您会失去方便的自动重新加载功能。但对于生产环境，这可能是可行的方法。

**选项 2: 使用主保护**

```python
if __name__ == '__mp_main__':
    print("Some message")
    ui.label("test")
ui.run()
```

这避免了在 `"__main__"` 进程中评估代码，并将其限制在子进程 `"__mp_main__"` 中。

**选项 3: 使用页面装饰器**

```python
@ui.page('/')
def main():
    print("Some message")
    ui.label("test")
```

这仅在访问时评估 UI。但是，如果您在启动脚本时需要执行一次昂贵的初始化，这可能不是最佳方法。页面装饰器还会改变可见性，因为它为每个客户端生成一个新页面，因此状态不再共享。

**选项 4: 使用启动回调**

```python
def startup():
    print("Some message")

app.on_startup(startup) 
ui.label("test")
```

这样 `startup` 只在子进程中评估一次，因为应用程序不会在主进程中启动（除非 `reload=False`）。

### 如何让新元素出现在正确的位置?

在 NiceGUI 中，元素被放置在它们被创建的位置。这使您可以快速创建和理解 [嵌套的布局结构](https://github.com/zauberzeug/nicegui/discussions/247)。如果您在事件处理程序中创建新元素，NiceGUI 会将它们放置在触发事件的元素的父容器中。

要选择 UI 中的其他位置，您可以明确进入其上下文。例如:

```python
class LabeledCard(ui.card):

    def __init__(self) -> None:
        super().__init__()
        with self:
            ui.label('This is the LabeledCard')

    def add_label(self) -> None:
        with self:  # 确保使用卡片的上下文
            ui.label('This is a label')

card = LabeledCard()
ui.button('Add label to card', on_click=card.add_label)
```

### `ui.refreshable` 和 `.bind` 有什么区别?

**绑定 (Binding):**
- 用于在特定值更改时自动更新**单个** UI 元素
- 不会添加或删除元素，而只是用新属性更新它们

**可刷新 (Refreshable):**
- 装饰器包装一个函数
- 当调用 `refresh` 时，该函数将替换整个容器
- 可能更易于实现
- 允许更复杂的依赖关系（例如，根据某些模型状态设置特定的样式或类）

**注意事项:**
- 整个容器元素被替换会导致更多的网络流量
- 客户端状态（如输入元素中的光标位置或下拉菜单的状态）可能会丢失

### 如何获取上传文件的路径?

使用 [`ui.upload`](https://nicegui.io/documentation/upload) 元素无法实现这一点，因为它使用的是浏览器内部的文件选择对话框。出于安全原因，浏览器不提供所选文件的完整路径。有关更多详细信息，请参阅 [#283](https://github.com/zauberzeug/nicegui/discussions/283) 和 [#269](https://github.com/zauberzeug/nicegui/discussions/269)。

**替代方案:**

我们构建了一个示例来展示 [自定义本地文件浏览器](https://github.com/zauberzeug/nicegui/tree/main/examples/local_file_picker)，它作用于运行中的应用程序的文件系统（例如，从服务器（而不是运行浏览器的用户机器）中选择文件）。

如果您处于 [原生模式](https://nicegui.io/documentation/section_configuration_deployment#native_mode)，您也可以使用提供路径的系统文件选择器:

```python
from nicegui import app, ui

async def choose_file():
    files = await app.native.main_window.create_file_dialog(allow_multiple=True)
    for file in files:
        ui.notify(file)

ui.button('choose file', on_click=choose_file)

ui.run(native=True)
```

---

## 样式

### 我应该使用 Quasar 还是 Tailwind 进行样式设计?

您可以使用两者，但需要注意细微的不兼容性，例如在 [定义断点](https://github.com/zauberzeug/nicegui/discussions/1333) 时。

NiceGUI 使用 Vue3 和 Quasar 作为 Web 框架，因为它拥有:
- 大量高度可定制的 UI 元素
- 一个庞大的社区

除此之外，我们很早就决定 Tailwind 会增加很多不错的样式功能，而这些功能单独使用 Quasar 会更难实现。

### 为什么我的颜色不显示，而是显示白色?

[问题](https://github.com/zauberzeug/nicegui/discussions/1380) 可能在于，例如 "green-400" 是 Tailwind 颜色，而不是来自 Quasar 调色板。Tailwind 颜色在浅色模式下为何会生效的细节要复杂一些。但 Quasar 基本上假设颜色应该是 `#fff`。

正如 QToggle 文档所述，"color" 属性需要是 [Quasar 调色板](https://quasar.dev/style/color-palette) 中的一个名称。

### 为什么我的 `ui.row` 即使子元素宽度加起来为 100% 也无法容纳?

NiceGUI 应用了默认的间距，因此子元素的尺寸加上间距会超过 100%。因此，flex 布局会自动将元素换行到下一"行"。

**解决方案:**
- 设置 `no-wrap` 类
- 设置 `gap-0` 类

有关更多信息，请参阅:
- [StackOverflow 上的这个问题](https://stackoverflow.com/questions/76856637/problem-with-percentage-width-and-flex-layout-in-nicegui-and-tailwindcss)
- [此讨论](https://github.com/zauberzeug/nicegui/discussions/1378)

---

## 存储

### 数据存储在哪里?

**`app.storage.user` 和 `app.storage.general`:**
- 保存在您当前工作目录的 `.nicegui` 文件夹中的 JSON 文件中
- 如果您将应用程序部署到云服务器，数据将存储在那里
- NiceGUI 不提供中央数据服务器

**`app.storage.browser`:**
- 是一个加密的会话 cookie
- 可以保存少量键/值数据
- 此数据仅存储在浏览器 cookie 中，并且在内存中可用于 Python 代码
- 浏览器数据在 30 天未访问后过期

---

## 意外行为

### 如何避免由于握手失败而导致的 "reloading" JavaScript 错误消息，该消息会导致整个页面重新加载?

可能是您正在 Gunicorn 或其他支持多个工作进程的负载均衡器上运行。在这种情况下，WebSocket 连接可能不会传递到创建 HTML 页面的同一实例。

**解决方案:**
- 切换到支持粘性会话的更复杂的负载均衡器，如 Traefik、Nginx 或 HAProxy
- 一个更简单的选择是只使用一个工作进程，并在事件循环确保高速并发的地方拥抱 async/await

有关详细信息，请参阅有关 [多工作进程支持](https://github.com/zauberzeug/nicegui/discussions/1539) 的功能请求。

### 为什么我收到 ERROR 10048?

可能是您在 Windows 上的 `pyinstaller --onefile ...` 编译的可执行文件中使用 Python 的 `multiprocessing` 模块。

[此链接](https://github.com/pyinstaller/pyinstaller/wiki/Recipe-Multiprocessing) 解释了详细信息。

**解决方案:**
在主保护的开头使用 `multiprocessing.freeze_support()`。

### 为什么我没有使用 element.on 接收到事件?

NiceGUI 的 WebSocket 连接每条消息的限制为 `1,000,000` 字节。如果某个元素发出的事件大于该限制，服务器将不会接收到它。

对于大多数元素来说，这个限制绰绰有余，但对于具有数千个标记点的 Leaflet 地图等，可能会达到此限制。

### UserWarning: Bad certificate in Windows certificate store

您的 Windows 证书存储中有损坏的证书，`ssl.py` 无法识别。尽管没有使用 HTTPS，但仍会抛出警告。

**解决方案:**
通过删除有问题的证书进行根本原因修复:
- [修复方法](https://gist.github.com/evnchn/b2ea50e5d4174af290a343a2f0cb51f2)
- 取自 [GitHub Issue #4509](https://github.com/zauberzeug/nicegui/issues/4509#issuecomment-2741554729)

**警告:** 在运行代码前检查代码的修订版本。在撰写本文时，两个版本的代码中都没有恶意软件。
