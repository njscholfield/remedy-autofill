/* global chrome */

(function(){
  const assignment = document.querySelector('#location');
  const form = document.querySelector('form');
  const success = document.querySelector('.success');
  const features = [...document.querySelectorAll('input[type="checkbox"]')];

  function submit(e) {
    e.preventDefault();
    const assignVal = assignment.value;
    const options = features.map((input) => {
      return input.checked;
    });

    chrome.storage.sync.set({location: assignVal, options: options}, function() {
      success.classList.remove('hidden');
    });
  }

  (function fillSavedValues() {
    chrome.storage.sync.get(['location', 'options'], function(settings) {
      assignment.value = settings.location || 'University_Store_on_ 5th';
      features.forEach((checkbox, index) => checkbox.checked = settings.options[index]);
    });
  })();

  form.addEventListener('submit', submit);
})();
