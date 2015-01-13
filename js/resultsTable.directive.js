angular.module('SESE')
.directive('resultsTable', [function () {
  return {
	restrict: 'E',
	templateUrl: 'partials/directives/resultsTable.html',
	scope: {
	  data: '='
	},
	link: function (scope) {
	  scope.$watch('data', onDataChange, true);

	  function onDataChange () {
		if (!scope.data) return;

		scope.displayData = scope.data.map(function (hit) {
		  hit = angular.copy(hit);
		  if (hit._originatorIdentifier.length > 20) {
			hit._originatorIdentifier = hit._originatorIdentifier.substring(0, 20) + '...';
		  }
		  return hit;
		});
	  }
	}
  };
}]);
