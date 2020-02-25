var banner2_count=0;
var banner_toggle=true;
$(function() {
	$(".banner a").each(function(){
		if($.trim($(this).attr("href"))==""){
			$(this).attr("href","javascript:;")
			$(this).css("cursor","default");					
		}
	})
	
	
	setTimeout(function(){
		$(".banner_arrow").hide();
	},3000)

	$(".banner,.header").addClass("on");

	//首页banner
	resizefun_ind();

	bannerSwiper();
	
	$(window).resize(function(){
//		bannerSwiper();
	})


	phhover($(".index1_btn div"));
	numbeat($(".index2"),$(".index2 ul li:nth-child(1) h1 span"));
	numbeat($(".index2"),$(".index2 ul li:nth-child(2) h1 span"));
	numbeat($(".index2"),$(".index2 ul li:nth-child(3) h1 span"));
	numbeat($(".index2"),$(".index2 ul li:nth-child(4) h1 span"));
	$(window).resize(function(){
		resizefun_ind();
		$(".index4_r").height($(".index4_l").height())
		if($(window).width()<768){
			$(".index3_img").height($(".index3_img").width()*9/16)
		}
	})
//	$(".index4_l").mCustomScrollbar({});
	$(".index4_r").height($(".index4_l").height())
	
	// $('.banner .swiper-slide').not('.banner_con').click(function(){
	// 	var h = $(this).data('href');
	// 	if(h != undefined && h != ""){
	// 		var reg = /xinhongru/;
	// 		reg.test(h) ? window.open(h) : window.location.href = h;
	// 	}
	// })
	// $('.banner_con').click(function(e){
	// 	e.stopPropagation();
	// })

})

window.onload = function(){
//	if($(window).width()<768){
//		$(".index3_img").height($(".index3_img").width()*9/16)
//	}
	
}


function aniSwiper(){
    $(".index1_container .swiper-slide-active .index1_l").removeClass().addClass("index1_l fl fadeInLeft animated");
    $(".index1_container .swiper-slide-prev .index1_l").removeClass().addClass("index1_l fl fadeOutRight animated");
    $(".index1_container .swiper-slide .index1_r img").removeClass();
    $(".index1_container .swiper-slide-active .index1_r img,.index1_container .swiper-slide-duplicate-active .index1_r img").removeClass().addClass("imgSc");
    $(".index1_container .index1_l .index1_l_con ").css({"visibility":"visible"});
}
var index1_swiper;
$(function(){
	
	btn();
	
	
	if($(window).width()>767){
        $(".index1_container .swiper-button-next").click(function(){
            aniMove("right");
            btn();
        })

        $(".index1_container .swiper-button-prev").click(function(){
            aniMove("left");
            btn();
        })
	}else{
		index1_swiper = new Swiper('.index1_container', {
		//		autoplay: 5000, //可选选项，自动滑动
				//loop: true, //可选选项，开启循环
				loop:false,
				paginationClickable: true,
				effect: 'slide',
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
			   speed:1000
			})
	}
	$(window).resize(function(){
		$(".index1_container .swiper-button-next").off("click");
		$(".index1_container .swiper-button-prev").off("click");
		
		if($(window).width()>767){
	        $(".index1_container .swiper-button-next").click(function(){
	            aniMove("right");
	            btn();
	        })
	
	        $(".index1_container .swiper-button-prev").click(function(){
	            aniMove("left");
	            btn();
	        })
		}else{
			try{
				index1_swiper.destroy(true,true);
			}catch(e){
				//TODO handle the exception
			}
			
			index1_swiper = new Swiper('.index1_container', {
			//		autoplay: 5000, //可选选项，自动滑动
					loop: false, //可选选项，开启循环
					paginationClickable: true,
					effect: 'slide',
					prevButton:'.swiper-button-prev',
					nextButton:'.swiper-button-next',
				   speed:1000
				})
		}
	})
})

function btn(){
	if(banner2_count <= 0){
		$(".index1_container .swiper-button-prev").addClass("swiper-button-disabled");
	}else{
		$(".index1_container .swiper-button-prev").removeClass("swiper-button-disabled");
	}
	if(banner2_count >= $(".index1_container .swiper-slide").size()-1){
		$(".index1_container .swiper-button-next").addClass("swiper-button-disabled");
	}else{
		$(".index1_container .swiper-button-next").removeClass("swiper-button-disabled");
	}
}


function aniMove(dir){
	if(dir=="right"){
		if(banner2_count >= $(".index1_container .swiper-slide").size()-1){
//			banner2_count=0;
			$(this).addClass("swiper-button-disabled");
			return;
		}else{
			banner2_count++;
		}
		$(".index1_container .swiper-slide:eq("+banner2_count+")").addClass("on").siblings().removeClass("on");
		$(".index1_container .swiper-slide:eq("+banner2_count+")").find(".index1_l").removeClass().addClass("index1_l fl fadeInLeft animated");
		$(".index1_container .swiper-slide:eq("+banner2_count+")").siblings().find(".index1_l").removeClass().addClass("index1_l fl fadeOutRight animated");
//		console.log(banner2_count);
    }else if(dir=="left"){
        if(banner2_count <= 0){
//          banner2_count=$(".index1_container .swiper-slide").size()-1;
			$(this).addClass("swiper-button-disabled");
			return;
        }else{
            banner2_count--;
        }
        $(".index1_container .swiper-slide:eq("+banner2_count+")").addClass("on").siblings().removeClass("on");
        $(".index1_container .swiper-slide:eq("+banner2_count+")").find(".index1_l").removeClass().addClass("index1_l fl fadeInRight animated");
        $(".index1_container .swiper-slide:eq("+banner2_count+")").siblings().find(".index1_l").removeClass().addClass("index1_l fl fadeOutLeft animated");
//      console.log(banner2_count);
	}
//  console.log(banner2_count);
}

function resizefun_ind(){
	if($(window).width()>=768){
		$(".banner .swiper-slide,.banner").height($(window).height())
	}else{
		$(".banner .swiper-slide").height("auto")
	}
}

function numbeat(wraper,target){
	var flag = true;
	var spacenum = 1
//	console.log(flag);
	var arr = 0;
	var max = parseFloat(target.attr("rel"));
	if(max > 200){
		spacenum = parseInt(max/100);
	}
//	console.log(wraper.offset().top,$(window).height(),$(window).scrollTop());
//	if(wraper.offset().top < $(window).height()){
//		flag = false;
//		var timer = setInterval(function() {
//	    	arr = arr + spacenum;
//			arr < max ? arr : clearInterval(timer);
//          if(arr>=max){
//              target.html(max);
//          }else{
//              target.html(arr);
//          }
//	    }, 10);
//	}
setTimeout(function(){
	if($(window).scrollTop() > wraper.offset().top-$(window).height()/1.2){
		flag = false;
		var timer = setInterval(function() {
	    	arr = arr + spacenum;
			arr < max ? arr : clearInterval(timer);
            if(arr>=max){
                target.html(max);
            }else{
                target.html(arr);
            }
	    }, 50);
	}
},200)
	
	$(window).scroll(function(){
		if(flag){
			if($(window).scrollTop() > wraper.offset().top-$(window).height()/1.2){
				flag = false;
				var timer = setInterval(function() {
			    	arr = arr + spacenum;
					arr < max ? arr : clearInterval(timer);
	                if(arr>=max){
	                    target.html(max);
	                }else{
	                    target.html(arr);
	                }
			    }, 50);
			}
		}
	})
	
}


/* 首页视频轮播 */ 
var banner_swiper;
var toggleSwiper = false;
function bannerSwiper() {
	// banner_swiper = new Swiper('.index-swiper-container', {
	// 	autoplay: 5000, 
	// 	loop: true, 
	// 	pagination: '.pagination',
	// 	paginationClickable: true,
	// 	speed:1000,
	// 	onSlideChangeEnd: function(swiper){
	// 		if($(window).width()>767){
	// 			var _this = $('.index-banner .swiper-slide').eq(swiper.activeIndex);
	// 			videoSelect(_this);
	// 		}
	// 	}
	// })

	banner_swiper = new Swiper('.banner .swiper-container', {
		autoplay: 5000, //可选选项，自动滑动
		autoplayDisableOnInteraction: false,
        speed:1000,
		loop: true, //可选选项，开启循环
		pagination: '.banner .pagination',
		paginationClickable: true,
		onInit: function(swiper1){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper1); //隐藏动画元素
			setTimeout(function(){

	        	swiperAnimate(swiper1); //初始化完成开始动画
                resizefun_ind();
                banner_toggle=false;
            },1500)

	    }, 
	    onPaginationRendered:function(swiper, paginationContainer){
      		var _len = $(".pagination span").length;
			console.log(_len)
			if(_len > 7){
				$(".pagination span").width(($(window).width()*0.936)/_len-2);
			}
    	},
	    onTransitionEnd: function(swiper1){
			if(banner_toggle==false){
	        	swiperAnimate(swiper1); //每个slide切换结束时也运行当前slide动画
            }
			//console.log(swiper1.activeIndex);
			if($(window).width()>767){
				var _this = $('.banner .swiper-slide').eq(swiper1.activeIndex);
				videoSelect(_this,swiper1,true);
			}
		},
		onTransitionStart: function(swiper1){
			if($(window).width()>767){
				var _this = $('.banner .swiper-slide').eq(swiper1.activeIndex);
				videoSelect(_this,swiper1,false);
			}
		}
	})
}

function videoSelect(_this,banner_swiper,f) {
	if($(window).width()>767){
		if(f){
			$(".vv").each(function(){
				$(this).remove();
			})
			var flag = true;
			var cc = _this.hasClass('ban_video');
			if(cc && _this.data('video') != undefined && _this.data('video') != ""){
				banner_swiper.stopAutoplay();
				var videos = '<video src="'+ _this.data('video') +'" autoplay="autoplay" class="vv" style="display:none;"></video>';
				_this.append(videos);
				var aaa = setInterval(function(){
					if($(".vv").get(0) != null){
						if(!isNaN($(".vv").get(0).duration)&&flag){
							$(".vv").get(0).play();
							clearInterval(aaa);
							flag=false;
							setTimeout(function(){_this.find('video').css("display","block");},500)
						}
					}
				},10);  
				_this.find('video').bind('ended',function () {
					banner_swiper.slideNext();
					banner_swiper.startAutoplay();
				});
			}else{
				$(".vv").each(function(){
					$(this).remove();
				})
			}
		}else{
			$(".vv").each(function(){
				$(this).remove();
			})
		}
		
	}
}
/* end */

