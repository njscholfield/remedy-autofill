/* global chrome: false */

const btnNewCompSetup = document.getElementById('js-new-comp-setup');
const btnOther = document.getElementById('js-other');
const locationLabel = document.getElementById('location-label');

function sendMessage(subject) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
      tabs[0].id, {
        from: 'popup',
        subject: subject
      });
  });
}

btnOther.addEventListener('click', () => sendMessage('fillDefaults'));
btnNewCompSetup.addEventListener('click', () => sendMessage('newComputerSetup'));

// Gets and displays location setting in popup
(function fillLocation() {
  chrome.storage.sync.get(['location'], function(settings) {
    locationLabel.innerHTML = (settings.location) ? settings.location.replace(/_/g, ' ') : 'Please set a location';
  });
})();