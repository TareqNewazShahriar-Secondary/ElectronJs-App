const { app, BrowserWindow, ipcMain, Notification } = require('electron')

app.whenReady()
   .then(() => {
      console.log('app ready');
      ipcMain.handle('perform-action', (event, ...args) => {
         console.log('perform-action', event, args);
         let win = BrowserWindow.getFocusedWindow();
         // let win = BrowserWindow.getAllWindows()[0]; 

         win.webContents.print(options, (success, failureReason) => {
            if (!success) console.log(failureReason);

            console.log('Print Initiated');
         });
      });

      createWindow();
   })
   .then(showNotification);

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit()
   }
})

app.on('activate', () => {
   console.log('app activate', BrowserWindow.getAllWindows());

   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
   }
})

function createWindow() {
   const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
         nodeIntegration: true
      }
   });

   win.loadFile('index.html')
}

function showNotification() {
   const notification = {
      title: 'Basic Notification',
      body: 'Notification from the Main process'
   }
   new Notification(notification).show()
}
