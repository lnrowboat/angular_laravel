define([], function () {
	var app = angular.module('dashboard', ['ngRoute', 'ngAria', 'ui.router', 'moduleBase', 'ngAnimate', 'oc.lazyLoad', 'ngTouch', 'app.config', 'moduleGlobalaction']);
	app.controller('HomeController', function ($scope, $rootScope, moduleBase, $state, $log, $appConfig, $window) {
		angular.extend($scope, moduleBase);
	});
	app.run(function ($rootScope, moduleBase, globalAction, $appConfig, $log, $state, $timeout) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			//$log.log('$stateChangeStart', toState, toParams, fromState, fromParams)
			if (toState.name !== 'app.home' && !moduleBase.authenticaded()) {
				event.preventDefault();
				$state.go('app.home');
			}
		})
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			$timeout(function () {
				globalAction.doSomeGlobalThing(event, toState, toParams, fromState, fromParams);
				//$log.info('stateChangeSuccess')
			})
		})
	});
	return app;
});
