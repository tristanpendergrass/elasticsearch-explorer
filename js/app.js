'use strict';

(function () {
  var app = angular.module('EE', ['ui.router']);

  app.run(['$rootScope', '$interval', 'Elasticsearch',
	function ($rootScope, $interval, Elasticsearch) {
	  $rootScope.pollingInterval = 1000;
	
	  $rootScope.runQuery = function runQuery () {
		Elasticsearch.query($rootScope.selectedDeviceToken)
		.then(function (res) {
		  $rootScope.data = res.data.hits.hits.map(function (hit) {
			return hit._source;
		  });
		});
	  };

	  $rootScope.selectedDeviceToken = '5ceb652cb10040b585f9d423044e6aa182ad0aef8363af90f7147236049db2b1';
	  $rootScope.autoRefresh = 'true';

	  //$rootScope.$watch('data', onDataChange, function (newData) {
		//$rootScope.$broadcast('table-data-changed', $rootScope.data);
	  //});

	  $rootScope.$watch('autoRefresh', function () {
		if ($rootScope.autoRefresh === 'true') {
		  $rootScope.runQuery();
		  $rootScope.autoRefreshInterval = $interval($rootScope.runQuery, $rootScope.pollingInterval);
		} else {
		  $interval.cancel($rootScope.autoRefreshInterval);
		}
	  });

	  $rootScope.manualRefresh = function manualRefresh () {
		$rootScope.runQuery();
	  };

	  $rootScope.foo = 'foo';
	  $rootScope.foo = function () {
		alert();
		$rootScope.foo = $rootScope.foo + 1;
	  }
	}]);

})();
