/* global chrome */

(function(){
  const user = document.querySelector('#username');
  const assignment = document.querySelector('#location');
  const form = document.querySelector('form');
  const success = document.querySelector('.success');

  function submit(e) {
    e.preventDefault();
    const userval = user.value;
    const assignVal = assignment.value;
    chrome.storage.sync.set({username: userval, location: assignVal}, function() {
      success.classList.remove('hidden');
    });
  }

  (function fillSavedValues() {
    chrome.storage.sync.get(['username', 'location'], function(items) {
      user.value = items.username || '';
      assignment.value = items.location || 'TechRow';
    });
  })();

  form.addEventListener('submit', submit);
})();
