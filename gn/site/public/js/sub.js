(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $container = $('#container');

        // share
        var $share = $container.find('.addons .share'),
            $shareBtn = $share.find('.share_toggle');

            $shareBtn.on('click',function(){
                var chk = $share.hasClass('active');
                if(chk){
                    $share.removeClass('active');
                    $(this).attr('title','sns 공유 열기');
                }else{
                    $share.addClass('active');
                    $(this).attr('title','sns 공유 닫기');
                }
            })



    });
})(window.jQuery);
