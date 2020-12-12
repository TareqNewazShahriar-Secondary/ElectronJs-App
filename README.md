# ElectronJs App

What does this application do:
* Prints contents of its own application window and a external web page.
* Shows progress on taskbar while loadig the web page.
* Shows OS level notification when printing is done.

`contextIsolation` (`contextBridge`) is used in this application. To improve security, *Electron* team deprecated `nodeIntegration` flag and `contextIsolation` will be enabled by default from *Electron 12*.

### Screenshots

<img alt="app-window" src="app-screenshots/app-window.PNG" height="400" />

Print Output (in PDF)

<img alt="print-result--app-print-window-printed-to-pdf" src="app-screenshots/print-result--app-print-window-printed-to-pdf.png"  height="400" />

<img alt="print-result--google.com-printed-to-pdf" src="app-screenshots/print-result--google.com-printed-to-pdf.png"  height="400" />

---
TareqNewazShahriar
