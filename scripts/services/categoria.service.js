'use strict';

electroManagerApp
    .factory('Categoria', ['$resource','DateUtils',function ($resource,DateUtils) {
        return $resource('server/categoriasServer.php', {}, {
                'query': {
                	method: 'GET',
                	params:{operacion:'query'},
                	transformResponse:function(resp){
                		resp=angular.fromJson(resp);
                		return resp;
                	},
                	isArray:true
                },
                'queryGenerales': {
                	method: 'GET',
                	params:{operacion:'queryGenerales'},
                	transformResponse:function(resp){
                		resp=angular.fromJson(resp);
                		return resp;
                	},
                	isArray:true
                },
                'actualizar':{
                	method:'POST'
                }
            });
        }]);
