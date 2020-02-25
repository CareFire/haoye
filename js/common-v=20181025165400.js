$(function () {
	

    $(".phone_menu").click(function(e){
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            $(".head").removeClass("on");
            $(".head").find("dl").removeClass("on");
        } else {
            $(this).addClass("on");
            $(".head").addClass("on");
        }
    })
	if($(window).width()>1024){

	}else{
        $("a").not(".weibo").each(function(){
            $(this).attr("target","_self")
        })
		$(".head ul > li").each(function(i){
			if($(this).find("dl").size()!=0){
				$(this).children("a").attr("href","javascript:void(0)");
                $(this).children("a").click(function(){
                	$(this).next().addClass("on");
				})
			}

			$(this).find("dl dd:eq(0)").click(function(){
				$(this).parent().removeClass("on");
			})
		})
	}
	
	$(window).scroll(function(){
		if($(window).scrollTop()>100){
			$(".back").fadeIn();
		}else{
			$(".back").fadeOut();
		}
	})
	
	$(".back").click(function(){
	    $("body,html").stop().animate({scrollTop:0});
    })
	
	search();
	resizefun();
	
	$(window).resize(function(){
		search();
		resizefun();
	})
	
	$(".footer_r a:first-child").click(function(){
		$(".ewm").toggle();
	})
	
	wowInt();
	
//	targetBlank($('.search-body'));
})

function wowInt(){
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        var wow = new WOW({
            //mobile: false
        });
        wow.init();
    };
}

function search(){
	$(".search_box").hover(function(){
		if($(window).width()>1024){
			$(this).addClass("on");
		}else{
			return;
		}
	})
	$(".search_box").click(function(e){
		e.stopPropagation();
		if($(window).width()<=1024&&$(window).width()>=768){
			console.log(11)
			$(this).addClass("on");
		}else{
			return;
		}
	})

    $(".search_text").click(function(){
    	return false;
	})
    
	$(document).click(function(){
        $(".search_box").removeClass("on");
	})
	
	$(".search_text").focus(function(){
    	if(this.value=='请输入'){this.value=''};
	}).blur(function(){
		if(this.value==''||this.value=='请输入'){this.value='请输入';}
	})
	
	// $(".search_text").focus(function(){
    // 	$(this).attr("placeholder","")
	// })
    // $(".search_text").blur(function(){
    // 	$(this).attr("placeholder","请输入")
	// })
}


function resizefun(){
	$(window).scroll(function(){
		if($(window).scrollTop()>0){
			$("body").addClass("scroll");
//				$(".header").css({"height":"auto","background":"rgba(0,0,0,0.7)","transition":"all 1s"})
		}else{
			$("body").removeClass("scroll");
//				$(".header").css({"height":"100px","background":"none","transition":"all 1s"})
		}
	})
	if($(window).width()<= 1024){
		$(".slide ul li:nth-child(3)").click(function(){
			$(this).toggleClass("on");
		})
		$(".slide_num a").attr("href","tel:400-658-3699");
		
	}else{
		
	}
}

function phhover(obj){
	var src,srch;
    obj.hover(function(){
    	src = $(this).find("img").data("src");
    	srch = $(this).find("img").data("srch");
    	$(this).find("img").attr("src",srch)
    },function(){
    	$(this).find("img").attr("src",src)
    })
}




/* 新窗口打开 */
function targetBlank(ele) {
	ele.find('a').each(function(){
		if($(this).attr('target') == undefined){
			$(this).attr('target','_blank')
		}
	})
}