/* global chrome: false */

// Activates the page_action (extension button) when on a salesforce page

function checkForValidUrl(tabId, changeInfo, tab) {
  // If the tabs url starts with "http://specificsite.com"...
  if (tab.url.includes('my.salesforce.com')) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);