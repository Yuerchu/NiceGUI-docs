import { defineConfig } from 'vitepress'
import { createRewrites, defineTeekConfig } from "vitepress-theme-teek/config";

// Teek 主题配置
const teekConfig = defineTeekConfig({
  teekHome: false,
  windowTransition: true,
  author: {
    name: "Yuerchu",
    link: "https://github.com/Yuerchu"
  },
  footerInfo: {
    copyright: {
      show: true,
      createYear: 2018,
      suffix: "于小丘 Yuerchu"
    }
  },
  vitePlugins: {
    sidebar: false,
  },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  lang: 'zh-CN',
  title: "NiceGUI 中文网",
  description: "一个非官方的 NiceGUI 中文文档站",
  sitemap: {
    hostname: 'https://nicegui.cn',
  },
  head: [
    [
      'link', { rel: 'icon', href: '/static/favicon/favicon.ico' } // 站点图标
    ],
  ],
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    // Logo
    logo: '/static/favicon/android-chrome-384x384.png',
    
    // 启用搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '重置搜索',
            footer: {
              selectText: '选择',
              navigateText: '导航',
              closeText: '关闭',
            },
          },
        }
      }
    },
    
    // 顶部栏
    nav: [
      { text: '首页', link: '/' },
      { text: 'NiceGUI 文档', link: '/documentation' },
      { text: 'NiceGUI Wiki', link: '/wiki' },
      { text: '官方网站(English)', link: 'https://nicegui.io/' },
      { text: '中文文档 GitHub', link: 'https://github.com/Yuerchu/NiceGUI-docs'}
    ],

    // 侧边栏
    sidebar: [
      {
        text: '文档',
        link: '/documentation',
      },
      {
        text: '快速开始',
        link: '/documentation/quick_start',
      },
      {
        text: '组件',
        items: [
          { text: '文本元素',
            link: '/documentation/section_text_elements',
            items: [
              {
                text: '文本 Label',
                link: '/documentation/elements/label',
              },
              {
                text: '超链接 Link',
                link: '/documentation/elements/link',
              },
              {
                text: '聊天消息 Chat Message',
                link: '/documentation/elements/chat_message',
              },
              {
                text: '通用元素 Generic Element',
                link: '/documentation/elements/element',
              },
              {
                text: 'Markdown',
                link: '/documentation/elements/markdown',
              },
              {
                text: 'reSTructured 文本',
                link: '/documentation/elements/restructured_text',
              },
              {
                text: '美人鱼图 Mermaid',
                link: '/documentation/elements/mermaid',
              },
              {
                text: 'HTML',
                link: '/documentation/elements/html',
              },
              {
                text: '其他 HTML 元素',
                link: '/documentation/section_text_elements.html#other_html_elements',
              }
            ]
          },
          {
            text: '控制元素',
            link: '/documentation/section_controls',
            items: [
              {
                text: '按钮 Button',
                link: '/documentation/elements/button',
              },
              {
                text: '按钮组 Button Group',
                link: '/documentation/elements/button_group',
              },
              {
                text: '下拉按钮 Dropdown Button',
                link: '/documentation/elements/button_dropdown',
              },
              {
                text: '浮动按钮 FAB',
                link: '/documentation/elements/fab',
              },
              {
                text: '标签 Badge',
                link: '/documentation/elements/badge',
              },
              {
                text: '小标签 Chip',
                link: '/documentation/elements/chip',
              },
              {
                text: '切换器 Toggle',
                link: '/documentation/elements/toggle',
              },
              {
                text: '单项选择器 Radio Selection',
                link: '/documentation/elements/radio',
              },
              {
                text: '下拉选择器 Dropdown Selection',
                link: '/documentation/elements/select',
              },
              {
                text: '芯片输入器 Input Chips',
                link: '/documentation/elements/input_chips',
              },
              {
                text: '复选框 Checkbox',
                link: '/documentation/elements/checkbox',
              },
              {
                text: '开关 Switch',
                link: '/documentation/elements/switch',
              },
              {
                text: '滑块 Slider',
                link: '/documentation/elements/slider',
              },
              {
                text: '范围选择器 Range',
                link: '/documentation/elements/range',
              },
              {
                text: '评分 Rating',
                link: '/documentation/elements/rating',
              },
              {
                text: '虚拟摇杆 Joystick',
                link: '/documentation/elements/joystick',
              },
              {
                text: '文本输入框 Text Input',
                link: '/documentation/elements/input',
              },
              {
                text: '多行文本输入框 Textarea',
                link: '/documentation/elements/textarea',
              },
              {
                text: '代码编辑器 CodeMirror',
                link: '/documentation/elements/codemirror',
              },
              {
                text: '终端模拟器 Xterm',
                link: '/documentation/elements/xterm',
              },
              {
                text: '数字输入器 Number Input',
                link: '/documentation/elements/number',
              },
              {
                text: '旋钮 Knob',
                link: '/documentation/elements/knob',
              },
              {
                text: '颜色输入器 Color Input',
                link: '/documentation/elements/color_input',
              },
              {
                text: '颜色选择器 Color Picker',
                link: '/documentation/elements/color_picker',
              },
              {
                text: '日期输入框 Date Input',
                link: '/documentation/elements/date_input',
              },
              {
                text: '日期选择器 Date Picker',
                link: '/documentation/elements/date',
              },
              {
                text: '时间输入框 Time Input',
                link: '/documentation/elements/time_input',
              },
              {
                text: '时间选择器 Time Picker',
                link: '/documentation/elements/time',
              },
              {
                text: '文件上传器 File Upload',
                link: '/documentation/elements/upload',
              },
            ]
          },
          {
            text: '视听元素',
            link: '/documentation/section_audiovisual_elements',
            items: [
              { text: '图片 Image', link: '/documentation/section_audiovisual_elements#图片-image' },
              { text: '字幕和叠加 Captions and Overlays', link: '/documentation/section_audiovisual_elements#字幕和叠加-captions-and-overlays' },
              { text: '互动图片 Interactive Image', link: '/documentation/section_audiovisual_elements#互动图片-interactive-image' },
              { text: '音频 Audio', link: '/documentation/section_audiovisual_elements#音频-audio' },
              { text: '视频 Video', link: '/documentation/section_audiovisual_elements#视频-video' },
              { text: '图标 Icon', link: '/documentation/section_audiovisual_elements#图标-icon' },
              { text: '头像 Avatar', link: '/documentation/section_audiovisual_elements#头像-avatar' },
              { text: '视差图片 Parallax', link: '/documentation/section_audiovisual_elements#视差图片-parallax-image' },
              { text: 'SVG', link: '/documentation/section_audiovisual_elements#svg' },
            ]
          },
          {
            text: '数据元素',
            link: '/documentation/section_data_elements',
            items: [
              { text: '表格 Table', link: '/documentation/section_data_elements#表格-table' },
              { text: '数据网格 AG Grid', link: '/documentation/section_data_elements#数据网格-ag-grid' },
              { text: 'Highcharts', link: '/documentation/section_data_elements#highcharts-chart' },
              { text: 'Apache Echart', link: '/documentation/section_data_elements#apache-echart' },
              { text: 'Pyplot Context', link: '/documentation/section_data_elements#pyplot-context' },
              { text: 'Matplotlib', link: '/documentation/section_data_elements#matplotlib' },
              { text: '实时折线图 Line Plot', link: '/documentation/section_data_elements#实时折线图-line-plot' },
              { text: 'Plotly', link: '/documentation/section_data_elements#plotly-元素' },
              { text: 'Altair 图表', link: '/documentation/section_data_elements#altair-图表' },
              { text: 'AnyWidget', link: '/documentation/section_data_elements#anywidget' },
              { text: '线性进度条 Linear Progress', link: '/documentation/section_data_elements#线性进度条-linear-progress' },
              { text: '环形进度条 Circular Progress', link: '/documentation/section_data_elements#环形进度条-circular-progress' },
              { text: '加载动画 Spinner', link: '/documentation/section_data_elements#无精确进度的进度条-spinner' },
              { text: '3D 图形 3D Scene', link: '/documentation/section_data_elements#_3d-图形-3d-scene' },
              { text: '地图 Leaflet', link: '/documentation/section_data_elements#地图-leaflet-map' },
              { text: '树 Tree', link: '/documentation/section_data_elements#树-tree' },
              { text: '日志视图 Log View', link: '/documentation/section_data_elements#日志视图-log-view' },
              { text: 'HTML 编辑器 Editor', link: '/documentation/section_data_elements#html-编辑器-editor' },
              { text: '代码块 Code', link: '/documentation/section_data_elements#代码块-code' },
              { text: 'JSON 编辑器', link: '/documentation/section_data_elements#json-编辑器-jsoneditor' },
            ]
          },
          {
            text: '绑定属性',
            link: '/documentation/section_binding_properties',
            items: [
              { text: '绑定', link: '/documentation/section_binding_properties#绑定' },
              { text: '转换函数', link: '/documentation/section_binding_properties#转换函数' },
              { text: '绑定到字典', link: '/documentation/section_binding_properties#绑定到字典' },
              { text: '绑定到变量', link: '/documentation/section_binding_properties#绑定到变量' },
              { text: '绑定到存储', link: '/documentation/section_binding_properties#绑定到存储' },
              { text: '可绑定属性', link: '/documentation/section_binding_properties#实现最佳性能的可绑定属性' },
              { text: '可绑定的数据类', link: '/documentation/section_binding_properties#可绑定的数据类' },
            ]
          },
          {
            text: '页面布局',
            link: '/documentation/section_page_layout',
            items: [
              { text: '自动上下文', link: '/documentation/section_page_layout#自动上下文' },
              { text: '卡片 Card', link: '/documentation/section_page_layout#卡片-card' },
              { text: '纵向布局 Column', link: '/documentation/section_page_layout#纵向布局-column-element' },
              { text: '横向布局 Row', link: '/documentation/section_page_layout#横向布局-row-element' },
              { text: '网格布局 Grid', link: '/documentation/section_page_layout#网格布局-grid-element' },
              { text: '列表', link: '/documentation/section_page_layout#列表' },
              { text: '滑块项目 Slide Item', link: '/documentation/section_page_layout#滑块项目-slide-item' },
              { text: '全屏控制元素', link: '/documentation/section_page_layout#全屏控制元素' },
              { text: '清空容器', link: '/documentation/section_page_layout#清空容器-clear-containers' },
              { text: '传送门 Teleport', link: '/documentation/section_page_layout#传送门-teleport' },
              { text: '扩展元素 Expansion', link: '/documentation/section_page_layout#扩展元素-expansion-element' },
              { text: '滑动区 Scroll Area', link: '/documentation/section_page_layout#滑动区-scroll-area' },
              { text: '分割线 Separator', link: '/documentation/section_page_layout#分割线-separator' },
              { text: '空间 Space', link: '/documentation/section_page_layout#空间-space' },
              { text: '骨架屏 Skeleton', link: '/documentation/section_page_layout#骨架屏-skeleton' },
              { text: '分割器 Splitter', link: '/documentation/section_page_layout#空间划分器-splitter' },
              { text: '标签页 Tabs', link: '/documentation/section_page_layout#标签与标签页-tabs' },
              { text: '步骤器 Stepper', link: '/documentation/section_page_layout#步骤器-stepper' },
              { text: '时间线 Timeline', link: '/documentation/section_page_layout#时间线-timeline' },
              { text: '幻灯片 Carousel', link: '/documentation/section_page_layout#幻灯片灯箱-carousel' },
              { text: '分页 Pagination', link: '/documentation/section_page_layout#分页-pagination' },
              { text: '菜单 Menu', link: '/documentation/section_page_layout#菜单-menu' },
              { text: '上下文菜单', link: '/documentation/section_page_layout#上下文菜单-context-menu' },
              { text: '气泡提示 Tooltip', link: '/documentation/section_page_layout#气泡提示-tooltip' },
              { text: '通知 Notification', link: '/documentation/section_page_layout#通知-notification' },
              { text: '高级通知', link: '/documentation/section_page_layout#高级通知-notification-element' },
              { text: '对话框 Dialog', link: '/documentation/section_page_layout#对话框-dialog' },
            ]
          },
          {
            text: '造型与外观',
            link: '/documentation/section_styling_appearance',
            items: [
              { text: '样式设计 Styling', link: '/documentation/section_styling_appearance#样式设计-styling' },
              { text: 'Tailwind CSS', link: '/documentation/section_styling_appearance#tailwind-css' },
              { text: 'CSS 层级', link: '/documentation/section_styling_appearance#css-层级-css-layers' },
              { text: 'Tailwind CSS 布局', link: '/documentation/section_styling_appearance#tailwind-css-布局' },
              { text: 'UnoCSS 引擎', link: '/documentation/section_styling_appearance#unocss-引擎' },
              { text: '元素过滤 ElementFilter', link: '/documentation/section_styling_appearance#元素过滤-elementfilter' },
              { text: 'Query Selector', link: '/documentation/section_styling_appearance#query-selector' },
              { text: '颜色主题', link: '/documentation/section_styling_appearance#颜色主题-color-theming' },
              { text: 'CSS 变量', link: '/documentation/section_styling_appearance#css-变量' },
              { text: '深色模式', link: '/documentation/section_styling_appearance#深色模式-dark-mode' },
              { text: '添加 CSS 样式', link: '/documentation/section_styling_appearance#添加-css-样式定义到页面' },
              { text: '其他 Vue UI 框架', link: '/documentation/section_styling_appearance#使用其他基于-vue-框架的-ui' },
            ]
          },
          {
            text: '动作与事件',
            link: '/documentation/section_action_events',
            items: [
              { text: '定时刷新时钟 Timer', link: '/documentation/section_action_events#Timer' },
              { text: '键盘事件', link: '/documentation/section_action_events#键盘事件-keboard' },
              { text: 'UI 更新', link: '/documentation/section_action_events#ui-更新' },
              { text: '可刷新的 UI', link: '/documentation/section_action_events#可刷新的-ui-功能' },
              { text: '异步事件钩子', link: '/documentation/section_action_events#异步事件钩子' },
              { text: '通用事件', link: '/documentation/section_action_events#通用事件' },
              { text: 'CPU 密集型任务', link: '/documentation/section_action_events#执行-cpu-密集型任务' },
              { text: 'I/O 密集型任务', link: '/documentation/section_action_events#执行-i-o-密集型任务' },
              { text: '执行 JavaScript', link: '/documentation/section_action_events#执行-javascript' },
              { text: '读写剪贴板', link: '/documentation/section_action_events#读写剪贴板' },
              { text: '事件 Events', link: '/documentation/section_action_events#事件-events' },
              { text: '自定义错误页面', link: '/documentation/section_action_events#自定义错误页面' },
              { text: '停止运行', link: '/documentation/section_action_events#停止运行-nicegui' },
              { text: '持久化 Storage', link: '/documentation/section_action_events#持久化-storage' },
            ]
          },
          {
            text: '页面与路由',
            link: '/documentation/section_pages_routing',
            items: [
              { text: '页面 Page', link: '/documentation/section_pages_routing#页面-page' },
              { text: '自动导航页面', link: '/documentation/section_pages_routing#自动导航的页面-auto-index-page' },
              { text: '页面布局', link: '/documentation/section_pages_routing#页面布局-page-layout' },
              { text: '子页面 Sub Pages', link: '/documentation/section_pages_routing#子页面-sub-pages' },
              { text: '参数注入', link: '/documentation/section_pages_routing#参数注入-parameter-injection' },
              { text: '页面标题', link: '/documentation/section_pages_routing#页面标题-page-title' },
              { text: '导航功能', link: '/documentation/section_pages_routing#导航功能-navigation-functions' },
              { text: 'ui.open', link: '/documentation/section_pages_routing#ui-open' },
              { text: '下载函数', link: '/documentation/section_pages_routing#下载函数-download-functions' },
              { text: '静态文件', link: '/documentation/section_pages_routing#添加文件-夹-为静态文件' },
              { text: '媒体文件', link: '/documentation/section_pages_routing#添加目录为媒体文件' },
              { text: '添加 HTML', link: '/documentation/section_pages_routing#添加-html-到页面' },
              { text: 'API 响应', link: '/documentation/section_pages_routing#api-响应' },
            ]
          },
          {
            text: '配置与部署',
            link: '/documentation/section_configuration_deployment',
            items: [
              { text: 'URLs', link: '/documentation/section_configuration_deployment#urls' },
              { text: 'ui.run', link: '/documentation/section_configuration_deployment#ui-run' },
              { text: '本机模式 Native Mode', link: '/documentation/section_configuration_deployment#本机模式-native-mode' },
              { text: '本机窗口事件', link: '/documentation/section_configuration_deployment#本机窗口事件-native-window-events' },
              { text: '环境变量读取', link: '/documentation/section_configuration_deployment#环境变量读取' },
              { text: '后台任务', link: '/documentation/section_configuration_deployment#后台任务-background-tasks' },
              { text: '自定义 Vue 组件', link: '/documentation/section_configuration_deployment#自定义-vue-组件' },
              { text: '服务主机 Hosting', link: '/documentation/section_configuration_deployment#服务主机-server-hosting' },
              { text: '打包与安装', link: '/documentation/section_configuration_deployment#打包与安装' },
              { text: 'NiceGUI On Air', link: '/documentation/section_configuration_deployment#nicegui-on-air' },
            ]
          },
          {
            text: '测试',
            link: '/documentation/section_testing',
            items: [
              { text: '项目结构', link: '/documentation/section_testing#项目结构' },
              { text: '用户夹具', link: '/documentation/section_testing#用户夹具' },
              { text: '屏幕夹具', link: '/documentation/section_testing#屏幕夹具' },
            ]
          },
          {
            text: '安全最佳实践',
            link: '/documentation/section_security',
            items: [
              { text: '安全模型', link: '/documentation/section_security#安全模型' },
              { text: '安全的输入解析', link: '/documentation/section_security#安全的输入解析' },
              { text: '组件选择', link: '/documentation/section_security#组件选择' },
              { text: 'URL 验证', link: '/documentation/section_security#url-验证' },
              { text: 'CSS 注入', link: '/documentation/section_security#css-注入' },
              { text: '客户端密钥', link: '/documentation/section_security#客户端密钥' },
              { text: '其他资源', link: '/documentation/section_security#其他资源' },
            ]
          }
        ]
      },
      {
        text: '印记',
        link: '/imprint_privacy',
      },
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zauberzeug/nicegui/' }
    ],

    // 页脚
    footer: {
      message: '更新日期: 2026 年 3 月 27 日', // 每次提交都记得在这里改一下时间和日期
    },

    // 编辑链接
    editLink: {
      pattern: ({ filePath }) => {
        if (filePath.startsWith('packages/')) {
          return `https://github.com/Yuerchu/NiceGUI-docs/edit/main/${filePath}`
        } else {
          return `https://github.com/Yuerchu/NiceGUI-docs/edit/main/docs/${filePath}`
        }
      },
      text: '在 GitHub 上编辑此页面',
    },

    // 翻译
    // 文章翻页
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 外观
    darkModeSwitchLabel: '外观',

    // 当前页面
    outline: {
      label: '当前页面',
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',

    // menu
    sidebarMenuLabel: '菜单',

    // 搜索

    // 404
    notFound: {
      title: '页面未找到',
      quote: 'HTTP 404 - Page Not Found',
      linkText: '返回首页'
    }

  },
  
  rewrites: createRewrites(),

  ignoreDeadLinks: [
    '/documentation/elements',
  ]
})