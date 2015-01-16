'use strict';

(function () {
  var app = angular.module('EE', ['ui.router']);

  app.run(['$rootScope', '$interval', 'Elasticsearch',
	function ($rootScope, $interval, Elasticsearch) {
	  $rootScope.pollingInterval = 1000;
	  $rootScope.currentRequest = null;
	
	  $rootScope.runQuery = function runQuery () {
		if ($rootScope.currentRequest) return; // don't make another request if one already is pending

		$rootScope.currentRequest = Elasticsearch.query($rootScope.selectedDeviceToken, $rootScope.selectedApplicationUuid)
		.then(function (res) {
		  $rootScope.data = res.data.hits.hits.map(function (hit) {
			return hit._source;
		  });
		}, function (err) {
		  console.error('Error with elasticsearch query', err);
		  alertify.error('Elasticsearch query failed');
		  $rootScope.autoRefresh = 'false';
		})
		.finally(function () {
		  $rootScope.currentRequest = null;
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
