angular.module('EE')
.service('Elasticsearch', ['$http',
  function Elasticsearch ($http) {
	var that = this;

	this.query = function query (deviceToken, applicationUuid) {
	  var today = moment(new Date()).format('YYYY.MM.DD');
	  var baseUrl = addTrailingSlash(that.baseUrl);
	  var url = baseUrl + '_all/_search';
	  //var url = baseUrl + '_all/_search';
	  applicationUuid = applicationUuid || '';
	  deviceToken = deviceToken || '';
	  var data = {"query":{"bool":{"must":[{"wildcard":{"_originatorIdentifier":deviceToken+'*'}},{"wildcard":{"applicationUuid":applicationUuid+'*'}},{"term":{"_action.raw":"deviceRegionActivity"}}],"must_not":[],"should":[]}},"from":"0","size":"50","sort":[{"@timestamp":{"reverse":"true","ignore_unmapped":"true"}}],"facets":{},"version":"true"};
	  console.log('data', JSON.stringify(data));
	  return $http.post(url, data);

	  function addTrailingSlash (str) {
		var hasTrailingSlash = str && str.length > 0 && str.substr(str.length - 1) !== '/';

		return hasTrailingSlash ?
		  str + '/' :
		  str;
	  }
	};
  }]);	
