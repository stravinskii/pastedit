$(document).ready(function(){

	/**
	 * Método para realizar paginación de los códigos
	 */
	function paginacion (renglones) {
		// TODO: Hacer handler de paginado con alguna clase 
		var pages = $('#pages');
		var paginas = Math.ceil(renglones / 2);
		for (var i = 1; i <= paginas; i++) {
			var pagina = $('<li></li>', {
				class: 'waves-effect',
				append: $('<a></a>', {
					text: i
				}) 
			}).appendTo(pages);
		};
		pages.replaceWith(pages.children());
	};

	/**
	 * Método que obtiene un código de la base de datos
	 * 	y actualiza la vista con la información del código
	 */
	function getCodigos () {
		$.ajax({
			url: 'http://localhost:9000/api/codigos/',
			dataType: 'json',
			success: function (data, status) {
				var tbody = $('table tbody');
				for (index in data) {
					var codigo = data[index];
					var row = $('<tr></tr>');

					$('<td></td>', {
						text: eval(index) + 1
					}).appendTo(row);

					$('<td></td>', {
						append: $('<a/>', {
							href: 'codigo.html?codigo=' + codigo.idcodigo,
							text: codigo.nombre
						})
					}).appendTo(row);

					$('<td></td>', {
						text: codigo.lenguaje
					}).appendTo(row);

					// FIX: Formato fecha!
					$('<td></td>', {
						text: codigo.timestamp
					}).appendTo(row);

					// FIX: data-codigo biding!
					var button = $('#action-button').clone();
					console.info("idcodigo", codigo.idcodigo);
					// console.info("button", button.html());
					console.info("button eliminar", button.find('.eliminar').attr('data-codigo'));
					// console.info("button eliminar", button.find('.eliminar').html());
					// console.info("button compartir", button.find('.compartir').html());
					button.find('.eliminar').attr('data-codigo', codigo.idcodigo);
					console.info("button eliminar", button.find('.eliminar').attr('data-codigo'));
					button.find('.compartir').attr('data-codigo', codigo.idcodigo);
					button.find('.dropdown-button').dropdown();
					$('<td></td>', {
						append: button.children()
					}).appendTo(row);

					row.appendTo(tbody);
				}
				paginacion(data.length);
			}
		});
	};

	/**
	 * Handler para compartir un código (hacer visible)
	 */
    $(".compartir").submit(function (event){
    	event.preventDefault();
        /*
        $.ajax({
		    url : 'http://localhost:9000/api/codigo/' + idCodigo,
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
		*/
		console.log('.compartir clicked');
    });

    /**
	 * Handler para eliminar un código (hacer visible)
	 */
    $(".eliminar").submit(function (event){
    	event.preventDefault();
    	var idcodigo = $(this).attr('data-codigo');
        /*
        $.ajax({
		    url : 'http://localhost:9000/api/codigo/' + idcodigo,
		    dataType: 'json',
		    type: 'DELETE',
		    success: function(data, status, jqXHR) {
		    	window.location = 'mis-codigos.html';
		    },
		    error: function (jqXHR, status, error) {
				console.log('[ERROR] %s', error);
		    }
		});
		*/
		console.log('.compartir clicked');
    });

    // Obtener códigos y armar table
    getCodigos();
});