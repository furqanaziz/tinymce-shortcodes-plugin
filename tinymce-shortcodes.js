(function(tinymce) {
  tinymce.PluginManager.add('shortCodes', function(editor, url) {
    function showDialog() {
      var win;
      win = editor.windowManager.open({
        title: 'ShortCodes',
        type: 'container',
        url: 'bower_components/tinymce-shortcodes-plugin/shortcodes-template.html',
        spacing: 10,
        padding: 10,
        width: 560,
        height: 400,
        onclick: function(e) {
        },
        buttons: [
          {text: 'Close', onclick: function() {
            win.close();
          }},
        ],
      });
    }

    editor.addCommand('showShortCodes', showDialog);

    editor.addButton('shortCodesBtn', {
      text: 'Short Codes',
      tooltip: 'Short Codes',
      cmd: 'showShortCodes',
    });
  });
})(tinymce);
