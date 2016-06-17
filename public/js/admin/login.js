var func_login = function (){
		var data = {
			username : $('input[name=username]').val() || "",
			password : $('input[name=password]').val() || ""
		};
		
		if (data.username === ""){
			$("input[name=username]").focus();
			
			if ($( '#div-error-form-login' ).length === 0){
				if ($( '#label-error-form-login' ).length !== 0)
					$( '#label-error-form-login' ).remove();

				$(	'<div id="div-error-form-login" class="form-group has-error" >' +
						'<label id="label-error-form-login" class="control-label">' +
							'Username masih kosong !' +
						'</label>' +
					'</div>'  ).insertBefore( $('#fieldset-form-login') );
			}
			else{
				if ($( '#label-error-form-login' ).length === 0){
					$( '#div-error-form-login' ).append('<label id="label-error-form-login" class="control-label">' +
															'Username masih kosong !' +
														'</label>');
				}
				else{
					$( '#label-error-form-login' ).html('Username masih kosong !');
				}
			}
			
			return false;
		}

		if (data.password === ""){
			$("input[name=password]").focus();

			if ($( '#div-error-form-login' ).length === 0){
				if ($( '#label-error-form-login' ).length !== 0)
					$( '#label-error-form-login' ).remove();

				$(	'<div id="div-error-form-login" class="form-group has-error" >' +
						'<label id="label-error-form-login" class="control-label">' +
							'Password masih kosong !' +
						'</label>' +
					'</div>'  ).insertBefore( $('#fieldset-form-login') );
			}
			else{
				if ($( '#label-error-form-login' ).length === 0){
					$( '#div-error-form-login' ).append('<label id="label-error-form-login" class="control-label">' +
															'Password masih kosong !' +
														'</label>');
				}
				else{
					$( '#label-error-form-login' ).html('Password masih kosong !');
				}
			}

			return false;
		}

		$.ajax({
			method : 'POST',
			async : false,
			data : data,
			url : window.location.origin + '/hidden/authentication',
			success : function(res) {
				if (res.success === true){
					location.replace('/hidden/home');
				}
				else{
					if ($( '#div-error-form-login' ).length === 0){
						if ($( '#label-error-form-login' ).length !== 0)
							$( '#label-error-form-login' ).remove();

						$(	'<div id="div-error-form-login" class="form-group has-error" >' +
								'<label id="label-error-form-login" class="control-label">' +
									res.message +
								'</label>' +
							'</div>'  ).insertBefore( $('#fieldset-form-login') );
					}
					else{
						if ($( '#label-error-form-login' ).length === 0){
							$( '#div-error-form-login' ).append('<label id="label-error-form-login" class="control-label">' +
																	res.message +
																'</label>');
						}
						else{
							$( '#label-error-form-login' ).html(res.message);
						}
					}
				}
			}
		})
	};

$('button[name=login]').click(function(){ func_login() });