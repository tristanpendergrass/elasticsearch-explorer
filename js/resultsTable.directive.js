angular.module('EE')
.directive('resultsTable', [function () {
  return {
	restrict: 'E',
	templateUrl: 'partials/directives/resultsTable.html',
	scope: {
	  data: '='
	},
	link: function (scope, element) {
	  scope.$watch('data', onDataChange, true);
	  scope.rowClicked = rowClicked;

	  function onDataChange () {
		if (!scope.data) return;

		scope.displayData = scope.data.map(function (hit) {
		  hit = angular.copy(hit);
		  if (hit._originatorIdentifier.length > 15) {
			hit._originatorIdentifier = hit._originatorIdentifier.substring(0, 15) + '...';
		  }
		  if (hit.applicationUuid.length > 15) {
			hit.applicationUuid = hit.applicationUuid.substring(0, 15) + '...';
		  }
		  if (hit._scalaTimestamp) {
			hit._scalaTimestamp = transformDate(hit._scalaTimestamp);
		  }
		  if (hit.onEnterTimestamp) {
			hit.onEnterTimestamp = transformDate(hit.onEnterTimestamp);
		  }
		  if (hit.onExitTimestamp) {
			hit.onExitTimestamp = transformDate(hit.onExitTimestamp);
		  }
		  return hit;
		});
	  }

	  function transformDate (date) {
		var momentDate = moment(date);
		return momentDate.format('YYYY-MM-DD HH:mm:ss');
	  }

	  function rowClicked (hit) {
		  console.info(hit);
		  //alertify.success('Logged row to console.');
		  alertify.alert('');
		  var el = $($.find('.alertify-dialog')[0]);
		  jsonToDom(el, hit);
	  }

	  function jsonToDom (el, data) {
		  var root = $('<div class="json-to-dom"></div>');
		  el.prepend(root);
		  root.append('<p>{</p>');
		  for (var key in data) {
			  if (data.hasOwnProperty(key)) {
				  root.append('<p class="json-to-dom-list-item">' + key + ': ' + data[key] + '</p>');
			  }
		  }

		  root.append('<p>}</p>');
	  }
	}
  };
}]);
