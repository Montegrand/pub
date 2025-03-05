/* 지도 초기화 */
initialise('map', 37.5391091, 127.2146082, 8);

/** 지도 컨테이너 */
var gMapContainer;

/** 지도 */
var gMap;

/** 지도 POI 리스트 */
var gMapPois = {};

/** 지도 마커들 */
var gMarkers = [];

/** 지도 InfoWindows */
var gInfoWindow = null;

/** 지도 메타 데이터 */
var gMapAreas = [];

var gMapMetaData;

/** window 초기화 */
window.addEventListener('load', function(event){
    /** 지도 메타 데이터 */
    getMapMetaData();

    /** 지도 구역 조회 */
    // getMapAreas();

    /** 지도 구역 버튼들 표시 */
    // TODO

    /** 지도 POI 버튼들 표시 */
    // TODO

    /** Poi 버튼 이벤트 */
    /*
    $('.map-poi-btn').each(function(){
        $(this).click(function(){
            getMapPois($(this).data('map-poi-no'));
        });
    });
    */
});

/** 지도 초기화 */
function initialise(mapElementId, lat, lng, level){
    try {
        gMapContainer = document.getElementById(mapElementId);

        var mapOptions = {
            center: new kakao.maps.LatLng(lat, lng),
            level: level
        }

        gMap = new kakao.maps.Map(gMapContainer, mapOptions);

    } catch(error){
        console.log('지도 초기화 오류 : ', error);
    }
}

/** 지도 메타 데이터 조회 */
function getMapMetaData(){
    $.ajax({
        type: 'GET',
        url: './map/list_2.json', //임시 테스트 데이터
		// url: './clnsMapData.do',
        dataType: 'json',
        success: function(mapMetaDataResponse){
            gMapShelterData = mapMetaDataResponse.mapMetaData.mapShelter;
            drawMapShelterPanel(gMapShelterData);
        },
        error: function(error){
            console.log('getMapMetaData error : ', error);
        }
    });
};

function drawMapShelterPanel(gMapShelterData){
    try {
        const shelterData = gMapShelterData;
        var mapShelterChckBox = document.querySelectorAll('.category_list .mapShelterCheckbox'),
            shelter = document.querySelector('.shelter'),
            checkedItem = [];
        addShelterItem(shelterData, checkedItem);
        bound();
        mapShelterChckBox.forEach((ele,index)=>{
            ele.addEventListener('change',()=>{
                checkedItem = [];
                for(i=0;i<=mapShelterChckBox.length;i++){
                    if(mapShelterChckBox[i]?.checked){
                        checkedItem.push(mapShelterChckBox[i].value);
                    };
                };
                initialise('map', 37.5391091, 127.2146082, 8);
                addShelterItem(shelterData, checkedItem);
                bound();
            });
        });
        if(window.innerWidth < 1000){
            gMapContainer.addEventListener('click',()=>{
                $('.category_content').fadeOut(200).removeClass('active');
            })
        }
    } catch(error){
        console.log(error);
    }
}

function addShelterItem(shelterData, checkedItem) {
    var mapShelterPanelHtml = '';
    gMarkers = [];
    shelterData.map((data,index) => {
        if(checkedItem.length == 0 || checkedItem.includes(data.shelterCompNo)){
            var mapShelterCodeHtml = '<li class="shelter_item"><button type="button" class="shelter_button" data-key="'+data.shelterKey+'"><span class="shelter_sub">'+data.shelterCompName+'</span><span class="shelter_text">'+data.shelterName+'</span></button></li>';
            mapShelterPanelHtml = mapShelterPanelHtml + mapShelterCodeHtml;
            addMarker(data);
        }
    })
    $('.shelter_list').html(mapShelterPanelHtml);
    var shelterBtn = document.querySelectorAll('.shelter .shelter_button');

    shelterBtn.forEach((ele,index)=>{
        ele.addEventListener('click',()=>{
            marker.f.o.idle[index].object.o.click[0].Rf();
        })
    })
}

/** 마커추가 */
function addMarker(data){
    var marker = new kakao.maps.LatLng(data.shelterCoordinate.y, data.shelterCoordinate.x);
    /** 마커이미지 */
    var imgSrc = './images/shelter/map_pin.png',
        imgSize = new kakao.maps.Size(34, 40);
    var imgOpt = {
        offset: new kakao.maps.Point(17, 20),
        spriteOrigin: new kakao.maps.Point(40*(data.shelterCompNo - 1), 0),
        spriteSize: new kakao.maps.Size(555, 40),
    };
    var markerImg = new kakao.maps.MarkerImage(
        imgSrc,
        imgSize,
        imgOpt
    );
    gMarkers.push([marker, markerImg, data]);
}

function bound(){
    // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
    var bounds = new kakao.maps.LatLngBounds();

    for (i = 0; i < gMarkers.length; i++) {
        marker = new kakao.maps.Marker({
                position : gMarkers[i][0],
                image: gMarkers[i][1],
            });
        var overlayPosition = gMarkers[i][0];
        kakao.maps.event.addListener(marker, 'click', overlay(gMap, gMarkers[i][2], marker, overlayPosition));
        marker.setMap(gMap);
        bounds.extend(gMarkers[i][0]);
    }
    gMap.setBounds(bounds);
}

function overlay(gMap, data, marker, overlayPosition){
    return function(){
        if(gInfoWindow) gInfoWindow.close();
        var overlayContent = '<div class="overlay">' +
                            '\n   <div class="overlay_title type'+data.shelterCompNo+'">' +
                            '\n        <span>' + data.shelterName +'</span>' +
                            '\n    </div>' +
                            '\n        <div class="overlay_content">' +
                            '\n            <div class="overlay_inner">' +
                            '\n                <ul class="bu dl">' +
                            '\n                    <li>'+
                            '\n                        <span class="title">대피시설 명칭</span>'+
                            '\n                        <span class="text">' + data.shelterName + '</span>'+
                            '\n                    </li>'+
                            '\n                    <li>'+
                            '\n                        <span class="title">대피시설 주소</span>'+
                            '\n                        <span class="text">' + data.shelterAddress + '</span>'+
                            '\n                    </li>'+
                            '\n                    <li>'+
                            '\n                        <span class="title">건물용도</span>'+
                            '\n                        <span class="text">' + data.shelterLaneTypeName + '</span>'+
                            '\n                    </li>'+
                            '\n                </ul>'+
                            '\n                </div>' +
                            '\n         </div>' +
                            '\n    <button type="button" onclick="closeOverlay()" class="overlay_close">닫기</button>' +
                            '\n</div>';
        gInfoWindow = new kakao.maps.InfoWindow({position: overlayPosition, content: overlayContent});
        gInfoWindow.open(gMap, marker);
        if(window.innerWidth < 1000){
            var bounds = new kakao.maps.LatLngBounds();
            bounds.extend(overlayPosition);
            gMap.setBounds(bounds, 150, 0, 0, 0);
        }else{
            gMap.setCenter(overlayPosition);
        }
    }
}

function moveToCurrentPosition(){
    try {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                try {
                    gMap.setCenter(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude));
                } catch(error) {
                    console.log(error);
                }
            });
        }
    } catch(error){
        console.log(error);
    }
}

function closeOverlay(){
    gInfoWindow.close();
    bound();
}

/** 대피소 현황 */
function shelterCurrBtn(key){
    console.log((this).dataset.shelterKey)
}

/** 마커 z-index */
function highlightMarker(marker){
    marker.setZIndex(2);
}
function unhighlightMarker(marker){
    marker.setZIndex(1);
}

/** 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다 */
function zoomIn(){
    gMap.setLevel(gMap.getLevel() - 1);
}

/** 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다 */
function zoomOut(){
    gMap.setLevel(gMap.getLevel() + 1);
}

/** 지도 드래그 제어 */
// function setDraggable(draggable){
//     gMap.setDraggable(draggable);
// }
$('#switch').click(function(){
    var chk = $(this).is(':checked');
    gMap.setDraggable(chk);
});

/** 메뉴 */
$('.logo_anchor').on('click', function(){
    $('.mapAreaCheckbox').each(function(){
        if($(this).is(':checked')){
            $(this).trigger('click');
        }
    });
    $('.category_item').removeClass('active').children('.layer').slideUp(200);
    initialise('map', 37.5391091, 127.2146082, 8);
});
$(document).on('click', '.depth_item > .category_btn', function(){
    if ($(this).parent().hasClass('active')){
        $(this).siblings('.depth').stop().slideUp(200).parent().removeClass('active');
    } else {
        $(this).siblings('.depth').stop().slideDown(200).parent().addClass('active');
        $(this).parent().siblings('.category_item').removeClass('active').children('.layer').slideUp(200);
    }
    rMarkerArea();
});
$(document).on('click', '.category_close, .depth1_item:nth-child(n+2), .route_button', function(){
    $('.category_content').fadeOut(200).removeClass('active');
});
$(document).on('click', '.category_open', function(){
    $('.category_content').fadeIn(200).addClass('active');
});
