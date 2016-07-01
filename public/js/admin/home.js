var func_list_view = function(){
		var data = {};

		$.ajax({
            method : 'POST',
            async : false,
            data : data,
            url : window.location.origin + '/hidden/view',
            success : function(res){
            	if (res.success === true){
            		location.reload();
            	}
            }
        });
	},
	func_list_like = function(){
		var data = {};

		$.ajax({
            method : 'POST',
            async : false,
            data : data,
            url : window.location.origin + '/hidden/like',
            success : function(res){
            	if (res.success === true){
            		location.reload();
            	}
            }
        });
	};


$('#listview').click(function(){ func_list_view() });
$('#listlike').click(function(){ func_list_like() });