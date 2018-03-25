/* global chrome */
/* Created by Noah Scholfield */

(function(){
  const location = document.querySelector('#location');
  const form = document.querySelector('form');
  const success = document.querySelector('.success');
  const features = [...document.querySelectorAll('input[type="checkbox"]')];

  // Saves extension settings
  function submit(e) {
    e.preventDefault();
    const assignVal = location.value;
    const options = features.map((input) => {
      return input.checked;
    });

    chrome.storage.sync.set({location: assignVal, options: options}, function() {
      success.classList.remove('hidden');
    });
  }

  // Displays the currently saved settings
  (function fillSavedValues() {
    chrome.storage.sync.get(['location', 'options'], function(settings) {
      location.value = settings.location || 'University_Store_on_5th';
      features.forEach((checkbox, index) => checkbox.checked = settings.options[index]);
    });
  })();

  form.addEventListener('submit', submit);
})();
