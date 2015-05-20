$(document).ready(function(){

	/**
	 * Variables para saber si es update o nueva creación
	 */
	var idCodigo = '';
	var isUpdate = false;

	/**
	 * Método para parsear una variable del query string
	 */
	function parse(val) {
	    var result = false;
	    var tmp = [];
	    location.search
	    //.replace ( "?", "" ) 
	    // this is better, there might be a question mark inside
	    .substr(1)
	        .split("&")
	        .forEach(function (item) {
	        tmp = item.split("=");
	        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
	    });
	    return result;
	};

	/**
	 * Método que obtiene un código de la base de datos
	 * 	y actualiza la vista con la información del código
	 */
	function getCodigo (id) {
		$.ajax({
			url: '/api/codigo/' + id,
			dataType: 'json',
			success: function (data, status) {
				var codigo = data[0];
				console.info("codigo", codigo.nombre);
				idCodigo = codigo.idcodigo;
				$('#nombre').val(codigo.nombre);
				$('#codigo').val(codigo.codigo);
				$('#lenguaje').val(codigo.idlenguaje).material_select();

				$('#codigo').siblings('label').addClass('active');
			}
		});
	};

	/**
	 * Método para obtener los lenguajes de la base de datos
	 */
	function getLenguajes() {
		$.ajax({
			url: '/api/lenguajes',
			dataType: 'json',
			success: function (data, status) {
				console.info("data", data);
				var lenguajes = $("#lenguaje");
				for (index in data) {
					var lenguaje = data[index];
					console.info("lenguaje", lenguaje.lenguaje);
					$("<option/>", {
						value: lenguaje.idlenguaje,
						text: lenguaje.lenguaje
					}).appendTo($(lenguajes));
				}
				lenguajes.material_select();
			},
			error: function (jqXHR, status, error) {
				console.log('[ERROR] %s', error);
			}
		});
	};

	/**
	 * Handler para guardar un código en la base de datos
	 */
    $("form").submit(function (event){
    	event.preventDefault();
    	console.info(
	    	$('#lenguaje').val(),
  			$('#nombre').val(),
			$('#codigo').val()
    	);
        $.ajax({
		    url : '/api/codigo/' + idCodigo,
		    dataType: 'json',
		    type: (isUpdate ? 'PUT' : 'POST'),
		    data : {
  				lenguaje: $('#lenguaje').val(),
  				nombre: $('#nombre').val(),
  				codigo: $('#codigo').val()
  			},
		    success: function(data, status, jqXHR) {
		    	window.location = 'mis-codigos.html';
		    },
		    error: function (jqXHR, status, error) {
				console.log('[ERROR] %s', error);
		    }
		});
    });

    // Verificamos si es modificación o no
    getLenguajes();
	if (parse('codigo')) {
		isUpdate = true;
		getCodigo(parse('codigo'));
		$("button span").text("Editar");
		$(".page-title").html("Modificar Código");
	};
});