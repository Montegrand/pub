$(document).ready(function() {

	//내용 이미지 사이즈 조절
	function contentChange() {
		var w = $(".con_body").width() - 50;

		$(".con_body").parent().find("img").each(function() {
			$(this).attr("width", "");
			$(this).attr("height", "");
			$(this).css("width", "");
			$(this).css("height", "");

			var img = new Image();
			img.src = $(this).attr("src");
			img.title = $(this).attr("title");
			img.alt = $(this).attr("alt");
			if($(this).attr("width") > 0)
				img.width = $(this).attr("width");

			if(img.width > w) {
				$(this).css("width", "100%");
			}
		});
	}

	(function($){

		$(window).ready(function() {
			contentChange();
		});

		$(window).load(function() {
			contentChange();
		});

	})(jQuery);


	//건너뛰기 포커스이동
	$(".skip_nav:eq(0)").click(function(){
		$("#fs_container_wrap").attr("tabindex", -1).focus();
	});
	$(".skip_nav:eq(1)").click(function(){
		$("#fs_top_menu").attr("tabindex", -1).focus();
	});
	$(".skip_nav:eq(2)").click(function(){
		$("#fs_footer").attr("tabindex", -1).focus();
	});

	//메뉴 %자동조절
	var sp = 180;
	var snb_menu_Width = 100/$('ul.lnb > li').length;
	$('ul.lnb > li').css('width',snb_menu_Width+'%'); //메뉴 개수에 따라 %자동조절


	//전체메뉴(접근성 기능 포함)
	function chk(){
		if(cc == 1){
			$(".fs_top_menu ul.lnb > li > ul").stop(true,false).show(400);
		}else{
			$(".fs_top_menu ul.lnb > li > ul").stop(true,false).hide(400);
		}
	}
	//마우스가 들어갔을때
	$('.fs_top_menu > ul.lnb > li').mouseover(function(){
		setTimeout(chk);
		cc = 1;
		$(this).addClass('on');
	});
	//마우스가 나갔을때
	$('.fs_top_menu').mouseout(function(){
		setTimeout(chk);
		cc = 0;
		$('.fs_top_menu ul.lnb li').removeClass('on');
	});
	//포커스가 들어갔을때
	$('.fs_top_menu ul.lnb li a').focus(function(){
		setTimeout(chk);
		cc = 1;
		$(this).parent().parent().addClass('on');
	});
	//포커스가 나갔을때
	$('.fs_top_menu ul.lnb li a').blur(function(){
		setTimeout(chk);
		cc = 0;
		$('.fs_top_menu ul.lnb li').removeClass('on');
	});

/*
	//개별메뉴(접근성 기능 포함) : 개별메뉴로 변경시 fs_layout.css의 fs_top_menu 배경을 lnb_layer01로 옮겨준다
	$(".fs_top_menu .lnb li").mouseenter(function(){
		$(this).find(".lnb_layer01").stop(true,false).slideDown(600,"easeOutExpo");
		$(this).addClass("on");
	});
	$(".fs_top_menu .lnb li").mouseleave(function(){
		$(this).find(".lnb_layer01").stop(true,false).slideUp(600,"easeOutExpo");
		$(this).removeClass("on");
	});
	$(".fs_top_menu .lnb li").focusin(function(){
		$(this).find(".lnb_layer01").stop(true,false).slideDown(600,"easeOutExpo");
		$(this).addClass("on");
	});
	$(".fs_top_menu .lnb li").focusout(function(){
		$(this).find(".lnb_layer01").stop(true,false).slideUp(600,"easeOutExpo");
		$(this).removeClass("on");
	});
*/

	//태블릿,모바일 메뉴열기
	$(".mbtn_box .menu_open").click(function(){
		$("body").toggleClass("overflow_y");
		$(this).toggleClass("on");

		$(".fs_mtop_menu").stop(true,false).slideToggle(0);
		$(".fs_mtop_menu").html($(".fs_top_menu").html());

		menu_mo();

		$(window).resize(function (){
			// width값을 가져오기
			var width_size = window.outerWidth;

			// 800 이하인지 if문으로 확인
			if (width_size <= 1024) {
				menu_mo();

			}else{
				$(".fs_mtop_menu").hide();
				$("body").removeClass("overflow_y");
				$(".menu_open").removeClass("on");
			}
		})
		$(window).load(function (){
			// width값을 가져오기
			var width_size = window.outerWidth;

			// 800 이하인지 if문으로 확인
			if (width_size <= 1024) {
				menu_mo();
			}else{
				$(".fs_mtop_menu").hide();
				$("body").removeClass("overflow_y");
				$(".menu_open").removeClass("on");
			}
		})
		return false;
	});

	//맨위로
	$(".btn_top").hide();
	$(window).scroll(function(){
		if($(window).scrollTop() > 200){
			$(".btn_top").show(400);
		}else{
			$(".btn_top").hide(400);
		}
	});

	//맨위로가기
	$(".btn_top").click(function(){
		$("html, body").animate({scrollTop:0},{duration:800,easing:"easeInOutExpo"});
		return false;
	});

	//애니메이션 효과(참고:https://github.com/daneden/animate.css)
	//메인
	$('.main_visual_text .sta,.main_visual_text .stc').addClass('animated fadeInDown');
	$('.main_visual_text .vis_img').addClass('animated fadeInUp');
	//서브
	$('.snb_vis_box h2').addClass('animated fadeInUp');
	$('.snb_vis_box span,.con_header h3').addClass('animated fadeInDown');

	//탭메뉴 %자동조절
	var tap_menu_Width = 100/$('ul.tap_btn > li').length;
	$('ul.tap_btn > li').css('width',tap_menu_Width+'%'); //메뉴 개수에 따라 %자동조절
	
	//팝업
	$(".tab_content").hide();
	$(".tab_content:first").show();

	$("ol.tabs li").click(function () {
		$("ol.tabs li").removeClass("on").css("color", "#fff");
		//$(this).addClass("on").css({"color": "darkred","font-weight": "bolder"});
		$(this).addClass("on").css("color", "#fff");
		$(".tab_content").hide()
		var onTab = $(this).attr("rel");
		$("#" + onTab).fadeIn()
	});

	//레프트메뉴
	menu_left();
});



//모바일 메뉴
function menu_mo(){

	$('ul.lnb > li').removeAttr("style"); 
	$(".fs_mtop_menu .lnb_layer01").css("display","none");
	$(".fs_mtop_menu .lnb > li > a").hasClass("on");
	$(".fs_mtop_menu .lnb li > a").removeClass("on");
	$(".fs_mtop_menu .lnb li:eq(0) > a").addClass("on");
	$(".fs_mtop_menu .lnb li:eq(0) > ul").show();
	$(".fs_mtop_menu .lnb > li > a").click(function(e) { e.preventDefault(); });//링크 안걸리게
	$(".fs_mtop_menu .lnb li ul li a.dep3").click(function(e) { e.preventDefault(); });//링크 안걸리게

	$(".fs_mtop_menu .lnb li > a").on("click",function(e){

		$(".fs_mtop_menu .lnb_layer02").stop(true,false).hide();
		$(".fs_mtop_menu .lnb li ul li a").removeClass("on");

		if($("+.lnb_layer01",this).attr('class') == undefined) {

			if($("+.lnb_layer02",this).css("display") == "none"){
				$(".fs_mtop_menu .lnb_layer02").stop(true,false).hide();
				$("+.lnb_layer02",this).stop(true,false).show();
				$(".fs_mtop_menu .lnb > li > ul > li a").removeClass("on");
				$(this).addClass("on");
			}
			
		} else {
			if($("+.lnb_layer01",this).css("display") == "none"){
				$(".fs_mtop_menu .lnb_layer01").stop(true,false).hide();
				$("+.lnb_layer01",this).stop(true,false).show();
				$(".fs_mtop_menu .lnb > li > a").removeClass("on");
				$(this).addClass("on");
			}
		}

	});

	$(".fs_mtop_menu").scroll(function(){
		if($(".fs_mtop_menu").scrollTop() < 30){
			$(".mbtn_box .menu_open").css("margin-top","0");
			//alert("bb");
		}else{
			$(".mbtn_box .menu_open").css("margin-top","-94px");
		}
	});

};

/** 
 * 특정 엘리먼트 ID의 셀렉트 박스에 정보 추가
 * objNm : 엘리먼트 ID
 * key : 옵션의 Key 값
 * name : 옵션의 Value 값
 * selected : 동일값 체크 true/false
 */
function addSelect(objNm, cd, cdNm, selected) {
	var addOpt = document.createElement('option');
	
	addOpt.value    = cd;
	addOpt.selected = selected;
	addOpt.appendChild(document.createTextNode(cdNm));
	$(objNm).append(addOpt);
}

/**
 * 특정 엘리먼트 ID의 셀렉트 박스를 초기화
 */
function delSelect(objNm) {
	$(objNm).find("option").each(function(){
		$(this).remove();
	});
}

//레프트 메뉴
function menu_left(){

	$(".snb_menu .dep2").hide();
	$(".snb_menu .dep1 li a.dep3").click(function(e) { e.preventDefault(); });//링크 안걸리게
	$(".snb_menu .dep1 > li > a.dep3.on").parent().find(".dep2").show();

	$(".snb_menu .dep1 > li > a").click(function(){
		$(".snb_menu .dep1 > li .dep2").slideUp();
		$(".snb_menu .dep1 > li > a").removeClass("on");

		if(!$(this).next().is(":visible"))
		{
			$(this).next().slideDown();
			$(this).addClass("on");

			$(".snb_menu .dep1 > li > .dep2 > li a").click(function(){
				$(".snb_menu .dep1 > li > .dep2 > li a").removeClass("on");
				$(this).addClass("on");
			});
		}

	})

};