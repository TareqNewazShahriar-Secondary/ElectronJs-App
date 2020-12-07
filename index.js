const electron = require('electron') 
// Importing BrowserWindow from Main 

console.log('electron.remote', electron.remote);
const BrowserWindow = electron.remote.BrowserWindow; 

var current = document.getElementById('print_button'); 
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

current.addEventListener('click', (event) => { 
	let win = BrowserWindow.getFocusedWindow(); 
	// let win = BrowserWindow.getAllWindows()[0]; 

	win.webContents.print(options, (success, failureReason) => { 
		if (!success) console.log(failureReason); 

		console.log('Print Initiated'); 
	}); 
}); 
