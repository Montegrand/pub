window.addEventListener('DOMContentLoaded',()=>{

    let body = document.body,
        $header = document.querySelector('#header');


    // menu pc
    let $menu = $header.querySelector('.menu'),
        $menu1Items = $menu.querySelectorAll('.depth1_item');

    $menu1Items.forEach(($item)=>{
        $item.addEventListener('mousemove',(e)=>{
            if(window.innerWidth>1000) PcMenuActive($item);
        });
        $item.addEventListener('mouseleave',(e)=>{
            if(window.innerWidth>1000) PcMenuLeave($item);
        });
    });

    // sitemap
    let $sitemapOpen = $header.querySelector('.sitemap_open'),
        $sitemap = $header.querySelector('.sitemap'),
        $sitemapClose = $sitemap.querySelector('.sitemap_close');

    $sitemapOpen.addEventListener('click',()=>{
        $sitemap.classList.add('active');
    });

    $sitemapClose.addEventListener('click',()=>{
        $sitemap.classList.remove('active');
    });

    $sitemap.querySelectorAll('.depth2_text').forEach(($this)=>{
        $this.addEventListener('mousemove',()=>{
            if(window.innerWidth>1000) PcSitemapHover($this);
        });
        $this.addEventListener('mouseleave',()=>{
            if(window.innerWidth>1000) PcSitemapLeave($this);
        });
    });

    // manu mobile
    let $sitemapTxt = $sitemap.querySelectorAll('.depth_text');
    $sitemapTxt.forEach(($txt)=>{
        $txt.addEventListener('click',(e)=>{
            if(window.innerWidth < 641) MobileSitemapActive($txt, e)
        });
    });

    // quick fixed
    let $quick = document.querySelector('.quick');
    setTimeout(function(){
        QuickFixed($quick);
    });
    window.addEventListener('scroll',()=>{
        QuickFixed($quick);
    });
    window.addEventListener('resize',()=>{
        QuickFixed($quick);
    });

    // kakao
    let $kakao = $quick.querySelector('.kakao'),
        $kakaoOpen = $kakao.querySelector('.kakao_open'),
        $kakaoClose = $kakao.querySelector('.kakao_close');

    $kakaoOpen.addEventListener('click',e=>{
        $kakao.classList.add('active');
    });
    $kakaoClose.addEventListener('click',e=>{
        $kakao.classList.remove('active');
    });

    // totop
    $quick.querySelector('.totop button').addEventListener('click',e=>{
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    });

    // footerInfo
    let $footerInfoArr = document.querySelectorAll('#footer .footer_info .info_item');
    setTimeout(e=>{
        FooterInfoLine($footerInfoArr);
    });
    window.addEventListener('resize',e=>{
        FooterInfoLine($footerInfoArr);
    });
});

/**
 * pc menu hover
 * @param {Element} item depth1_item
 */
function PcMenuActive(item){
    let depth2 = item.querySelector('.depth2'),
        depth2List = depth2.querySelector('.depth2_list'),
        hei = depth2List.getBoundingClientRect().height;

    item.classList.add('active');
    depth2.style.height = hei+'px';
};

/**
 * pc menu leave
 * @param {Element} item depth1_item
 */
function PcMenuLeave(item){
    let depth2 = item.querySelector('.depth2');

    item.classList.remove('active');
    depth2.removeAttribute('style');
};

/**
 * @param {Element} $this depth2_text
 */
function PcSitemapHover($this){
    $this.closest('.depth1_item').classList.add('hover');
};

/**
 * @param {Element} $this depth2_text
 */
function PcSitemapLeave($this){
    $this.closest('.depth1_item').classList.remove('hover');
};

/**
 * @param {Element} $txt event target txt
 * @param {Event} e event
 */
function MobileSitemapActive($txt, e){
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

function OuterHeight(ele, chk = false) {
    const height = ele.getBoundingClientRect().height;

    if(chk){
        let style = window.getComputedStyle(ele),
            marginTop = parseFloat(style.marginTop),
            marginBottom = parseFloat(style.marginBottom);
        return height + marginTop + marginBottom;
    };
    return height;
};

/**
 * @param {Element} $quick .quick
 */
function QuickFixed($quick){
    let quickParentBounding = $quick.parentElement.getBoundingClientRect(),
        quickBottom = Math.floor(quickParentBounding.height + quickParentBounding.top - (window.innerHeight - 30)),
        minY = 30;

    $quick.style.bottom = (quickBottom>minY?quickBottom:minY)+'px';
};

/**
 * @param {NodeList} $infoList .footer_info .info_item
 */
function FooterInfoLine($infoList){
    var arr = [...$infoList];
    $infoList.forEach($item=>{
        $item.classList.remove('noline');
    });
    arr.reduce((a,b)=>{
        if(a.getBoundingClientRect().top !== b.getBoundingClientRect().top) a.classList.add('noline');
        return b;
    });
};
