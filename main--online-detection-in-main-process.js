const { app, BrowserWindow, ipcMain } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
   onlineStatusWindow = new BrowserWindow({ autoHideMenuBar: true, show: true, webPreferences: { nodeIntegration: true } })
   onlineStatusWindow.loadURL(`file://${__dirname}/online-detection-in-main-process.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
   console.log(status)
   console.log(onlineStatusWindow);

   handlePrint();
})

function handlePrint() {
   let printWindow = new BrowserWindow({ autoHideMenuBar: true, show: false });
   printWindow.loadURL("www.google.com");
   let list = printWindow.webContents.getPrinters();
   console.log("All printer available are ", list);

   // printWindow.webContents.print({ silent: true, printBackground: true });

   var options = {
      silent: false,
      printBackground: true,
      color: false,
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
   let win = BrowserWindow.getFocusedWindow();
   // let win = BrowserWindow.getAllWindows()[0]; 

   console.log('Print Initiating...');
   win.webContents.print(options, (success, failureReason) => {
      console.log(success, failureReason);

   });
}
