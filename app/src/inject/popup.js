/* global chrome: false */

const btnNewCompSetup = document.getElementById('js-new-comp-setup');
const btnOther = document.querySelector('#js-other');

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