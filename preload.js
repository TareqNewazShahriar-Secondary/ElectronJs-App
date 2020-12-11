const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
   'appApis',
   {
      printApp: () => ipcRenderer.send('print-app'),
      printGoogle: () => ipcRenderer.send('print-google')
   }
)