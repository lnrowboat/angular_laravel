define([], function () {
	var app = angular.module('moduleGlobalaction', ['app.config']);
	app.provider("globalAction", function () {
		var provider = {};
		provider.$get = ['$window', '$rootScope', '$timeout', '$appConfig', '$log', function ($window, $rootScope, $timeout, $appConfig, $log) {
				var service = {
					doSomeGlobalThing : function (event, toState, toParams, fromState, fromParams) {}
				}
				return service;
			}
		];
		return provider;
	});
	return app;
});