/* eslint no-unused-vars: 0 */
/* global chrome, getFillTypes */
/* Created by Noah Scholfield */

(function(getFillTypes) {
  const pageD = document.querySelector('.pageDescription');
  if (!pageD || !pageD.innerHTML.includes('New Case')) { return false; }

  let settings = {
    location: undefined,
    options: []
  };

  var listeners = [
    'searchBtn.addEventListener(\'click\', searchUsername)',
    'contactName.addEventListener(\'dblclick\', () => fillFields(autofills[0]))'
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

  let autofills = [];

  const searchBtn = document.getElementById('cas3_lkwgt');
  const contactName = document.getElementById('cas3');
  const change = new Event('change');

  function fillFields(values) {
    values.actions.forEach(action => {
      const field = document.getElementById(action.element);
      field.value = action.value;
      field.dispatchEvent(change);
    });
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
    autofills = getFillTypes(settings).filter(item => item.users[settings.location]);
    console.log(autofills);
    var usedListeners = allListeners.filter((item, index) => settings.options[index]);
    usedListeners.forEach((listener) => eval(listener));
  }

  chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if(msg.from !== 'popup') return;
    if(msg.subject >= 0) {
      console.log(msg.subject);
      fillFields(autofills[msg.subject]);
    }
  });
}(getFillTypes));
