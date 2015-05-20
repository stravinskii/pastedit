$(document).ready(function(){

	function parse(val) {
	    var result = "Not found",
	        tmp = [];
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
	}

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
			// $(lenguajes).material_select();
		},
		error: function (jqXHR, status, error) {
			console.log('[ERROR] %s', error);
		}
	});


    $("form").submit(function (event){
    	event.preventDefault();
        $.ajax({
		    url : '/api/codigo/',
		    dataType: "json",
		    type: "POST",
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
});