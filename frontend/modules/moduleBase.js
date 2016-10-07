define([], function () {
	var app = angular.module('moduleBase', ['app.config']);
	app.provider("moduleBase", function () {
		var provider = {};
		provider.$get = ['$window', '$http', '$rootScope', '$timeout', '$appConfig', '$log', '$state', function ($window, $http, $rootScope, $timeout, $appConfig, $log, $state) {
				var service = {
					getData : function (param, callback) {
						param = {
							method : 'GET',
							url : param.url,
							data : $.param(param),
							headers : {
								'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'
							}
						}
						$http(param).then(function (response) {
							(callback || angular.noop)(response.data)
						}, function (response) {
							$log.info(param);
							$log.error('Error getting content from: ' + param.url)
						});
					},
					getLocalStorage : function (item) {
						var item = $window.localStorage.getItem(item);
						return (item == null) ? {}
						 : JSON.parse(item);
					},
					mergeAndSetLocalStorage : function (item, data) {
						var itemData = this.getLocalStorage(item);
						data = _.extend(itemData, data);
						this.setLocalStorage(item, data);
					},
					setLocalStorage : function (item, data) {
						data = JSON.stringify(data);
						$window.localStorage.setItem(item, data);
					},
					displayCurrentPage : function ($scope) {
						var page = this.getLocalStorage('items');
						page = page.curpage || 0;
						var start = $appConfig.paging_pageSize * page;
						var end = start + $appConfig.paging_pageSize;
						$log.log([start, end], page);
						var items = this.getDisplayItems([start, end], $scope);
						$scope.items = items;
						if (items.length != 0) {
							$scope.total = parseInt($scope.totalRow); //$scope.allItems.length;
						}
						return items;
					},
					getDisplayItems : function (number, $scope) {
						var items = [];
						//console.log('number', number);
						for (var i = number[0]; i < number[1]; i++) {
							if (typeof $scope.allItems[i] == 'undefined')
								break;
							$scope.allItems[i].did = i;
							items.push($scope.allItems[i]);
						}
						return items;
					},
					union : function (a, b) {
						return $.merge($.merge([], a), b);
					},
					authenticaded : function () {
						//Math.round((new Date()).getTime() / 1000)
						return true;
					},
					getDestModuleState : function (isNext) {
						var modules = $appConfig.modules; //['app.home', 'app.items'];
						var index = _.indexOf(modules, $state.current.name);
						if (isNext)
							return ((index == -1) || (index == (modules.length - 1))) ? false : modules[index + 1]
							return (index == -1 || index == 0) ? false : modules[index - 1];
					},
					gotoNext : function () {
						if (!this.canSwipe())
							return;
						var state = this.getDestModuleState(true);
						if (state) {
							this.tracking();
							$state.go(state)
						}
					},
					gotoPrevious : function () {
						if (!this.canSwipe())
							return;
						var state = this.getDestModuleState(false);
						if (state) {
							this.tracking();
							$state.go(state)
						}
					},
					canSwipe : function () {
						return ($($appConfig.module_container).data('swipe') == 'yes')
					},
					disableSwipe : function () {
						$($appConfig.module_container).data('swipe', 'no')
					},
					enableSwipe : function () {
						$($appConfig.module_container).data('swipe', 'yes')
					},
					tracking : function () {},
					toggleMenu : function () {
						$('.sidebar').removeClass('mobileinactive active').toggleClass('active');
					}
				}
				return service;
			}
		];
		return provider;
	});
	return app;
});