/* global chrome */

(function() {
  let username = undefined;
  let assignment = undefined;

  chrome.storage.sync.get(['location', 'username'], function(items) {
    if(items.location === undefined || items.username === undefined || items.username === '') {
      alert('If you want to use Remedy Autofill, you have to configure it in extension settings.');
    } else {
      username = items.username;
      assignment = items.location;
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

  const change = new Event('change');

  function template() {
    templateCategory.value = 'SCS';
    templateCategory.dispatchEvent(change);
    templateTitle.value = `SCS: Walk-in ${assignment}`;
    templateTitle.dispatchEvent(change);
  }

  function rest() {
    category.value = 'Client - Hardware / Software';
    category.dispatchEvent(change);
    subCategory.value = 'Software Application - Supported';
    subCategory.dispatchEvent(change);
    assignedTo.value = username;
    assignedTo.dispatchEvent(change);
    longDescription.value = longDescription.value.replace(', Desktop, Tablet, Smartphone', '');
    custUsername.focus();
  }

  templateTitle.addEventListener('dblclick', template);
  category.addEventListener('dblclick', rest);
  custUsername.addEventListener('keypress', (e) => (e.key === 'Enter') ? phnum.focus(): false);
  phnum.addEventListener('keypress', (e) => (e.key === 'Enter') ? apptType.focus() : false);
})();
