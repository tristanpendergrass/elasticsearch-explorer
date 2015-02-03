angular.module('EE')
.constant('config', {
  databaseUrlDefaults: {
	dev: 	'http://dev.api.scala.com:9200/',
	stage: 	'http://stage.api.scala.com:9200/',
	prod: 	'http://54.88.1.142:9201/'
  }
});
