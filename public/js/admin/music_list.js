var func_add_music_list = function(){
        var data = {
            music_category : $( '#musiccategory' ).val() || "",
            music_title : $( 'input[name=input_music_title]' ).val() || "",
            music_singer : $( 'input[name=input_music_singer]' ).val() || "",
            album_image : $( 'input[name=input_image_album]' )[0].files[0] || undefined
        };

        if (data.music_category === ""){
            $( '#musiccategory' ).focus();

            if ($( '#div-row-alert-form-list' ).length === 0){
                $( '<div id="div-row-alert-form-list" class="row">' +
                       '<div class="col-lg-12">' +
                           '<div id="div-row-alert-messsage-form-list" class="alert alert-danger">' +
                               'Music Category yang ingin diinput masih kosong !' +
                           '</div>' +
                       '</div>' +
                   '</div>' ).insertBefore( '#div-row-form-music-list' );
            }
            else{
                $(' #div-row-alert-messsage-form-list ').html('Music Category yang ingin diinput masih kosong !');
            }

            return false;
        }
        if (data.music_title === ""){
            $( 'input[name=input_music_title]' ).focus();

            if ($( '#div-row-alert-form-list' ).length === 0){
                $( '<div id="div-row-alert-form-list" class="row">' +
                       '<div class="col-lg-12">' +
                           '<div id="div-row-alert-messsage-form-list" class="alert alert-danger">' +
                               'Music Title yang ingin diinput masih kosong !' +
                           '</div>' +
                       '</div>' +
                   '</div>' ).insertBefore( '#div-row-form-music-list' );
            }
            else{
                $(' #div-row-alert-messsage-form-list ').html('Music Title yang ingin diinput masih kosong !');
            }

            return false;
        }
        if (data.music_singer === ""){
            $( 'input[name=input_music_singer]' ).focus();

            if ($( '#div-row-alert-form-list' ).length === 0){
                $( '<div id="div-row-alert-form-list" class="row">' +
                       '<div class="col-lg-12">' +
                           '<div id="div-row-alert-messsage-form-list" class="alert alert-danger">' +
                               'Music Singer yang ingin diinput masih kosong !' +
                           '</div>' +
                       '</div>' +
                   '</div>' ).insertBefore( '#div-row-form-music-list' );
            }
            else{
                $(' #div-row-alert-messsage-form-list ').html('Music Singer yang ingin diinput masih kosong !');
            }

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
                if (res.success === true){
                    location.reload();
                }
                else{
                    $( 'input[name=input_music_singer]' ).focus();

                    if ($( '#div-row-alert-form-list' ).length === 0){
                        $( '<div id="div-row-alert-form-list" class="row">' +
                               '<div class="col-lg-12">' +
                                   '<div id="div-row-alert-messsage-form-list" class="alert alert-danger">' +
                                       res.message +
                                   '</div>' +
                               '</div>' +
                           '</div>' ).insertBefore( '#div-row-form-music-list' );
                    }
                    else{
                        $(' #div-row-alert-messsage-form-list ').html(res.message);
                    }

                    return false;
                }
            },
            contentType: false,
            processData : false
        });
    },
    func_del_music_list = function(){
        var data = {
            music_category : $( '#musiccategory' ).val() || "",
            music_title : $( 'input[name=input_music_title]' ).val() || "",
            music_singer : $( 'input[name=input_music_singer]' ).val() || ""
        };

        if (data.music_category === ""){
            $( '#musiccategory' ).focus();

            if ($( '#div-row-alert-form-list' ).length === 0){
                $( '<div id="div-row-alert-form-list" class="row">' +
                       '<div class="col-lg-12">' +
                           '<div id="div-row-alert-messsage-form-list" class="alert alert-danger">' +
                               'Music Category yang ingin dihapus masih kosong !' +
                           '</div>' +
                       '</div>' +
                   '</div>' ).insertBefore( '#div-row-form-music-list' );
            }
            else{
                $(' #div-row-alert-messsage-form-list ').html('Music Category yang ingin dihapus masih kosong !');
            }

            return false;
        }
        if (data.music_title === ""){
            $( 'input[name=input_music_title]' ).focus();

            if ($( '#div-row-alert-form-list' ).length === 0){
                $( '<div id="div-row-alert-form-list" class="row">' +
                       '<div class="col-lg-12">' +
                           '<div id="div-row-alert-messsage-form-list" class="alert alert-danger">' +
                               'Music Title yang ingin dihapus masih kosong !' +
                           '</div>' +
                       '</div>' +
                   '</div>' ).insertBefore( '#div-row-form-music-list' );
            }
            else{
                $(' #div-row-alert-messsage-form-list ').html('Music Title yang ingin dihapus masih kosong !');
            }

            return false;
        }
        if (data.music_singer === ""){
            $( 'input[name=input_music_singer]' ).focus();

            if ($( '#div-row-alert-form-list' ).length === 0){
                $( '<div id="div-row-alert-form-list" class="row">' +
                       '<div class="col-lg-12">' +
                           '<div id="div-row-alert-messsage-form-list" class="alert alert-danger">' +
                               'Music Singer yang ingin dihapus masih kosong !' +
                           '</div>' +
                       '</div>' +
                   '</div>' ).insertBefore( '#div-row-form-music-list' );
            }
            else{
                $(' #div-row-alert-messsage-form-list ').html('Music Singer yang ingin dihapus masih kosong !');
            }

            return false;
        }
        console.log("jalan");
        $.ajax({
            method : 'POST',
            async : false,
            data : data,
            url : window.location.origin + '/hidden/music/list/delete',
            success : function(res){
                if (res.success === true){
                    location.reload();
                }
                else{
                    $( 'input[name=input_music_title]' ).focus();

                    if ($( '#div-row-alert-form-list' ).length === 0){
                        $( '<div id="div-row-alert-form-list" class="row">' +
                               '<div class="col-lg-12">' +
                                   '<div id="div-row-alert-messsage-form-list" class="alert alert-danger">' +
                                       res.message +
                                   '</div>' +
                               '</div>' +
                           '</div>' ).insertBefore( '#div-row-form-music-list' );
                    }
                    else{
                        $(' #div-row-alert-messsage-form-list ').html(res.message);
                    }

                    return false;
                }
            }
        });
    },
    func_music_category_handleonchange = function(value){
        location.replace(window.location.origin + '/hidden/music/list/' + value.value); 
    },
    func_music_list_table_click = function(value){
        $( 'input[name=input_music_title]' ).val($(value).children()[1].innerHTML).focus();
        $( 'input[name=input_music_singer]' ).val($(value).children()[2].innerHTML);
    };

$( '#musiccategory' ).change(function(){ func_music_category_handleonchange(this) });
$( 'button[name=add_music_list]' ).click(function(){ func_add_music_list() });
$( 'button[name=delete_music_list]' ).click(function(){ func_del_music_list() });
$( 'tr.cursor-pointer' ).click(function(){ func_music_list_table_click(this) });