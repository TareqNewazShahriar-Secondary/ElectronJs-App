const { app, BrowserWindow, ipcMain } = require('electron')

let onlineStatusWindow;

app.whenReady().then(() => {
   onlineStatusWindow = new BrowserWindow({
      autoHideMenuBar: true,
      show: true,
      webPreferences: {
         contextIsolation: true,
         preload: `${__dirname}/preload.js`
      }
   })
   onlineStatusWindow.loadURL(`file://${__dirname}/print.html`)
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
   let printWindow = new BrowserWindow({ autoHideMenuBar: true, show: false, webPreferences: { contextIsolation: true } });
   
   let list = printWindow.webContents.getPrinters();
   console.log("All printer available are ", list.map(x => x.displayName));

   console.log('Print Initiating on google page', printWindow.webContents);
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
            console.log('print success', success, failureReason);
            printWindow.close();
         });
      })
      .catch(err => console.log('page load error', err));
}

function printFocusedWindow() {
   let win = BrowserWindow.getFocusedWindow();
   // let win = BrowserWindow.getAllWindows()[0]; 

   console.log('Print Initiating on focused window');
   win.webContents.print({},
      (success, failureReason) => {
         console.log('print success', success, failureReason);
      }
   );
}