angular.module('EE')
.service('Alertify', [function () {
  this.showJson = function (obj) {
	if (!jQuery.isPlainObject(obj)) {
	  throw new Error('Expected a plain json object');
	}

	alertify.alert('');

	var el = $($.find('.alertify-dialog')[0]);
	var cover = $($.find('#alertify-cover')[0]);

	jsonToDom (el, obj);
	cover.on('click', onCoverClick);

	function jsonToDom (el, data) {
	  var root = $('<div class="json-to-dom"></div>');
	  el.prepend(root);
	  root.append('<p>{</p>');
	  for (var key in data) {
		if (data.hasOwnProperty(key)) {
		  root.append('<p class="json-to-dom-list-item">&nbsp;&nbsp;&nbsp;&nbsp;' + key + ': ' + data[key] + '</p>');
		}
	  }

	  root.append('<p>}</p>');
	}

	function onCoverClick () {
	  $('#alertify-cover, #alertify, #alertify-logs').remove();
	}

  };

  this.error = function (msg) {
	alertify.error(msg);
  };
}]);