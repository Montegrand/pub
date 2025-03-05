(function ($) {
	'use strict';

	$(function () {
		var $window = $(window),
				$container = $('#container');

        // stat

        var $stat = $container.find('.stat'),
            $stat_btn = $stat.find('button'),
            $stat_tab = $stat.find('button, .stat_pannel');

        $stat_btn.on('click',function(){
            if(!$(this).hasClass('active')){
                var num = $(this).attr('class');
                $stat_tab.removeClass('active');
                $stat.find('.'+num).addClass('active');
            }
        })

        // today

        function today() {
            var $today_list = $('.today_list'),
                $today_item = $today_list.find('.today_item');
            var maxLength = $today_list.innerWidth() + 39,
                length = 0;
            $today_item.removeClass('pr0');
            $today_item.each(function (n, v) {
                length += $(v).innerWidth();
                if (maxLength < length + $(v).next().innerWidth()) {
                    length = 0;
                    $(v).addClass('pr0');
                };
                if (n == $today_item.length - 1) {
                    $(v).addClass('pr0');
                };
            });
        }
        $(window).on('resize', function () {
            today();
        })
        $(window).on('load',function(){
            today();
        })

        // section scroll
        
        var $fade = $container.find('.fade'),
            $shortcut_fade = $container.find('.shortcut .fade');
        
        function scroll(){
            $window.on({
                scroll: function(){
                $fade.each(function(n,v){
                    var y = $(v).offset().top + ($(v).height()/3)*2;
                    var winY = y - ($window.scrollTop() + innerHeight);
                    if(winY<0){$(v).removeClass('out')}else{$(v).addClass('out')};
                },{resize: function(){
                    if(innerWidth>1000){
                        $fade.addClass('out');
                    }
                }});
            }});
            $shortcut_fade.find('a').on({
                transitionstart: function(){
                    if($(this).closest('li').hasClass('out')){
                        $(this).closest('li').css({'overflow':'hidden'});
                    }
                },
                transitionend: function(){
                    if(!$(this).closest('li').hasClass('out')){
                        $(this).closest('li').css({'overflow':'visible'});
                    }
                }
            })
        };
        scroll();
	});
})(jQuery);