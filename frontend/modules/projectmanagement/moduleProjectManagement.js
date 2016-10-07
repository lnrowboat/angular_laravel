angular.module('moduleProjectManagement', ['ngRoute', 'ui.router', 'moduleBase', 'bw.paging', 'app.config']);
angular.module('moduleProjectManagement').controller('projectManagementController', function ($log, $scope, $state, moduleProjectManagement, $stateParams, $timeout, $routeParams, $window, $appConfig, moduleBase) {
	//$scope.table = moduleProjectManagement.table;
	//$scope.page = $appConfig.paging_page;
	//$scope.pageSize = $appConfig.paging_pageSize;
	//$scope.total = 0;
	//$scope.DoCtrlPagingAct = moduleBase.DoCtrlPagingAct;
	$scope.items = moduleProjectManagement.init($scope);
	$scope.order = function ($event, predicate) {
		return moduleBase.order($event, predicate, $scope);
	}

	$scope.addObj = function (type) {
		$log.log(type);
	};

	$scope.saveChange = function ($event) {}

	$scope.listLevel = function ($event) {
		data = {
			id : 'myid'
		}
		moduleProjectManagement.action('list-level', 'project-manager/levels', data, function (result) {
			$log.info('Got: ', result);
		});
	}

	$scope.showModal = function (modal) {
		$(modal).modal();
	}
});
angular.module('moduleProjectManagement').controller('mainController', function ($scope, $controller, $stateParams, $state, $log, $timeout) {
	$controller('projectManagementController', {
		$scope : $scope
	});
});
angular.module('moduleProjectManagement').controller('userController', function ($scope, $controller, $stateParams, $state, $log, $timeout) {
	$controller('projectManagementController', {
		$scope : $scope
	});
});
angular.module('moduleProjectManagement').controller('levelController', function ($scope, $controller, $stateParams, $state, $log, $timeout) {
	$controller('projectManagementController', {
		$scope : $scope
	});
});
angular.module('moduleProjectManagement').controller('taskController', function ($scope, $controller, $stateParams, $state, $log, $timeout) {
	$controller('projectManagementController', {
		$scope : $scope
	});
});
angular.module('moduleProjectManagement').provider("moduleProjectManagement", function () {
	var provider = {};
	provider.$get = ['$window', '$state', '$templateCache', '$timeout', '$rootScope', '$stateParams', 'moduleBase', '$appConfig', function ($window, $state, $templateCache, $timeout, $rootScope, $stateParams, moduleBase, $appConfig) {
			var services = {
				init : function ($scope) {
					//$scope.total = 77;
				},
				action : function (action, url, data, callback) {
					param = {
						action : action,
						url : $appConfig.serverUrl + url
					};
					$.extend(param, data);
					moduleBase.getData(param, function (response) {
						(callback || angular.noop)(response)
					});
				}
			}
			return services;
		}
	];
	return provider;
});
angular.module('moduleProjectManagement').run(function () {})