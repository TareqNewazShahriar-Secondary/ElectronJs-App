const { app, BrowserWindow, ipcMain } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ show: true, webPreferences: { nodeIntegration: true } })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-detection-in-main-process.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
