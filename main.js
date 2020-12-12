const { app, BrowserWindow, ipcMain, Notification } = require('electron')

let mainWindow;

app.whenReady().then(() => {
   mainWindow = new BrowserWindow({
      autoHideMenuBar: true,
      show: true,
      webPreferences: {
         contextIsolation: true,
         preload: `${__dirname}/preload.js`
      }
   })
   mainWindow.loadURL(`file://${__dirname}/print.html`)
})

ipcMain.on('printer-list-request', () => {
   console.log('main: printer-list-request');
   mainWindow.webContents.send('printer-list-response', mainWindow.webContents.getPrinters());
})

ipcMain.on('print-app', (event) => {
   console.log('print-app')
   printFocusedWindow();
})

ipcMain.on('print-google', (event) => {
   console.log('print-google')
   printGoogleHome();
})


function printGoogleHome() {
   let printWindow = new BrowserWindow({ show: false, webPreferences: { contextIsolation: true } });
   
   console.log('Print Initiating on google page');
   mainWindow.setProgressBar(2); // > 1.0 --- indeterminate
   printWindow.loadURL("https://www.google.com")
      .then((/*event*/) => {
         let options = {
            silent: false,
            printBackground: true,
            color: '#00ff00',
            margin: {
               marginType: 'printableArea'
            },
            landscape: false,
            pagesPerSheet: 1,
            collate: false,
            copies: 1,
            header: 'Header of the Page',
            footer: 'Footer of the Page'
         }
         printWindow.webContents.print(options, (success, failureReason) => {
            showNotification(`Printing external web page ${success ? 'success' : 'failed ('+failureReason+')'}`);
            printWindow.close();
         });
      })
      .catch(err => console.log('page load error', err))
      .then(() => mainWindow.setProgressBar(-1));
}

function printFocusedWindow() {
   let win = BrowserWindow.getFocusedWindow();
   // let win = BrowserWindow.getAllWindows()[0]; 

   console.log('Print Initiating on focused window');
   win.webContents.print({},
      (success, failureReason) => {
         showNotification(`Printing app window ${success ? 'success' : 'failed ('+failureReason+')'}`);
      }
   );
}

function showNotification(title, body) {
   new Notification({ title, body }).show();
}
