(function ($) {
	"use strict";

	$(function () {
		var $window = $(window),
				$container = $("#container");

		/*visual*/
		var $visual = $container.find(".visual"),
				$visualList = $container.find(".visual > .visual_list"),
				$visualAuto = $visual.find(".visual_auto"),
				$visualTab = $visual.find(".visual_tab"),
				$visualTabItem = $visualTab.find(".visual_item");


		var time = 5;
		var $bar, isPause, tick, percentTime;
		$bar = $(".visual .visual_control .progress_bar span");
        
        $visualTabItem.on('click',function(e){
            var index = $(this).index();
            if(!$(this).hasClass("active")){
                $visualList.slick('slickGoTo',index);
                visualTab();
                if($visualAuto.hasClass("slick-pause")){
                    startProgressbar();
                }
            }
        });

        function visualTab (){
            var current = $visualList.find(".slick-active").index();
            $visualTabItem.removeClass("active");
            $visualTabItem.eq(current).addClass("active");
        };

        $visualList.slick({
            draggable: false,
            infinite: true,
            slidesToShow: 1,
            fade: true,
            speed: 500,
            playText : '재생',
            pauseText : '정지',
            autoplay : true,
            autoplaySpeed : 6000,
            autoArrow : $visualAuto,
        });

		function startProgressbar() {
			resetProgressbar();
			percentTime = 0;
			tick = setInterval(interval, 10);
		}

		function interval() {
			if ($visualAuto.hasClass("slick-pause")) {
				percentTime += 1 / time;
				$bar.css({
					width: percentTime + "%",
				});
				if (percentTime >= 100) {
                    startProgressbar();
					$visualList.slick("slickNext");
                    visualTab();
				}
			}
		}

		function resetProgressbar() {
			$bar.css({
				width: 0 + "%",
			});
			clearTimeout(tick);
		}

		startProgressbar();
        // board

        var $board = $container.find(".board"),
            $boardTab = $board.find(".board_tab .board_item"),
            $boardTabBt = $boardTab.find("button"),
            $boardAnchor = $board.find(".board_more .board_anchor"),
            $boardContent = $board.find(".board_content .board_item");

        $boardTabBt.on('click',function(e){
            function boardTab (each){
                each.each(function(n,v){
                    $(v).data("category")===$(e.target).data("category") ? $(v).addClass("active") : $(v).removeClass("active");
                })
            }
            boardTab($boardContent);
            boardTab($boardAnchor);
            $boardTab.removeClass("active");
            $(this).closest("li").addClass("active");
        });

        var $popup = $container.find(".popup"),
            $popupList = $popup.find(".popup_list"),
            $popupPrev = $popup.find(".popup_prev"),
            $popupAuto = $popup.find(".popup_auto"),
            $popupNext = $popup.find(".popup_next");

        $popupList.slick({
            draggable: false,
			infinite: true,
			slidesToShow: 1,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 3000,
            prevArrow: $popupPrev,
			nextArrow: $popupNext,
            playText : '재생',
            pauseText : '정지',
            autoArrow : $popupAuto,
        });
	});
})(jQuery);