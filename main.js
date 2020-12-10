const { app, BrowserWindow, ipcMain, Notification } = require('electron')

let onlineStatusWindow;

// app.whenReady()
//    .then(createWindow)
//    .then(() => {
//       let x = ipcMain.on('perform-action', (event, ...args) => {
//          console.log('perform-action', event, args);
//          let win = BrowserWindow.getFocusedWindow();
//          // let win = BrowserWindow.getAllWindows()[0]; 

//          win.webContents.print(options, (success, failureReason) => {
//             if (!success) console.log(failureReason);

//             console.log('Print Initiated');
//          });
//       });

//       showNotification();

//       console.log('ready then', x);
//    });

app.whenReady().then(() => {
   onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
   onlineStatusWindow.loadURL(`file://${__dirname}/online-detection.html`)
 })

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

   //win.loadFile('notification.html');
   win.loadFile('online-detection.html');
}

function showNotification() {
   const notification = {
      title: 'Basic Notification',
      body: 'Notification from the Main process'
   }
   new Notification(notification).show()
}
