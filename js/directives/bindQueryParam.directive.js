angular.module('EE')
.directive('bindQueryParam', [function () {
  return {
	restrict: 'A',
	link: function (scope, element, attrs) {
	  console.log('attrs');
	}
  };
}]);
