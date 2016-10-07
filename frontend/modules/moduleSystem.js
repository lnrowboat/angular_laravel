define([], function () {
	var app = angular.module('moduleSystem', ['app.config']);
	app.provider("moduleSystem", function () {
		var provider = {};
		provider.$get = ['$window', '$rootScope', '$timeout', '$appConfig', '$log', function ($window, $rootScope, $timeout, $appConfig, $log) {
				var service = {
					doSomeGlobalThing : function () {}
				}
				return service;
			}
		];
		return provider;
	});
	return app;
});