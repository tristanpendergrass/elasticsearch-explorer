angular.module('EE')
.service('Query', ['$q', '$interval', 'Elasticsearch', 'Alertify',
  function Query ($q, $interval, Elasticsearch, Alertify) {
	var that = this;
	var currentRequest = null;
	var currentInterval;

	this.settings = {
	  databaseUrl: 'http://api.scala.com:9200',
	  deviceToken: '',
	  applicationUuid: ''
	};
	this.data = null;
	this.cancelInterval = function () {
	  if (currentInterval) {
		$interval.cancel(currentInterval);
	  }
	};

	this.runOnce = function runOnce () {
	  if (currentRequest) {
	    return $q.reject('Query already in progress');
	  } else {
		var deferred = $q.defer();

		Elasticsearch.baseUrl = that.settings.databaseUrl;
		Elasticsearch.query(that.settings.deviceToken, that.settings.applicationUuid)
		.then(function (res) {
		  var data = res.data.hits.hits.map(function (hit) {
			return hit._source;
		  });
		  that.data = data;
		  deferred.resolve(data);
		}, function (err) {
		  deferred.reject(err);
		})
		.finally(function () {
		  currentRequest = null;
		});

		currentRequest = deferred.promise;
		return deferred.promise;
	  }
	};

	this.runContinuously = function () {
	  if (currentInterval) {
		console.error('Run continously was called when it was already running');
		return;
	  }
	  var waitTime = that.interval || 1000;

	  that.runOnce().then(function (data) {
		currentInterval = $interval(runAndRecord, waitTime);
	  }, queryError);

	  function runAndRecord () {
		that.runOnce().then(function (data) {
		}, function (err) {
		  $interval.cancel(currentInterval);
		  queryError(err);
		  Alertify.error('Halting autorefresh');
		});
	  }
	};

	function queryError (err) {
	  console.error('Error with elasticsearch query', err);
	  Alertify.error('Elasticsearch query failed');
	}
  }]);
