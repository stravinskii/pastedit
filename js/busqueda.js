$(document).ready(function(){

	/**
	 * Variable para indicar número de renglones de paginado
	 */
	var rowsPerPage = 5;
	var codigos = $('#codigos');

	/**
	 * Método para realizar paginación de los códigos
	 */
	function paginacion (codigos) {
		var pages = $('#pages');
		for (var i = 1; i <= codigos; i++) {
			var pagina = $('<li></li>', {
				class: 'waves-effect page',
				append: $('<a></a>', {
					text: i
				}) 
			}).attr('data-pagina', i).appendTo(pages);
		};
		// pages.replaceWith(pages.children());
		$('.pagination').removeClass('hide');

		// Binding onclick event
		$('.page').click(function (event) {
			$('.page').removeClass('light-blue darken-4 active');
			$(this).addClass('light-blue darken-4 active');
			var pagina = $(this).attr('data-pagina');
			verCodigo(pagina);
		});

		// Mostramos primera página
		$('.page').first().click();
	};

	/**
	 * Método para ver una página de la tabla paginada
	 */
	function verCodigo (pagina) {
		codigos.find('.codigo').hide();
		$(codigos.find('.codigo')
		.splice(eval(pagina - 1), 1)).show();
	}

	/**
	 * Método que obtiene un código de la base de datos
	 * 	y actualiza la vista con la información del código
	 */
	function buscarCodigos() {
		var filtro = $('#filtro').val(),
			termino = $('#termino').val(),
			template = $('#codigo-template');
		$.ajax({
			url: '/api/codigos/buscar',
			data: {
				'filtro': filtro,
				'termino': termino
			},
			dataType: 'json',
			method: 'POST',
			success: function (data, status) {
				if (data.error != undefined) {
					Materialize.toast(
						data.error, 
						4000, 'rounded'
					);
					return;
				}

				codigos.empty();
				$('#pages').empty();
				$('.pagination').addClass('hide');

				if (data.length == 0) {
					Materialize.toast(
						'No se encontraron resultados', 
						4000, 'rounded'
					);
					return;
				}

				for (index in data) {
					var codigo = data[index];
					var codigoDOM = template.clone();
					codigoDOM.find('.titulo').append(
						$('<a></a>', {
							text: codigo.nombre,
							href: 'codigo.html?codigo=' + codigo.idcodigo
						})
					);
					codigoDOM.find('.lenguaje').append(codigo.lenguaje);
					codigoDOM.find('code').text(codigo.codigo);
					codigoDOM.find('code').addClass(codigo.lenguaje);
					codigoDOM.children().appendTo(codigos);
				}

				$('pre code').each(function(i, block) {
					hljs.highlightBlock(block);
				});
			    // Realizamos paginación
				paginacion(data.length);
			},
			error: function (jqXHR, status, error) {
				console.log('error', error);
			}
		});
	};

    // Obtener códigos y armar table
	$('select').material_select();
	$('#buscarButton').click(function (event) {
		event.preventDefault();
		buscarCodigos();
	});
});