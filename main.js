const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
// const Protocol = 'myapp' // myapp://
let mainWindow
let openUrlStr // 网页调起客户端url
// app.removeAsDefaultProtocolClient(Protocol)
// 打包指定了protocols，无需代码设置
// app.setAsDefaultProtocolClient(Protocol)
app.on('open-url', (event, urlStr) => {
  console.log('mac 准备执行网页端调起客户端逻辑');
  // mainWindow可能还未创建
  openUrlStr = urlStr
  if (mainWindow) {
    // 演示使用
    mainWindow.webContents.send('open-url', urlStr)
  }
})

let winurl ='file://' + path.join(__dirname, './index.html')
const createWindow = () => {
  mainWindow = new BrowserWindow({
    minWidth: 740,
    minHeight: 600,
    width: 740,
    height: 600,
    show: false,
    // titleBarStyle: 'hidden',
    webPreferences: {
      enableRemoteModule: false,
      webSecurity: true,
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(winurl)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    if (openUrlStr) {
      mainWindow.webContents.send('open-url', openUrlStr)
    }
  })
}

app.on('ready', createWindow)
