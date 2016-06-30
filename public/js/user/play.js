var func_like_video = function(){
		var data = {};
		data.music_title = $( 'input[name=music_title]' ).val() || "";
		data.music_singer = $( 'input[name=music_singer]' ).val() || "";

		$.ajax({
            method : 'POST',
            async : false,
            data : data,
            url : window.location.origin + '/like'
        });
	};

$('#likevideo').click(function(){ func_like_video() });