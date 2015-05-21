$(document).ready(function(){

	/**
	 * Variable para indicar número de renglones de paginado
	 */
	var rowsPerPage = 5;

	/**
	 * Método para realizar paginación de los códigos
	 */
	function paginacion (renglones) {
		var pages = $('#pages');
		var paginas = Math.ceil(renglones / rowsPerPage);
		for (var i = 1; i <= paginas; i++) {
			var pagina = $('<li></li>', {
				class: 'waves-effect page',
				append: $('<a></a>', {
					text: i
				}) 
			}).attr('data-pagina', i).appendTo(pages);
		};
		pages.replaceWith(pages.children());

		// Binding onclick event
		$('.page').click(function (event) {
			$('.page').removeClass('light-blue darken-4 active');
			$(this).addClass('light-blue darken-4 active');
			var pagina = $(this).attr('data-pagina');
			verPagina(pagina);
		});

		// Mostramos primera página
		$('.page').first().click();
	};

	/**
	 * Método para ver una página de la tabla paginada
	 */
	function verPagina (pagina) {
		var rows = $('table tbody tr');
		var lowerBound = rowsPerPage * (pagina - 1);
		var upperBound = rowsPerPage * pagina;
		for (var i = 0; i < rows.length; i++) {
			if ((i + 1) > lowerBound && (i+1) <= upperBound) {
				$(rows[i]).removeClass('hide');
			} else {
				$(rows[i]).addClass('hide');
			}
		}
	}

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

					var date = new Date(codigo.timestamp);
					var timestamp = date.getDate() + "/";
					timestamp += date.getMonth() + 1 + "/";
					timestamp += date.getFullYear();
					$('<td></td>', {
						text: timestamp
					}).appendTo(row);

					// Clonamos dropdown-button default
					var button = $('#action-button').clone();
					// Data Binding
					button.find('.eliminar')
					.attr('data-codigo', codigo.idcodigo);
					button.find('.compartir')
					.attr('data-codigo', codigo.idcodigo);
					// Dropdown association
					button.find('ul')
					.attr('id', 'dropdown_' + index);
					button.find('.dropdown-button')
					.attr('data-activates', 'dropdown_' + index);

					$('<td></td>', {
						append: button.children()
					}).appendTo(row);

					row.appendTo(tbody);
				}
				$('.dropdown-button').dropdown();

			    // Binding onclick compartir event
			    $(".compartir").click(function (event){
			    	event.preventDefault();
					console.log('.compartir clicked');
			    });

			    // Binding onclick eliminar event
			    $(".eliminar").click(function (event){
			    	event.preventDefault();
					console.log('.eliminar clicked');
			    	var idcodigo = $(this).attr('data-codigo');
			    	eliminarCodigo(idcodigo);
			    });

			    // Realizamos paginación
				paginacion(data.length);
			}
		});
	};

	/**
	 * Método para eliminar código de la base de datos
	 */
	function eliminarCodigo (idcodigo) {
		console.info('eliminarCodigo', idcodigo);
		if (confirm('Está seguro de querer eliminar el código seleccionado?')) {
			$.ajax({
			    url : 'http://localhost:9000/api/codigo/' + idcodigo,
			    dataType: 'json',
			    type: 'DELETE',
			    success: function(data, status, jqXHR) {
			    	console.info('delete data', data);
			    	window.location = 'mis-codigos.html';
			    },
			    error: function (jqXHR, status, error) {
					console.log('[ERROR] %s', error);
			    }
			});
		}
	};

    // Obtener códigos y armar table
    getCodigos();
});