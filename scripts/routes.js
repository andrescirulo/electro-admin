electroManagerApp.config(function($stateProvider, $urlRouterProvider) {
	//
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/inicio");
	//
	// Now set up the states
	$stateProvider
		.state('site', {
			'abstract' : true,
			views : {
				'navbar@' : {
					templateUrl : 'templates/navbar.html',
					controller : 'NavbarCtrl'
				},
				'alert@' : {
					templateUrl : 'templates/alert.html',
					controller : 'AlertsCtrl'
				}
			}
		})
		.state('inicio', {
			parent: 'site',
			url : "/inicio",
			views : {
				"content@": {
					templateUrl : "templates/inicio.html",
					controller : "InicioCtrl"
				}
			}
		})
		.state('categorias', {
			parent: 'site',
			url : "/categorias",
			views : {
				"content@": {
					templateUrl : "templates/categorias.html",
					controller : "CategoriasCtrl"
				}
			}
		});
});