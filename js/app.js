'use strict';

(function () {
  var app = angular.module('EE', ['ui.router']);

  app.config(['$stateProvider', '$urlRouterProvider', 
  	function ($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.otherwise('/');
	  $stateProvider
	  .state('home', {
		url: '/',
		templateUrl: 'partials/home.html',
		controller: 'HomeCtrl',
		controllerAs: 'vm'
	  });
	}]);
})();
