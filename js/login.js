$(document).ready(function(){

	/**
	 * Método que manda credenciales de login para obtener sesión
	 */
	function login() {
		var dataArray = $('form').serializeArray();
		$.ajax({
			url: 'http://localhost:9000/api/login/',
			method: 'POST',
			data: dataArray,
			success: function (data, status) {
				// Obtenemos hash de sesión y guardamos
				localStorage.session = data;
				window.location = 'mis-codigos.html';
			},
			error: function (error) {
				Materialize.toast(
					'Credenciales incorrectas!', 
					4000, 'rounded'
				);
				console.log('[ERROR] %s', error.toString());
			}
		});
	};

	/**
	 * Handler para el login con verificaciones
	 */
	$('#login').click(function (event) {
		event.preventDefault();
		// Email vacío
		if ($('[name=email]').val().length == 0) {
			Materialize.toast(
				'Introduce tu email',
				4000, 'rounded'
			);
			return;
		}
		// Password vacío
		if ($('[name=password]').val().length == 0) {
			Materialize.toast(
				'Introduce tu password',
				4000, 'rounded'
			);
			return;
		}

		login();
	});
});