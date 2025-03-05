$(function(){
	var sideMenu = $(".sub_menu > ul");
	var depth1 = sideMenu.find(">li");
	var depth2 = sideMenu.find(">li>ul>li");

	depth1.find('>a').on("click focus",function(){
		var this_item = $(this).parent('li');
		var depth2_size= $(this).next('ul').size();
		if(depth2_size > 0 ){
			$(this).attr('href','#n');
			if (this_item.hasClass('on')){
				//$(this).next('ul').slideUp(300);
				//this_item.removeClass('on');
			} else{
				depth1.find("ul").slideUp(300);
				depth1.removeClass('on');

				$(this).next('ul').stop().slideDown(300);
				$(this).parent().addClass('on');
			}
		}
	});
	depth2.find('>a').on("click focus",function(){
		depth2.removeClass('on');
		$(this).parent().addClass('on');
	});

});
// 좌우 슬라이딩
$.fn.horizonSlide = function(options){
    var settings = {
        slidePrev : '',
        slideNext : '',
        slideContent : '',
        slideElement : '',
        slideIndex : '',
        slideWidth : '',
        slideView : '',
        countTotal : '',
        countCurrent : ''
    };
    $.extend(settings, options);
    settings.slidePrev = $(settings.slidePrev);
    settings.slideNext = $(settings.slideNext);
    settings.slideContent = $(settings.slideContent);
    settings.slideElement = $(settings.slideElement);
    settings.countTotal = $(settings.countTotal);
    settings.countCurrent = $(settings.countCurrent);
    var slideSize = settings.slideElement.size(),
        slideIndex = settings.slideIndex,
        slideTotal = settings.slideElement.length,
        slideWidth = settings.slideElement.width(),
        slideAllwidth = slideWidth * slideTotal,
        slideView = settings.slideView,
        countTotal = settings.countTotal,
        countCurrent = settings.countCurrent,
        slidePst = 0;
    settings.slideContent.css("width",slideAllwidth);
    countTotal.html(slideTotal);
    countCurrent.html("1");
    if( slideSize > slideView){
        settings.slidePrev.on("click",function(e) {
            if( slideIndex > 1 ) {
                slidePst = slidePst - slideWidth;
                settings.slideContent.animate({left:-slidePst},400);
                slideIndex--;
                countCurrent.html(slideIndex);
            } else {
                //
            }
        });

        settings.slideNext.on("click",function(e) {
            if( slideIndex <= slideSize-slideView ) {
                slidePst = slidePst + slideWidth;
                settings.slideContent.animate({"left":-slidePst},400);
                slideIndex++;
                countCurrent.html(slideIndex);
            } else {
                //
            }
        });
    }
};

$(function(){
    //상단이동
    $(".top_btn").click(function(){
        $("html, body").animate({scrollTop : 0},400).focus("#rowgroup");
    });
});

// 만족도조사
function fn_validateCntntsEvalHist( frm ) {
    var valiEvl = false;
    for( var i=0; i<frm.cntntsEvlSe.length; i++ ) {
        if( frm.cntntsEvlSe[i].checked == true ) {
            valiEvl = true;
            break;
        }
    }
    if( !valiEvl ) {
        alert("만족도의 등급을 선택하지 않으셨습니다.\n만족도 등급을 선택하여 주세요.");
        fn_setFocus(frm, 'value5');
        return false;
    }
    return true;
}
// 탭메뉴 공통적으로 사용
//ex) tabOn(1,1);
function tabOn(tabid,a) {
  var tabAllcount = 20;
  for (i=1;i<=tabAllcount;i++) {
    if(i<tabAllcount){inn="0"+i;} else {inn=""+i;}
    tabMenu = document.getElementById("tab"+tabid+"m"+i);
    tabContent = document.getElementById("tab"+tabid+"c"+i);
    tabMore = document.getElementById("tab"+tabid+"more"+i);
    if (tabMenu) { //객체가존재하면
      if (tabMenu.tagName=="BUTTON") { tabMenu.className=""; } //버튼일때
      if (tabMenu.tagName=="BUTTON") { tabMenu.parentNode.className=""; } //버튼일때
      if (tabMenu.tagName=="SPAN") { tabMenu.className=""; } //span 일때
      if (tabMenu.tagName=="SPAN") { tabMenu.parentNode.className=""; } //span 일때 부모요소에도 클래스 삭제
    }
    if (tabContent) {
      tabContent.style.display="none";
      tabContent.className="";
    }
    if (tabMore) { tabMore.style.display="none"; }
  }
  if(a<tabAllcount){ann="0"+a;} else {ann=""+a;}
  tabMenu = document.getElementById("tab"+tabid+"m"+a);
  tabContent = document.getElementById("tab"+tabid+"c"+a);
  tabMore = document.getElementById("tab"+tabid+"more"+a);
  if (tabMenu) { //객체가존재하면
    if (tabMenu.tagName=="BUTTON") { tabMenu.className="active"; } //버튼일때
    if (tabMenu.tagName=="BUTTON") { tabMenu.parentNode.className="active"; } //버튼일때
    if (tabMenu.tagName=="SPAN") { tabMenu.className="active"; } //span 일때
    if (tabMenu.tagName=="SPAN") { tabMenu.parentNode.className="active"; } //span 일때 부모요소에도 클래스추가
  }
  if (tabContent) {
    tabContent.style.display="block";
    tabContent.className="current";
  }
  if (tabMore) { tabMore.style.display="block"; }
}

$(function(){
    $('table.table.responsive.normal').not($('.prettyprint').children()).each(function() {
        var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
            TheadExist = $(this).find('thead').length;
        if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
            $(this).children('tbody').children('tr').find('th, td').each(function() {
                var ThisIndex = $(this).index(),
                    TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                $(this).attr('data-content', TheadText);
            });
            $(this).children('tfoot').children('tr').find('th, td').each(function() {
                var ThisIndex = $(this).index(),
                    TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                $(this).attr('data-content', TheadText);
            });
        };
    });
    $('table.table.responsive.appoint').not($('.prettyprint').children()).each(function() {
        var TheadExist = $(this).find('thead').length,
            IsMulti = $(this).is('.multi');
        if(TheadExist!=0){
            if(IsMulti==true){
                $(this).children('thead').children('tr:last-child').find('th').each(function() {
                    var ThisHeadcol = $(this).attr('data-headcol'),
                        HeadTitle = $(this).parents('thead').find('th[data-headcoltitle="'+ThisHeadcol+'"]').text();
                    $(this).attr('data-headtitle', HeadTitle);
                });
                $(this).children('tbody').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        $ThisThead = $(this).parents('tbody').siblings('thead').find('th[data-headtext="'+ThisIndex+'"]'),
                        HeadTitle = $ThisThead.attr('data-headtitle'),
                        TheadText = $ThisThead.text();
                    if(HeadTitle){
                        $(this).attr('data-content', '['+HeadTitle+'] '+TheadText);
                    } else{
                        $(this).attr('data-content', TheadText);
                    };
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        $ThisThead = $(this).parents('tbody').siblings('thead').find('th[data-headtext="'+ThisIndex+'"]'),
                        HeadTitle = $ThisThead.attr('data-headtitle'),
                        TheadText = $ThisThead.text();
                    if(HeadTitle){
                        $(this).attr('data-content', '['+HeadTitle+'] '+TheadText);
                    } else{
                        $(this).attr('data-content', TheadText);
                    };
                });

            } else{
                $(this).children('tbody').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th[data-headtext="'+ThisIndex+'"]').text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th[data-headtext="'+ThisIndex+'"]').text();
                    $(this).attr('data-content', TheadText);
                });
            };
        };
    });
    $('table.table.responsive.tbodyrowspan').not($('.prettyprint').children()).each(function() {
        var TheadExist = $(this).find('thead').length;
        if(TheadExist!=0){
            $(this).children('tbody').children('tr').each(function() {
                var $this = $(this),
                    FirstIsRowSpan = $this.find('th:first-child, td:first-child').is('[rowspan]');
                if(FirstIsRowSpan==true){
                    $this.find('th, td').each(function() {
                        var $this = $(this),
                            ThisIndex = $this.index(),
                            TheadText = $this.parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                        $this.attr('data-content', TheadText);
                    });
                } else{
                    $this.find('th, td').each(function() {
                        var $this = $(this),
                            ThisIndex = $this.index()+1,
                            TheadText = $this.parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                        $this.attr('data-content', TheadText);
                    });
                };
            });
            $(this).children('tfoot').children('tr').each(function() {
                var $this = $(this),
                    FirstIsRowSpan = $this.find('th:first-child, td:first-child').is('[rowspan]');
                if(FirstIsRowSpan==true){
                    $this.find('th, td').each(function() {
                        var $this = $(this),
                            ThisIndex = $this.index(),
                            TheadText = $this.parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                        $this.attr('data-content', TheadText);
                    });
                } else{
                    $this.find('th, td').each(function() {
                        var $this = $(this),
                            ThisIndex = $this.index()+1,
                            TheadText = $this.parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                        $this.attr('data-content', TheadText);
                    });
                };
            });
        };
    });

});

