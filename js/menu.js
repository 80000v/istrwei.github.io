var Menu = require('menu')

var template = [
  {
    label: 'Cumulus',
    submenu: [
      // {
      //   label: '关于',
      //   selector: 'orderFrontStandardAboutPanel:'
      // },
      // {
      //   type: 'separator'
      // },
      {
        label: '隐藏软件',
        accelerator: 'CmdOrCtrl+H',
        selector: 'hide:'
      },
      {
        label: '隐藏其他软件',
        accelerator: 'CmdOrCtrl+Shift+H',
        selector: 'hideOtherApplications:'
      },
      {
        label: '显示所有',
        selector: 'unhideAllApplications:'
      },
      {
        type: 'separator'
      },
      {
        label: '退出',
        accelerator: 'CmdOrCtrl+Q',
        selector: 'terminate:'
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:'
      }
    ]
  }
]

module.exports = Menu.buildFromTemplate(template)