<?php session_start();

	include_once '../conectar.php';
	
	if (isset($_GET["operacion"])){
		$request=json_decode(json_encode($_GET));
		
		if ($request->operacion=="query"){
			
			$query="SELECT cn.id, cn.negocio, cn.padre, cn.nombre, cn.categoria, cat_url(cn.id,cn.negocio) url,";
			$query.="n.nombre negocioNombre,cat_nombre_completo(cn.id,cn.negocio) nombreCompleto,"; 
			$query.="cat_nivel(cn.id,cn.negocio) nivel "; 
			$query.="FROM categoria_negocio cn JOIN negocio n ON (cn.negocio=n.id) ";
			$resultado=$dbh->query($query);
			$data=$resultado->fetchAll();
			echo json_encode($data);
		}
		if ($request->operacion=="queryGenerales"){
			
			$query="SELECT c.id, c.nombre, c.padre,";
			$query.="cat_nombre_completo_gen(c.id) nombreCompleto,"; 
			$query.="cat_nivel_gen(c.id) nivel "; 
			$query.="FROM categoria c";
			$resultado=$dbh->query($query);
			$data=$resultado->fetchAll();
			echo json_encode($data);
		}
	}
	else if (isset($_POST["operacion"])){
		$request=json_decode(json_encode($_POST));
		$res=array();
		$res["resultado"]="OK";
		if ($request->operacion=="actualizar"){
			$update="UPDATE categoria_negocio SET categoria=? WHERE id=? AND negocio=?";
			foreach ($request->categorias as $cat){
				$st=$dbh->prepare($update);
				$st->bindParam(1, $cat->categoria);
				$st->bindParam(2, $cat->id);
				$st->bindParam(3, $cat->negocio);
				if (!$st->execute()){
					$res["resultado"]="ERROR";
					break;
				}
			}
		}
		echo json_encode($res); 
	}
?>