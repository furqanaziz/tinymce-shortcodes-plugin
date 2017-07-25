var editor = top.tinymce.activeEditor;
var win = editor.windowManager;
// var icons = document.querySelectorAll('.icon-container .icon-name');
// document.getElementById("search").addEventListener("keyup", searchIcon);
var allFields = document.querySelectorAll('.all-fields');
var form = document.getElementById("shortcodeForm");
var shortcode = document.getElementById("shortcode");
var element;
var code = [];
var shortcodes = {
  'var': 'var-section',
  'page': 'slug-section',
  'post': 'slug-section',
  'block': 'slug-section',
  'form': 'slug-section',
  'menu': 'slug-section',
  'social posts': 'social-posts-section',
  'blog posts': 'blog-posts-section',
};

shortcode.addEventListener("change", showForm);
form.addEventListener("submit", submitForm);

// Hide all fields
hideAll();

/* functions */

function hideAll() {
  for (i = 0; i < allFields.length; i++) {
    allFields[i].style.display = 'none';
  }
}

function showForm() {
  // Hide all fields
  hideAll();

  var val = shortcode.value;
  if(val && val != 'var' && val != 'social posts' && val != 'blog posts'){
    selectOptions(val);
    toggle(val)
  }else{
    toggle(val);
  }
}

function submitForm() {
  var formData = $('#shortcodeForm').serializeArray();
  $.each(formData, function(index, data) {
    if(data.value){
      code.push(data.value);
    }
  });
  editor.execCommand('mceInsertRawHTML', false, makeShortCode(code));
  win.close();
}

function makeShortCode(data) {
  data = data.join('-');
  data = data.replace('-',':');
  data = data.replace(' ','-');
  return '{{' + data + '}}';
}

function toggle(_val) {
  for (var key in shortcodes) {
    // show correct filed
    if(key == _val) {
      element = document.getElementById(shortcodes[key]);
      element.style.display = 'block';
      document.getElementById("submit-button").style.display = 'block';
    }
  }
}

function selectOptions(_val) {
  var options = '';
  var token = JSON.parse(window.sessionStorage.getItem('token'));

  jQuery.ajax({
    type: "GET",
    url: '/api/' + _val + 's/slug',
    headers: {"Authorization": 'Bearer ' + token},
    dataType: "json",
    success: function(response) {
      response.data.forEach(function(_row) {
        options += '<option value="' + _row.slug + '">' + _row.title + '</option>';
      });
      jQuery('#slug').html(options);
    },
    error: function(errorObject, errorText, errorHTTP) {
    }
  });
}

// function searchIcon(){
// 	var val = document.getElementById("search").value;
// 	for (i = 0; i < icons.length; i++) {
// 		iconContainer[i].style.display = 'block';
// 	}
// 	for (i = 0; i < icons.length; i++) {
// 		if(icons[i].innerHTML.search(val) == -1){
// 			iconContainer[i].style.display = 'none';
// 		}
// 	}
// }

// for (i = 0; i < icons.length; i++) {
// 	icons[i].addEventListener('dblclick', function(e) {
// 		var html = '<span class="' + e.target.innerHTML + '">&nbsp;</span>';
// 		editor.execCommand('mceInsertRawHTML', false, html);
// 		win.close();
// 	});
// }
