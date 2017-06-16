var editor = top.tinymce.activeEditor;
var win = editor.windowManager;
var icons = document.querySelectorAll('.icon-container .icon-name');
var iconContainer = document.querySelectorAll('.icon-container');
document.getElementById("search").addEventListener("keyup", searchIcon);
/* function */
function searchIcon(){
	var val = document.getElementById("search").value;
	for (i = 0; i < icons.length; i++) {
		iconContainer[i].style.display = 'block';
	}
	for (i = 0; i < icons.length; i++) {
		if(icons[i].innerHTML.search(val) == -1){
			iconContainer[i].style.display = 'none';
		}
	}
}
for (i = 0; i < icons.length; i++) {
	icons[i].addEventListener('dblclick', function(e) {
		var html = '<span class="' + e.target.innerHTML + '">&nbsp;</span>';
		editor.execCommand('mceInsertRawHTML', false, html);
		win.close();
	});
}