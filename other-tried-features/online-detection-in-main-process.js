const { ipcRenderer } = require('electron')

const updateOnlineStatus = () => {
   let msg = navigator.onLine ? 'online' : 'offline'
   ipcRenderer.send('online-status-changed', msg)
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()


document.querySelector('#node-version').innerHTML = process.versions.node