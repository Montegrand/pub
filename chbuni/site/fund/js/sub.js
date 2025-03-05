(function($){
    'use strict';

    $(function(){

        var $html = $('html'),
            $window = $(window),
            $document = $(document),
            $header = $document.find('#header'),
            $container = $document.find('#container');

        // header height
        $header.removeAttr('style');
        if(window.innerWidth>1000) $header.innerHeight($container.innerHeight());
        $window.on('resize',function(){
            $header.removeAttr('style');
            if(window.innerWidth>1000) $header.innerHeight($container.innerHeight());
        });

        // depth2 overflow
        $header.find('.depth2').each(function(){
            if($(this).offset().top+$(this).outerHeight > $header.height()){
                var $top = $header.height() - $(this).offset().top+$(this).outerHeight + 50 + 'px';
            };
        });

        // accordion 시 높이 추가
        $('.temp_accordion .accordion_item button.accordion_btn').on('click',function(){
            var count = 0;
            accordConHei(count, $container.innerHeight());
        });
        function accordConHei(count, preHei){
            if(count > 100) return;
            setTimeout(function(){
                $header.removeAttr('style');
                if(window.innerWidth>1000) $header.innerHeight(preHei);
                if(preHei == $container.innerHeight()) count++;
                accordConHei(count, $container.innerHeight());
            },10);
        };

        //lnb
        var $lnb = $header.find('.lnb'),
            $lnbDepthItem = $lnb.find('.depth_item'),
            $lnbMenu = $lnb.find('.menu');

        $header[0].style.setProperty('--depth2width', 0+'px');

        $lnbDepthItem.off('mouseover focusin click').on('click', function(event) {
            if (mode === 'pc') {
                var $this = $(this),
                    $depth1Itme = ($this.hasClass('depth1_item')) ? $this : $this.closest('.depth1_item'),
                    $depth2 = $depth1Itme.find('.depth2'),
                    $depth2item = $depth1Itme.find('.depth2_item'),
                    $depthText = $depth1Itme.find('.depth_text'),
                    maxWidth;

                $lnbDepthItem.find('.depth2_item').removeAttr('style').find('.depth_text').removeAttr('style');
                maxWidth = $depth2.length>0?Math.max.apply(null, $depth2item.map(function(){return $(this).outerWidth()}).get()):0;
                $html.addClass('lnb_open');
                // $lnbDepthItem.removeClass('active');
                $this.addClass('active').parents('li').addClass('active');
                $header[0].style.setProperty('--depth2width', 180+'px');
                $depth2.css('width',180+'px');
                if($depth2.length>0){
                    if($depth2.offset().top + $depth2.innerHeight() > $header.height()){
                        var $top = $header.height() - ($depth2.offset().top + $depth2.innerHeight()) + 'px';
                        $depth2.css('top', $top);
                    };
                };
                $depth2item.css('display','block');
                $depthText.css('display','block');
            };

            event.stopPropagation();

        }).on('click', function(event) {
            if (mode === 'mobile') {
                var $this = $(this)
                    , $depthText = $this.children('.depth_text')
                    , eventTarget = event.target;

                if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                    if ($this.hasClass('depth1_item')) {
                        if ($this.hasClass('active')) {
                            // $html.removeClass('lnb_open');
                        } else {
                            $html.addClass('lnb_open');
                        }
                    }

                    if ($this.children('.depth2').length) {
                        if ($lnbMenu.hasClass('multiple')) {
                            //모바일 2단 메뉴일때
                            $this.addClass('active').siblings('.depth_item').removeClass('active');
                        } else {
                            $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                        }
                        event.preventDefault();
                    }

                    if ($this.children('.depth3, .depth4, depth5').length) {
                        $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                        event.preventDefault();
                    }

                };
            };

            event.stopPropagation();
        }).each(function(index, element) {
            var $element = $(element);

            if ($element.children('.depth').length) {
                $element.addClass('has');
            };
        });

        $lnbMenu.off('mouseleave')
        $lnbMenu.on('mouseleave', function(event) {
            //mouseleave
            if (mode === 'pc') {
                $lnbMenu.height('');
                // $html.removeClass('lnb_open');
                // $lnbDepthItem.removeClass('active');
                $header[0].style.setProperty('--depth2width', '180px');
                $(this).find('.depth2').removeAttr('style').find('.depth2_item').removeAttr('style');
            }
        });


        //breadcrumbs
        var $breadcrumbs = $container.find('.breadcrumbs'),
            $breadcrumbsSelect = $breadcrumbs.find('.breadcrumbs_select');

        $breadcrumbsSelect.on('click', function(e){
            var $this = $(this);

            event.preventDefault();

            if (mode === 'pc') {
                $this.parent().removeClass('active');
                $this.parent().end().next().hide();
            }
        });

    });
})(window.jQuery);