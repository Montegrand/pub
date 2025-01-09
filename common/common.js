// addEventListener 확장
(function(){

    // add event element resize
    const resizeObsv = new ResizeObserver((entries)=>{
        entries.forEach((entry)=>{
            entry.target.dispatchEvent((new Event('eleResize')));
        });
    });
    const originalAddEventListener = Element.prototype.addEventListener;

    Element.prototype.addEventListener = function(type, listener, options){
        if(type === 'eleResize'){
            if(!this.dataset.resizeObserved){
                resizeObsv.observe(this);
                this.dataset.resizeObserved = true;
            };
        };
        originalAddEventListener.call(this, type, listener, options);
    };

    /** 
     * set window mode
     */
    function SetWindowMode(){
        const winWidth = window.innerWidth;
        switch (true){
            case winWidth < 641:
                window.mode = 'mobile';
                break;

            case winWidth < 1001:
                window.mode = 'tablet';
                break;

            case winWidth < 1301:
                window.mode = 'pc'
                break;

            default :
                window.mode = 'wide';
        };
    };
    window.addEventListener('resize',updateWindowMode);

    
})();


/**
 * 모바일에서 메뉴 클릭시 .active로 판별하여 높이 재정렬
 * .depth>.depth_list>.depth_item>(.depth_text+.depth>.depth_list>...)
 * 
 * 몇번째 깊이까지 적용할지 파라미터 및 구현 추가 예정 예시) 마지막 파라미터(type Number)에 따라 depth n 아래까지만 적용 가능하게
 * 
 * @param {Element} $txt event target txt
 * @param {Event} e event
 */
function MobileMenuActive($txt, e, depth=false){
    let $wrap = $txt.nextElementSibling;

    if($wrap) e.preventDefault();
    else return;

    let $depth1 = $txt.closest('.depth1'),
        $depthListItems = $depth1.querySelectorAll('.depth, .depth_list, .depth_item'),
        $depthArr = Array.from($depth1.querySelectorAll('.depth')).reverse(),
        $itemArr = $depth1.querySelectorAll('.depth_item');

    let $item = $txt.parentElement,
        $list = $item.parentElement;

    $depthArr.forEach($depth=>{
        $depth.fromHei = $depth.offsetHeight;
    });

    $depthListItems.forEach($ele=>{
        $ele.style.transition = 'none';
    });

    $itemArr.forEach($item=>{
        $item.from = $item.classList.contains('active');
    });

    if($item.classList.contains('active')){
        $item.classList.remove('active');
        $item.to = false;
        $item.querySelectorAll('.depth_item').forEach(item=>{
            if(!item.classList.contains('active')) return;
            item.classList.remove('active');
            item.to = false;
        });
    }else{
        [...$list.children].forEach(item=>{
            if(item === $item) return;
            if(!item.classList.contains('active')) return;
            item.classList.remove('active');
            item.to = false;
            item.querySelectorAll('.depth_item').forEach(ele=>{
                if(!ele.classList.contains('active')) return;
                ele.classList.remove('active');
                ele.to = false;
            });
        });
        $item.classList.add('active');
        $item.to = true;
    };

    $depthArr.forEach($depth=>{
        $depth.style.height = 'auto';
        if($depth.parentElement.to){
            $depth.toHei = $depth.firstElementChild.offsetHeight;
        }else{
            $depth.toHei = 0;
            $depth.style.height = 0;
        };
    });
    $depthArr.forEach($depth=>{
        $depth.style.height = $depth.fromHei+'px';
    });
    $itemArr.forEach($item=>{
        if($item.from) $item.classList.add('active');
        else $item.classList.remove('active');
    });

    setTimeout(()=>{
        $depthListItems.forEach($ele=>{
            $ele.removeAttribute('style');
        });
        $depthArr.forEach($depth=>{
            $depth.style.height = $depth.fromHei+'px';
        });
        setTimeout(()=>{
            $itemArr.forEach($item=>{
                if($item.to) $item.classList.add('active');
                else $item.classList.remove('active');
            });
            $depthArr.forEach($depth=>{
                $depth.style.height = $depth.toHei + 'px';
            });
        });
    });
};
