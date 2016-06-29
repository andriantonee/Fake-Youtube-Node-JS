var func_logout = function(){
		var data = {};

		$.ajax({
			method : 'POST',
			async : false,
			data : data,
			url : window.location.origin + '/hidden/logout',
			success : function(res){
				if (res.success === true){
					location.replace(window.location.origin + '/hidden');
				}
				else{
					location.reload();
				}
			}
		});
	};

$('#logout').click(function(){ func_logout() });