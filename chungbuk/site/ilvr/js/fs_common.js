$(document).ready(function() {

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
	$('.main_visual_text .sta,.main_visual_text .stb,.main_visual_text .stc').addClass('animated fadeInDown');
	$('.main_visual_text .vis_img_icon,.main_visual_text .vis_img_btn').addClass('animated fadeInUp');
	$('.main_visual_text .vis_img_bg').addClass('animated zoomIn');
	//서브
	$('.snb_vis_box h2').addClass('animated fadeInUp');
	$('.snb_vis_box span,.con_header h3').addClass('animated fadeInDown');

	//탭메뉴 %자동조절
	var tap_menu_Width = 100/$('ul.tap_btn > li').length;
	$('ul.tap_btn > li').css('width',tap_menu_Width+'%'); //메뉴 개수에 따라 %자동조절

	//패밀리 사이트
	$(".family > a").click(function(){
		$(this).parent().toggleClass("on");
		$(this).parent().find(">ul").stop(true,false).slideToggle(0);
	});

	setMenuSpanAdd();
	//레프트메뉴
	menu_left();
});


function setMenuSpanAdd() {
	$('.lnb_layer01 > li > a').each(function() {
		var obj = $(this).parent().find('ul.lnb_layer02 li');

		if($(obj).prop('tagName') != undefined) {
			$(this).append('<span></span>');
		}
	});
}

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

		if($(this).parent().find('> ul li').prop('tagName') != undefined) {

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

		} else {
			document.location.href = $(this).attr('href');
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

/*
탭 사용법 : 복사하여 탭사용하는곳에 추가

<script type="text/javascript">
	var param = "개체영역";
	var h = "탭버튼"; // ex) h2
	cont_tap(param,h)
</script>
*/
//컨텐츠탭
function cont_tap(param,h){
	var param = $(param);
	var h = h;

	param.find(h + '> a').parent().parent().find('div').hide();
	param.find(h + '> a:eq(0)').parent().parent().find('div').show();
	param.find(h + '> a:eq(0)').addClass("on");

	param.find(h + '> a').bind('click',function (){
		param.find(h + '> a').removeClass("on");

		param.find(h + '> a').parent().parent().find('div:eq(0)').hide();
		$(this).parent().parent().find('div').show();
		$(this).addClass("on");
		return false;
	});
};

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