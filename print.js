const { ipcRenderer } = require('electron')

console.log('ipcRenderer', ipcRenderer);

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
	ipcRenderer.send('perform-action', 23);
}); 
