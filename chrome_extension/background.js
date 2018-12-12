// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "debucsser.js" file & execute it
	chrome.tabs.executeScript(tab.ib, {
		file: 'debucsser.js'
	});
});