console.log(window.appApis);

document.querySelector('#print-app')
   .addEventListener('click', window.appApis.printApp);

document.querySelector('#print-google')
   .addEventListener('click', window.appApis.printGoogle);

document.querySelector('#node-version').innerHTML = '234234234';