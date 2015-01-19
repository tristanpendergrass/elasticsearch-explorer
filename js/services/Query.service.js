angular.module('EE')
.service('Query', ['$q', 'Elasticsearch', 'Alertify',
  function Query ($q, Elasticsearch, Alertify) {
	var that = this;
	var currentRequest = null;

	this.databaseUrl = 'http://api.scala.com:9200';
	this.filters = {
	  deviceToken: '',
	  applicationUuid: ''
	};

	this.runOnce = function runOnce () {
	  if (currentRequest) {
	    return $q.reject('Query already in progress');
	  } else {
		var deferred = $q.defer();

		Elasticsearch.baseUrl = that.databaseUrl;
		Elasticsearch.query(that.filters.deviceToken, that.filters.applicationUuid)
		.then(function (res) {
		  deferred.resolve(res.data.hits.hits.map(function (hit) {
			return hit._source;
		  }));
		}, function (err) {
		  console.error('Error with elasticsearch query', err);
		  Alertify.error('Elasticsearch query failed');
		  deferred.reject(err);
		})
		.finally(function () {
		  currentRequest = null;
		});

		currentRequest = deferred.promise;
		return deferred.promise;
	  }
	}
  }]);
