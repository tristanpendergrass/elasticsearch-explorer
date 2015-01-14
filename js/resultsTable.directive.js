angular.module('EE')
.directive('resultsTable', [function () {
  return {
	restrict: 'E',
	templateUrl: 'partials/directives/resultsTable.html',
	scope: {
	  data: '='
	},
	link: function (scope) {
	  scope.$watch('data', onDataChange, true);
	  scope.rowClicked = rowClicked;

	  function onDataChange () {
		if (!scope.data) return;

		scope.displayData = scope.data.map(function (hit) {
		  hit = angular.copy(hit);
		  if (hit._originatorIdentifier.length > 20) {
			hit._originatorIdentifier = hit._originatorIdentifier.substring(0, 20) + '...';
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
		  alertify.success('Logged row to console.');
	  }
	}
  };
}]);
