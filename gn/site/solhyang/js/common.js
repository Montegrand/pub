
function webMenu(){
	var menuBtn = $(".menu"),
		lnbWrap = $("#lnb");
	menuBtn.on("click",function(){
		var lnbBtn = $('.menu_btn .menu'),
			IsClose = lnbBtn.is('.close');
		if(mode=='pc'){
			if(!IsClose){
				hideSearchBox();
				lnbWrap.slideDown(400);
				$(this).addClass("close");
			} else{
				lnbWrap.slideUp(400);
				$(this).removeClass("close");
			};
		};
	});
}

function hideSearchBox() {
	
    var lnbWrap = $("#lnb"),
    	searchWrap = $(".search_wrap"),
    	srcBtn = $(".src_btn"),
    	srcArea = $(".search_detail"),
    	menuMask = $(".black_wrap");
    
    srcBtn.removeClass("on");
    $("html,body").css({overflow:"auto",height:"auto"});
    menuMask.fadeOut(200);
    srcArea.slideUp(200);
    lnbWrap.css({"z-index":"40"});
    searchWrap.css({"z-index":"inherit"});
    stat = true;
    
}


(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    //브라우저
    var _browser = navigator.userAgent.toLowerCase();

    //ie7일 때
    if(_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie7';

    //ie8일 때
    }else if(_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie8';

    //ie9일 때
    }else if(_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie9';

    //ie10일 때
    }else if(_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie10';

    //ie11일 때
    }else if(_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie11';

    //edge일 때
    }else if(_browser.indexOf('edge') > -1) {
        _browser = 'edge';

    //opera일 때
    }else if(_browser.indexOf('opr') > -1) {
        _browser = 'opera';

    //chrome일 때
    }else if(_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';

    //firefox일 때
    }else if(_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';

    //safari일 때
    }else if(_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    }else{
        _browser = 'unknown';
    }

    /**
     * @name 브라우저 얻기
     * @since 2017-12-06
     * @return {string}
     */
    window.getBrowser = function() {
        return _browser;
    };

    //브라우저 클래스 추가
    $html.addClass(_browser);

    $(function() {
        var $body = $('body'),
            $htmlAndBody = $html.add($body),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
			$lnb = $('#lnb'),
			$lnbBtn = $('.menu_btn .menu'),
			$lnbClose = $('.lnbbox .menu_hide .menu_button'),
			$searchbox = $('.search'),
			$searchBtn = $searchbox.find('.src_btn'),
			$search_detail = $searchbox.find('.search_detail'),
            $container = $('#container'),
            $footer = $('#footer');

		

		
        $window.on('screen:wide screen:web', function(event) {
            window.mode = 'pc';
        });

        $window.on('screen:tablet screen:phone', function(event) {
            window.mode = 'mobile';
			$lnb.removeAttr('style');
			$lnbBtn.removeClass('close');
			$searchBtn.removeClass('on');
			$search_detail.removeAttr('style');
			stat = true;
        });

		//lnb
		var $depth1Menu = $lnb.find('.top_menu'),
			$depth1item = $depth1Menu.children('.depth1'),
			$depth1text = $depth1item.children('.depth1_ti'),
			$depth2box = $depth1item.children('.top2m'),
			$depth2Menu = $depth2box.children('.depth2'),
			$depth2item = $depth2Menu.find('.depth2_item'),
			$depth1ListWithDepth2Menu = $depth2item.parents('.depth1'),

			$depth3box = $depth2item.children('.depth3'),
			$depth3Menu = $depth3box.children('.depth3_list'),
			$depth3item = $depth3Menu.find('.depth3_item'),
			$depth2ListWithDepth3Menu = $depth3item.parents('.depth2_item');
		$depth1ListWithDepth2Menu.addClass('has');
		$depth2ListWithDepth3Menu.addClass('has');
		$('#lnb .depth1.has .depth1_ti').on('click', function(event) {
			if(mode === 'mobile') {
				var $this = $(this),
					$MyParent = $this.parent('.depth1'),
					IsActive = $MyParent.is('.active'),
					$OtherParents = $MyParent.siblings('.depth1');
				if(!IsActive){
					$OtherParents.removeClass('active');
					$MyParent.addClass('active');
				} else{
					$MyParent.removeClass('active');
				};
				event.preventDefault();
			};
		});
		$('#lnb .depth2_item.has .depth2_text').on('click', function(event) {
			if(mode === 'mobile') {
				var $this = $(this),
					$MyParent = $this.parent('.depth2_item'),
					IsActive = $MyParent.is('.active'),
					$OtherParents = $MyParent.siblings('.depth2_item');
				if(!IsActive){
					$OtherParents.removeClass('active');
					$MyParent.addClass('active');
				} else{
					$MyParent.removeClass('active');
				};
				event.preventDefault();
			};
		});
		
		$lnbBtn.on('click', function(event) {
			if(mode === 'mobile') {
				var IsOpen = $body.is('.lnb_show');
				if(!IsOpen){
					$body.addClass('lnb_show');
				} else{
					$body.removeClass('lnb_show');
				};
			};
		});
		$lnbClose.on('click', function(event) {
			$body.removeClass('lnb_show');
		});
		

        $window.on('screen:wide screen:web', function(event) {
			
        });

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });

    $document.on('ready', function(event) {
        /**
         * @link {https://github.com/JungHyunKwon/screen}
         */
        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1201
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1200,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : 1000,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }]
        });
    });

    $window.on('load', function(event) {

        $window.on('screen:resize', function(event) {
            
        }).triggerHandler('screen:resize');
    });
})(jQuery);