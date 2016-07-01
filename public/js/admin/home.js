var   API_KEY = "AIzaSyAx_39EsBPG8dtNaYyE7kDo_U7-O3FwJVs",
      func_list_view = function(){
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
	},
      func_sync_data = function(){
            var data = {};

            $.ajax({
                  method : 'GET',
                  async : false,
                  data : data,
                  url : window.location.origin + '/hidden/sync/list',
                  success : function(res){
                        if (res.success === true){
                              data.item = res.data;

                              for (i = 0; i < data.item.length; i++){
                                    $.ajax({
                                          method : 'GET',
                                          async : false,
                                          url : "https://www.googleapis.com/youtube/v3/videos?id=" + data.item[i].youtube_video_id + "&key="+ API_KEY + "&fields=items(statistics)&part=statistics",
                                          success : function(res){
                                                if (res.items.length !== 0)
                                                      data.item[i].youtube_view = res.items[0].statistics.viewCount;
                                                else
                                                      data.item[i].youtube_view = 0;
                                          }
                                    });
                              }

                              $.ajax({
                                    method : 'POST',
                                    async : false,
                                    data : {
                                          music_list : JSON.stringify(data.item)
                                    },
                                    url : window.location.origin + '/hidden/sync',
                                    success : function(res){
                                          if (res.success === true){
                                                location.reload();
                                          }
                                    }
                              });
                        }
                  }
            });
      };


$('#listview').click(function(){ func_list_view() });
$('#listlike').click(function(){ func_list_like() });
$('#syncdata').click(function(){ func_sync_data() });