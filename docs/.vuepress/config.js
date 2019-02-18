module.exports = {
  evergreen: true,
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '骚年，这是一个充满传奇的笔记！',
      description: ''
    }
  },
  themeConfig: {
    sidebarDepth: 2,
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        lastUpdated: '上次编辑时间',
        sidebar: {
          '/': [
            {
              title: '随笔',
              children: [
                '/notes/Linux',
                '/notes/PHP',
                '/notes/Nginx',
                '/notes/JavaScript',
                '/notes/Document',
                '/notes/GitHelp',
                '/notes/NmapHelp'
              ]
            }
          ]
        }
      }
    }
  },
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `https://shanghai-1252046632.cos.ap-shanghai.myqcloud.com/rat_red.favicon.ico` }]
  ]
}

