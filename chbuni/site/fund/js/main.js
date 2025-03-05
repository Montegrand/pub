(function($){
    'use strict';

    $(function(){

        var $html = $('html'),
            $window = $(window),
            $document = $(document),
            $header = $document.find('#header'),
            $container = $document.find('#container');

        // visual
        var $visual = $document.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualItem = $visual.find('.visual_item'),
            $visualPrev = $visual.find('.visual_prev'),
            $visualNext = $visual.find('.visual_next'),
            $visualAuto = $visual.find('.visual_auto'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal = $visual.find('.visual_total'),
            $visualOpt = {
                slidesToShow: 1,     //한번에 보여지는 갯수
                slidesToScroll: 1,   //한번에 넘겨지는 갯수
                autoplay: true,      //자동시작 (boolean) -default:false
                autoplaySpeed: 5000, //자동넘기기 시간(int, 1000ms = 1초)
                draggable: false,    //리스트 드래그 가능여부 (boolean) -default:true
                prevArrow: $visualPrev, // 좌 (이전) 화살표만 변경 (선택자 혹은 $(element))
                nextArrow: $visualNext, // 우 (다음) 화살표만 변경 (선택자 혹은 $(element))
                autoArrow: $visualAuto,  //  재생, 정지버튼; 회사 커스텀에서만
                fade: true,
                playText : '재생',
                pauseText : '정지',
                speed: 1000,         //모션 시간 (1000 = 1초)
                responsive: [
                    {
                        breakpoint: 1001,   //width 1024 이상부터
                        settings: {
                            draggable: true
                        }
                    },
                ] //반응형, breakpoint: 반응형 구간, settings: 반응형 구간에 따른 설정 변경
            };

        $visualItem.each(function(){
            var $visualImg = $(this).find('.visual_img'),
                imgSrc = 'url('+$visualImg.find('img').attr('src')+')';

            $visualImg.css('background-image', imgSrc);
        });
        $visualList.on('init reInit',function(event, slick, currentSlide, nextSlide){
            var total = slick.$slides.length;
            if(total.toString().length<2) total = '0'+total;
            $visualTotal.text(total);
        }).on('init reInit beforeChange',function(event, slick, currentSlide, nextSlide){
            var $activeSlide = slick.$slides.eq((nextSlide?nextSlide:0)),
                current = (nextSlide?nextSlide:0)+1;
            if(current.toString().length<2) current = '0'+current;
            $visualCurrent.text(current);
            $visual.removeClass('text_visible');
            if($activeSlide.attr('data-text') != undefined) $visual.addClass('text_visible');
        }).on('afterChange',function(event, slick, currentSlide, nextSlide){
        }).slick($visualOpt);

        var $banner = $container.find('.banner'),
            $bannerOpt = {
                slidesToShow: 1,     //한번에 보여지는 갯수
                slidesToScroll: 1,   //한번에 넘겨지는 갯수
                autoplay: true,      //자동시작 (boolean) -default:false
                autoplaySpeed: 5000, //자동넘기기 시간(int, 1000ms = 1초)
                draggable: true,    //리스트 드래그 가능여부 (boolean) -default:true
                prevArrow: null, // 좌 (이전) 화살표만 변경 (선택자 혹은 $(element))
                nextArrow: null, // 우 (다음) 화살표만 변경 (선택자 혹은 $(element))
                autoArrow: null,  //  재생, 정지버튼; 회사 커스텀에서만
                playText : '재생',
                pauseText : '정지',
                speed: 1000,         //모션 시간 (1000 = 1초)
                responsive: [
                    {
                        breakpoint: 1001,   //width 1024 이상부터
                        settings: {
                            draggable: true,
                        },
                    },
                ] //반응형, breakpoint: 반응형 구간, settings: 반응형 구간에 따른 설정 변경
            };

        $banner.each(function(){
            var $img = $(this).find('.banner_img'),
                $list = $(this).find('.banner_list'),
                $prev = $(this).find('.banner_prev'),
                $next = $(this).find('.banner_next'),
                $auto = $(this).find('.banner_auto'),
                $thisOpt = $bannerOpt;

            $img.each(function(){
                $(this).css('background-image','url('+$(this).find('img').attr('src')+')');
            });
            $thisOpt.prevArrow = $prev;
            $thisOpt.nextArrow = $next;
            $thisOpt.autoArrow = $auto;
            if($(this).hasClass('type1')){
                $list.on('init reInit',function(event, slick, currentSlide, nextSlide){
                    var $activeSlide = slick.$slides.eq(0);
                    if($activeSlide.find('a').length>0){
                        return $activeSlide.find('a').addClass('text_active');
                    }else{
                        return $activeSlide.addClass('text_active');
                    };
                }).on('beforeChange',function(event, slick, currentSlide, nextSlide){
                    $list.find('.text_active').removeClass('text_active');
                }).on('afterChange',function(event, slick, currentSlide, nextSlide){
                    var $activeSlide = slick.$slides.eq(currentSlide);
                    if($activeSlide.find('a').length>0){
                        $activeSlide.find('a').addClass('text_active');
                    }else{
                        $activeSlide.addClass('text_active');
                    };
                });
            }else if($(this).hasClass('type2')){
                $thisOpt.rows = 3;
                $thisOpt.slidesPerRow = 2;
                $thisOpt.responsive = [
                    {
                        breakpoint: 1601,
                        settings: {
                            rows: 5,
                            slidesPerRow: 2,
                            draggable: false,
                        }
                    },
                    {
                        breakpoint: 1401,
                        settings: {
                            rows: 4,
                            slidesPerRow: 1,
                            draggable: false,
                        }
                    },
                    {
                        breakpoint: 1001,
                        settings: {
                            rows: 3,
                            slidesPerRow: 2,
                            draggable: false,
                        }
                    },
                    {
                        breakpoint: 801,
                        settings: {
                            rows: 3,
                            slidesPerRow: 1,
                            draggable: false,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            rows: 3,
                            slidesPerRow: 2,
                            draggable: false,
                        }
                    },
                    {
                        breakpoint: 401,
                        settings: {
                            rows: 6,
                            slidesPerRow: 1,
                            draggable: false,
                        }
                    },
                ]
            };
            $list.slick($thisOpt);
        });

        // header height sort
        $header.removeAttr('style');
        if(window.innerWidth>1000) $header.innerHeight($container.innerHeight());

    });
})(window.jQuery);