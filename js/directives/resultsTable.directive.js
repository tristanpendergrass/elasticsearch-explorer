angular.module('EE')
.directive('resultsTable', ['Alertify', function (Alertify) {
  return {
	restrict: 'E',
	templateUrl: 'js/directives/partials/resultsTable.html',
	scope: {
	  data: '='
	},
	link: function (scope, element) {
	  scope.rowClicked = Alertify.showJson;
	}
  };
}]);
