
chrome.browserAction.onClicked.addListener(function (tab) {
  alert('jos');
  // console.log('Injecting content script(s)');
  // //On Firefox document.body.textContent is probably more appropriate
  // chrome.tabs.executeScript(tab.id, {
  //   code: 'document.body.innerText;'
  //   //If you had something somewhat more complex you can use an IIFE:
  //   //code: '(function (){return document.body.innerText;})();'
  //   //If your code was complex, you should store it in a
  //   // separate .js file, which you inject with the file: property.
  // }, receiveText);
});
