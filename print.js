console.log(window.appApis);

document.querySelector('#print-app')
   .addEventListener('click', window.appApis.printApp);

document.querySelector('#print-google')
   .addEventListener('click', window.appApis.printGoogle);

 window.appApis.printerList(data => {
   document.querySelector('#printer-list').innerHTML =
      data.map(x => `<li>${x.displayName}</li>`).join('');
 });
 