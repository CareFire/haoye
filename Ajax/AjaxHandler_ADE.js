/**--------------公共变量 begin------------*/
var this_url = window.location.href.toLowerCase();
var regemail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var regtelphone = /(^(\d{11})$|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
var regnum = /^\d+$/;
var regcode = /[1-9]\d{5}(?!\d)/;
var regID = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}x)$/;
var this_protocol = window.location.protocol;
var this_host = window.location.host;
var GetDomain = this_protocol + '//' + this_host;
var hash = {
    'qq.com': 'http://mail.qq.com',
    'gmail.com': 'http://mail.google.com',
    'sina.com': 'http://mail.sina.com.cn',
    '163.com': 'http://mail.163.com',
    '126.com': 'http://mail.126.com',
    'yeah.net': 'http://www.yeah.net/',
    'sohu.com': 'http://mail.sohu.com/',
    'tom.com': 'http://mail.tom.com/',
    'sogou.com': 'http://mail.sogou.com/',
    '139.com': 'http://mail.10086.cn/',
    'hotmail.com': 'http://www.hotmail.com',
    'live.com': 'http://login.live.com/',
    'live.cn': 'http://login.live.cn/',
    'live.com.cn': 'http://login.live.com.cn',
    '189.com': 'http://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
    'yahoo.cn': 'http://mail.cn.yahoo.com/',
    'eyou.com': 'http://www.eyou.com/',
    '21cn.com': 'http://mail.21cn.com/',
    '188.com': 'http://www.188.com/',
    'foxmail.coom': 'http://www.foxmail.com'
};


/**--------------公共变量 end------------*/

/*--------------项目搜索----------------*/
$(function () {
    $("#dlTime>dd,#dlArea>dd,#dlCatgory>dd").click(function () {
        $(this).parents(".case-down").find("span").text($(this).text());
        project_search();
    })
});
$(document).on('click', '#btnProjectButton', function () {
    project_search();
});

function project_search() {
    //$('#more').remove();
    //$('span.load-more-link').remove();
    $('#more>a').attr('href', 'http://www.baidu.com').attr('data-max', '1');
    

    $('ul.resource-type-list').html('');
    var spanTime = getText('#spanTime');
    var spanArea = getText('#spanArea');
    var spanCatgory = getText('#spanCatgory');
    var txtProjectKey = getValue('#txtProjectKey');
    if (txtProjectKey == '请输入关键词...') {
        txtProjectKey = '';
    }
    var data = "cmd=searchProject&t=" + TDES.encrypt(spanTime) + "&a=" + TDES.encrypt(spanArea) + "&c=" + TDES.encrypt(spanCatgory) + "&k=" + TDES.encrypt(txtProjectKey) + "";
    ajaxhelpS(data, function (msg) {
        var obj = eval('(' + msg + ')');
        $('ul.resource-type-list').html(unescape(obj.info));
        $('.resource-type-list').css("opacity",0);
        $resourceTypeList = $('.resource-type-list');
        $resourceTypeList.masonry('destroy');
        item_masonry();
        $(window).resize();
//      $resourceTypeList.find("li").removeClass("panel");

		//$resourceTypeList.unbind('.infscr');
		$resourceTypeList.infinitescroll('destroy');
        $(".load-more-box,.load-more-link").remove();
    });
}

/*-----------------------------新全站搜索-------------------------------------------------------------------------*/
$(function () {

    $('#btnSearch').click(function () {
        if ($.trim($("#formd_search_id").val()) == '' || $.trim($('#formd_search_id').val()) == '请输入') {
            $('#formd_search_id').focus();
            layer.msg("请输入搜索内容！");
            return;
        }
        else {
            window.location = "/other/search.html?key=" + escape($.trim($("#formd_search_id").val())) + "";
        }
    });


    $('#btnSearch2').click(function () {
        if ($.trim($("#formd_search_id2").val()) == '' || $.trim($("#formd_search_id2").val()) == '请输入') {
            $('#formd_search_id2').focus();
            layer.msg("请输入搜索内容！");
            return;
        }
        $('#resultem').text($("#formd_search_id2").val());

        //getList_LB(escape($.trim($("#formd_search_id2").val())), 1);
        //全新搜索
        getLucenesSearch(escape($.trim($("#formd_search_id2").val())), 1);
        //全新搜索加载更多
        //getLucenesSearch_More(escape($.trim($("#formd_search_id2").val())), 1);
    });
})

/*----------------------当前位置定位-------------------*/
$(function () {
    var MenuName = $.trim($("div.site>span").text());
    $('div.nav>ul>li>a').map(function () {
        if ($.trim($(this).text()) == MenuName) {
            $(this).parent().addClass('on').siblings().removeClass('on');
        }
    });


    MenuName = $.trim($("div.site>a:eq(1)").text());
    $('div.nav>ul>li>a').map(function () {
        if ($.trim($(this).text()) == MenuName) {
            $(this).parent().addClass('on').siblings().removeClass('on');
        }
    });
    $('div.news_t>ul>li>a').map(function () {
        if (this_url.toLocaleLowerCase().indexOf($(this).attr('href').toLocaleLowerCase()) != -1) {
            $(this).parent().addClass('on').siblings().removeClass('on');
        }
    });
})

/*---------------------没有内容自动隐藏----------------------*/
$(function () {

    $('.IFHide').map(function () {
        if ($(this).html().trim().length <= 0) {
            $(this).hide();
            $('.DivHide').hide();
        }
    });

});

/*---------------------列表点赞----------------------*/

$(document).on('click', '.Mylike', function () {
    var strid = $(this).attr("data-id");//ID
    var objMylike = $(this);

    var data = "cmd=SetMylike&id=" + strid + "&Fieldlike=CB269CB9C105C347&Type=1&Count=1&ClassID=265";

    ajaxhelpS(data, function (msg) {
        var obj = eval('(' + msg + ')');

        if (unescape(obj.state) == "1") {
            objMylike.text(Number(objMylike.text()) + Number(1));//点赞数自动加1
            //$('span.Mylikelist').text(Number($('span.Mylikelist').text()) + Number(1))
        }
        else {
            layer.msg(unescape(obj.info));
        }
    })
});

/*---------------------获取列表点赞----------------------*/
$(function () {
    var ids = '';
    $('.Mylikelist').map(function () {
        ids += $(this).attr('data-id') + ',';
    });

    if (ids.length == 0) {
        return;
    }
    var data = "cmd=GetHitsField&ids=" + TDES.encrypt(ids) + "&Field=CB269CB9C105C347";
    ajaxhelpS(data,
	function (msg) {
	    var obj = eval('(' + msg + ')');

	    if (unescape(obj.state) == 1) {
	        var hits = unescape(obj.info);

	        for (var i = 0; i < hits.split(',').length; i++) {
	            $('.Mylikelist').eq(i).text(hits.split(',')[i]);
	        }
	    }
	});
});

/*--------------浏览次数绑定-------------*/
$(function () {
    var ids = '';
    $('.hits').map(function () {
        ids += $(this).attr('data-id') + ',';
    });

    if (ids.length == 0) {
        return;
    }
    var data = "cmd=getHits&ids=" + TDES.encrypt(ids) + "";

    ajaxhelpS(data,
	function (msg) {
	    var obj = eval('(' + msg + ')');

	    if (unescape(obj.state) == 1) {
	        var hits = unescape(obj.info);

	        for (var i = 0; i < hits.split(',').length; i++) {
	            $('.hits').eq(i).text(hits.split(',')[i]);
	        }
	    }
	});
});



$(function () {
    
    $(document).on("click", "#btnReset", function () {
        window.location.href = this_url;
    });
    EnterFunction('#formd_search_id', '#btnSearch');
    EnterFunction('#formd_search_id2', '#btnSearch2');
    EnterFunction('#formd_search_id3', '#btnSearch3');

    EnterFunction('#txtProjectKey', '#btnProjectButton');

})

function getSearch(key, page) {
    $('#ajaxList').html('');
    $('#ajaxPage').html('');
    var searchKey = unescape(key);
    var thisIndex = layer.msg('数据搜索中，请稍后…', {
        time: 0,
        icon: 16
    });
    var data = "cmd=getSearch&k=" + TDES.encrypt(searchKey) + "&pi=" + TDES.encrypt(page) + "&lh=" + $('.lucenes>#lh').val() + "&ph=" + $('.lucenes>#ph').val() + "&ps=" + $('.lucenes>#ps').val() + "&pt=" + $('.lucenes>#pt').val() + "&nt=" + $('.lucenes>#nt').val() + "&fs=" + $('.lucenes>#fs').val() + "";
    ajaxhelpS(data, function (msg) {
        layer.close(thisIndex);
        var obj = eval('(' + msg + ')');
        if (unescape(obj.state) == '2') {
            thisIndex = layer.alert(unescape(obj.info), {
                time: 0,
                title: '提示信息',
                closeBtn: 0,
                btn: ['确定'],
                yes: function (index) {
                    window.location = '/';
                }
            });
        } else {
            $('#ajaxList').html(unescape(obj.list));
            $('#ajaxPage').html(unescape(obj.page));
            $("#SearchNum").html(unescape(obj.count));
        }
    });
}

/*---全文检索通用搜索---*/
function getLucenesSearch(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }
    $('#ajaxList').html('');
    $('#ajaxPage').html('');
    var searchKey = unescape(key);
    $('#formd_search_id').val(searchKey);
    $('#formd_search_id2').val(searchKey);
    $('#resultem').html(searchKey);

    var thisIndex = layer.msg('数据搜索中，请稍后…', {
        time: 0,
        icon: 16
    });
    var data = "cmd=getLucenesSearch&k=" + TDES.encrypt(searchKey) + "&pi=" + TDES.encrypt(page) + "&lh=" + $('#lh').val() + "&ph=" + $('#ph').val() + "&ps=" + $('#ps').val() + "&pt=" + $('#pt').val() + "&nt=" + $('#nt').val() + "&fs=" + $('#fs').val() + "";
    ajaxhelpS(data, function (msg) {
        layer.close(thisIndex);
        try {
            var obj = eval('(' + msg + ')');
            if (unescape(obj.state) == '2') {
                thisIndex = layer.alert(unescape(obj.info), {
                    time: 0,
                    title: '提示信息',
                    closeBtn: 0,
                    btn: ['确定'],
                    yes: function (index) {
                        window.location = '/';
                    }
                });
            } else {
                $('#ajaxList').html(unescape(obj.list));
                $('#ajaxPage').html(unescape(obj.page));
                $("#SearchNum").html(unescape(obj.count));
            }
        } catch (e) {

        }
    });
}
/*--------------------根据查询条件，加载更多-------------------------------*/
$(document).on('click', '.moreFlye', function () {

    if (Number($('#moreFlye').attr('data-next')) < Number($('#moreFlye').attr('data-max')) + 1) {
        getLucenesSearch_More($('#moreFlye').attr('data-key'), Number($('#moreFlye').attr('data-next')));
    }


});

function getLucenesSearch_More(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }
    $('#ajaxList').html('');
    $('#ajaxPage').html('');
    var searchKey = unescape(key);

    $('#formd_search_id2').val(searchKey);
    $('#resultem').html(searchKey);

    var thisIndex = layer.msg('数据搜索中，请稍后…', {
        time: 0,
        icon: 16
    });
    var data = "cmd=getLucenesSearch&k=" + TDES.encrypt(searchKey) + "&pi=" + TDES.encrypt(page) + "&lh=" + $('.lucenes>#lh').val() + "&ph=" + $('.lucenes>#ph').val() + "&ps=" + $('.lucenes>#ps').val() + "&pt=" + $('.lucenes>#pt').val() + "&nt=" + $('.lucenes>#nt').val() + "&fs=" + $('.lucenes>#fs').val() + "";
    ajaxhelpS(data, function (msg) {
        layer.close(thisIndex);
        var obj = eval('(' + msg + ')');
        if (unescape(obj.state) == '2') {
            thisIndex = layer.alert(unescape(obj.info), {
                time: 0,
                title: '提示信息',
                closeBtn: 0,
                btn: ['确定'],
                yes: function (index) {
                    window.location = '/';
                }
            });
        } else {
            $('#ajaxList').append(unescape(obj.list));
            $('#ajaxPage').append(unescape(obj.page));
            $("#SearchNum").html(unescape(obj.count));

            /*--------------------加载更多------------------------------------------*/
            var intval = Number(page) + Number(1);
            if (Number(intval) <= Number(unescape(obj.count))) {
                $('#more').html("<a href=\"javascript:getLucenesSearch_More(" + key + "," + intval + ")" + "\" data-max=\"" + unescape(obj.count) + "\"></a>")
                $('#moreFlye').attr('data-next', intval).attr('data-max', unescape(obj.count)).attr('data-key', key).show();
            } else {
                $('#more').html("");
                $('#moreFlye').attr('data-next', intval).attr('data-max', unescape(obj.count)).attr('data-key', key).hide();

            }
        }
    });
}

//全站搜索功能js方法
function getList(keyserch, page) {
    if (!checkAjaxSql(unescape(keyserch))) {
        return false;
    }
    $('#ajaxList').html(lang.loading);
    $('#ajaxPage').html('');
    var ajaxListDate = $('#ajaxListDate').val();
    var ajaxPageDate = $('#ajaxPageDate').val();
    var ajaxSiteId = $('#ajaxSiteId').val();
    var ajaxGroupId = $('#ajaxGroupId').val();
    var ajaxPageSite = $('#ajaxPageSite').val();

    $('#formd_search_id').val(unescape(keyserch));
    $("#formd_search_id2").val(unescape(keyserch));
    $("#resultem").html(unescape(keyserch));


    var data = "cmd=_saveListAndPageDate&ajaxListDate=" + ajaxListDate + "&ajaxPageDate=" + ajaxPageDate + "&ajaxSiteId=" + ajaxSiteId + "&ajaxGroupId=" + ajaxGroupId + "&ajaxPageSite=" + ajaxPageSite + "";
    ajaxhelpS(data, function () {
        data = "cmd=search&key=" + keyserch + "&page=" + page + "";
        ajaxhelpS(data, function (msg) {
            var obj = eval('(' + msg + ')');
            $('#ajaxList').html(unescape(obj.list));
            $('#ajaxPage').html(unescape(obj.page));

            $("#SearchNum").html(unescape(obj.count));
        });
    });
}

//全站列表功能js方法
function getList_LB(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }

    var _ajaxlist = "ajaxList";
    var _ajaxpage = "ajaxPage";

    var listidx = "", listcls = "", pageidx = "", pagecls = "";//列表索引 列表Class 分页索引 分页Class

    if ($('#ajaxListIndex').val() != undefined) {
        listidx = $.trim($('#ajaxListIndex').val());
    }
    if ($('#ajaxListClass').val() != undefined) {
        listcls = $.trim($('#ajaxListClass').val());
    }
    if ($('#ajaxPageIndex').val() != undefined) {
        pageidx = $.trim($('#ajaxPageIndex').val());
    }
    if ($('#ajaxPageClass').val() != undefined) {
        pagecls = $.trim($('#ajaxPageClass').val());
    }

    var bon = false;//是否是切换类型
    var dataBon = false;
    //如果列表索引 列表Class 分页索引 分页Class都不为空时 则是切换类型
    if (listidx != '' && listcls != '' && pageidx != '' && pagecls != '') {
        bon = true;
    }

    var listi = 0;
    var pagei = 0;
    //判断是否加载数据
    if (bon) {
        $('.' + listcls).map(function () {
            if (listi == listidx && ((($.trim($(this).html()) == lang.loading || $.trim($(this).html()) == lang.loading) && page == -1) || page >= 1)) {
                if (page == -1) page = 1;
                dataBon = true;
            }
            listi++;
        });
    }
    else {
        $('#' + _ajaxlist).html(lang.loading);
        $('#' + _ajaxlist).html('');
        $('#' + _ajaxpage).html('');
        dataBon = true;
    }
    var ajaxListDate = $('#ajaxListDate').val();
    var ajaxPageDate = $('#ajaxPageDate').val();
    var ajaxSiteId = $('#ajaxSiteId').val();
    var ajaxGroupId = $('#ajaxGroupId').val();
    var ajaxPageSite = $('#ajaxPageSite').val();

    var ajaxClassId = $('#ajaxClassId').val();
    var ajaxXgid = $('#ajaxXgid').val();
    var ajaxCategory = $('#ajaxCategory').val();
    var ajaxAboutDownload = $('#ajaxAboutDownload').val();
    var ajaxParentId = $('#ajaxParentId').val();
    if (dataBon) {

        var data = "cmd=_saveListAndPageDate_LB&ajaxListDate=" + ajaxListDate + "&ajaxPageDate=" + ajaxPageDate + "&ajaxSiteId=" + ajaxSiteId + "&ajaxGroupId=" + ajaxGroupId + "&ajaxPageSite=" + ajaxPageSite + "&ajaxClassId=" + ajaxClassId + "&ajaxXgid=" + ajaxXgid + "&ajaxCategory=" + ajaxCategory + "&ajaxAboutDownload=" + ajaxAboutDownload + "&ajaxParentId=" + ajaxParentId + "";
        ajaxhelpS(data, function () {
            data = "cmd=search_LB&key=" + key + "&page=" + page + "";
            ajaxhelpS(data, function (msg) {
                var obj = eval('(' + msg + ')');
                if (bon) {
                    listi = 0;
                    $('.' + listcls).map(function () {
                        if (listi == listidx && ($.trim($(this).html()) == lang.loading || page >= 1)) {
                            $(this).html(unescape(obj.list));
                        }
                        listi++;
                    });
                    pagei = 0;
                    $('.' + pagecls).map(function () {
                        if (pagei == pageidx && ($.trim($(this).html()) == '' || page >= 1)) {
                            $(this).html(unescape(obj.page));
                        }
                        pagei++;
                    });

                } else {
                    $('#' + _ajaxlist).html(unescape(obj.list));
                    $('#' + _ajaxpage).html(unescape(obj.page));
                    $("#SearchNum").html(unescape(obj.count));
                }

                try {

                    var scriptStr = "<script src=\"/javascript/lightbox.js\"></script>";
                    $('#ajaxScriptCallback').html(scriptStr);
                } catch (e) {

                }
            }, false);
        });
    }
}

function getList_FC(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }
    var _ajaxlist = "ajaxList";
    var _ajaxpage = "ajaxPage";

    var listidx = "", listcls = "", pageidx = "", pagecls = "";//列表索引 列表Class 分页索引 分页Class

    if ($('#ajaxListIndex').val() != undefined) {
        listidx = $.trim($('#ajaxListIndex').val());
    }
    if ($('#ajaxListClass').val() != undefined) {
        listcls = $.trim($('#ajaxListClass').val());
    }
    if ($('#ajaxPageIndex').val() != undefined) {
        pageidx = $.trim($('#ajaxPageIndex').val());
    }
    if ($('#ajaxPageClass').val() != undefined) {
        pagecls = $.trim($('#ajaxPageClass').val());
    }

    var bon = false;//是否是切换类型
    var dataBon = false;
    //如果列表索引 列表Class 分页索引 分页Class都不为空时 则是切换类型
    if (listidx != '' && listcls != '' && pageidx != '' && pagecls != '') {
        bon = true;
    }

    var listi = 0;
    var pagei = 0;
    //判断是否加载数据
    if (bon) {
        $('.' + listcls).map(function () {
            if (listi == listidx && ((($.trim($(this).html()) == lang.loading || $.trim($(this).html()) == lang.loading) && page == -1) || page >= 1)) {
                if (page == -1) page = 1;
                dataBon = true;
            }
            listi++;
        });
    }
    else {
        $('#' + _ajaxlist).html(lang.loading);
        $('#' + _ajaxlist).html('');
        $('#' + _ajaxpage).html('');
        dataBon = true;
    }
    var ajaxListDate = $('#ajaxListDate').val();
    var ajaxPageDate = $('#ajaxPageDate').val();
    var ajaxSiteId = $('#ajaxSiteId').val();
    var ajaxGroupId = $('#ajaxGroupId').val();
    var ajaxPageSite = $('#ajaxPageSite').val();

    var ajaxClassId = $('#ajaxClassId').val();
    var ajaxXgid = $('#ajaxXgid').val();
    var ajaxCategory = $('#ajaxCategory').val();
    var ajaxAboutDownload = $('#ajaxAboutDownload').val();
    var ajaxParentId = $('#ajaxParentId').val();
    if (dataBon) {

        var data = "cmd=_saveListAndPageDate_LB&ajaxListDate=" + ajaxListDate + "&ajaxPageDate=" + ajaxPageDate + "&ajaxSiteId=" + ajaxSiteId + "&ajaxGroupId=" + ajaxGroupId + "&ajaxPageSite=" + ajaxPageSite + "&ajaxClassId=" + ajaxClassId + "&ajaxXgid=" + ajaxXgid + "&ajaxCategory=" + ajaxCategory + "&ajaxAboutDownload=" + ajaxAboutDownload + "&ajaxParentId=" + ajaxParentId + "";
        ajaxhelpS(data, function () {
            var data = "cmd=SaveCiphertexDate_FC&Ciphertext=" + $('#ajaxCiphertext').val() + "&CiphertextField=" + $('#ajaxCiphertextField').val();
            ajaxhelpS(data, function () {
                data = "cmd=search_FC&key=" + key + "&page=" + page;
                ajaxhelpS(data, function (msg) {
                    var obj = eval('(' + msg + ')');

                    if (bon) {
                        listi = 0;
                        $('.' + listcls).map(function () {
                            if (listi == listidx && ($.trim($(this).html()) == lang.loading || page >= 1)) {
                                $(this).html(unescape(obj.list));
                            }
                            listi++;
                        });
                        pagei = 0;
                        $('.' + pagecls).map(function () {
                            if (pagei == pageidx && ($.trim($(this).html()) == '' || page >= 1)) {
                                $(this).html(unescape(obj.page));
                            }
                            pagei++;
                        });

                    } else {

                        $('#' + _ajaxlist).html(unescape(obj.list));

                        $('#' + _ajaxpage).html(unescape(obj.page));
                    }

                });
            }, false);
        }, false);
    }

}

/*--------------------根据查询条件，加载更多-------------------------------*/
function getList_FC_More(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }
    var _ajaxlist = "ajaxList";
    var _ajaxpage = "ajaxPage";

    var listidx = "", listcls = "", pageidx = "", pagecls = "";//列表索引 列表Class 分页索引 分页Class

    if ($('#ajaxListIndex').val() != undefined) {
        listidx = $.trim($('#ajaxListIndex').val());
    }
    if ($('#ajaxListClass').val() != undefined) {
        listcls = $.trim($('#ajaxListClass').val());
    }
    if ($('#ajaxPageIndex').val() != undefined) {
        pageidx = $.trim($('#ajaxPageIndex').val());
    }
    if ($('#ajaxPageClass').val() != undefined) {
        pagecls = $.trim($('#ajaxPageClass').val());
    }

    var bon = false;//是否是切换类型
    var dataBon = false;
    //如果列表索引 列表Class 分页索引 分页Class都不为空时 则是切换类型
    if (listidx != '' && listcls != '' && pageidx != '' && pagecls != '') {
        bon = true;
    }

    var listi = 0;
    var pagei = 0;
    //判断是否加载数据
    if (bon) {
        $('.' + listcls).map(function () {
            if (listi == listidx && ((($.trim($(this).html()) == lang.loading || $.trim($(this).html()) == lang.loading) && page == -1) || page >= 1)) {
                if (page == -1) page = 1;
                dataBon = true;
            }
            listi++;
        });
    }
    else {
        //$('#' + _ajaxlist).html(lang.loading);
        //$('#' + _ajaxlist).html('');
        //$('#' + _ajaxpage).html('');
        dataBon = true;
    }
    var ajaxListDate = $('#ajaxListDate').val();
    var ajaxPageDate = $('#ajaxPageDate').val();
    var ajaxSiteId = $('#ajaxSiteId').val();
    var ajaxGroupId = $('#ajaxGroupId').val();
    var ajaxPageSite = $('#ajaxPageSite').val();

    var ajaxClassId = $('#ajaxClassId').val();
    var ajaxXgid = $('#ajaxXgid').val();
    var ajaxCategory = $('#ajaxCategory').val();
    var ajaxAboutDownload = $('#ajaxAboutDownload').val();
    var ajaxParentId = $('#ajaxParentId').val();
    if (dataBon) {

        var data = "cmd=_saveListAndPageDate_LB&ajaxListDate=" + ajaxListDate + "&ajaxPageDate=" + ajaxPageDate + "&ajaxSiteId=" + ajaxSiteId + "&ajaxGroupId=" + ajaxGroupId + "&ajaxPageSite=" + ajaxPageSite + "&ajaxClassId=" + ajaxClassId + "&ajaxXgid=" + ajaxXgid + "&ajaxCategory=" + ajaxCategory + "&ajaxAboutDownload=" + ajaxAboutDownload + "&ajaxParentId=" + ajaxParentId + "";
        ajaxhelpS(data, function () {
            data = "cmd=search_FC&key=" + key + "&page=" + page + "";
            ajaxhelpS(data, function (msg) {
                var obj = eval('(' + msg + ')');

                if (bon) {
                    listi = 0;
                    $('.' + listcls).map(function () {
                        if (listi == listidx && ($.trim($(this).html()) == lang.loading || page >= 1)) {
                            $(this).html(unescape(obj.list));
                        }
                        listi++;
                    });
                    pagei = 0;
                    $('.' + pagecls).map(function () {
                        if (pagei == pageidx && ($.trim($(this).html()) == '' || page >= 1)) {
                            $(this).html(unescape(obj.page));
                        }
                        pagei++;
                    });

                } else {

                    $('#' + _ajaxlist).append(unescape(obj.list));

                    $('#' + _ajaxpage).append(unescape(obj.page));

                    /*--------------------加载更多------------------------------------------*/
                    var intval = Number(page) + Number(1);
                    if (Number(intval) <= Number(unescape(obj.count))) {
                        $('#more').html("<a href=\"javascript:getList_FC_More(" + key + "," + intval + ")" + "\" data-max=\"" + unescape(obj.count) + "\"></a>")
                        $('#moreFlye').attr('data-next', intval).attr('data-max', unescape(obj.count)).attr('data-key', key).show();
                    } else {
                        $('#more').html("");
                        $('#moreFlye').attr('data-next', intval).attr('data-max', unescape(obj.count)).attr('data-key', key).hide();

                    }

                }


            });
        });
    }
}

function getList_CZ(key, page) {
    if (!checkAjaxSql(unescape(key))) {
        return false;
    }
    var _ajaxlist = "ajaxList";
    var _ajaxpage = "ajaxPage";

    var listidx = "", listcls = "", pageidx = "", pagecls = "";//列表索引 列表Class 分页索引 分页Class

    if ($('#ajaxListIndex').val() != undefined) {
        listidx = $.trim($('#ajaxListIndex').val());
    }
    if ($('#ajaxListClass').val() != undefined) {
        listcls = $.trim($('#ajaxListClass').val());
    }
    if ($('#ajaxPageIndex').val() != undefined) {
        pageidx = $.trim($('#ajaxPageIndex').val());
    }
    if ($('#ajaxPageClass').val() != undefined) {
        pagecls = $.trim($('#ajaxPageClass').val());
    }

    var bon = false;//是否是切换类型
    var dataBon = false;
    //如果列表索引 列表Class 分页索引 分页Class都不为空时 则是切换类型
    if (listidx != '' && listcls != '' && pageidx != '' && pagecls != '') {
        bon = true;
    }

    var listi = 0;
    var pagei = 0;
    //判断是否加载数据
    if (bon) {
        $('.' + listcls).map(function () {
            if (listi == listidx && ((($.trim($(this).html()) == lang.loading || $.trim($(this).html()) == lang.loading) && page == -1) || page >= 1)) {
                if (page == -1) page = 1;
                dataBon = true;
            }
            listi++;
        });
    }
    else {
        $('#' + _ajaxlist).html(lang.loading);
        $('#' + _ajaxlist).html('');
        $('#' + _ajaxpage).html('');
        dataBon = true;
    }
    var ajaxListDate = $('#ajaxListDate').val();
    var ajaxPageDate = $('#ajaxPageDate').val();
    var ajaxSiteId = $('#ajaxSiteId').val();
    var ajaxGroupId = $('#ajaxGroupId').val();
    var ajaxPageSite = $('#ajaxPageSite').val();

    var ajaxClassId = $('#ajaxClassId').val();
    var ajaxXgid = $('#ajaxXgid').val();
    var ajaxCategory = $('#ajaxCategory').val();
    var ajaxAboutDownload = $('#ajaxAboutDownload').val();
    var ajaxParentId = $('#ajaxParentId').val();
    if (dataBon) {

        var data = "cmd=_saveListAndPageDate_LB&ajaxListDate=" + ajaxListDate + "&ajaxPageDate=" + ajaxPageDate + "&ajaxSiteId=" + ajaxSiteId + "&ajaxGroupId=" + ajaxGroupId + "&ajaxPageSite=" + ajaxPageSite + "&ajaxClassId=" + ajaxClassId + "&ajaxXgid=" + ajaxXgid + "&ajaxCategory=" + ajaxCategory + "&ajaxAboutDownload=" + ajaxAboutDownload + "&ajaxParentId=" + ajaxParentId + "";
        ajaxhelpS(data, function () {
            data = "cmd=search_CZ&key=" + key + "&page=" + page + "";
            ajaxhelpS(data, function (msg) {
                var obj = eval('(' + msg + ')');

                if (bon) {
                    listi = 0;
                    $('.' + listcls).map(function () {
                        if (listi == listidx && ($.trim($(this).html()) == lang.loading || page >= 1)) {
                            $(this).html(unescape(obj.list));
                        }
                        listi++;
                    });
                    pagei = 0;
                    $('.' + pagecls).map(function () {
                        if (pagei == pageidx && ($.trim($(this).html()) == '' || page >= 1)) {
                            $(this).html(unescape(obj.page));
                        }
                        pagei++;
                    });

                } else {

                    $('#' + _ajaxlist).html(unescape(obj.list));

                    $('#' + _ajaxpage).html(unescape(obj.page));
                }

                try {

                    var scriptStr = "<script src=\"/javascript/lightbox.js\"></script>";
                    $('#ajaxScriptCallback').html(scriptStr);
                } catch (e) {

                }
            });
        });
    }
}
/*--------------------过滤危险字符---------------------------------------------------*/

$(function () {
    $(document).on('keyup', 'input[type=text],textarea,input[type=password]', function () {
        var val = $(this).val();
        //    //});
        //$('input[type=text],textarea,input[type=password]').keyup(function () {
        if (!checkAjaxSql(val)) {
            alert('不能包含危险字符!');
            $(this).val('');
        }
    });
})
function checkAjaxSql(val) {
    var otherKey = " and | exec | count | chr | mid | master | or | truncate | char | declare | join |<|>|*|/*|*/|'|;|\\u|insert|select|delete|update|create|drop|script|javascript|alert";
    for (var i = 0; i < otherKey.split('|').length ; i++) {
        if (val.indexOf(otherKey.split('|')[i]) != -1) {
            return false;
        }
    }
    return true;
}
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-24]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('0 EnterFunction(1,2){$(1).keydown(0(e){var 4=e.which;if(4==13){$(2).click()}})}', [], 5, 'function|ElementInput|ElementBtn||curKey'.split('|'), 0, {}));

eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function getValue(0){return $.trim($(0).val())}', [], 1, 'obj'.split('|'), 0, {}));

eval(function (p, a, c, k, e, r) { e = function (c) { return c.toString(36) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-9a-g]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function getValueDefaultError(3,6,7,5,4,8){9 1=true;9 0=$.trim($(3).val());2(0==6||0==\'\'){a.b(7);1=c;2(5){$(3).d()}}2((4!=""||4!=null)&&0!=\'\'){2(0.length<4){a.b(8);1=c;2(5){$(3).d()}}e f g(0,1)}e f g(0,1)}', [], 17, 'Temp|Validator|if|Element|Length|Focus|DefaultVal|ErrorInfo|LengthErrorInfo|var|layer|alert|false|focus|return|new|Array'.split('|'), 0, {}));

eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-7]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function getLengthDefaultError(1,3,4,5){6 2=true;6 0=$.trim($(1).val());7(0.length<3||0==\'\'){alert(4);2=false;7(5){$(1).focus()}}return new Array(0,2)}', [], 8, 'Temp|Element|Validator|DefaultVal|ErrorInfo|Focus|var|if'.split('|'), 0, {}));
/*------------取元素value值  end-----------*/

/*----------------取元素text值-------------*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function getText(0){return $.trim($(0).text())}', [], 1, 'obj'.split('|'), 0, {}));

eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-7]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function getTextDefaultError(0,3,4,5){6 1=true;6 2=$.trim($(0).val());7(2==3){alert(4);1=false;7(5){$(0).focus()}}return new Array(2,1)}', [], 8, 'Element|Validator|Temp|DefaultVal|ErrorInfo|Focus|var|if'.split('|'), 0, {}));

/*--------------验证元素输入的电话号码|手机号码格式是否正确-------------------*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function IsTelOrPhone(0){if(!regtelphone.test($(0).val())){alert(lang.telformat);$(0).focus()}}', [], 1, 'obj'.split('|'), 0, {}));
/*-----------------元素输入的数字格式,如果输入非数字的字符 将默认设置为1------------*/

eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('$(6 () {    $(\'.1>8\').9(6 (5) {        d 7 = $(\'.1>8\').7($(b));        $(\'#2\').c($(b).3("4-0"));        a(7);    });});', 62, 14, 'ClassId|ajaxBQQH|ajaxClassId|attr|data|e|function|index|li|mouseover|setListAndPageHtml|this|val|var'.split('|'), 0, {}));

eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('6 e(a) {    $(\'#3\').h(a);    $(\'#4\').h(a);    9 ($.g($(\'.\' + $(\'#2\').h()).5(a).f()).c == 0) {        $(\'.\' + $(\'#2\').h()).5(a).8(b.d);    }    7("", -1);}', 62, 18, '||ajaxListClass|ajaxListIndex|ajaxPageIndex|eq|function|getList_LB|html|if|index|lang|length|loading|setListAndPageHtml|text|trim|val'.split('|'), 0, {}));

/*---------------退订 订阅信息 begin----------*/
/*------------取元素value值-----------*/
eval(function (p, a, c, k, e, r) { e = function (c) { return c.toString(36) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-9a-l]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('a getValue(i){5 $.b($(i).c())}a getValueDefaultError(2,6,7,4,8,j){9 1=k;9 0=$.b($(2).c());3(0==6||0==\'\'){d(7);1=e;3(4){$(2).f()}}3((8!=""||8!=null)&&0!=\'\'){3(0.l<8){d(j);1=e;3(4){$(2).f()}}5 g h(0,1)}5 g h(0,1)}a getLengthDefaultError(2,6,7,4){9 1=k;9 0=$.b($(2).c());3(0.l<6||0==\'\'){d(7);1=e;3(4){$(2).f()}}5 g h(0,1)}', [], 22, 'Temp|Validator|Element|if|Focus|return|DefaultVal|ErrorInfo|Length|var|function|trim|val|alert|false|focus|new|Array|obj|LengthErrorInfo|true|length'.split('|'), 0, {}));

/*----------------取元素text值-------------*/
eval(function (p, a, c, k, e, r) { e = function (c) { return c.toString(36) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-9a-c]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('3 getText(4){5 $.6($(4).7())}3 getTextDefaultError(0,8,9,a){b 1=true;b 2=$.6($(0).7());c(2==8){alert(9);1=false;c(a){$(0).focus()}}5 new Array(2,1)}', [], 13, 'Element|Validator|Temp|function|obj|return|trim|text|DefaultVal|ErrorInfo|Focus|var|if'.split('|'), 0, {}));

/*--------------验证元素输入的电话号码|手机号码格式是否正确-------------------*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function IsTelOrPhone(0){if(!regtelphone.test($(0).val())){alert(\'电话号码格式不正确!\');$(0).focus()}}', [], 1, 'obj'.split('|'), 0, {}));

/*-----------------元素输入的数字格式,如果输入非数字的字符 将默认设置为1------------*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[0-2]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function IsNum(0,1){if(!regnum.test($(0).2())){$(0).2(1)}}', [], 3, 'obj|obj2|val'.split('|'), 0, {}));

/*-点击次数*/
eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1; }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p; }('$(2(){a(\'#k\')});2 a(b){3 5=j.m.l;3 8=/\\d{1,}i(\\d{1,})\\.g/;h(8.f(5)){3 0="9=s&e="+4.6(8.t(5)[1])+"";c(0,2(7){$(b).n(7)})}q{3 0="9=r&p="+4.6(o())+"&e="+4.6(u())+"";c(0,2(7){})}}', 31, 31, 'data||function|var|TDES|this_href|encrypt|msg|reg|cmd|UpdateCrt|obj|ajaxhelpS||id|test|html|if|_|window|views|href|location|text|getClassID|cid|else|updateMenuCrt|updatecrt|exec|getInfoID'.split('|'), 0, {}));

/*-重置按钮*/
eval(function (p, a, c, k, e, r) { e = String; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '^$' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('$(document).on("click","#btnReset",function(){window.location.href=this_url});', [], 1, ''.split('|'), 0, {}));
/*-----------------------身份证号码真伪验证-----------------------------
**返回结果
**0   表示身份证号码正确
**1   表示非法身份证号
**2   表示非法地区
**3   表示非法生日
*/

eval(function (p, a, c, k, e, r) { e = function (c) { return (c < 62 ? '' : e(parseInt(c / 62))) + ((c = c % 62) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '[579bcefhjl-wyzA-F]' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('function cardValid(s){7 t={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};7 l=0;7 5=s;7 u=5.v;9(!/^\\d{17}(\\d|x)$/i.w(5)&&!/^\\d{15}$/i.w(5)){b 1}9(t[y(5.c(0,2))]==null){b 2}9(u==15){e="19"+5.c(6,2)+"-"+h(5.c(8,2))+"-"+h(5.c(10,2));7 d=f m(e.n(/-/g,"/"));7 z=d.o().toString()+"-"+(d.A()+1)+"-"+d.B();9(e!=z){b 3}5=5.p(0,6)+"19"+5.p(6,15);5=5+GetVerifyBit(5)}7 C=f m();7 q=C.o();7 D=q-150;7 r=5.p(6,10);9(r<D||r>q){b 3}5=5.n(/x$/i,"a");e=5.c(6,4)+"-"+h(5.c(10,2))+"-"+h(5.c(12,2));7 d=f m(e.n(/-/g,"/"));9(e!=(d.o()+"-"+(d.A()+1)+"-"+d.B())){b 3}E(7 i=17;i>=0;i--){l+=(Math.pow(2,i)%11)*y(5.charAt(17-i),11)}9(l%11!=1){b 1}7 j=f F();j=f F("11111119111111111","12121219121212121","123456789087654321");E(7 k=0;k<j.v;k++){9(5.indexOf(j[k])!=-1){b 1}}b 0}', [], 42, '|||||strIDno||var||if||return|substr||sBirthday|new||Number||words||iSum|Date|replace|getFullYear|substring|nowYear|year|cardID|aCity|idCardLength|length|test||parseInt|dd|getMonth|getDate|nowDate|oldYear|for|Array'.split('|'), 0, {}));

/*-------------------公共ajax调用方法-----------------*/

eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1; }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p; }('4 e(3,2){d 6=5.1(\'f，h…\',{g:0,8:a});$.c({"b":"9","o":""+n()+"/p/r.q","3":3,"i":"k","m":4(1){5.7(6);l(2){2(1)}},"j":4(){5.7(6)}})}', 28, 28, '|msg|fn|data|function|layer|thisIndex|close|icon|post|16|type|ajax|var|ajaxhelpS|数据请求中|time|请稍后|datatype|error|html|if|success|getRootPath|url|Ajax|ashx|AjaxHandler_ADE'.split('|'), 0, {}))


