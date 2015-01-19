'use strict';

(function () {
  var app = angular.module('EE', ['ui.router']);

  app.config(['$stateProvider', '$urlRouterProvider', 
  	function ($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.otherwise('/');
	  $stateProvider
	  .state('home', {
		url: '/',
		templateUrl: '../partials/home.html'
	  });
	}]);

  app.run(['$rootScope', '$interval', '$timeout', '$location', 'Elasticsearch', 'Query',
	function ($rootScope, $interval, $timeout, $location, Elasticsearch, Query) {
	  $rootScope.pollingInterval = 1000;
	  $rootScope.currentRequest = null;

	  var queryParams = $location.search();
	  $rootScope.selectedDatabaseUrl = 'http://api.scala.com:9200/';
	
	  $rootScope.runQuery = function runQuery () {
		if ($rootScope.currentRequest) return; // don't make another request if one already is pending

		Elasticsearch.baseUrl = $rootScope.selectedDatabaseUrl;
		$rootScope.currentRequest = Elasticsearch.query($rootScope.selectedDeviceToken, $rootScope.selectedApplicationUuid)
		.then(function (res) {
		  $rootScope.data = res.data.hits.hits.map(function (hit) {
			return hit._source;
		  });
		}, function (err) {
		  console.error('Error with elasticsearch query', err);
		  alertify.error('Elasticsearch query failed');
		  if ($rootScope.autoRefresh === 'true') {
			  $rootScope.autoRefresh = 'false';
			  $timeout(function () {
				  alertify.error('Halting auto refresh');
			  }, 750);
		  }
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
