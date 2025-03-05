github 에 추가할 작업물들
================================================================================================
2022
  충북도청
    뉴스포털 메인
    통계정보 메인
    동물위생시험소 메인

2023
  하남
    주민대피시설 kakaomap api 키 수정 필요

  강릉
    솔향수목원 메인

  보은
    보은에살다 메인

  충북대
    발전기금재단 메인 서브
    학사일정
    캠퍼스맵 영문 - 국문 카카오맵 대신 구글맵으로 바꿔서 적용

2024
  청주
    문화관광
      메인, 서브
    열린시장실
      메인, 서브
      공약추진현황

================================================================================================



권한부여
[root@DH-WAS home] chown -R {username}:{usergroup} {dir}

요소 너비 변경시 이벤트 등록
$.fn.eleResize = function(callback){
    this.each(function(){
        var $this = $(this),
            prevWid = $this.width();

        $(window).on('resize', chkSize);

        if(typeof callback === 'function') $this.on('eleResize',callback);

        function chkSize(){
            var newWid = $this.width();
            if(prevWid===newWid) return;
            prevWid = newWid;
            $this.trigger('eleResize');
        };

        chkSize();
    });
    return this;
};

<!-- 컨텐츠 불러오기 js -->
<div id="contents" class="cts@@{key}">
    <script>
        if (location.search != '') {
            var params = new URLSearchParams(location.search);
            var menukey = params.get('key'),
                menuid = params.get('id');
            if(!menuid) menuid = window.location.pathname.match(/\/site\/(.*)\//)[1];
            var contents = document.getElementById('contents');
            contents.className = 'page' + menukey;
            var url = location.origin+'/repository/'+menuid+'/contents/'+menukey+'.html';

            async function fetchHtmlAsText(url){
                return await (await fetch(url)).text();
            };

            fetchHtmlAsText(url).then((res)=>{
                let resBody = new DOMParser().parseFromString(res,"text/html").body,
                    resContents = [...resBody.childNodes].map(node=>node.cloneNode(true));

                document.querySelector('#contents > script').remove();
                contents.append(...resContents);
                if(resBody.querySelector('script')){
                    let script = resBody.querySelectorAll('script');
                    script.forEach(function(v,n){
                        let js = document.createElement('script');
                        if(v.src) js.src = v.src;
                        if(v.innerHTML) js.innerHTML = v.innerHTML;
                        contents.append(js);
                        v.remove();
                    });
                };
            });
        };
    </script>
</div>

<!--컨텐츠 불러오기 Jquery -->
<div id="contents" class="cts@@{key}">
    <script charset="UTF-8">
        $(function () {
            function getParameterByName(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }

            var menukey = getParameterByName('key'),
                menuid = getParameterByName('id'),
                url = '/repository/'+ menuid +'/contents/' + menukey + '.html';
            $.ajax({
                url: '/repository/'+ menuid +'/contents/' + menukey + '.html',
                success: function (data) {
                    $('#contents').attr('class', 'page' + menukey).append(data);
                },
                error: function(data){
                    $('#contents').html('').append($(data.responseText).text()).css('white-space','pre-line');
                },
            });

        });
    </script>
</div>

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

add window eventlistener

vanilla
window.addEventListener('load resize', function() {
    var screenWidth = window.innerWidth;
    if(/* 조건식*/) {
      if(window.mode != 'wide'){ /* 사이즈 별 추가하려는 모드명 */
        var event = new Event('screen:wide');
        window.dispatchEvent(event);
      }
    }else if(/* 조건식*/){
      if(window.mode != 'web'){ /* 사이즈 별 추가하려는 모드명 */
        var event = new Event('screen:web');
        window.dispatchEvent(event);
      }
    }
});

jQuery
(function($) {
  'use strict';

  var $window =  $(window),
      $html = $('html');

  // $window add event screen
  $window.on('load resize',function(){
      if(window.innerWidth > 1500){
          if(window.mode != 'wide'){
              window.mode = 'wide';
              $window.trigger('screen:wide');
          };
      }else if(window.innerWidth > 1000){
          if(window.mode != 'web'){
              window.mode = 'web';
              $window.trigger('screen:web');
          };
      }else if(window.innerWidth > 640){
          if(window.mode != 'tablet'){
              window.mode = 'tablet';
              $window.trigger('screen:tablet');
          };
      }else if(window.innerWidth < 641){
          if(window.mode != 'phone'){
              window.mode = 'phone';
              $window.trigger('screen:phone');
          };
      };
  });
  $(function(){

  });
})(window.jQuery);

<!-- 카카오지도 새로고침 - html 태그로 가져온 경우 -->
// daum.roughmap.instances 객체의 키 목록 추출
const instanceKeys = Object.keys(daum.roughmap.instances);

// 추출한 키 목록을 반복하여 각 키에 대한 값을 가져와서 작업 수행
function mapReload(instanceKeys){
    if(instanceKeys.length <= 0) return false;
    instanceKeys.forEach(key => {
        const value = daum.roughmap.instances[key];
        const ele = value.root;
        const opt = value.params;
        delete daum.roughmap.instances[key];
        ele.innerHTML = '';
        new daum.roughmap.Lander(opt).render();
    });
}

mapReload(instanceKeys);

<!-- //카카오지도 새로고침 - html 태그로 가져온 경우 -->

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;

    if (keysPressed['Control'] && event.key == 'a') {
        alert(event.key);
    }
 });
document.addEventListener('keyup', (e) => {
    delete this.keysPressed[e.key];
});
$(document).keydown(function (e) {
    keysPressed[e.which] = true;
});

팝업 포커스

// 팝업시 body 에 overflow:hidden 으로 스크롤 막기 가능

var focusElements = pPopup.querySelectorAll('button, input, select, textarea, a');
focusElements.forEach((ele,index)=>{
    ele.setAttribute('tabindex',index);
    ele.addEventListener('keydown',handleTabKey)
})
function handleTabKey(event){
    if (event.key === 'Tab') {
        event.preventDefault();
        const shiftKey = event.shiftKey;
        const lastIndex = focusElements.length-1;
        var tabindex = Number(event.target.getAttribute('tabindex'));
        if(tabindex==0&&shiftKey) focusElements[lastIndex].focus();
        if(tabindex==lastIndex&&!shiftKey) focusElements[0].focus();
        if(shiftKey&&tabindex!=0)focusElements[tabindex-1].focus();
        if(!shiftKey&&tabindex!=lastIndex) focusElements[tabindex+1].focus();
    };
};

특정 문자로 시작하는 정규식
/\b[wW]\w+/g

//step_desc 높이값
var $descHeightArray = $stepDesc.map(function () {
    return $(this).height();
}).get();

//step_desc 최대 높이값
var $descMaxHeight = Math.max(...$descHeightArray);
$stepDesc.height($descMaxHeight);


progressbar 예시

var popupProgressInterval;

$popupList.on('init',function(event, slick, currentSlide, nextSlide){
    $popupTotal.text(slick.$slides.length);
    if(slick.$slides.length < 2){
        $popupAuto.text('재생').addClass('slick-play');
    }else{
        $popupAuto.text('정지').addClass('slick-pause');
    }
}).on('beforeChange',function(){
    $popupAuto.off('click');
    clearInterval(popupProgressInterval);
    $popupProgressbar.removeAttr('style');
    $popupProgress = 0;
}).on('init reInit afterChange',function(event, slick, currentSlide, nextSlide){
    var current = (currentSlide?currentSlide:0) + 1;
    $popupCurrent.text(current);
    clearInterval(popupProgressInterval);
    $popupProgressbar.removeAttr('style');
    $popupProgress = 0;
    if(slick.$slides.length < 2) return false;
    popupProgressInterval = setInterval(popupProgress, 10);
    $popupAuto.on('click',function(){
        $popupPause = !$popupPause;
        if($popupPause){
            $(this).text('재생').removeClass('slick-pause').addClass('slick-play');
        }else{
            $(this).text('정지').removeClass('slick-play').addClass('slick-pause');
        };
    });
});
$popupList.slick($popupSlkOtp);

function popupProgress(){
    if($popupPause) return false;
    $popupProgress = $popupProgress + 1/$popupSlkTime;
    $popupProgressbar.css('width',$popupProgress+'%');
    if($popupProgress >= 100){
        clearInterval(popupProgressInterval);
        $popupProgressbar.removeAttr('style');
        $popupList.slick('slickNext');
        return $popupProgress = 0;
    };
};

슬릭 옵션
{
  rows: 1,             //몇 줄로 나타낼건지
  infinite: true,      //무한반복 (boolean) -default:true
  slidesToShow: 4,     //한번에 보여지는 갯수
  slidesToScroll: 4,   //한번에 넘겨지는 갯수
  slidesPerRow: 1,     //보여질 행의 수 (한 줄, 두 줄 ... )
  autoplay: true,      //자동시작 (boolean) -default:false
  autoplaySpeed: 2000, //자동넘기기 시간(int, 1000ms = 1초)
  dots: false,         //네비게이션버튼 (boolean) -default:false
  appendDots: $('#dots'), //네비게이션버튼 변경 (선택자 혹은 $(element))
  dotsClass: 'custom-dots', //네비게이션버튼 클래스 변경
  variableWidth: true, //width의 크기가 다를때 (boolean) -default:false
  draggable: false,    //리스트 드래그 가능여부 (boolean) -default:true
  arrows: true,        //화살표(넘기기버튼) 여부 (boolean) -default:true
  pauseOnFocus: true,  //마우스 포커스 시 슬라이드 멈춤 -default:true
  pauseOnHover: true,  //마우스 호버 시 슬라이드 멈춤 -default:true
  pauseOnDotsHover: true,  //네이게이션버튼 호버 시 슬라이드 멈춤 -default:false
  vertical: true,      //세로방향 여부 (boolean) -default:false
  verticalSwiping: true,     //세로방향 스와이프 여부 (boolean) -default:false
  accessibility: true, //접근성 여부 (boolean) -default:true
  appendArrows: $('#arrows'), // 좌우 화살표 변경 (선택자 혹은 $(element))
  prevArrow: $('#prevArrow'), // 좌 (이전) 화살표만 변경 (선택자 혹은 $(element))
  nextArrow: $('#nextArrow'), // 우 (다음) 화살표만 변경 (선택자 혹은 $(element))
  autoArrow: $('#visualAuto'),  //  재생, 정지버튼; 회사 커스텀에서만
  playText : '재생',
  pauseText : '정지',
  initialSlide: 1,     //처음 보여질 슬라이드 번호 -default: 0
  centerMode: true,    //중앙에 슬라이드가 보여지는 모드 -default:false
  centerPadding: '60px',  //중앙에 슬라이드가 보여지는 모드에서 padding값
  fade: true,          //fade 효과 -default:false
  speed: 2000,         //모션 시간 (1000 = 1초)
  waitForAnimate: true, //애니메이션 중에는 동작을 제한함 -default:true
  rtl: true,          //slider 방향을 오른쪽에서 왼쪽으로 변경 -default:false
  swipeToSlide: true,  // draggable
  touchThreshold: 100,
  responsive: [
      {
          breakpoint: 1024,   //width 1024 이상부터
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3
          }
      },
      {
          breakpoint: 480,   //width 480 이상부터
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2
          }
      }
  ] //반응형, breakpoint: 반응형 구간, settings: 반응형 구간에 따른 설정 변경
}


$({슬릭}).on('afterChange',function(){
    슬릭 후 이벤트
})
$SlideList.on('init reInit afterChange',function(event, slick, currentSlide, nextSlide){
    var current = (currentSlide ? currentSlide : 0) + 1;
    current==1 ? $prev.addClass('first') : $prev.removeClass('first');
    current==slick.slideCount ? $next.addClass('last') : $next.removeClass('last');
});

/** 슬릭 너비 다를때 포지션 잡기 */



/** 프린트 버튼 클릭 시 이벤트 */
function contentsprint(){
	var $contents = $('#contents'),
		ContentsClass = $contents.attr('class');
	var $head = $('head').clone();
	var $contentsClone = $('#contents').clone();    // 프린트 할 특정 영역 복사

	var headHtml = $head[0].innerHTML;
	var innerHtml = $contentsClone[0].innerHTML;
	var popupWindow = window.open("", "_blank", "width=910,height=800");
	popupWindow.document.write('<!DOCTYPE html>'+
	  '<html>'+
		'<head>'+headHtml+'</head>'+
		'<body><div id="contents" class="'+ContentsClass+'">'+innerHtml+'</div></body>'+
	  '</html>')

	popupWindow.document.close();
	popupWindow.focus();

	setTimeout(function(){
		popupWindow.print();         // 팝업의 프린트 도구 시작
		popupWindow.close();       // 프린트 도구 닫혔을 경우 팝업 닫기
	}, 3000);
}

// 클릭한 요소 복사
$('[data-copy="yes"]').on('click',function(event){
    copyEle(this);
});

async function copyEle(element){
    let html = element.outerHTML.toString().replace(/\s*data-copy="yes"\s*/,'');
    return await navigator.clipboard.writeText(html);
};

<script>
    $(function(){
        var $investChart = document.getElementById('investChart');

        //연차별 투자소요 - 값의 수정이 필요할 때 아래 배열의 수를 수정해주세요.
        var investValArr = [446800, 73221, 136486, 104563];

        investValArr = investValArr.reduce(function(a,b){
            var lastEnd = a[a.length - 1][1];
            a.push([lastEnd, lastEnd + b]);
            return a;
        },[[0, 0]]);
        investValArr.push(investValArr.shift());

        // 차트 데이터
        var investData = {
                labels: ['기확보(~2024)','2024','2025','2026','연차별'],
                datasets: [
                    {
                        label: '투자 소요',
                        data: investValArr,
                        backgroundColor: '#2885ee',
                        barPercentage: 0.7,
                    },
                ],
            };

        // 차트 설정
        Chart.plugins.register({
            afterDraw: function(chart) {
                var ctx = chart.ctx;
                ctx.save();

                // 차트의 너비를 확인
                var chartWidth = chart.width;

                // 사각형의 좌표와 크기 설정
                var x = chart.chartArea.right - 80,
                    y = chart.chartArea.bottom + 1,
                    width = 80,
                    height = 40,
                    radius = 15;

                if(chartWidth < 500){
                    x = chart.chartArea.right - 60;
                    y = chart.chartArea.bottom + 1;
                    width = 60;
                    height = 30;
                    radius = 8;
                }

                // 둥근 하단 모서리 사각형 그리기
                ctx.beginPath();
                ctx.moveTo(x, y); // 좌측 상단
                ctx.lineTo(x + width, y); // 우측 상단 직선
                ctx.lineTo(x + width, y + height - radius); // 우측 하단 둥근 모서리 전까지
                ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius); // 우측 하단 둥글기
                ctx.lineTo(x + radius, y + height); // 좌측 하단 둥근 모서리 전까지
                ctx.arcTo(x, y + height, x, y + height - radius, radius); // 좌측 하단 둥글기
                ctx.lineTo(x, y); // 좌측 상단으로 연결
                ctx.closePath();

                ctx.fillStyle = '#d0e6ff';
                if(chartWidth>300) ctx.fill();

                // 텍스트 추가
                var text = '연차별';
                ctx.fillStyle = '#103e89';
                ctx.font = '500 16px SCoreDream';
                if(chartWidth < 500) ctx.font = '500 14px SCoreDream';

                // 텍스트 너비 계산
                var textWidth = ctx.measureText(text).width;

                // 텍스트의 좌표를 사각형의 중앙에 맞춤
                var textX = x + (width - textWidth) / 2;
                var textY = y + (height / 2);

                if(chartWidth>300) ctx.fillText(text, textX, textY);

                var unitTxt = '단위 : 백만원';
                ctx.fillStyle = '#4d4d4d';
                ctx.font = '400 14px SCoreDream';
                var unitTxtWidth = ctx.measureText(unitTxt).width;
                if(chartWidth>300) ctx.fillText(unitTxt, chart.chartArea.right - unitTxtWidth, chart.chartArea.top - 30);

                var yAxis = chart.scales['y-axis-0']; // y축 스케일 가져오기 (2.9.4에서는 기본적으로 y-axis-0)

                // 맨 아래 그리드 라인 그리기
                var yBottom = yAxis.getPixelForValue(yAxis.min); // y축의 최소값 위치 픽셀 좌표
                ctx.strokeStyle = '#103e89'; // 파란색
                ctx.lineWidth = 2; // 굵기 설정
                ctx.beginPath();
                ctx.moveTo(chart.chartArea.left - 10, yBottom);
                ctx.lineTo(chart.chartArea.right, yBottom);
                ctx.stroke();

                ctx.restore();
            }
        });
        var investChartConfig = {
            type: 'bar',
            data: investData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                annotationTextVisible: true,
                layout: {
                    padding: {
                        top: 30,
                        bottom: 10,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    label: {
                        display: false
                    },
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                callback: function(value) {
                                    return value.toLocaleString();
                                },
                                fontFamily:'SCoreDream',
                                fontColor: '#4d4d4d',
                                fontSize: 14,
                                fontStyle: '400',
                                padding: window.innerWidth>640?35:0,
                                display: window.innerWidth>640?true:false,
                            },
                            gridLines: {
                                display: true,
                                drawBorder: false,
                            },

                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: false,
                            },
                            ticks: {
                                callback: function(val,i){
                                    if(i===4) return;
                                    return val;
                                },
                                fontFamily:'SCroeDream',
                                fontColor:'#4d4d4d',
                                fontSize: window.innerWidth>640?16:13,
                                fontStyle: '400',
                            },
                            gridLines: {
                                display: false
                            }

                        }
                    ]
                },
                animation: {
                    onComplete: function() {
                        if(investChart.tooltip._view.opacity) return;
                        var chartInstance = this.chart;
                        var ctx = chartInstance.ctx;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function(dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function(bar, index) {
                                if(index==meta.data.length-1) return;
                                var data = (dataset.data[index][1]-dataset.data[index][0]).toLocaleString();
                                ctx.fillStyle = '#2885ee';
                                ctx.font = window.innerWidth>640?'500 14px SCoreDream':'500 12px SCoreDream';
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                }
            },
        };

        investChart = new Chart($investChart,investChartConfig);
        window.addEventListener('resize',function(){
            investChart.options.scales.yAxes[0].ticks.display = window.innerWidth>640?true:false;
            investChart.options.scales.yAxes[0].ticks.padding = window.innerWidth>640?35:0;
            investChart.options.scales.xAxes[0].ticks.fontSize = window.innerWidth>640?16:13;
            investChart.update();
        });

    });
</script>


=========================================================================================================================================
NOTE
max-height, overflow:auto 할 때 고정 줄간격 사용시 버그 !!line-height:normal 사용

html{-webkit-text-size-adjust: 100%;} 아이폰 폰트 자동 조정 끄고 싶을때 사용

=========================================================================================================================================