const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld(
   'appApis',
   {
      printApp: () => ipcRenderer.send('print-app'),
      printGoogle: () => ipcRenderer.send('print-google'),
      printerList: (callback) => {
         console.log('preload: printerList');
         ipcRenderer.send('printer-list-request');
         // Deliberately strip event as it includes `sender` 
         ipcRenderer.on('printer-list-response', (event, list) => callback(list));
      },
      updateApp: () => ipcRenderer.send('update-app'),
      attachLog: (callback) => ipcRenderer.on('to-view', (event, data) => callback(data))
   }
);
