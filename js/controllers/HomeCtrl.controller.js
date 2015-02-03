angular.module('EE')
.controller('HomeCtrl', ['$scope', '$location', 'Query',
  function HomeCtrl ($scope, $location, Query) {
	var vm = this;

	//setParamsFromQueryString();

	vm.settings = Query.settings;
	vm.autoRefresh = 'true';
	vm.pollingInterval = 1000;
	vm.manualRefresh = manualRefresh;
	vm.getData = function () {
	  return Query.data;
	};

	$scope.$watch('vm.autoRefresh', function (newVal) {
	  if (newVal === 'true') {
		Query.interval = vm.pollingInterval;
		Query.runContinuously();
	  } else {
		Query.cancelInterval();
	  }
	});


	function manualRefresh () {
	  Query.runOnce();
	}

	Query.interval = vm.pollingInterval;

	$scope.$watch('vm.settings', function (newSettings) {
	  // update the query string to have the correct settings
	  for (var prop in newSettings) {
		if (newSettings.hasOwnProperty(prop)) {
		  $location.search(prop, newSettings[prop]);
		}
	  }
	}, true);

	function setParamsFromQueryString () {
	  var queryParams = $location.search();

	  Query.settings.databaseUrl = queryParams.databaseUrl || Query.settings.databaseUrl;
	  Query.settings.applicationUuid = queryParams.applicationUuid || Query.settings.applicationUuid;
	  Query.settings.deviceToken = queryParams.deviceToken || Query.settings.deviceToken;
	}
  }]);
