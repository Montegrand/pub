/**
 * @author (주)한신정보기술 퍼블리셔팀 문석민
 * @since 2022-09-22
 */

(function ($) {
	"use strict";

	$(function () {
		var $window = $(window),
				$container = $("#container");

		/*핫뉴스*/
		var $topic = $container.find(".topic"),
				$topicList = $topic.find(".topic_list"),
				$topicCurrent = $topic.find(".topic_current"),
				$topicTotal = $topic.find(".topic_total"),
				$topicAuto = $topic.find(".topic_auto"),
				$topicPrev = $topic.find(".topic_prev"),
				$topicNext = $topic.find(".topic_next"),
				$topicTablist = $topic.find(".tab_list"),
				$topicTabItem = $topicTablist.find(".tab_item"),
                $newsletter = $container.find(".newsletter .newsletter_img"),
                $rowgroup = $container.find(".rowgroup");

		var time = 5;
		var $bar, isPause, tick, percentTime;
		$bar = $(".topic .topic_control .progress_bar span");

		function digit(i) {
			if (i < 10) i = "0" + i;
			return i;
		}

        $newsletter.hover(function(){
            $newsletter.prev().toggleClass('hover');
        });

		$topicList.on("beforeChange", function (evens, slick, currentSlide) {
            var current = (currentSlide ? currentSlide : 1) + 1;
			current = digit(current);
            $rowgroup.addClass('rolling');
            $topicTablist.find('.tab_item').removeClass('prev').removeAttr("style").end();
		});

		$topicList.on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
			var current = (currentSlide ? currentSlide : 0) + 1;
            if(current=='01'){$topicTablist.addClass('rem');}else{$topicTablist.removeClass('rem');}
			current = digit(current);
            $topicTablist.find('.tab_item').removeClass('on');
            $topicTablist.find('.n'+current).addClass('on').prev().css({"border-bottom":"none"}).addClass('prev');
            $rowgroup.removeClass('rolling');
			var total = digit(slick.slideCount);
			$topicCurrent.text(current);
			$topicTotal.text(total);
		});
        
        $topicTabItem.on('click',function(e){
            e.preventDefault();
            var index = $(this).index();
            $topicList.slick('slickGoTo',index);
        })

		$topicList.slick({
			draggable: false,
			infinite: true,
			slidesToShow: 1,
			fade: true,
            speed: 100,
			prevArrow: $topicPrev,
			nextArrow: $topicNext,
		});


		$topicAuto.on("click", function () {
			if ($(this).hasClass("slick-play")) {
				isPause = false;
				$(this).removeClass("slick-play");
				$(this).text("정지");
			} else {
				isPause = true;
				$(this).addClass("slick-play");
				$(this).text("재생");
			}
		});

		// 팝업 멈추려면 여기부터 주석처리
		function startProgressbar() {
			resetProgressbar();
			percentTime = 0;
			isPause = false;
			tick = setInterval(interval, 10);
		}

		function interval() {
			if (isPause === false) {
				percentTime += 1 / (time + 0.1);
				$bar.css({
					width: percentTime + "%",
				});
				if (percentTime >= 100) {
					$topicList.slick("slickNext");
					startProgressbar();
                    $rowgroup.addClass('rolling');
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

		$topicList.on("beforeChange", function (event, currentSlide, nextSlide) {
			if (!$(".topic_auto").hasClass("slick-play")) {
				startProgressbar();
			}
		});
	});
})(jQuery);
