define([], function () {
	return ['$stateProvider', '$urlRouterProvider', '$logProvider', '$ocLazyLoadProvider', '$appConfig', function ($stateProvider, $urlRouterProvider, $logProvider, $ocLazyLoadProvider, $appConfig) {
			$ocLazyLoadProvider.config({
				loadedModules : ['dashboard'],
				modules : [{
						name : 'moduleProjectManagement',
						files : ['modules/projectmanagement/moduleProjectManagement.js']
					}
				],
				asyncLoader : require
			});
			$logProvider.debugEnabled(true);
			$urlRouterProvider.otherwise('/projectmanagement/main');
			$stateProvider.state('app', {
				url : '/',
				views : {
					'content' : {
						templateUrl : 'view/content.html'
					}
				}
			}).state('app.projectmanagement', {
				alias : 'projectmanagement',
				url : 'projectmanagement',
				//parent : 'app',
				//abstract: true,
				views : {
					'content@' : {
						templateUrl : 'modules/projectmanagement/view/main.html',
						controller : 'projectManagementController',
					}
				}
			});
			
			var $stateArr = ['main','user', 'task', 'level'];
			for(var i=0; i<$stateArr.length; i++) {
				$stateProvider.state('app.projectmanagement.'+$stateArr[i], {
					url : '/'+$stateArr[i],
					view: $stateArr[i],
					views : {
						'content@' : {
							templateUrl : 'modules/projectmanagement/view/'+$stateArr[i]+'.html',
							controller : $stateArr[i]+'Controller',
							resolve : {
								load : function ($ocLazyLoad) {
									return $ocLazyLoad.load('moduleProjectManagement').then(function () {});
								}
							}
						}
					}
				})
			}
		}
	]
});
