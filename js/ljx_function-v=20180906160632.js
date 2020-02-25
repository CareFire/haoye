var swiper,swiper4;
$(function() {
    

	numbeat($(".about_block01"),$(".about_block01 ul li:nth-child(1) h1 span"));
	numbeat($(".about_block01"),$(".about_block01 ul li:nth-child(2) h1 span"));
	numbeat($(".about_block01"),$(".about_block01 ul li:nth-child(3) h1 span"));
	numbeat($(".about_block01"),$(".about_block01 ul li:nth-child(4) h1 span"));
	
	//about_swiper();
	
//	about_light();
	
	about();
	
	$(window).resize(function(){
		swiper != undefined ? swiper.destroy(false,true) : '';
		about_swiper();
	})
	
	swiper4 = new Swiper('.about4', {
        slidesPerView: 4,
        slidesPerGroup : 1,
        prevButton:'.about4 .swiper-button-prev',
		nextButton:'.about4 .swiper-button-next',
        spaceBetween: 2,
        breakpoints: { 
        	768: {
		      slidesPerView: 2,
		      spaceBetween: 0
		    },
        	420: {
		      slidesPerView: 1,
		      spaceBetween: 0
		    }
        }
    });
	
})

function about(){
	var len = $(".about_customer li").length;
	var $ul = $(".about_customer ul");
	var $li = $(".about_customer li");
	for(var i=0; i<len;i=i+2){
		$li.eq(i).append($li.eq(i+1).html());
		$li.eq(i+1).remove();
	}
	about_swiper();
}


function about_swiper(){
    var about_perView=8;
    var about_Column=2;
    var about_group=8;
    if($(window).width()<1200){
        about_perView=6;
        about_Column=2;
        about_group=6;
    }
    if($(window).width()<900){
        about_perView=6;
        about_Column=2;
        about_group=6;
    }
    if($(window).width()<768){
        about_perView=5;
        about_Column=1;
        about_group=5;
    }

    if($(window).width()<640){
        about_perView=4;
        about_Column=1;
        about_group=4;
    }

	swiper = new Swiper('.about_customer .swiper-container', {
        slidesPerView: about_perView,
//      slidesPerColumn: about_Column,
        slidesPerGroup : about_group,
        //slidesPerColumnFill : 'row',
        prevButton:'.about_customer .swiper-button-prev',
		nextButton:'.about_customer .swiper-button-next',
        spaceBetween: 0
    });
    aboutHover();
}
function about_light(){
	lc_lightbox('.elem', {
        wrap_class: 'lcl_fade_oc',
        show_title: true,  //是否显示标题
        show_descr: true,    //是否显示详情描述data-lcl-txt
        carousel: true,   
        gallery : true,   
        thumb_attr: false, 
        thumbs_nav: false, 
        skin: 'minimal',
        radius: 0,
        padding : 0,
        border_w: 0,
        progressbar: true, 
        data_position: 'under',  
        nav_btn_pos: 'middle',
        cmd_position  : 'outer',
        mousewheel: false, 
    }); 
}

function numbeat(wraper,target){
	var flag = true;
	var spacenum = 1
	var arr = 0;
	var max = parseFloat(target.attr("rel"));
	if(max > 200){
		spacenum = parseInt(max/100);
}
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



$(function(){
     history_tab($('.team_tab li').eq(0))
    $(".team_tab li").eq(0).addClass("on")
    $(document).on("click",".team_tab li",function(){
          var $_this=$(this);
          history_tab($_this)
          $_this.addClass("on").siblings().removeClass("on");
          imgratio() 
    })

  })

function history_tab($_this){
    var url=$_this.data("src");
    if(url==null)return false;
    $.ajax({
        url:url,
        type:"GET",
        success: function (msg) {
            $(".team_list ul").html(msg);
            imgratio();
            if($(window).width()<1025){
	            $(".team_list ul a").each(function(){
		            $(this).attr("target","_self")
		        })
	        }
        }
    });
};

function aboutHover() {
    $('.about_customer li .about_logo>a').hover(function(){
        if($(this).attr('href') == 'javascript:void(0);'){
            $(this).css('cursor','default');
        }else{
            $(this).css('cursor','pointer');
        }
    })
}














