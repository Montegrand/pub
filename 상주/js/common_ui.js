/* 전역 변수 */
var ua = navigator.userAgent;
var windowWidth = $(window).width();
var windowHeight = $(window).height();


/* useagent check */
function userAgentChk(){
	if(ua.match(/iPhone|iPod|LG|Android|SAMSUNG|Samsung/i) != null){
		if (windowWidth > 1024){
			$("body").addClass("device").addClass("tablet");
			switch(window.orientation){ 
				case -90:
				$("body").addClass("tablet_landscape");
				$("body").addClass("pc").removeClass("tablet");
				break;
				case 90:
				$("body").addClass("tablet_landscape");
				$("body").addClass("pc").removeClass("tablet");
				break;
				case 0:
				$("body").addClass("tablet_portrait");
				$("body").removeClass("pc").removeClass("normal").addClass("tablet");
				break;
				case 180:
				$("body").addClass("tablet_portrait");
				$("body").removeClass("pc").removeClass("normal").addClass("tablet");
				break;
			 }
		}else{
			$("body").addClass("mobile").addClass("device");
			switch(window.orientation){  
				case -90:
				$("body").addClass("mobile_landscape")
				break;
				case 90:
				$("body").addClass("mobile_landscape");
				break;
				case 0:
				$("body").addClass("mobile_portrait");
				break;
				case 180:
				$("body").addClass("mobile_portrait");
				break;
			 }
		}
	}else if (ua.match(/iPad|GallaxyTab/i) != null){
		$("body").addClass("device").addClass("tablet");
		switch(window.orientation){ 
			case -90:
			$("body").addClass("tablet_landscape");
			$("body").addClass("pc").removeClass("tablet");
			break;
			case 90:
			$("body").addClass("tablet_landscape");
			$("body").addClass("pc").removeClass("tablet");
			break;
			case 0:
			$("body").addClass("tablet_portrait");
			$("body").removeClass("pc").removeClass("normal").addClass("tablet");
			break;
			case 180:
			$("body").addClass("tablet_portrait");
			$("body").removeClass("pc").removeClass("normal").addClass("tablet");
			break;
		 }
	}else{
		bodyClassChange();

		$(window).resize(function(){
			windowWidth = $(window).width();
			windowHeight = $(window).height();
			bodyClassChange();
		}).resize();

		if(ua.indexOf("MSIE 8.0") > -1 || ua.indexOf("Trident/4.0") > -1){ //IE8 이하일 경우
			$("body").addClass("pc").addClass("pc_ie8");
			if(ua.indexOf("Windows NT 6.2") > -1){
			}else if (ua.indexOf("Windows NT 6.1") > -1){			
				$("body").addClass("pc").addClass("pc_ie8").addClass("w7"); //window7, IE8
			}else if (ua.indexOf("Windows NT 5.1") > -1){
				$("body").addClass("pc").addClass("pc_ie8").addClass("xp"); //windowXP, IE8
			}
		}else if(ua.indexOf("MSIE 7.0") > -1 || ua.indexOf("MSIE 6.0") > -1){
			$("body").addClass("pc").addClass("pc_ie8");
		}else if(ua.indexOf("Trident") > -1){
			$("body").addClass("pc").addClass("ie");
		}else{ //IE9 PC 
			if (ua.indexOf("Chrome") > -1){
				$("body").addClass("pc").addClass("chrome");
			}else if(ua.indexOf("Mac") > -1){
				$("body").addClass("mac");
			}else{
				$("body").addClass("pc");
			}
		}
	}
}
userAgentChk();

function bodyClassChange(){
	if (windowWidth > 641){
		$("body").removeClass("mobile_portrait").removeClass("mobile").removeClass("tablet").removeClass("smallbrowser").addClass("normal");
		$(".maincontents").css("min-height", (windowHeight-$("#seoul-common-gnb").height()-$(".bottomarea").height())+"px");
		$(".contentsarea").css("min-height", (windowHeight-$("#seoul-common-gnb").height()-$(".toparea").height()-$(".sub_top").height()-$(".bottomarea").height())+"px");
		$(".btn-mobilesearch").hide();
		$(".topmenu").css("left","0");
	}else if (windowWidth <= 640){
		$("body").removeClass("mobile_portrait").removeClass("normal").addClass("mobile").removeClass("smallbrowser").addClass("tablet");
        $(".maincontents").css("min-height", (windowHeight-$("#seoul-common-gnb").height()-$(".toparea").height()-$(".search_area").height()-$(".bottomarea").height())+"px");
        $(".contentsarea").css("min-height", (windowHeight-$("#seoul-common-gnb").height()-$(".toparea").height()-$(".sub_top").height()-$(".bottomarea").height())+"px");
	}
}

function topmenuOpen(Idx){
	if ($("body").hasClass("normal")){
		$(".topmenu .gnb").addClass("active");
		$(".topmenu .gnb > li ul").stop().slideDown(100);
	}else if ($("body").hasClass("smallbrowser")){
		$(".topmenu .gnb").removeClass("active");
		$(".topmenu .gnb > li ul").stop().slideDown(100);
	}else{
		return false;
	}
}

function topmenuClose(Idx){
	if (Idx){		
		if ($("body").hasClass("normal") || $("body").hasClass("smallbrowser")){
			$(".topmenu .gnb").removeClass("active");
			$(".topmenu .gnb > li ul").stop().slideUp(100);
		}else{
			return false;
		}
	}else{
		$(".topmenu .gnb > li ul").stop().slideUP(100);
	}
}

$(document).ready(function(){
	$(".toparea .topmenu .gnb > li").hover(
		function(){$(".toparea .topmenu").addClass("active");},
		function(){$(".toparea .topmenu").removeClass("active");},
	);
});

$(document).ready(function(){
	$(".toparea .topmenu .gnb > li .menu_list > li > ul li").hover(
		function(){$(this).parent().parent().addClass("active");},
		function(){$(this).parent().parent().removeClass("active");}
	);
});

$(document).ready(function(){
	$(".toparea .allmenu-category .menu_box .all_gnb > li .menu_list > li ul li").hover(
		function(){$(this).parent().parent().addClass("active");},
		function(){$(this).parent().parent().removeClass("active");}
	);
});

$(".gnb li.topmenu_1").keyup(function(){
	$(".gnb li .menu_list").show();
	$(".toparea .topmenu").addClass("active");
	return false; //중요
});
$(".gnb li.topmenu_2").keyup(function(){
	$(".gnb li .menu_list").show();
	$(".toparea .topmenu").addClass("active");
	return false; //중요
});
$(".gnb li.topmenu_3").keyup(function(){
	$(".gnb li .menu_list").show();
	$(".toparea .topmenu").addClass("active");
	return false; //중요
});
$(".gnb li.topmenu_4").keyup(function(){
	$(".gnb li .menu_list").show();
	$(".toparea .topmenu").addClass("active");
	return false; //중요
});
$(".gnb li.topmenu_5").keyup(function(){
	$(".gnb li .menu_list").show();
	$(".toparea .topmenu").addClass("active");
	return false; //중요
});

$(".toparea .topmenu .gnb > li:last-child .menu_list > li:last-child > a").focusout(function(){
	$(".gnb li.topmenu_1 .menu_list").hide();
	$(".gnb li.topmenu_2 .menu_list").hide();
	$(".gnb li.topmenu_3 .menu_list").hide();
	$(".gnb li.topmenu_4 .menu_list").hide();
	$(".gnb li.topmenu_5 .menu_list").hide();
	return false;
});

function firstLoad(){
	setTimeout(function(){
		$("#wrap").animate({opacity:1}, 100);
	}, 100);
}
firstLoad();

function skipNavi(skipName){
	if (skipName == "#gnb"){
	    $("#gnb li.topmenu_1 > a").focus();   
	    topmenuOpen(1);
	}else if (skipName == "#maincontents"){
		$(".section.section1 .slick-current").addClass("focus");
	    $(".section.section1 .slick-current a").focus();
	}else if (skipName == "#sub_contents"){
		$(".subtoparea div.d_area ul.lnb_area").find("li").last().find("a").focus();
	}else if (skipName == "#sidearea"){
	    $(".lnb_area > li:first-child > a").focus();
	}
}

$('.dropdown').dropselect();

$( ".btn_allgnb" ).click(function(){
    $( ".allmenu-category" ).slideDown( 200 );
    $( "html" ).addClass( "m_menu_open" );
    $( ".allmenu-category" ).addClass( "active" );
    $( ".allmenu-category .btn_close" ).focus();
});
$( ".allmenu-category .btn_close" ).click(function(){
    $( ".allmenu-category" ).slideUp( 200 );
	$( "html" ).removeClass( "m_menu_open" );
    $( ".allmenu-category" ).removeClass( "active" );
    $( ".btn_allgnb" ).focus();
});

jQuery(function($){
	// List Tab Navigation
	var $tab_result = $('.result_area');
	$tab_result.find('.tab_pane').hide();
	$tab_result.find('> li.active .tab_pane').show();
    $tab_result.each(function(){
		var $this = $('.result_area');
		$this.height($this.find('.tab_pane').height()+90);
	});
	function listTabMenuToggle(event){
		var $this = $(this);
        $this.next('.tab_pane').show().parent('li').addClass('active').siblings('li').removeClass('active').find('.tab_pane').hide();
        $this.closest('.result_area').height($this.next('div').height()+90);
	}
    $tab_result.find('> li > a').click(listTabMenuToggle).focus(listTabMenuToggle);
});

jQuery(function($){
	// List Tab Navigation
	var $tab_infra = $('.contents_box');
	$tab_infra.find('.detail').hide();
	$tab_infra.find('> ul > li.active .detail').show();
    $tab_infra.each(function(){
		var $this = $('.contents_box');
		$this.height($this.find('.detail').height()+50);
	});
	function listTabMenuToggle(event){
		var $this = $(this);
		$this.next('.detail').show().parent('li').addClass('active').siblings('li').removeClass('active').find('.detail').hide();
        $this.closest('.contents_box').height($this.next('div').height()+50);
	}
	$tab_infra.find('> ul > li > a').click(listTabMenuToggle).focus(listTabMenuToggle);
});

/* 모바일 메뉴 */
$(document).ready(function(){
	var WinW = $(window).width();
	if (WinW < 1024 ) {
		$(".toparea .allmenu-category .menu_box .all_gnb > li > a").click(function(){
			if ($(this).parent().hasClass("active")){
				$(this).parent().find("ul").slideUp();
				$(this).parent().removeClass("active");
			}else{
				$(this).parent().find("ul").slideDown();
				$(this).parent().siblings().find("ul").slideUp();
				$(this).parent().siblings().removeClass("active");
				$(this).parent().addClass("active");
			}
		});
	}

	var $html = $("html");
	if ($(".allmenu-category").hasClass("active")) {
		$html.addClass("menu_open");
	} else {
		$html.removeClass("menu_open");
	}
});

/* 마이페이지 메뉴 */
$(".lnb_wrap .lnb > li > a").click(function(){
	if ($(this).parent().hasClass("active")){
		$(this).parent().find("ul").slideUp();
		$(this).parent().removeClass("active");
	}else{
		$(this).parent().find("ul").slideDown();
		$(this).parent().siblings().find("ul").slideUp();
		$(this).parent().siblings().removeClass("active");
		$(this).parent().addClass("active");
	}
});

/* footer 바로가기 */
$('.bottomarea .site .site_item .site_show').on("click", function () {
	var $this = $(this),
		$MyParent = $this.parent(".site_item"),
		MyParentIsActive = $MyParent.is(".active"),
		$MyLayer = $this.siblings(".site_panel");
	if (!MyParentIsActive) {
		$MyParent.addClass("active");
		$this.attr("title", "목록닫기");
		$MyLayer.slideDown();
	} else {
		$MyParent.removeClass("active");
		$this.attr("title", "목록열기");
		$MyLayer.slideUp();
	}
});

/* TOP 버튼 */
var $window = $(window),
	$htmlBody = $("html, body"),
	$wrapper = $("#wrap"),
	$upButton = $(".up_button");

if ($upButton.length) {
	$upButton.on("click", function (event) {
		$htmlBody.animate({
			scrollTop: $wrapper.offset().top
		}, {
			duration: 1000,
		});
		event.preventDefault();
	});

	$window.scroll(function () {
		if ($window.scrollTop() > 100) {
			$upButton.addClass("show");
		} else {
			$upButton.removeClass("show");
		}
	});
}

/* 셀렉트박스 */
var select_title = $(".libox > a");
select_title.click(function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).parent().removeClass("active");
    } else {
        $(".libox").removeClass("active");
        $(".libox > a").removeClass("active");
        $(this).addClass("active");
        $(this).parent().addClass("active");
    }
});
$(".libox:not(.cal) ul > li").on('click', function () {
    var select_value = $(this).text();
    $(this).parent().siblings("a").text(select_value);
    $(this).siblings("li").removeClass("active");
    $(this).addClass("active");

    $(".libox").removeClass("active");
    $(".libox > a").removeClass("active");
});
$(".libox.cal ul > li").on('click', function (e) {
    e.stopPropagation();
    var select_value = $(this).text();
    $(this).parent().siblings("a").text(select_value);
    $(this).siblings("li").removeClass("active");
    $(this).addClass("active");

    $(".libox").not(".cal").removeClass("active");
    $(".libox > a").removeClass("active");
});
$("body").click(function (e) {
    if ($(".libox").hasClass("active") && !$(e.target).closest(".libox").length) {
        $(".libox").removeClass("active");
        $(".libox > a").removeClass("active");
    }
});

$(window).load(function () {
	/* sns공유 */
	var $share = $('.share'),
		$shareBtn = $share.find('.share_show'),
		$shareClose = $share.find('.share_hide');

	$shareBtn.on('click', function (event) {
		$share.toggleClass('active');
	});
	$shareClose.on('click', function (event) {
		$share.removeClass('active');
	})
})

/* 주소복사 */
function copy() {
	var url = '';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	url = window.document.location.href;
	textarea.value = url;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("URL이 복사되었습니다.")
}