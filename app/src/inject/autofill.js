/* eslint no-unused-vars: 0 */
/* global chrome */

(function() {
  let settings = {username: undefined, assignment: undefined, options: []};

  var listeners = [
    'templateTitle.addEventListener(\'dblclick\', template)',
    'category.addEventListener(\'dblclick\', rest)',
    'custUsername.addEventListener(\'keypress\', (e) => (e.key === \'Enter\') ? phnum.focus(): false)',
    'phnum.addEventListener(\'keypress\', (e) => (e.key === \'Enter\') ? apptType.focus() : false)',
    'apptType.addEventListener(\'change\', () => osType.focus())',
    'solutionType.addEventListener(\'dblclick\', closeTicket)',
    'solutionType.addEventListener(\'change\', () => hoursWorked.focus())'
  ];

  chrome.storage.sync.get(['location', 'username', 'options'], function(items) {
    if(!items.location || !items.username) {
      alert('If you want to use Remedy Autofill, you have to configure it in extension settings.');
    } else {
      settings.username = items.username;
      settings.assignment = items.location;
      settings.options = items.options;
      applySettings(listeners);
    }
  });

  const category = document.querySelector('#arid_WIN_0_536871108');
  const subCategory = document.querySelector('#arid_WIN_0_536871109');
  const templateCategory = document.querySelector('#arid_WIN_0_536870987');
  const templateTitle = document.querySelector('#arid_WIN_0_536870986');
  const assignedTo = document.querySelector('#arid_WIN_0_4');
  const longDescription = document.querySelector('#arid_WIN_0_536870925');
  const custUsername = document.querySelector('#arid_WIN_0_536871077');
  const phnum = document.querySelector('#arid_WIN_0_536870918');
  const apptType = document.querySelector('#arid_WIN_0_536870957');
  const osType = document.querySelector('#arid_WIN_0_536871005');
  const status = document.querySelector('#arid_WIN_0_7');
  const closed = document.querySelector('#arid_WIN_0_536870980');
  const solutionType = document.querySelector('#arid_WIN_0_536870958');
  const hoursWorked = document.querySelector('#arid_WIN_0_536870933');
  const remedyMode = document.querySelector('.TBTopBarStatusMode');

  const change = new Event('change');

  function template() {
    checkRemedyMode();
    templateCategory.value = 'SCS';
    templateCategory.dispatchEvent(change);
    templateTitle.value = `SCS: Walk-in ${settings.assignment}`;
    templateTitle.dispatchEvent(change);
  }

  function rest() {
    category.value = 'Client - Hardware / Software';
    category.dispatchEvent(change);
    subCategory.value = 'Software Application - Supported';
    subCategory.dispatchEvent(change);
    assignedTo.value = settings.username;
    assignedTo.dispatchEvent(change);
    longDescription.value = longDescription.value.replace(', Desktop, Tablet, Smartphone', '');
    custUsername.focus();
  }

  function closeTicket() {
    status.value = 'Closed';
    status.dispatchEvent(change);
    closed.value = 'Resolved';
    closed.dispatchEvent(change);
    solutionType.focus();
  }

  function checkRemedyMode() {
    if(remedyMode.innerHTML === 'Search') {
      alert('You are in search mode. Are you sure that is what you want?');
    }
  }

  function applySettings(allListeners) {
    var usedListeners = allListeners.filter((item, index) => settings.options[index]);
    usedListeners.forEach((listener) => eval(listener));
  }

})();
