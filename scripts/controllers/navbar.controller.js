electroManagerApp.controller('NavbarCtrl',function($scope,$rootScope,$utils){
	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){
			$utils.scrollToTop();
		}
	);
});