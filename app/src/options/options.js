/* global chrome */

(function(){
  const user = document.querySelector('#username');
  const assignment = document.querySelector('#location');
  const form = document.querySelector('form');
  const success = document.querySelector('.success');
  const features = [...document.querySelectorAll('input[type="checkbox"]')];

  function submit(e) {
    e.preventDefault();
    const userval = user.value;
    const assignVal = assignment.value;
    const options = features.map((input, index, array) => {
      return (index === 3 || index === 4) ? array[2].checked : (index === 6) ? array[5].checked : input.checked;
    });

    chrome.storage.sync.set({username: userval, location: assignVal, options: options}, function() {
      success.classList.remove('hidden');
    });
  }

  (function fillSavedValues() {
    chrome.storage.sync.get(['username', 'location', 'options'], function(settings) {
      user.value = settings.username || '';
      assignment.value = settings.location || 'TechRow';
      features.forEach((checkbox, index) => checkbox.checked = settings.options[index]);
    });
  })();

  form.addEventListener('submit', submit);
})();
