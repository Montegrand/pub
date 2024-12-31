(function($){
    'use strict';

    $(function(){
        var $container = $('#container');

        // visual
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualPrev = $visual.find('.visual_prev'),
            $visualNext = $visual.find('.visual_next'),
            $visualAuto = $visual.find('.visual_auto'),
            $visualOpt = {
                // rows: 1,                    //이미지를 몇 줄로 표시할지 개수
                infinite: true,             //무한반복(true or false) 기본값 true
                slidesToShow: 1,            //한번에 보여줄 슬라이드 아이템 개수
                slidesToScroll: 1,          //한번에 넘길 슬라이드 아이템 개수
                autoplay: false,             //슬라이드 자동 시작(true or false) ▶기본값 false
                draggable: false,           //슬라이드 드래그 가능여부 (true or false) ▶기본값 true
                arrows: true,               //이전 다음 버튼 표시 여부(true or false) ▶기본값 true
                prevArrow: $visualPrev, //이전 화살표만 변경
                nextArrow: $visualNext, //다음 화살표만 변경
                speed: 1000,                //모션 시간 (얼마나 빠른속도로 넘어가는지)(1000ms = 1초) 곧, 슬라이드 사이에 넘어가는 속도
                responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                draggable: true,
                            },
                        },
                    ],
                };


        var visualTime = 5;

        // visual text animate
        var $visualTitle = $visual.find('.visual_title'),
            $visualTxt = $visual.find('.visual_sub, .visual_txt');

        $visualTitle.each(function(){
            var $this = $(this),
                textArr = $this.text().split('');

            $this.html('')
            for(var txt of textArr){
                var $span = $('<span>',{
                    'class':'animate',
                    'text':txt,
                });
                $this.append($span);
            };
        });
        $visualTxt.find('span').addClass('animate');

        $visualList.find('.visual_img').each(function(){
            var imgSrc = 'url('+$(this).find('img').attr('src')+')';
            $(this).css('background-image',imgSrc);
        });
        $visualList.on('init',function(e,slck){
            var $btnWrap = $visual.find('.visual_btn_wrap');
            for(var i=0;i<slck.slideCount;i++){
                var $btn = $('<button></button>',{
                    'type':'button',
                    'class':'visual_btn',
                    'text':i+1,
                });
                var $progress = $('<span>',{
                    'class':'visual_progress'
                });
                $btn.on('click',function(){
                    if($(this).hasClass('active')) return;
                    var idx = $(this).index();
                    $visualList.slick('slickGoTo',idx);
                });
                $btnWrap.append($btn.append($progress));
            };
            $visualAuto.addClass('visual_pause').on('click',function(){
                if($visual[0].progressChk){
                    $visual[0].progressChk = false;
                    $visualAuto.removeClass('visual_pause').addClass('visual_play');
                }else{
                    $visual[0].progressChk = true;
                    $visualAuto.removeClass('visual_play').addClass('visual_pause');
                };
            });

            var $activeBtn = $visual.find('.visual_btn').eq(0);
            $activeBtn.addClass('active');
            $visual[0].progressChk = true;
            $visual[0].progressCurrent = 0;
            $visual[0].progress = setInterval(VisualProgress,10,$activeBtn.find('.visual_progress'))
        }).on('beforeChange',function(e,slck,currentSlide,nextSlide){
            clearInterval($visual[0].progress);
            $visual.find('.visual_btn').removeClass('active').eq(nextSlide).addClass('active');
        }).on('afterChange',function(e,slck,currentSlide){
            var $visualBtn = $visual.find('.visual_btn'),
            $activeBtn = $visualBtn.eq(currentSlide);
            $visualBtn.removeClass('active');
            $activeBtn.addClass('active');
            $visualBtn.find('.visual_progress').removeAttr('style');
            $visual[0].progressCurrent = 0;
            $visual[0].progress = setInterval(VisualProgress,10,$activeBtn.find('.visual_progress'));
        }).on('init afterChange',function(){

            $(this).find('.animate').removeClass('active');

            var $titleAnimate = $(this).find('.slick-current .visual_title .animate'),
                $txtAnimate = $(this).find('.slick-current .visual_sub .animate, .slick-current .visual_txt .animate'),
                titleTotal = $titleAnimate.length - 1;

            $titleAnimate.each(function(idx){
                var $this = $(this)
                setTimeout(function(){
                    $this.addClass('active');
                    if(idx == titleTotal){
                        setTimeout(function(){
                            $txtAnimate.each(function(txtIdx){
                                var $txt = $(this);
                                setTimeout(function(){
                                    $txt.addClass('active');
                                },100*txtIdx);
                            });
                        },100)
                    };
                },50*idx);
            });

        }).on('setPosition',function(){
            if(window.innerWidth>640) return;

            $(this).find('.visual_img').each(function(){
                var imgSrc = $(this).find('img').attr('src').replace('.png','@2x.png');
                $(this).css('background-image','url('+imgSrc+')');
            });
        }).slick($visualOpt);

        function VisualProgress($prgrss){
            if(!$visual[0].progressChk) return;
            $visual[0].progressCurrent += (1/visualTime);
            $prgrss.css('width',$visual[0].progressCurrent + '%');
            if($visual[0].progressCurrent>=100){
                $visual[0].progressCurrent = 0;
                $visualList.slick('slickNext');
            };
        };

    });
})(window.jQuery);