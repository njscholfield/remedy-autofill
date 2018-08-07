/* eslint no-unused-vars: 0 */
/* global chrome */
/* Created by Noah Scholfield */

(function() {
  const pageD = document.querySelector('.pageDescription');
  if (!pageD || !pageD.innerHTML.includes('New Case')) return;

  chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if(msg.from !== 'popup') return;
    if(msg.subject === 'fillDefaults') {
      fillDefaults();
    } else if(msg.subject === 'newComputerSetup') {
      fillNewComputerSetup();
    }
  });

  let settings = {
    assignment: undefined,
    options: []
  };

  var listeners = [
    'searchBtn.addEventListener(\'click\', searchUsername)',
    'contactName.addEventListener(\'dblclick\', fillDefaults)'
  ];

  // Load saved settings
  chrome.storage.sync.get(['location', 'options'], function(items) {
    if(!items.location) {
      alert('If you want to use TSD Autofill, you have to configure it in extension settings.\nRight click the extension icon and click "options".');
    } else {
      settings.location = items.location;
      settings.options = items.options;
      applySettings(listeners);
    }
  });

  // Element variables
  const contactName = document.getElementById('cas3');
  const caseOrigin = document.getElementById('cas11');
  const serviceArea = document.getElementById('00N4100000c7Bby');
  const serviceType = document.getElementById('cas5');
  const searchBtn = document.getElementById('cas3_lkwgt');
  const subject = document.getElementById('cas14');
  const descriptionBox = document.getElementById('cas15');
  const supportedApp = document.getElementById('CF00N4100000cutap');
  const deviceType = document.getElementById('00N4100000c7KI9');
  const osType = document.getElementById('00N4100000c7KIc');

  // Variables used to autofill the dropdowns in fillDefaults()
  const HELP_DESK = 'Help Desk';
  const PHONE = 'Phone';
  const WALK_IN = 'Walk-In';
  const PROBLEM = 'Problem';
  const ENDPOINT_COMP = 'End-Point Computing';
  
  // Variables used to New Computer Setup
  const NEW_COMP_SETUP = 'New Computer Setup';
  const ENDPOINT_SUPPORT = 'End-Point Support (Desktops, Mobile Devices, etc.)';
  const LAPTOP = 'Laptop';
  const OFFICE_365 = 'Microsoft Office 365 Suite';

  const change = new Event('change');

  // Function that selects commonly used dropdown values
  function fillDefaults() {
    if(settings.location === HELP_DESK) {
      caseOrigin.value = PHONE;
    } else {
      caseOrigin.value = WALK_IN;
      caseOrigin.dispatchEvent(change);
      serviceType.value = PROBLEM;
      serviceArea.value = ENDPOINT_COMP;
      serviceArea.dispatchEvent(change);
      setTimeout(() => {
        const deskLocation = document.getElementById('00N4100000c7KJH');
        deskLocation.value = settings.location;
      }, 0);
    }
  }
  
  // Function that fills fields for a New Computer Setup
  function fillNewComputerSetup() {
    fillDefaults();
    if(settings.location === HELP_DESK) return; // Help Desk doesn't do New Computer Setups
    subject.value = NEW_COMP_SETUP;
    descriptionBox.value = NEW_COMP_SETUP;
    supportedApp.value = OFFICE_365;
    const service = document.getElementById('00N4100000c7Bbt');
    service.value = ENDPOINT_SUPPORT;
    deviceType.value = LAPTOP;
    osType.focus();
  }

  // Function to inject into the popup search window
  function search() {
    const frame = document.getElementById('searchFrame').contentDocument;
    const allFields = frame.getElementById('lkenhmdSEARCH_ALL');
    const theForm = frame.getElementById('theForm');
    allFields.checked = true;theForm.submit();
    const resFrame = document.getElementById('resultsFrame');
    resFrame.onload = function() {
      const resDoc = resFrame.contentDocument;
      const rows = resDoc.querySelector('.list').rows;
      if (rows.length === 2) {
        rows[1].cells[0].firstElementChild.click();
        window.close();
      }
    };
  }

  // Function that allows for one-click username searches
  function searchUsername(e) {
    e.preventDefault();
    const urlstring = '/_ui/common/data/LookupPage?lkfm=editPage&lknm=cas3&lktp=' + document.getElementById('cas3_lktp').value + '&lksrch=' + contactName.value;
    const searchWindow = window.open(urlstring);
    const theDoc = searchWindow.document;
    const theScript = document.createElement('script');
    theScript.innerHTML = 'window.onload = ' + search.toString();
    theDoc.body.appendChild(theScript);
    searchBtn.removeEventListener('click', searchUsername);
  }

  // Enables functions based upon extension settings
  function applySettings(allListeners) {
    var usedListeners = allListeners.filter((item, index) => settings.options[index]);
    usedListeners.forEach((listener) => eval(listener));
  }

})();