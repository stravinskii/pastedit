$(document).ready(function(){
    $("button").click(function(){
        $.ajax({
		    url : 'http://localhost:9000/api/codigo/',
		    type: "POST",
		    data : {
  				lenguaje: $('select').val(),
  				nombre: $('#first_name').val(),
  				codigo: $('#textarea1').val()
  			},
		    success: function(data, textStatus, jqXHR) {
		    	
		    },
		    error: function (jqXHR, textStatus, errorThrown) {

		    }
		});
    });
});