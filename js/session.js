$(document).ready(function() {
	/**
	 * Función que maneja la validación de sesión
	 */
	function validateSession() {
		$.ajax({
			url: 'http://localhost:9000/api/session',
			data: {
				hash: localStorage.session
			},
			dataType: 'json',
			method: 'POST',
			success: function (data, status) {
				console.info("data", data);
				switch (data.status) {
					case 200:
						$('.nickname').text(localStorage.nickname);	
					break;
					default:
						window.location = 'login.html';
					break;
				}
			},
			error: function (jqXHR, status, error) {
				console.log('[ERROR] %s', error);
		    }
		});
	}

	/**
	 * Función que maneja el cierre de sesión con la api
	 */
	function logout() {
		$.ajax({
			url: 'http://localhost:9000/api/logout',
			data: {
				hash: localStorage.session
			},
			dataType: 'json',
			method: 'POST',
			success: function (data, status) {
				window.location = 'login.html';
			},
			error: function (jqXHR, status, error) {
				console.log('[ERROR] %s', error);
		    }
		});
	}

	if (localStorage.session == undefined) {
		window.location = 'login.html';
	} else {
		validateSession();
	}
});