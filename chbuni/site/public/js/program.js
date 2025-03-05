(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');

        //포토게시판 상단 슬릭
        var $photo = $container.find('.gallery_photo .photo'),
            $photoList = $photo.find('.photo_list'),
            $photoPrev = $photo.find('.photo_prev'),
            $photoNext = $photo.find('.photo_next'),
            $photoAuto = $photo.find('.photo_auto');

        $photoList.slick({
            rows: 1,
            draggable: false,
            infinite: false,
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            prevArrow: $photoPrev,
            nextArrow: $photoNext,
            autoArrow: $photoAuto,
            pauseText: '정지',
            playText: '재생',
            centerMode: true
        });

        // 대표 일정
        var $scheduleMonth = $('.program.schedule .schedule_month'),
            $scheduleMonthBtn = $scheduleMonth.find('button'),
            $scheduleMonthToggle = $('.program.schedule .schedule_month .month_select'),
            $scheduleMonthList = $('.program.schedule .schedule_month ul'),
            $scheduleMonthBtns = $('.program.schedule .schedule_month li button');

        if($scheduleMonthBtn.length && getSearchParams(window.location.href).get('month')){
            var month = getSearchParams(window.location.href).get('month'),
                activeMonth = month == 'all' ? '전체일정' : month.toString().length > 1 ? month+ ' 월' : '0'+month+' 월';
            $scheduleMonthBtn.text(activeMonth);
        };

        $scheduleMonthToggle.each(function(){
            var $scheduleTab = $(this).next();
            $(this).on('click',function(){
                if(window.innerWidth>1000) return false;
                var $parent = $(this).closest('.schedule_month'),
                    tabHeight = $scheduleTab.css('height','auto').innerHeight();
                $scheduleTab.removeAttr('style');
                if($parent.hasClass('active')){
                    $scheduleTab.removeAttr('style').removeClass('active');
                    $parent.removeClass('active');
                    $(this).removeClass('active').attr('title','목록 열기');
                }else{
                    $scheduleTab.height(tabHeight).addClass('active');
                    $parent.addClass('active');
                    $(this).addClass('active').attr('title','목록 닫기');
                };
            });
        });

        $scheduleMonthBtns.on('click',function(){
            var $parent = $(this).closest('.schedule_month'),
                $list = $(this).closest('ul');

            if($scheduleMonthToggle.hasClass('active')){
                $list.removeAttr('style')
                $parent.removeClass('active');
                $scheduleMonthToggle.removeClass('active').attr('title','목록 열기');
                setTimeout(function(){
                    $list.removeClass('active');
                },300);
            };
        });

        $window.on('resize',function(){
            if(window.innerWidth>1000){
                $scheduleMonth.removeClass('active');
                $scheduleMonthList.removeAttr('style').removeClass('active');
                $scheduleMonthToggle.attr('title','목록 열기').removeClass('active');
            };
        });

        function getSearchParams(url) {
            const searchParams = new URL(url).searchParams;
            return searchParams;
        };
    });
})(window.jQuery);
