var func_logout = function(){
		var data = {};

		$.ajax({
			method : 'POST',
			async : false,
			data : data,
			url : window.location.origin + '/hidden/logout'
		});
	};

$('#logout').click(function(){ func_logout() });