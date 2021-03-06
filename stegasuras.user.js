// ==UserScript==
// @name     STEGASURAS Improvements
// @version  2.2.2
// @grant    none
// @include  https://steganography.live/
// @include  https://steganography.live/encrypt
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// ==/UserScript==

function add_option(sel, n, first)
{
	var opt = document.createElement('option');
	opt.value = n;
	opt.innerText = '2^' + n;
	if (first) {
		sel.insertBefore(opt, sel.firstChild);
	} else {
		sel.appendChild(opt);
	}
}

$(document).ready(function() {
	if (document.getElementById('lm_clearbtn')) {
		return;
	}
	
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
		countdiv.text(textarea.val().length + ' character(s)');
	};
	
	textarea.css('margin-bottom', '2px').on('input', update_count);
	update_count();
	
	
	// Add more options for "Huffman" and "Bins"
	
	var select = document.querySelector('#huffman_param td.second select');
	add_option(select, 0, true);
	for (var n = 6; n <= 16; n += 2) {
		add_option(select, n, false);
	}
	
	select = document.querySelector('#bins_param td.second select');
	add_option(select, 0, true);
	for (var n = 6; n <= 16; n += 2) {
		add_option(select, n, false);
	}
	
	
	// Add Clear button to LM Context
	
	var lm_clearbtn = document.createElement('button');
	lm_clearbtn.id = 'lm_clearbtn';
	lm_clearbtn.innerText = 'Clear';
	lm_clearbtn.onclick = function() {
		document.getElementById('context').value = '';
		return false;
	};
	$(lm_clearbtn).insertAfter('label[for="context"]');
		
	
	// Add extra buttons to Secret Message
	
	var clearbtn = document.createElement('button');
	clearbtn.innerText = 'Clear';
	clearbtn.onclick = function() {
		document.getElementById('message_text').value = '';
		update_count();
		return false;
	};
		
	var delbtn = document.createElement('button');
	delbtn.innerText = '-100';
	delbtn.onclick = function() {
		var textarea = document.getElementById('message_text');
		textarea.value = textarea.value.slice(0, textarea.value.length - 100);
		update_count();
		return false;
	};
	
	var randbtn = document.createElement('button');
	randbtn.innerText = '+100';
	randbtn.onclick = function() {
		var str = '';
		for (var n = 0; n < 100; ++n) {
			str += String.fromCharCode(65 + Math.random() * 26);
			if (n % 10 == 8) {
				str += ' ';
				++n;
			}
		}
		document.getElementById('message_text').value += str
		update_count();
		return false;
	};
	
	$(delbtn).insertAfter($(randbtn).insertAfter($(clearbtn).insertAfter('label[for="message_text"]')));
	
	
	// Add "Prepend LM Context" button
	
	var cover_text = $('textarea[name="cover_text"]');
	if (cover_text) {
		var prependbtn = document.createElement('button');
		prependbtn.innerText = 'Prepend LM Context';
		prependbtn.onclick = function() {
			var lmctx = $('textarea[name="context"]').val();
			if (!cover_text.val().startsWith(lmctx)) {
				cover_text.val(lmctx + cover_text.val());
			}
			
			if (!document.getElementById('lm_usecoverbtn')) {
				var lm_usecoverbtn = document.createElement('button');
				lm_usecoverbtn.id = 'lm_usecoverbtn'
				lm_usecoverbtn.innerText = 'Use Cover Text';
				lm_usecoverbtn.onclick = function() {
					$('textarea[name="context"]').val(cover_text.val());
					return false;
				};
				$(lm_usecoverbtn).insertAfter('#lm_clearbtn');
			}
			
			return false;
		};
		$(prependbtn).insertAfter('label[for="cover_text"]');
	}
});
