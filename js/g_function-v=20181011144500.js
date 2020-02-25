$(function(){
    controlSwiper();
//  $(".map-messages ol dl").mCustomScrollbar({});
})

$(window).resize(function(){
    if($('.contact-swiper-container').length > 0){
        ww = $(window).width();
        $('.map-messages ol li').off('click');
        $('.map-slide button').off('click');
        mySwiper != undefined ? mySwiper.destroy(false,true) : '';
        controlSwiper();
        if($(this).width()>767){
            var l = $('.map-messages ol li').length;
            swiperMove( i, mySwiper, l )
        }else if($(this).width()<768){
            $('.map-pic ul li').eq(0).addClass('on').siblings().removeClass('on')
        }
    }
})

/* 关于我们swiper */
    var ww = $(window).width();
    var i = 0;
    var mySwiper;
	var prevIndex = 0;
    // 执行初始化
    function controlSwiper(){
        mySwiper = contactSwiper();
        var l = $('.map-messages ol li').length;
        if(ww > 767){
            var button = $('.map-slide button');
            if( l <= 4 ){
                button.hide();
            }else{
                btnControl(l, mySwiper);
            }
            listControl(l, mySwiper);
        }else if(ww >= 550){
        	var button = $('.map-slide button');
            if( l <= 2 ){
                button.hide();
            }else{
                btnControl(l, mySwiper);
            }
            listControl(l, mySwiper);
        }else{
            return;
        }
    }

    // 初始化swiper
    function contactSwiper() {
//  	console.log(ww);
        var swiperObj = {
            style: 'vertical',
            num: 4,
            prevButton: '',
            nextButton: '',
            onlyExternal: true,
            onTransitionEnd: function(){}
        }
        if(ww < 1100 && ww > 768){
            if($('.map-messages ol li').length > 4){
                swiperObj.style = 'horizontal';
                swiperObj.spaceBetween = 2;
            }else{
                return;
            }
        }else if(ww == 768){
        	if($('.map-messages ol li').length > 4){
                swiperObj.style = 'horizontal';
                swiperObj.spaceBetween = 2;
                swiperObj.num = 3;
            }else{
                return;
            }
        }else if(ww < 768 && ww >= 550){
        	if($('.map-messages ol li').length > 2){
                swiperObj.style = 'horizontal';
                swiperObj.spaceBetween = 0;
                swiperObj.num = 2;
            }else{
                return;
            }
        	
//          swiperObj = {
//              num: 2,
//              spaceBetween: 0,
//              style: 'horizontal',
//              prevButton:'.map-slide .left',
//              nextButton:'.map-slide .right',
//              onlyExternal: false,
//              onTransitionEnd: function(swiper){
//                  var i = swiper.activeIndex;
//                  $('.map-pic ul li').eq(i) != undefined ? $('.map-pic ul li').eq(i).addClass('on').siblings().removeClass('on') : '';
//              }
//          }
//          $('.map-slide button').each(function(){
//              $(this).show();
//              $(this).removeClass('off');
//          })
        }else if(ww < 550){
            swiperObj = {
                num: 1,
                spaceBetween: 0,
                style: 'horizontal',
                prevButton:'.map-slide .left',
                nextButton:'.map-slide .right',
                onlyExternal: false,
                onTransitionEnd: function(swiper){
                    var i = swiper.activeIndex;
                    $('.map-pic ul li').eq(i) != undefined ? $('.map-pic ul li').eq(i).addClass('on').siblings().removeClass('on') : '';
                }
            }
            $('.map-slide button').each(function(){
                $(this).show();
                $(this).removeClass('off');
            })
        }



        mySwiper = new Swiper('.contact-swiper-container',{
            direction : swiperObj.style,
            slidesPerView : swiperObj.num,
            slidesPerGroup : 1,
            spaceBetween: swiperObj.spaceBetween,
            prevButton: swiperObj.prevButton,
            nextButton: swiperObj.nextButton,
            onlyExternal: swiperObj.onlyExternal,
            onTransitionEnd: swiperObj.onTransitionEnd
        })
        return mySwiper;
    }

    // 列表点击
    function listControl(l, mySwiper){
        $('.map-messages ol li').on('click',function(){
            i = $(this).index();
            
            switch(i){
                case 0:
                    $('.map-slide button.left').addClass('off');
                    break;
                case (l-1):
                    $('.map-slide button.right').addClass('off');
                    break;
                default:
                    $('.map-slide button').each(function(){
                        $(this).removeClass('off');
                    })
                    break;
            }
            
            if(ww < 768 && ww >= 550){
            	if($(this).hasClass("on")){
            		return false;
            	}else{
//          		console.log(prevIndex +">>"+i)
	          		if(prevIndex < i){
	          			mySwiper.slideTo(i);
	          		}else{
	          			mySwiper.slideTo(i-1);
//	          			if(i <= 0){
//	          				i = 0;
//	          			}else{
//	          				i --;
//	          			}
//	          			swiperMove( i, mySwiper, l, true);
	          		}
	            	prevIndex = i;
            		
            		
            		var curSlide = $('.map-messages ol li').eq(i);
					console.log(i+">>"+$('.map-messages ol li.swiper-slide-active').index())
					$('.map-pic ul li').eq(i) != undefined ? $('.map-pic ul li').eq(i).addClass('on').siblings().removeClass('on') : '';
        			curSlide.addClass('on').siblings().removeClass('on');
            	}
            	
            }else{
            	swiperMove( i, mySwiper, l, true);
            }
            
        })
    }

    // 左右按钮点击
    function btnControl(l, mySwiper) {
        $('.map-slide button').on('click',function(){
            if($(this).hasClass('left')){
                i--;
                prevIndex--;
                $(this).siblings().removeClass('off');
                if(i <= 0){
                    i = 0;
                    $(this).addClass('off');
                }
                
				if(ww < 768 && ww >= 550){
					var curSlide = $('.map-messages ol li').eq(i);
					mySwiper.slideTo(i-1);
					console.log(i+">>"+$('.map-messages ol li.swiper-slide-active').index())
					$('.map-pic ul li').eq(i) != undefined ? $('.map-pic ul li').eq(i).addClass('on').siblings().removeClass('on') : '';
        			curSlide.addClass('on').siblings().removeClass('on');
				}else{
					swiperMove( i, mySwiper, l );
				}
                
            }else{
                i++;
                prevIndex++;
                $(this).siblings().removeClass('off');
                if(i >= l - 1){
                    i = l - 1;
                    $(this).addClass('off');
                }
                if(ww < 768 && ww >= 550){
					var curSlide = $('.map-messages ol li').eq(i);
					mySwiper.slideTo(i);
					console.log(i+">>"+$('.map-messages ol li.swiper-slide-active').index())
					$('.map-pic ul li').eq(i) != undefined ? $('.map-pic ul li').eq(i).addClass('on').siblings().removeClass('on') : '';
        			curSlide.addClass('on').siblings().removeClass('on');
				}else{
					swiperMove( i, mySwiper, l );
				}
            }
        })
    }

    // swiper移动
    function swiperMove( i, swiper, l, f) {
    	
        var curSlide = $('.map-messages ol li').eq(i);
        var _i = 0;
        if( l > 4 && i >= 3){
            _i = i - 3 + 1;
            swiper.slideTo( _i );
        }else if(curSlide.hasClass('swiper-slide-active')){
            if( i > 0 ){
                swiper.slideTo( i-1 );
            }
        }


//      if(f){
//      	if(ww < 768 && ww >= 550){
//	        	swiper.slideTo( i );
//	        }
//      }else{
//      	swiper.slideTo( i );
//      }
		
        
        
        $('.map-pic ul li').eq(i) != undefined ? $('.map-pic ul li').eq(i).addClass('on').siblings().removeClass('on') : '';
        curSlide.addClass('on').siblings().removeClass('on');
    }
/* end */