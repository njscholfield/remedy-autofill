/* global chrome: false */

const btn = document.querySelector('#js-button');

function fill() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
      tabs[0].id, {
        from: 'popup',
        subject: 'fillDefaults'
      });
  });
}
btn.addEventListener('click', fill);