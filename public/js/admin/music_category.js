var add_music_category = function(){
		var data = {
				music_category : $('input[name=input_music_category]').val() || ""
			};

		if (data.music_category === ""){
			$("input[name=input_music_category]").focus();
			return false;
		}

		$.ajax({
			method : 'POST',
			async : false,
			data : data,
			url : window.location.origin + '/hidden/music/category/add',
			success : function(res) {
				if (res.success === true){
					location.replace(window.location.origin + '/hidden/music/category');
				}
				else{
					alert(res.message);
				}
			}
		});
	},
	delete_music_category = function(){

	};

$('button[name=add_music_category]').click(function(){ add_music_category() });
$('button[name=delete_music_category]').click(function(){ delete_music_category() });