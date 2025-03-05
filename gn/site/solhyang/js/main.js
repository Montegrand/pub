(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $container = $('#container');

        // lnb_open, search_open 일때 로고 소스
        var $logo = $('.logo'),
            $logoImg = $logo.find('img'),
            logoImgSrc = $logoImg.attr('src'),
            $nav = $('nav.menu'),
            $searchOpen = $('.search_btn'),
            $searchClose = $('.search_close');

        $nav.find('.depth_item').on('mouseover',function(){
            if($html.hasClass('lnb_open')) $logoImg.attr('src','../public/images/common/logo.svg');
        });
        $nav.on('mouseleave',function(){
            $logoImg.attr('src',logoImgSrc);
        });
        $searchOpen.on('click',function(){
            $logoImg.attr('src','../public/images/common/logo.svg');
        });
        $searchClose.on('click',function(){
            $logoImg.attr('src',logoImgSrc);
        });

        // visual
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualPrev = $visual.find('.visual_prev'),
            $visualAuto = $visual.find('.visual_auto'),
            $visualNext = $visual.find('.visual_next'),
            $visualTotal = $visual.find('.visual_total'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualOpt = {
                infinite: true,      //무한반복 (boolean) -default:true
                slidesToShow: 1,     //한번에 보여지는 갯수
                slidesToScroll: 1,   //한번에 넘겨지는 갯수
                autoplay: true,      //자동시작 (boolean) -default:false
                autoplaySpeed: 5000, //자동넘기기 시간(int, 1000ms = 1초)
                draggable: false,    //리스트 드래그 가능여부 (boolean) -default:true
                prevArrow: $visualPrev, // 좌 (이전) 화살표만 변경 (선택자 혹은 $(element))
                nextArrow: $visualNext, // 우 (다음) 화살표만 변경 (선택자 혹은 $(element))
                autoArrow: $visualAuto,  //  재생, 정지버튼; 회사 커스텀에서만
                playText : '재생',
                pauseText : '정지',
                fade : true,
                waitForAnimate: true, //애니메이션 중에는 동작을 제한함 -default:true
                speed: 1000,         //모션 시간 (1000 = 1초)
                // responsive: [
                //     {
                //         breakpoint: 1024,   //width 1024 이상부터
                //         settings: {
                //             slidesToShow: 3,
                //             slidesToScroll: 3
                //         }
                //     },
                //     {
                //         breakpoint: 480,   //width 480 이상부터
                //         settings: {
                //             slidesToShow: 2,
                //             slidesToScroll: 2
                //         }
                //     }
                // ] //반응형, breakpoint: 반응형 구간, settings: 반응형 구간에 따른 설정 변경
            };

        $visualList.on('init reInit afterChange',function(event, slick, currentSlide, nextSlide){
            var current = (currentSlide ? currentSlide : 0) + 1,
                total = slick.$slides.length;

            if(current.toString().length < 2) current = '0'+current;
            if(total.toString().length < 2) total = '0'+total;

            $visualTotal.text(total);
            $visualCurrent.text(current);
        });
        $visualList.slick($visualOpt);

        // board

        var $board = $container.find('.board'),
            $boardContext = $board.find('.board_sub+span');

        $boardContext.text($boardContext.text().trimStart());

        // popup
        var $popup = $container.find('.popup'),
            $popupList = $popup.find('.popup_list'),
            $popupPrev = $popup.find('.popup_prev'),
            $popupAuto = $popup.find('.popup_auto'),
            $popupNext = $popup.find('.popup_next'),
            $popupTotal = $popup.find('.popup_total'),
            $popupCurrent = $popup.find('.popup_current'),
            $popupSlkOpt = {
                infinite: true,      //무한반복 (boolean) -default:true
                slidesToShow: 1,     //한번에 보여지는 갯수
                slidesToScroll: 1,   //한번에 넘겨지는 갯수
                autoplay: true,      //자동시작 (boolean) -default:false
                autoplaySpeed: 5000, //자동넘기기 시간(int, 1000ms = 1초)
                draggable: false,    //리스트 드래그 가능여부 (boolean) -default:true
                prevArrow: $popupPrev, // 좌 (이전) 화살표만 변경 (선택자 혹은 $(element))
                nextArrow: $popupNext, // 우 (다음) 화살표만 변경 (선택자 혹은 $(element))
                autoArrow: $popupAuto,  //  재생, 정지버튼; 회사 커스텀에서만
                playText : '재생',
                pauseText : '정지',
                speed: 1000,         //모션 시간 (1000 = 1초)
                waitForAnimate: true, //애니메이션 중에는 동작을 제한함 -default:true
                responsive: [
                    // {
                    //     breakpoint: 1024,   //width 1024 이상부터
                    //     settings: {
                    //         slidesToShow: 3,
                    //         slidesToScroll: 3
                    //     }
                    // },
                    // {
                    //     breakpoint: 480,   //width 480 이상부터
                    //     settings: {
                    //         slidesToShow: 2,
                    //         slidesToScroll: 2
                    //     }
                    // }
                ] //반응형, breakpoint: 반응형 구간, settings: 반응형 구간에 따른 설정 변경
            };

        $popupList.on('init reInit afterChange',function(event, slick, currentSlide, nextSlide){
            if(event.type == 'init'){
                var total = slick.$slides.length;
                total = (total.toString().length < 2 ? '0'+total : total)
                $popupTotal.text(total);
            };
            var current = (currentSlide ? currentSlide : 0) + 1;
            current = current.toString().length < 2 ? '0'+current : current;
            $popupCurrent.text(current)
        })
        $popupList.slick($popupSlkOpt);

        // photo

        var $photo = $container.find('.photo'),
            $photoList = $photo.find('.photo_list'),
            $photoPrev = $photo.find('.photo_prev'),
            $photoNext = $photo.find('.photo_next');


        // photo slick

        var $photoSlkOpt = {
                slidesToShow: 2,
                slidesToScroll: 1,
                // autoplay: true,
                autoplaySpeed: 5000,
                draggable: false,
                prevArrow: $photoPrev,
                nextArrow: $photoNext,
                speed: 1000,
                waitForAnimate: true,
                responsive: [
                    {
                        breakpoint: 1201,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            };

        // photo svg path animation
        var agent = navigator.userAgent.toLowerCase();

        var $photoAnchor = $photo.find('.photo_anchor');
        if((navigator.userAgent.search('Trident') == -1)){

            const defaultPath = "M5,160c10-205,310-205,310,0v198c0,20.333-16,33.333-33.333,33.3l-0-0c-0,0-0,0-0,0v0c0,0-0,0-0,0h-241.5c-25-00-35-21-35-34z";
            const activePath = "M5,160c10-205,310-205,310,0v96c0,20.333-16,33.333-33.333,33.3l-24-0c-20,0-45,20-45,48v20c0,18-16,33-36,33h-137c-25-00-35-21-35-34z";

            $photoAnchor.each(function(index) {
                var $this = $(this);
                var $path = $this.find('path');
                var $linearGradient = $this.find('linearGradient');
                var $clipPath = $this.find('clipPath');
                var $linePath = $this.find('.line path');
                var $imgPath = $this.find('.img path');

                $linearGradient[0].setAttribute('id', 'gradient' + (index + 1));
                $clipPath[0].setAttribute('id', 'shape' + (index + 1));
                $this.find('g image')[0].setAttribute('clip-path', 'url(#shape' + (index + 1) + ')');

                $path.html('')
                    .append(createAnimation("myAnimation1", "d", defaultPath + ';' + activePath, "0.2s", "1", "freeze"))
                    .append(createAnimation("myAnimation2", "d", activePath + ';' + defaultPath, "0.2s", "1", "freeze"));

                $linePath[0].setAttribute('stroke', 'url(#gradient' + (index + 1) + ')');
                $linePath.html('')
                    .append(createAnimation("myAnimation1", "d", defaultPath + ';' + activePath, "0.2s", "1", "freeze"))
                    .append(createAnimation("myAnimation2", "d", activePath + ';' + defaultPath, "0.2s", "1", "freeze"))
                    .append(createAnimation("myAnimation3", "stroke-width", '0;10', "0.2s", "1", "freeze"))
                    .append(createAnimation("myAnimation4", "stroke-width", '10;0', "0.2s", "1", "freeze"));

                $imgPath.html('')
                    .append(createAnimation("myAnimation1", "d", defaultPath + ';' + activePath, "0.2s", "1", "freeze"))
                    .append(createAnimation("myAnimation2", "d", activePath + ';' + defaultPath, "0.2s", "1", "freeze"))
                    .append(createAnimation("myAnimation5", "opacity", '0;0.45', "0.2s", "1", "freeze"))
                    .append(createAnimation("myAnimation6", "opacity", '0.45;0', "0.2s", "1", "freeze"));

            }).on('mouseenter', function() {
                if(window.innerWidth <= 1000) return false;
                $(this).find('.myAnimation1, .myAnimation3, .myAnimation5').each(function() {
                    $(this)[0].beginElement();
                });
                return false;
            }).on('mouseleave', function() {
                if(window.innerWidth <= 1000) return false;
                $(this).find('.myAnimation2, .myAnimation4, .myAnimation6').each(function() {
                    $(this)[0].beginElement();
                });
                return false;
            });
        }else if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1)){
            $photoAnchor.each(function(){
                var imgUrl = $(this).find('image')[0].getAttribute('xlink:href');
                $(this).html('<img src="'+imgUrl+'"/>');
            });
        };

        // animate 생성 함수
        function createAnimation(className, attributeName, values, dur, repeatCount, fill) {
            var animation = document.createElementNS("http://www.w3.org/2000/svg", 'animate');
            animation.setAttribute("class", className);
            animation.setAttribute("attributeType", "XML");
            animation.setAttribute("attributeName", attributeName);
            animation.setAttribute("values", values);
            animation.setAttribute("dur", dur);
            animation.setAttribute("repeatCount", repeatCount);
            animation.setAttribute("fill", fill);
            return animation;
        }
        $photoList.on('afterChange',function(){
            $('.slick-cloned').each(function(){
                var $clonedClip = $(this).find('clipPath'),
                    $clonedImg = $(this).find('.img image'),
                    count = 1;
                if($clonedImg.length > 0){
                    var pathId = $clonedImg.attr('clip-path').replace(/url\(['"]?#?(.*?)['"]?\)/, '$1');
                    $clonedClip.attr('id',pathId+'_'+count);
                    $clonedImg.attr('clip-path','url(#'+pathId+'_'+count+')');
                    count++;
                };
            });
        });
        $photoList.slick($photoSlkOpt);

        // scroll animation
        var $sect = $('.scroll_animation'),
            scrollY = window.innerHeight*.4;

        $window.on('load scroll',function(){
            $sect.each(function(){
                var $aniEle = $(this).find('.animation_item'),
                    aniCount = $aniEle.length,
                    scrollY = window.innerHeight*.4,
                    eleTop = $(this)[0].getBoundingClientRect().y,
                    i = 0;

                if(eleTop < scrollY){
                    scrollAnimation($aniEle, i, aniCount);
                };
            });
        });

        function scrollAnimation($aniEle, i , max){
            setTimeout(function(){
                $aniEle.eq(i).addClass('active');
                i++;
                if(i < max){
                    scrollAnimation($aniEle, i , max);
                };
            },i*100);
        };
    });
})(window.jQuery);