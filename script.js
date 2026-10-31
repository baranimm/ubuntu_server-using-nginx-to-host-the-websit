(function () {
  'use strict';

  // Theme toggle (remembers the choice, falls back to the system preference)
  var root = document.documentElement;
  var themeBtn = document.getElementById('theme');

  try {
    var saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}

  themeBtn.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    if (!current) {
      current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Copy buttons for email and phone
  document.querySelectorAll('.copy').forEach(function (button) {
    button.addEventListener('click', function () {
      var target = document.getElementById(button.dataset.copy);
      var text = target.textContent.trim();

      function flash(label) {
        button.textContent = label;
        setTimeout(function () { button.textContent = 'Copy'; }, 1500);
      }

      // Fallback: select the text so the visitor can copy it manually
      function fallback() {
        var range = document.createRange();
        range.selectNodeContents(target);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        flash('Selected');
      }

      try {
        navigator.clipboard.writeText(text).then(function () { flash('Copied'); }, fallback);
      } catch (e) {
        fallback();
      }
    });
  });
})();

