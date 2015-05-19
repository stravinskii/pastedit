$(document).ready(function(){

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
			url: 'http://localhost:9000/api/codigo/' + id,
			dataType: 'json',
			success: function (data, status) {
				var codigo = data[0];
				console.info("codigo", codigo.nombre);
				$('#nombre').val(codigo.nombre);
				$('#codigo').text(codigo.codigo);
				// $('<code></code>', {
				// 	text: codigo.codigo
				// }).appendTo($('#codigo'));

				console.info('lenguaje', codigo.lenguaje);
				$('<option></option>', {
					value: codigo.idlenguaje,
					text: codigo.lenguaje,
					selected: true
				}).appendTo($('#lenguaje'));
				$('#lenguaje').material_select();

				$('button').attr('href', 'agregar-codigo.html?codigo=' + codigo.idcodigo);

				$('#codigo').siblings('label').addClass('active');
			}
		});
	};

    // Verificamos si es modificación o no
	if (parse('codigo')) {
		getCodigo(parse('codigo'));
	};
});