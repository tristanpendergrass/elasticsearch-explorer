angular.module('EE')
.service('Elasticsearch', ['$http',
  function Elasticsearch ($http) {
	var that = this;

	this.query = function query (deviceToken) {
	  var today = moment(new Date()).format('YYYY.MM.DD');
	  var url = 'http://api.scala.com:9200/next-' + today + '/_search';
	  //var data = {"fields":["_parent","_source"],"query":{"bool":{"must":[{"wildcard":{"_originatorIdentifier":"5ceb652cb10040b585f9d423044e6aa182ad0aef8363af90f7147236049db2b1*"},"term":{"_action":"deviceRegionActivity"}}]}},"from":0,"size":50,"sort":[{"_scalaTimestamp":{"reverse":true}}],"facets":{},"version":true};
	  var data = {"query":{"bool":{"must":[{"wildcard":{"_originatorIdentifier":deviceToken+'*'}},{"term":{"_action.raw":"deviceRegionActivity"}}],"must_not":[],"should":[]}},"from":"0","size":"50","sort":[{"_scalaTimestamp":{"reverse":"true"}}],"facets":{},"version":"true"};
	  return $http.post(url, data);
	};
  }]);	
