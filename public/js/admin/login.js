var func_login = function (){
		var data = {
			username : $('input[name=username]').val() || "",
			password : $('input[name=password]').val() || ""
		};
		
		if (data.username === ""){
			$("input[name=username]").focus();
			return false;
		}

		if (data.password === ""){
			$("input[name=password]").focus();
			return false;
		}

		$.ajax({
			method : 'POST',
			async : false,
			data : data,
			url : window.location.origin + '/authentication',
			success : function(res) {
				if (res.success === true){
					location.replace('/home');
				}
				else{
					alert(res.message);
				}
			}
		})
	};

$('button[name=login]').click(function(){ func_login() });