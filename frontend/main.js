define(['router', 'modules/modules', 'modules/moduleBase', 'modules/moduleSystem', 'modules/moduleGlobalaction'],
	function (configParams, mainmodule, moduleBase, moduleSystem, moduleGlobalaction) {
	mainmodule.config(configParams);
	angular.bootstrap(document, [mainmodule.name]); //,{strictDi: true});
});