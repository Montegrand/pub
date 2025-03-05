(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container');

		$window.load(function(){
			$('.sub_visual').addClass('active');
		});

		//cms 탭메뉴
		var $tab = $container.find('.tab'),
			$tabMenu = $tab.find('.tab_menu'),
			$tabSelect = $tabMenu.find('.tab_select');

		//cms 탭메뉴 4개 초과시
		if($tab.length){
			if($tab.hasClass('type1') && $tab.find('.tab_item').length > 4) {
				$tab.removeClass('type1').addClass('type2');
			}
		}

		$tabSelect.on('click', function(){
			var $this = $(this);

			if(!$this.parent().is('.active')){
				$this.attr('title','목록닫기')
					.parent().addClass('active')
					.end().next().slideDown('250');
			} else{
				$this.attr('title','목록열기')
					.parent().removeClass('active')
					.end().next().slideUp('250');
			}
		});

		//breadcrumbs
		var $breadcrumbs = $container.find('.breadcrumbs'),
			$breadcrumbsSelect = $breadcrumbs.find('.breadcrumbs_select');

		$breadcrumbsSelect.on('click', function(){
			var $this = $(this);

			if(!$this.parent().is('.active')){
				$this.attr('title','목록닫기')
					.parent().addClass('active').end().next().slideDown('250')
					.parent().siblings().removeClass('active').find('ul').slideUp('250');
			} else{
				$this.attr('title','목록열기')
					.parent().removeClass('active').end().next().slideUp('250');
			}
		});

		//컨텐츠 탭메뉴
		$tab.each(function(index, element){
			var $tabMenu = $(element).find('.tab_menu'),
				$tabBtn = $(element).find('.tab_list.n1 > .tab_item > button.tab_button'),
				tabAllChk = $tabBtn.is('.tab_all'),
				$tabContent = $(element).find('.tab_content');

			var liLength = $tabMenu.find('.tab_list.n1 > .tab_item').length;
			$tabMenu.addClass('divide' + liLength);

			if(liLength < 5 && $tabMenu.find('.tab_list.n2').length){
				$tabMenu.addClass('noneBr')
			}

			$tabBtn.click(function () {
				var $this = $(this),
					index = $tabBtn.index(this),
					tabButtonText = $this.text(),
					IsTabAll = $this.is('.tab_all'),
					$tabPanel = $this.parents('.tab_panel'),
					$tabMenu = $this.parents('.tab_menu');

				$this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
				$this.parents('.tab').find('.tab_select span').text(tabButtonText);
				$tabPanel.attr('class','tab_panel').addClass('active' + (index + 1));

				if (tabAllChk){
					if (IsTabAll) {
						$tabContent.addClass('active');
					} else {
						$tabContent.eq(index - 1).addClass('active').siblings('.tab_content').removeClass('active');
					}
				} else if (!tabAllChk){
					$tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
				}
				if ($window.width() <= 800) {
					$tabMenu.removeClass('active');
					$tabPanel.slideUp('250');
				}
				if ($window.width() <= 800 && IsTabAll) {
					$tabMenu.removeClass('active');
					$tabPanel.slideUp('250');
				};

                colboxAutoHeight();

			});
		});

		/*var $tabItem = $('.tab.type2').find('.tab_item'),
			tabItemLength = $tabItem.length,
			tabItemFirst;

		if(tabItemLength > 4){
			if(tabItemLength < 9){
				tabItemFirst = 4;
			}else if(tabItemLength > 8 && tabItemLength < 13){
				tabItemFirst = 8;
			}else if(tabItemLength > 12 && tabItemLength < 17){
				tabItemFirst = 12;
			}
			$tabItem.eq(tabItemFirst).addClass('first');
			$tabItem.eq(tabItemFirst + 1).addClass('mid');
			$tabItem.eq(tabItemFirst + 2).addClass('mid');
			$tabItem.eq(tabItemFirst + 3).addClass('last');
		}*/



		//colbox 자동 높이
        $window.on('resize',function(){
            colboxAutoHeight();
        });
        colboxAutoHeight();
        function colboxAutoHeight(){
            var $collist = $container.find('.col_box');
            $collist.each(function(){
                var $colItem = $(this).find('.col_item');
                $colItem.removeAttr('style');
                var maxHeight = Math.max.apply(null, $colItem.map(function() {
                    return $(this).height();
                }).get());
                if(window.innerWidth > 800) return $colItem.height(maxHeight);
            });
        };
		// function colboxAutoHeight() {
		// 	var $collist = $container.find('.col_box');

		// 	$collist.each(function (index, element) {
		// 		if($window.width() > 800){
		// 			var $element = $(element),
		// 				$elementboxItem = $element.find('.col_item'),
		// 				height = 0,
		// 				width = 0,
		// 				count;
		// 			if($element.parents('.col_box')){
		// 				$($elementboxItem, element).each(function (index) {
		// 					var $this = $(this),
		// 						thisWidth = $this.width(),
		// 						thisHeight = $this.height();

		// 					if (thisWidth > width){
		// 						width = thisWidth;
		// 					}
		// 					if (thisHeight > height){
		// 						height = thisHeight;
		// 					}
		// 					count = index + 1;
		// 				}).height(height);
		// 			}
		// 		}
		// 	});
		// }
		// colboxAutoHeight();
		// $window.on('resize', function(){
		// 	colboxAutoHeight();
		// });

		//아이콘박스 자동 높이
		function iconboxAutoHeight() {
			var $iconcollist = $container.find('.icon_col_box');

            $iconcollist.each(function(){
                var $iconColItem = $(this).find('.icon_col_item');
                $iconColItem.removeAttr('style');
                var itemMaxHeight = Math.max.apply(null, $iconColItem.map(function(){return $(this).height()}).get());
                if(window.innerWidth>800) $iconColItem.height(itemMaxHeight);
            });

			// $iconcollist.each(function (index, element) {
			// 	if($window.width() > 800){
			// 		var $element = $(element),
			// 			$elementboxItem = $element.find('.icon_col_item'),
			// 			height = 0,
			// 			width = 0,
			// 			count;
			// 		if($element.parents('.icon_col_box')){
			// 			$($elementboxItem, element).each(function (index) {
			// 				var $this = $(this),
			// 					thisWidth = $this.find('.box_cont').width(),
			// 					thisHeight = $this.find('.box_cont').height();

			// 				if (thisWidth > width){
			// 					width = thisWidth;
			// 				}
			// 				if (thisHeight > height){
			// 					height = thisHeight;
			// 				}
			// 				count = index + 1;
			// 			}).height(height);
			// 		}
			// 	}
			// });
		}
		iconboxAutoHeight();
		$window.on('resize', function(){
			iconboxAutoHeight();
		});

		//스텝 자동 높이
		function stepAutoHeight(){
			var $step = $container.find('.step'),
				$stepList = $step.find('.step_list'),
				$stepItem = $stepList.find('.step_item');

			$stepList.each(function (index, element) {
				if($window.width() > 640){
					var $element = $(element),
						$elementStepItem = $element.find('.step_item'),
						$elementItemLevel = $elementStepItem.find('.level'),
						height = 0,
						width = 0,
						count;
					if($element.parents('.step')){
						$($elementStepItem, element).each(function (index){
							var $this = $(this),
								thisWidth = $this.find('.step_content').width(),
								thisHeight = $this.find('.step_content').height();

							if (thisWidth > width){
								width = thisWidth;
							}
							if (thisHeight > height){
								height = thisHeight;
							}

							count = index + 1;
						}).height(height);
					}
					$element.closest('.step').addClass('length' + count);
				};
			});
		}
		stepAutoHeight();
		$window.on('resize', function(){
			stepAutoHeight();
		});

		//테이블 thead tr 두 개 이상 스타일
		$('.table thead tr').each(function(){
			var trIndex = $(this).index() + 1;

			if (trIndex > 1) {
				$(this).closest('.table').addClass('tr_over');
			}
		});

		//반응형 테이블
		var $tableResponsive = $container.find('.table.responsive');

		$tableResponsive.each(function(index, element) {
			var $element = $(element),
				rowdivIs = $element.find('td, th').is('[rowdiv]'),
				theadLength = $element.find('thead').length;

			if(rowdivIs == false && !theadLength == 0){
				$element.find('tbody th, tbody td').each(function(index, element) {
					var $this = $(element),
						thisIndex = $this.index(),
						theadText = $this.parents('tbody').siblings('thead').find('th').eq(thisIndex).text();

					$this.attr('data-content', theadText);
				});

				$element.find('tfoot th, tfoot td').each(function(index, element) {
					var $this = $(element),
						thisIndex = $this.index(),
						theadText = $this.parents('tfoot').siblings('thead').find('th').eq(thisIndex).text();

					$this.attr('data-content', theadText);
				});
			}
		});

		//셀렉트박스 디자인
		$('.style_select_box .search_select').on('click', function (){
			var $this = $(this),
				$MyParent = $this.parent('.style_select_box'),
				MyParentIsActive = $MyParent.is('.active'),
				$MyLayer = $this.siblings('.search_list');

			if(!MyParentIsActive){
				$MyParent.addClass('active');
				$this.attr('title','목록닫기');
				$MyLayer.slideDown();
			} else {
				$MyParent.removeClass('active');
				$this.attr('title','목록열기');
				$MyLayer.slideUp();
			}
		})

		//인풋 포커스
		var selectTarget = $('.sd_input input[type="text"]');
		selectTarget.on({
			'focus' : function () {
				$(this).parent().addClass('focus');
			},
			'blur' : function () {
				$(this).parent().removeClass('focus');
			}
		});

		//레이어팝업
		$('.popup_btn').click(function (){
			$(this).siblings().addClass('on');
		});
		$('.popup_close').click(function (){
			$('.popup').removeClass('on');
			$('.popup_btn').focus();
		});

		//img mobile - 모바일에서 확대 아이콘 추가
		var $imgMobile = $('.img_mobile');
		$(window).on('load resize', function(){
			$imgMobile.each(function(){
				var $this = $(this),
					$img = $this.find('img'),
					imgRight = $img.outerWidth() + $img.offset().left;
				$this.find('.zoom').remove();
				if($(window).width() < 1000){
					var $elem = $('<a href="'+ $img.attr('src')  +'" class="zoom" target="_blank" title="이미지확대보기 새창"></a>');
					$this.append($img).append($elem);
					var $zoom = $this.find('.zoom');
					$zoom.css('left',imgRight - $this.offset().left - $zoom.width());
				}
			})
		});

		//FAQ 게시판 > accordion_con 최초 닫힌 상태로 표현
		if (window.location.pathname.includes('/')) {
			$('.temp_accordion.faq_list .accordion_item').removeClass('active');
			$('.temp_accordion .accordion_item .accordion_con').removeAttr('style');
			$('.temp_accordion .accordion_item .accordion_btn').attr('title','내용열기');
		}
		$('.temp_accordion .accordion_item button.accordion_btn').on('click', function() {
			replaceAngleBrackets();
			var $this = $(this),
				$MyParent = $this.parent('.accordion_item'),
				IsActive = $MyParent.is('.active'),
				$MyLayer = $this.siblings('.accordion_con');
			if(!IsActive){
				$MyParent.addClass('active');
				$MyLayer.slideDown();
				$this.attr('title', '내용닫기');
				$MyParent.siblings().removeClass('active');
				$MyParent.siblings().children('.accordion_btn').attr('title', '내용열기');
				$MyParent.siblings().children('.accordion_con').slideUp();
			} else{
				$MyParent.removeClass('active');
				$MyLayer.slideUp();
				$this.attr('title', '내용열기');
			}
		});

		function replaceAngleBrackets() {
			$('.temp_accordion.faq_list .accordion_item .accordion_con .boxwrap .textbox').each(function() {
				var text = $(this).html();
				if (text.includes('&lt;')) {
					text = text.replace(/&lt;/g, '<');
				}
				if (text.includes('&gt;')) {
					text = text.replace(/&gt;/g, '>');
				}
				if (text.includes('&quot;')) {
					text = text.replace(/&quot;/g, '"');
				}
				$(this).html(text);
			});
		}

		//아코디언
		var     $contents = $('#contents'),
				$accordion = $contents.find('.accordion');

		$accordion.each(function(){
			var $this = $(this),
					$accordionButton = $this.find('.accordion_button'),
					$accordionBody = $this.find('.accordion_body');

			$accordionButton.on('click', function () {
				var $this = $(this),
						$parents = $this.parents('.accordion_item'),
						$thisBody = $parents.find('.accordion_body');

				if ( $parents.hasClass('active') ){
					$this.parents('.accordion_item').removeClass('active')
					$this.parents('.accordion_item').find('.accordion_body').attr('title', '답변 숨김');
					$this.parents('.accordion_item').find('.accordion_header').removeAttr('title');
					$accordionBody.stop().slideUp(300);

				} else {
					$this.parents('.accordion_item').addClass('active').siblings().removeClass('active');
					$this.parents('.accordion_item').find('.accordion_body').attr('title', '답변 보임');
					$this.parents('.accordion_item').siblings().find('.accordion_body').attr('title', '답변 숨김');
					$this.parents('.accordion_header').attr('title', '질문 선택');
					$this.parents('.accordion_item').siblings().find('.accordion_header').removeAttr('title');
					$accordionBody.stop().slideUp(0);
					$thisBody.stop().slideDown(600);
				}
			});
		});

	});
})(window.jQuery);
