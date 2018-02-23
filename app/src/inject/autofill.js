/* eslint no-unused-vars: 0 */
/* global chrome */
/* Created by Noah Scholfield */

(function() {
  const pageD = document.querySelector('.pageDescription');
  if (!pageD || !pageD.innerHTML.includes('New Case')) return;

  chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if(msg.from === 'popup' && msg.subject === 'fillDefaults') {
      fillDefaults();
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

  // Variables used to autofill the dropdowns in fillDefaults()
  const HELP_DESK = 'Help Desk';
  const CASE_ORIGIN_HELPDESK = 'Phone';
  const CASE_ORIGIN = 'Walk-In';
  const SERVICE_TYPE = 'Problem';
  const SERVICE_AREA = 'End-Point Computing';

  const change = new Event('change');

  // Function that selects commonly used dropdown values
  function fillDefaults() {
    if(settings.location === HELP_DESK) {
      caseOrigin.value = CASE_ORIGIN_HELPDESK;
    } else {
      caseOrigin.value = CASE_ORIGIN;
      caseOrigin.dispatchEvent(change);
      serviceType.value = SERVICE_TYPE;
      serviceArea.value = SERVICE_AREA;
      serviceArea.dispatchEvent(change);
      setTimeout(() => {
        const deskLocation = document.getElementById('00N4100000c7KJH');
        deskLocation.value = settings.location;
      }, 0);
    }
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
  };

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