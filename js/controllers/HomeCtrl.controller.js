angular.module('EE')
.controller('HomeCtrl', ['$scope', 'Query',
  function HomeCtrl ($scope, Query) {
	var vm = this;

	vm.settings = Query.settings;
	vm.autoRefresh = 'true';
	vm.pollingInterval = 1000;
	vm.manualRefresh = manualRefresh;
	vm.getData = function () {
	  return Query.data;
	};

	$scope.$watch('vm.autoRefresh', function (newVal) {
	  if (newVal === 'true') {
	  } else {
		Query.cancelInterval();
	  }
	});

	
	function manualRefresh () {
	  Query.runOnce();
	}

	Query.interval = vm.pollingInterval;
	Query.runContinuously();
  }]);
