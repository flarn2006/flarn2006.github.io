// ==UserScript==
// @name     Unnamed Script 701420
// @version  1
// @grant    none
// @include  https://steganography.live/encrypt
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
  
  // Disable form validation + "Please Wait..."
  
  var form = document.getElementById('form');
  form.onsubmit = function() {
    return true;
  };
  
  
  // Add character count
  
  var textarea = $('#message_text');
  
  var countdiv = $('<div style="font-size: smaller"></div>')
    .css('margin-bottom', textarea.css('margin-bottom'))
    .insertAfter(textarea);
  
  var update_count = function() {
    countdiv.text(textarea.val().length + ' / 800');
  };
  
  textarea.css('margin-bottom', '2px').on('input', update_count);
  update_count();
  
});
