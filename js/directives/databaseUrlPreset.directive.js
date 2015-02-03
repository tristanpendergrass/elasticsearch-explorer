angular.module('EE')
.directive('databaseUrlPreset', ['config', function (config) {
  return {
	restrict: 'A',
	scope: {
	  settings: '='
	},
	link: function (scope, element, attrs) {
	  element.change(function () {
		var value = element.val();

		switch (element.val()) {
		  case 'dev':
			scope.settings.databaseUrl = config.databaseUrlDefaults.dev;
			break;
		  case 'stage':
			scope.settings.databaseUrl = config.databaseUrlDefaults.stage;
			break;
		  case 'prod':
			scope.settings.databaseUrl = config.databaseUrlDefaults.prod;
			break;
		}

		scope.$apply();
	  });

	  scope.$watch('settings.databaseUrl', function (url) {
		var configUrls = config.databaseUrlDefaults;
		var foundFamiliarUrl = false;

		for (var prop in configUrls) {
		  if (configUrls.hasOwnProperty(prop)) {
			if (configUrls[prop] === url) {
			  foundFamiliarUrl = true;
			  element.val(prop);
			}
		  }
		}

		if (!foundFamiliarUrl) {
		  element.val('custom');
		}
	  });
	}
  };
}]);
