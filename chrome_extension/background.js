// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
  // for the current tab, inject the "debucsser.js" file & execute it
  // let isActive = true;
  // chrome.runtime.reload();
	chrome.tabs.executeScript(tab.id, {
		file: 'debucsser.js'
	});
});