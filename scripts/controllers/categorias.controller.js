electroManagerApp.controller('CategoriasCtrl',function($scope,$utils,Categoria,$alerts){
	$scope.init = function(){
		Categoria.query(function(result){
			$scope.categorias=result;
			for(var i=0;i<$scope.categorias.length;i++){
				$scope.categorias[i].dirty=false;
			}
			Categoria.queryGenerales(function(result){
				$scope.catsGenerales=result;
				for(var i=0;i<$scope.catsGenerales.length;i++){
					$scope.catsGenerales[i].categorias=new Array();
					for (var j=0;j<$scope.categorias.length;j++){
						if ($scope.categorias[j].categoria==$scope.catsGenerales[i].id){
							$scope.catsGenerales[i].categorias.push($scope.categorias[j]);
						}
					}
				}
			});
		});
	}
	
	$scope.getStyleByNegocio = function(negocioId){
		var estilo={
			padding:"3px",
			fontSize:"9pt"
		};
		if (negocioId==1){
			estilo.backgroundColor="#ffaaaa";
		}
		if (negocioId==2){
			estilo.backgroundColor="#f0c8ff";
		}
		if (negocioId==3){
			estilo.backgroundColor="#ffffbb";
		}
		if (negocioId==4){
			estilo.backgroundColor="#bbbbff";
		}
		if (negocioId==5){
			estilo.backgroundColor="#ffc544";
		}
		if (negocioId==6){
			estilo.backgroundColor="#ff5555";
		}
		if (negocioId==7){
			estilo.backgroundColor="#ff0000";
			estilo.color="#ffffff";
		}
		return estilo;
	}
	
	$scope.getFiltro = function(){
		var filtro={
			 nombreCompleto:$scope.filtroNombre
		};
		if ($scope.filtroTodas!=true){
			filtro.categoria=null;
		}
		if ($scope.filtroNivel!=null){
			filtro.nivel=$scope.filtroNivel;
		}
		if ($scope.filtroNegocio!=null && $scope.filtroNegocio.id!=0){
			filtro.negocio=$scope.filtroNegocio.id;
		}
		return filtro;
	}
	
	$scope.agregarCategoria = function(categoria){
		if ($scope.catGeneral!=null){
			categoria.categoria=$scope.catGeneral.id;
			categoria.dirty=true;
			$scope.catGeneral.categorias.push(categoria);
		}
	}
	$scope.quitarCategoria = function(categoria){
		categoria.categoria=null;
		categoria.dirty=true;
		var idx=$utils.getArrayIndex(catGeneral.categorias,categoria,"id");
		catGeneral.categorias.splice(idx,1);
	}
	
	$scope.guardarCambios = function(){
		var catsCambiadas=new Array();
		for (var j=0;j<$scope.categorias.length;j++){
			if ($scope.categorias[j].dirty==true){
				catsCambiadas.push($scope.categorias[j]);
			}
		}
		var data={
			categorias:catsCambiadas,
			operacion:"actualizar"
		};
		Categoria.actualizar(data,function(resp){
			if (resp.resultado=="OK"){
				$alerts.showOk("Categorias actualizadas");
			}
			else{
				$alerts.showError("Error al actualizar categorias");
			}
		});
	}
	
	$scope.armarNegocios=function(){
		$scope.negocios=new Array();
		var todos={id:0,nombre:'Todos'};
		var garbarino={id:1,nombre:'Garbarino'};
		var fravega={id:2,nombre:'Fravega'};
		var lacasa={id:3,nombre:'La Casa del Audio'};
		var tiomusa={id:4,nombre:'Tio Musa'};
		var ribeiro={id:5,nombre:'Ribeiro'};
		var rodo={id:6,nombre:'Hiper Rodo'};
		var musimundo={id:7,nombre:'Musimundo'};
		$scope.negocios.push(todos);
		$scope.negocios.push(garbarino);
		$scope.negocios.push(fravega);
		$scope.negocios.push(lacasa);
		$scope.negocios.push(tiomusa);
		$scope.negocios.push(ribeiro);
		$scope.negocios.push(rodo);
		$scope.negocios.push(musimundo);
	}
	
	$scope.armarNegocios();
	$scope.init();
});