(function($) {
	'use strict';

	$(function() {

        var $window = $(window),
            $html = $('html'),
            $footer = $('#footer');

        /* 토글 */
        var $toggle = $('.toggle'),
            $toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

        $toggleSelector.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.toggle'),
                parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g,'').split(/\s+/).slice(-2)[0].replace(/_item/,'');

            if($this.is('[class*="_show"]')){
                if ($parent.siblings().hasClass('active')){
                    $parent.siblings().removeClass('active');
                    $html.removeClass(parentClass + '_open');
                }
                $html.toggleClass(parentClass + '_open');
                $parent.toggleClass('active');
            }

            if($this.is('[class*="_hide"]')){
                $html.removeClass(parentClass + '_open');
                $this.closest('.active').removeClass('active');
            }
        });

        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next');

        $bannerList.slick({
            draggable: false,
            infinite: true,
            variableWidth: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            playText: '재생',
            pauseText: '정지',
            autoArrow: $bannerAuto,
            prevArrow: $bannerPrev,
            nextArrow: $bannerNext,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        draggable: true,
                    }
                }
            ]
        });

        /* 맨위로 */
        var $htmlBody = $('html, body'),
            $wrapper = $('#wrapper'),
            $upBtn = $footer.find('.up_btn');

        if ($upBtn.length){
            $upBtn.on('click', function(e) {
                $htmlBody.animate({
                    scrollTop : $wrapper.offset().top
                },250);
                e.preventDefault();
            });

            $window.scroll(function(){
                if($window.scrollTop() > 100){
                    $upBtn.addClass('show');
                }else{
                    $upBtn.removeClass('show');
                }

                var footerTop = $footer.offset().top,
                    windowHeight = $window.height(),
                    scrollTop = $window.scrollTop();

                if (scrollTop + windowHeight > footerTop) {
                    $upBtn.addClass('bottom');
                }else{
                    $upBtn.removeClass('bottom');
                }
            });
        }

        /* 검색 */
        var searchButton = $('.link_item.search button'),
            searchWrap = $('.search_wrap');

        if (searchButton.length) {
            searchButton.on('click', function() {
                searchWrap.addClass('active');
            });

            $('.search_close').on('click', function() {
                searchWrap.removeClass('active');
            });
        }



    });
})(window.jQuery);
