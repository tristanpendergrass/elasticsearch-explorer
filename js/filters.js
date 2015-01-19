(function () {
  var app = angular.module('EE');

  // filters a string to have [maxLength] or fewer characters and adds '...'.
  // note that this means the resulting string will be up to [maxLength] + 3 characters long
  app.filter('trimLength', function () {
	return function (str, maxLength) {
	  maxLength = angular.isDefined(maxLength) ?
		maxLength :
		15;

	  return str.length > maxLength ?
		str.substring(0, maxLength) + '...' :
		str;
	};
  });
})();
