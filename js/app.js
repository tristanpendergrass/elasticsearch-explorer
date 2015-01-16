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
		}, function (err) {
		  console.error('Error with elasticsearch query', err);
		  alertify.error('Elasticsearch query failed');
		  $rootScope.autoRefresh = 'false';
		});
	  };

	  $rootScope.selectedDeviceToken = '';
	  $rootScope.autoRefresh = 'true';

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
	}]);
})();
