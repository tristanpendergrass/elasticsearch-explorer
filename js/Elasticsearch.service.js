angular.module('EE')
.service('Elasticsearch', ['$http',
  function Elasticsearch ($http) {
	var that = this;

	this.query = function query (deviceToken, applicationUuid) {
	  var today = moment(new Date()).format('YYYY.MM.DD');
	  var url = 'http://api.scala.com:9200/next-' + today + '/_search';
	  applicationUuid = applicationUuid || '';
	  deviceToken = deviceToken || '';
	  var data = {"query":{"bool":{"must":[{"wildcard":{"_originatorIdentifier":deviceToken+'*'}},{"wildcard":{"applicationUuid":applicationUuid+'*'}},{"term":{"_action.raw":"deviceRegionActivity"}}],"must_not":[],"should":[]}},"from":"0","size":"50","sort":[{"_scalaTimestamp":{"reverse":"true"}}],"facets":{},"version":"true"};
	  return $http.post(url, data);
	};
  }]);	
