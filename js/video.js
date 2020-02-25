// JavaScript Document
$(function(){

	$(".vide0_close").click(function() {

	   $(this).parents(".video_appbox").hide();
	   
	 });



	var srcl="",simg='',src2="";
	
	var isSupportTouch = "ontouchend" in document ? true : false;
	$(".index4_r_btn").click(function(e){
		srcl=$(this).data("video");
		src2=$(this).data("video1");
		simg=$(this).data("img");
		$(".video_appbox").fadeIn();
		video()
	})
	
	$(".video_appbox .mask").click(function(){
		$(".video_appbox").fadeOut();
		$(".video_t").html("")
	})
	

	
	function video(){
		$(".video_t").html("<video width='500' height='400' src='"+ srcl +"' type='video/mp4' id='media' poster='"+ simg +"' controls='controls' preload='none' autoplay='autoplay'></video>")
			
		$(".video_t video").attr({width:$(".video_t").width(),height:$(".video_t").height()})

		if(isSupportTouch) {
            $(".video_t").html("<video width='500' height='400' src='"+ srcl +"' type='video/mp4' id='media' poster='"+ simg +"' controls='controls' preload='none'></video>")
			//
			$(".video_t video").attr({width:$(".video_t").width(),height:$(".video_t").height()})
        } else {
            videoBox($(".video_t").width(), $(".video_t").height(), src2,simg);
        }

	}
	
	function videoBox(width, height, url,img) {
	    var s1 = new SWFObject("flash/flvplayer.swf","single",width,height,"7");
        s1.addParam("allowfullscreen","true");
        s1.addParam("wmode","transparent");
        s1.addVariable("file",url);
        s1.addVariable("autostart","true");
        s1.addVariable("width",width);
		s1.addVariable("backcolor",0x000000);
		s1.addVariable("frontcolor",0xFFFFFF);
		s1.addVariable("lightcolor",0x000000);
        s1.addVariable("height",height);
        s1.write("player1");
	}
	
})





$(document).ready(function(){ 


	// $(".video_button").click(function(e){
	// 	srcl=$(this).data("video");
		
	// 	simg=$(this).data("img");
	// 	$(".video_appbox").fadeIn();
	// 	video()
	// })

	

	
	// function video(){
	
 //      $(".video_t").html("<video width='500' height='400' src='"+ srcl +"' type='video/mp4' id='media' poster='"+ simg +"' controls='controls' preload='none'></video>")
			
	// 		$(".video_t video").attr({width:$(".video_t").width(),height:$(".video_t").height()})
        
	// }

})






