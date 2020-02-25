var fixedFlag = false; var proD1_zz_swiper; var proD_swiper;
var $resourceTypeList;//最外层元素名
function item_masonry() {
    $resourceTypeList.imagesLoaded(function () {

        $resourceTypeList.masonry({
            itemSelector: '.panel'//列表元素类名
            //gutter: 1,
            //isAnimated: true
        }).children("li").css("visibility", "visible");//元素css默认状态为hidden
        proCon();
    });    
}
function proCon() {
	
		console.log("length: "+$(".project_c .panel").length)
		$(".project_c .panel").each(function () {
			var _this = $(this);
			_this.imagesLoaded(function(){
		        var _h = _this.height();
		        var _hc = _this.find(".panel_wrap").height();
		        if (_hc > (_h - 50)) {
		        	//console.log(_hc+"@@"+_h);
	//	            $(this).find(".panel_wrap p").hide();
		            _this.find(".panel_wrap .bottom").hide();
		            console.log(_this.index()+": "+_h+","+_hc);
		        }
	        })
		})
		addError();
	
    
}

function addError() {
	$('.resource-type-list .panel').each(function(){
		var imgerror = $(this).find('.image img');
		if(imgerror.attr('onerror') == undefined){
			imgerror.attr('onerror','lod(this)');
		}
	})
}

$(document).ready(function(){
    /*项目*/
    $resourceTypeList = $('.resource-type-list');//最外层元素名
	//$('.resource-type-list').css("opacity",0);
    item_masonry();
    $(window).resize(function() {
    	item_masonry();
    	setTimeout(function(){
    		$('.resource-type-list').animate({"opacity":1});
    	},300)
    });
    $(window).resize();
    
    $resourceTypeList.infinitescroll({
//  	binder: $resourceTypeList,
        navSelector     : "#more",
        nextSelector    : "#more a",
        itemSelector    : ".panel",
       //pixelsFromNavToBottom: 150,   
        clickb          : false,//判断是否点击加载更多
        clickobj        : ".load-more-link",//点击加载更多按钮  
        loading:{
            img: "",
            msgText: '加载中',
            finishedMsg: '没有了',
            finished: function(){
                $("#infscr-loading").hide();
                proCon();
            }
        }, errorCallback:function(){
        $(".load-more-link").hide();
        }

    }, function(newElements){
        var $newElems = $(newElements);
        $resourceTypeList.imagesLoaded(function() {
        	$resourceTypeList.masonry('appended', $newElems, false).children("li").css("visibility", "visible");
        	$newElems.fadeIn();
        	setTimeout(function(){
        		proCon();
        	},500)
        	
        });
        return;
    });
    
    
    $(".case-down").click(function(){
        if($(this).find("dl").is(":hidden")){
            $(this).find("dl").show();
            
            if($(window).width()<768){
		    	$(this).find("dl").width($(window).width())
		    	$(this).find("dl").css("left",-$(this).offset().left)
		    }
            
            $(this).siblings().find("dl").hide();
            $(this).css("zIndex",2).siblings().css("zIndex",1);
            return false;
        }else{
            $(this).find("dl").hide();
        }
    })

    $(".case-down dl").click(function(){
		return false;
    })
	
    $(".case-down dd").click(function(){
    	if($(this).hasClass("xname")){
    		return false;
    	}
    	if($(this).hasClass("xall")){
    		$(this).parents(".case-down").removeClass("on");
    		$(this).parents(".case-down").find("span").text($(this).siblings(".xname").text());
    	}else{
    		$(this).parents(".case-down").addClass("on");
    		$(this).parents(".case-down").find("span").text($(this).text());
    	}
        $(this).parents(".case-down").find("dl").hide();
        
        
    })

    $(document).click(function(){
        $(".case-down dl").hide();
    })
    
    $(".case-down dl").mCustomScrollbar({});
    
    
    
    phhover($(".proD2_tit a"));
    
    $(window).resize(function(){
    	$(".case-down").find("dl").attr("style","")
    	
    	
    	if($(window).width()>1025){
	    	zz();
	    }
    	if($(window).width()>767){
	    	//setHeight(".recruit2_item");
	    }
    	proCon();
    })
    
    
    
    
    
    /*招聘*/
	$(".recruit1_r_con").mCustomScrollbar({});
	
	//$(".recruit2 ul li").eq(0).addClass("on");
	

	if($(window).width()>767){
    	//setHeight(".recruit2_item");
    }
	
//	$(".recruit2 ul li dt").click(function(){
//		$(this).parents(".recruit2 ul li").addClass("on").siblings().removeClass("on");
//	})
//	$(".recruit2_t img").click(function(){
//		$(this).parents(".recruit2 ul li").removeClass("on");
//	})
	$(".recruit2 ul li dt").click(function(){
		$(this).slideUp();
		$(this).siblings("dd").slideDown();
		$(this).parents(".recruit2 ul li").siblings().find("dt").slideDown();
		$(this).parents(".recruit2 ul li").siblings().find("dd").slideUp();
	})
	
	$(".recruit2_t img").click(function(){
		$(this).parents(".recruit2 ul li").find("dd").slideUp();
		$(this).parents(".recruit2 ul li").find("dt").slideDown();
	})

	/*项目内容页*/
	$(".proD3 ul li").each(function () {
		var _this = $(this);
		_this.imagesLoaded(function(){
	        var _h = _this.height();
	        var _hc = _this.find(".con").height();
	        if (_hc > (_h - 50)) {
	            _this.find(".con .bottom").hide();
	            //console.log(_this.index()+": "+_h+","+_hc);
	        }
        })
	})
})


window.onload = function(){
	
	
	
	/*项目内容内*/
    if($(window).width()>1024){
	    if($("html").hasClass("ie9")){
	    	proD_swiper = new Swiper('.proD1 .swiper-container', {
				//loop: true, //可选选项，开启循环
	//			effect: 'fade',
				prevButton:'.proD1 .swiper-button-prev',
				nextButton:'.proD1 .swiper-button-next',
				pagination: '.proD1 .swiper-pagination',
				paginationType: 'fraction',
				onInit: function(swiper){ 
					// console.log(swiper.activeIndex);
					
			    },
			    onTransitionEnd: function(swiper){ 
			    	// console.log(swiper.activeIndex);
		            var _this = $('.proD1 .swiper-slide').eq(swiper.activeIndex);
					if(_this.hasClass("ban_video")){
						$(".proD1_btn1").hide();
					}else{
						$(".proD1_btn1").show();
						_this.siblings(".ban_video").find(".proD1_img,.video_btn").show();
						_this.siblings(".ban_video").find("video").get(0).duration = 0
					}
			    }
			})
	    }else{
	    	proD_swiper = new Swiper('.proD1 .swiper-container', {
				//loop: true, //可选选项，开启循环
				effect: 'fade',
				prevButton:'.proD1 .swiper-button-prev',
				nextButton:'.proD1 .swiper-button-next',
				pagination: '.proD1 .swiper-pagination',
				paginationType: 'fraction',
				onInit: function(swiper){ 
	//	            console.log(swiper.activeIndex);
			    },
			    onTransitionEnd: function(swiper){ 
	//		    	console.log(swiper.activeIndex);
		            var _this = $('.proD1 .swiper-slide').eq(swiper.activeIndex);
					if(_this.hasClass("ban_video")){
						$(".proD1_btn1").hide();
					}else{
						$(".proD1_btn1").show();
						_this.siblings(".ban_video").find(".proD1_img,.video_btn").show();
						_this.siblings(".ban_video").find("video").get(0).duration = 0
					}
			    }
			})
	    }
	}else{
		proD_swiper = new Swiper('.proD1 .swiper-container', {
			//loop: true, //可选选项，开启循环
			prevButton:'.proD1 .swiper-button-prev',
			nextButton:'.proD1 .swiper-button-next',
			pagination: '.proD1 .swiper-pagination',
			paginationType: 'fraction',
			onInit: function(swiper){ 
//	            console.log(swiper.activeIndex);
		    },
		    onTransitionEnd: function(swiper){ 
//		    	console.log(swiper.activeIndex);
	            var _this = $('.proD1 .swiper-slide').eq(swiper.activeIndex);
				if(_this.hasClass("ban_video")){
					$(".proD1_btn1").hide();
				}else{
					$(".proD1_btn1").show();
					_this.siblings(".ban_video").find(".proD1_img,.video_btn").show();
					_this.siblings(".ban_video").find("video").get(0).duration = 0
				}
		    }
		})
	}
    
    /*项目内容*/
    proCon();
    
    
    /*视频播放按钮*/
    $(".proD1 .video_btn").click(function(){
    	$(this).hide();
    	$(this).siblings("img").hide();
    	$(this).siblings("video").get(0).play();
    })
    
    /*视频切换按钮*/
    $(".proD1_btn1").click(function(){
    	proD_swiper.slideTo($(".proD1 .swiper-slide.ban_video").index())
    })
    
    /*弹层切换按钮*/
    if($(window).width()>1025){
    	zz();
    }
    
    
    $(".proD1_close").click(function(){
    	$(".proD1_fixed,.proD1_zz").hide();
    })

	$(".proD1_fixed .swiper-slide").click(function(){
		var _index = $(this).index();
		$(".proD1_fixed,.proD1_zz").hide();
		proD_swiper.slideTo(_index);
		$(this).addClass("on").siblings().removeClass("on");
	})
	
	
	
}

function phhover(obj){
	var src,srch;
	if($(window).width() > 1024){
		obj.hover(function(){
			src = $(this).find("img").data("src");
			srch = $(this).find("img").data("srch");
			$(this).find("img").attr("src",srch)
		},function(){
			$(this).find("img").attr("src",src)
		})
	}
}



function zz(){
	$(".proD1_btn2").click(function(){
    	
    	var _index = $(".proD1 .swiper-slide.swiper-slide-active").index();
    	
    	// console.log("_index: "+_index);
    	
    	$(".proD1_fixed,.proD1_zz").show();
    	if($(".proD1_fixed .swiper-slide").length<11){
    		$(".proD1_fixed .swiper-button-prev,.proD1_fixed .swiper-button-next").hide();
    	}
    	if(fixedFlag){
    		proD1_zz_swiper.destroy(true, true)
    	}
    	
    	
	    proD1_zz_swiper = new Swiper('.proD1_fixed .swiper-container', {
			//loop: true, //可选选项，开启循环
			
			prevButton:'.proD1_fixed .swiper-button-prev',
			nextButton:'.proD1_fixed .swiper-button-next',
			slidesPerView: 5,
			slidesPerGroup: 5,
	        slidesPerColumn: 3,
	        slidesPerColumnFill: 'row',
	        paginationClickable: true,
	        spaceBetween: 3,
			onInit: function(swiper){ 
	            imgratio();
	            fixedFlag = true;
		    },
		    onTransitionEnd: function(swiper){ 
	           
		    }
		})
	    $('.proD1_fixed .swiper-slide').eq(_index).addClass('on').siblings().removeClass('on');
    })
}

/*比较高度并设置*/
function setHeight(className){
	$(className).height("auto");
    Array.prototype.max = function() {   
        return Math.max.apply({},this)  /*创建比较最大值方法*/
    } 
    var storkArr=[];
    var maxNum=0;
    var length=$(className).length;
    $(className).each(function(index, el) {
        var target=$(this);
        storkArr.push(target.height());
        maxNum=storkArr.max();
    });
    $(className).height(maxNum);
    
}


function load(){
	var $resourceTypeList = $('.resource-type-list');
	$resourceTypeList.infinitescroll({
        navSelector     : "#more",
        nextSelector    : "#more a",
        itemSelector    : ".panel",
       //pixelsFromNavToBottom: 150,   
        clickb          : false,//判断是否点击加载更多
        clickobj        : ".load-more-link",//点击加载更多按钮  
        loading:{
            img: "",
            msgText: '加载中',
            finishedMsg: '没有了',
            finished: function(){
                $("#infscr-loading").hide();
                proCon();
            }
        }, errorCallback:function(){
        $(".load-more-link").hide();
        }

    }, function(newElements){
        var $newElems = $(newElements);
        $resourceTypeList.imagesLoaded(function() {
        	$resourceTypeList.masonry('appended', $newElems, false).children(".panel").css("visibility", "visible");
        	$newElems.fadeIn();
        	setTimeout(function(){
        		proCon();
        	},500)
        	
        });
        return;
    });
}
