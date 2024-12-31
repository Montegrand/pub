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

    let $item = $txt.parentElement,
        $list = $item.parentElement,
        $depth = $list.parentElement;

    if($item.classList.contains('active')){
        $item.classList.remove('active');
        $item.querySelectorAll('.depth_item').forEach(item=>{
            item.classList.remove('active');
        });
    }else{
        for(let item of [...$list.children]){
            if(item === $item) continue;
            item.classList.remove('active');
            item.querySelectorAll('.depth_item').forEach(ele=>{
                ele.classList.remove('active');
            });
        };
        $item.classList.add('active');
    };
    HeiSort();
    function HeiSort(){
        $depth.removeAttribute('style');
        $depth.closest('.depth1').querySelectorAll('.depth').forEach($depth=>{
            $depth.removeAttribute('style');
        });
        while($depth.classList.contains('depth')){
            let hei = 0;

            for(let $item of [...$wrap.querySelectorAll('.depth_item')]){
                var itemStyle = window.getComputedStyle($item);
                var txtStyle = window.getComputedStyle($item.firstElementChild);
                if($item.parentElement.closest('.depth_item').classList.contains('active')){
                    hei = hei + parseInt(itemStyle.marginTop) + parseInt(itemStyle.marginBottom);
                    hei = hei + parseInt(txtStyle.height);
                };
            };
            if($item.classList.contains('active')) $wrap.style.height = hei+'px';
            else $wrap.removeAttribute('style');
            $wrap = $depth;
            $item = $depth.parentElement;
            $list = $item.parentElement;
            $depth = $list.parentElement;
        };
    };
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