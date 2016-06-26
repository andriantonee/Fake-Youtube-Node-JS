var func_add_music_list = function(){
        var data = {
            music_category : $( '#musiccategory' ).val() || "",
            music_title : $( 'input[name=input_music_title]' ).val() || "",
            music_singer : $( 'input[name=input_music_singer]' ).val() || "",
            album_image : $( 'input[name=input_image_album]' )[0].files[0] || undefined
        };

        if (data.music_category === ""){
            return false;
        }
        if (data.music_title === ""){
            return false;
        }
        if (data.music_singer === ""){
            return false;
        }

        var formdata = new FormData();
        formdata.append('image', data.album_image);
        formdata.append('music_category', data.music_category);
        formdata.append('music_title', data.music_title);
        formdata.append('music_singer', data.music_singer);

        $.ajax({
            method : 'POST',
            async : false,
            data : formdata,
            url : window.location.origin + '/hidden/music/list/add',
            success : function(res){
                console.log(res.success);
            },
            contentType: false,
            processData : false
        })
    },
    func_del_music_list = function(){
        
    },
    func_music_category_handleonchange = function(value){
        location.replace(window.location.origin + '/hidden/music/list/' + value.value); 
    };

$( '#musiccategory' ).change(function(){ func_music_category_handleonchange(this) });
$( 'button[name=add_music_list]' ).click(function(){ func_add_music_list() });
$( 'button[name=del_music_list]' ).click(function(){ func_del_music_list() });