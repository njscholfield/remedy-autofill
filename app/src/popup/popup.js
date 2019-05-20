/* global chrome: false */

let getFillTypes;
chrome.runtime.getBackgroundPage(bgPage => getFillTypes = bgPage.getFillTypes);

const locationLabel = document.getElementById('location-label');
const btnContainer = document.getElementById('buttons');

let autofills = [];

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

// Gets and displays location setting in popup
(function fillLocation() {
  chrome.storage.sync.get(['location'], function(settings) {
    locationLabel.innerHTML = (settings.location) ? settings.location.replace(/_/g, ' ') : 'Please set a location';
    autofills = getFillTypes(settings).filter(item => item.users[settings.location]);
    autofills.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.classList.add('btn');
      btn.textContent = item.name;
      btn.dataset.index = index;
      btn.addEventListener('click', () => sendMessage(index));
      btnContainer.appendChild(btn);
    });
  });
})();
