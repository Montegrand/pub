function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * @param {Jquery} $calendar .program.schedule.calendar Jquery
 * @param {Number} years 표시할 달력의 연도
 * @param {Number} month 표시할 달력의 월
 * @param {Array} month 스케쥴 데이터
 * @returns 달력 불러오기
 */
function CalCalendar($calendar, years, month, data){

    var calendar = $calendar.find('.schedule_calendar')[0],
        $prevYearsBtn = $calendar.find('.schedule_years .years_prev'),
        $nextYearsBtn = $calendar.find('.schedule_years .years_next'),
        $currentYears = $calendar.find('.schedule_years .years_current'),
        $calendarMonthBtns = $calendar.find('.schedule_month ul a'),
        $calInfo = $calendar.find('.schedule_info'),
        key = getParameterByName('key'),
        schdulSeNo = getParameterByName('schdulSeNo'),
        data = data.sort(function(a,b){
            return new Date(a.scdStart) - new Date(b.scdStart);
        });

    calendar.innerHTML = '';

    var today = new Date(),
        activeCal = new Date(years, month, 1),
        years = activeCal.getFullYear(),
        month = activeCal.getMonth(),
        fullDate = new Date(years,month+1,0).getDate(),
        fullWeek = Math.ceil((fullDate+activeCal.getDay())/7),
        prevEmptyDate = activeCal.getDay(),
        date = 1-prevEmptyDate;

    today.setHours(0,0,0,0);
    var tableUnit = document.createElement('span'),
        todayAnc = document.createElement('a'),
        table = document.createElement('table'),
        cap = document.createElement('caption'),
        colg = document.createElement('colgroup'),
        thead = document.createElement('thead'),
        tbody = document.createElement('tbody');

    tableUnit.className = 'cal_month';
    tableUnit.innerText = (month+1)+'월';

    todayAnc.innerText = '오늘 일정';
    todayAnc.className = 'call_today';
    todayAnc.setAttribute('title','금일 달력 불러오기');
    // todayAnc.href = './selectWebSchdulCalendar.do?key='+key+'&schdulSeNo='+schdulSeNo;

    cap.innerText = years+'년도 '+(month+1)+'월 학사일정 - 요일별 정보 제공';

    var cols = '<col />'+
               '<col />'+
               '<col />'+
               '<col />'+
               '<col />'+
               '<col />'+
               '<col />';
    colg.innerHTML = cols;

    var days = '<tr>'+
               '    <th class="cal_headDay">SUN</th>'+
               '    <th class="cal_headDay">MON</th>'+
               '    <th class="cal_headDay">TUE</th>'+
               '    <th class="cal_headDay">WED</th>'+
               '    <th class="cal_headDay">THU</th>'+
               '    <th class="cal_headDay">FRI</th>'+
               '    <th class="cal_headDay">SAT</th>'+
               '</tr>';
    thead.innerHTML = days;

    for(i=0;i<fullWeek;i++){
        var tr = document.createElement('tr'),
            td = document.createElement('td');

        var dayTable = document.createElement('table'),
            dayColg = document.createElement('colgroup'),
            dayThead = document.createElement('thead'),
            dayTbody = document.createElement('tbody'),
            topTr = document.createElement('tr'),
            weekStartDate, weekEndDate;

        dayTable.className = 'cal_day';
        dayColg.innerHTML = cols;
        tr.className = 'cal_week';
        topTr.className = 'cal_day_head';
        td.setAttribute('colspan','7');

        for(j=0;j<7;j++){
            var dayTh = document.createElement('th'),
                dayTd = document.createElement('td'),
                dateBtn = document.createElement('button');

            (function(currentDate){
                dateBtn.innerText = (currentDate.toString().length<2?'0':0)+currentDate;
                dateBtn.className = 'date';
                dateBtn.addEventListener('click', function(){
                    CallSchedule($calInfo[0],years,month,currentDate,data);
                });
            })(date);

            if(date>0&&date<=fullDate) dayTh.append(dateBtn);
            if(today.getTime() == new Date(years,month,date).getTime() && today.getTime() > new Date(years,month,1).getTime()){
                dateBtn.classList.add('today');
                CallSchedule($calInfo[0],years,month,date,data);
            };
            if(j==0) weekStartDate = new Date(years,month,date);
            weekEndDate = new Date(years,month,date);
            topTr.appendChild(dayTh);
            date++;
        };

        dayThead.append(topTr);

        var activeEvent = data.filter(function(val){
                var startDate = new Date(val.scdStart),
                    endDate = new Date(val.scdEnd);

                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);

                return startDate <= weekEndDate && endDate >= weekStartDate;
            });

        while(activeEvent.length > 0) {
            var botTr = document.createElement('tr');
            botTr.className = 'cal_day_body';

            for(var j=0;j<7;j++) {
                var dayTd = document.createElement('td'),
                    daySpan = document.createElement('span'),
                    daySpanTxt = document.createElement('span');
                daySpan.className = 'info_sub';

                var activeEventIndex = activeEvent.findIndex(function(event) {
                    return new Date(event.scdStart) < weekStartDate;
                });

                if(activeEventIndex === -1) {
                    activeEventIndex = activeEvent.findIndex(function(event) {
                        return new Date(event.scdStart).getDay() == j;
                    });
                };
                if(activeEventIndex !== -1) {
                    var foundEvent = activeEvent[activeEventIndex],
                        startDate = new Date(foundEvent.scdStart),
                        endDate = new Date(foundEvent.scdEnd),
                        weekStartDateTime = weekStartDate.getTime(),
                        weekEndDateTime = weekEndDate.getTime(),
                        eventLen;

                    startDate.setHours(0,0,0,0);
                    endDate.setHours(0,0,0,0);
                    startDate = startDate.getTime();
                    endDate = endDate.getTime();

                    if(startDate == endDate){
                        eventLen = 1;
                    }else{
                        if(weekStartDateTime>startDate && weekEndDateTime<endDate){
                            eventLen = 7;
                        }else if(weekStartDateTime>startDate && weekEndDateTime>=endDate){
                            eventLen = (endDate - weekStartDateTime)/(1000*60*60*24)+1;
                        }else if(weekEndDateTime<endDate&&weekStartDateTime<=startDate){
                            eventLen = (weekEndDateTime - startDate)/(1000*60*60*24)+1;
                        }else{
                            eventLen = (endDate - startDate)/(1000*60*60*24)+1;
                        };
                    };

                    if(7-j<eventLen) continue;
                    dayTd.setAttribute('colspan', eventLen);
                    daySpanTxt.innerText = foundEvent.scdSub;
                    dayTd.appendChild(daySpan).appendChild(daySpanTxt);
                    activeEvent.splice(activeEventIndex, 1);
                    j = j + eventLen - 1;
                };
                botTr.append(dayTd);
            };
            dayTbody.append(botTr);
        };

        dayTable.append(dayColg,dayThead,dayTbody);
        tr.appendChild(td).appendChild(dayTable);
        tbody.appendChild(tr);
    };
    table.append(cap,colg,thead,tbody);
    calendar.append(tableUnit,todayAnc,table);
    $prevYearsBtn.text((years-1)+'년').attr('title',(years-1)+'년도 달력 이동');
    $nextYearsBtn.text((years+1)+'년').attr('title',(years+1)+'년도 달력 이동');
    $currentYears.text(years+'학년도');
    $calendarMonthBtns.closest('li').removeClass('active').eq(month).addClass('active');
    if($calInfo.text()=='') CallSchedule($calInfo[0],years,month,1,data);
};

/**
 * @param {Element} ele .schedule_info js Element
 * @param {Number} years
 * @param {Number} month
 * @param {Number} date
 * @returns 달력의 일 클릭시 해당 일시 info 교체
 */
function CallSchedule(ele,years,month,date,data){

    ele.innerHTML = '';

    var selcDate = new Date(years+'-'+(month+1)+'-'+date),
        activeEvent = data.filter(function(val){
        var startDate = new Date(val.scdStart),
            endDate = new Date(val.scdEnd);

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        return selcDate >= startDate && selcDate <= endDate
    });

    var infoTop = document.createElement('div'),
        infoTopSpan = document.createElement('span'),
        dayNames = ['일', '월', '화', '수', '목', '금', '토'],
        currentDay = selcDate.getDay(),
        day = dayNames[currentDay],
        infoBot = document.createElement('div');

    infoTop.className = 'info_top';
    infoBot.className = 'info_bot';
    infoTopSpan.innerText = years+'. '+((month+1).toString().length<2?('0'+(month+1)):(month+1))+'. '+(date.toString().length<2?'0'+date:date)+' ('+day+')';
    infoTop.append(infoTopSpan);

    if(activeEvent.length<1){
        var infoBotSpan = document.createElement('span');
        infoBotSpan.innerText = '등록된 일정이 없습니다.';
        infoBot.classList.add('empty');
        infoBot.append(infoBotSpan);
        ele.append(infoTop,infoBot);
        return false;
    }
    var ul = document.createElement('ul');
    activeEvent.forEach(function(val){
        var li = document.createElement('li'),
            sub = document.createElement('p'),
            subCt = document.createElement('span'),
            schedule = document.createElement('span'),
            schdulCn = document.createElement('p');

        var startDate = new Date(val.scdStart),
            startMonth = ((startDate.getMonth()+1).toString().length<2?'0'+(startDate.getMonth()+1):(startDate.getMonth()+1)),
            startDay = dayNames[startDate.getDay()],
            startDate = (startDate.getDate().toString().length<2?'0'+startDate.getDate():startDate.getDate()),
            endDate = new Date(val.scdEnd),
            endMonth = (endDate.getMonth().toString().length<2?'0'+(endDate.getMonth()+1):(endDate.getMonth()+1)),
            endDay = dayNames[endDate.getDay()],
            endDate = (endDate.getDate().toString().length<2?'0'+endDate.getDate():endDate.getDate());


        var schdulText = startMonth+'.'+startDate+'.('+startDay+')';
        if(val.scdStart != val.scdEnd) schdulText = schdulText + ' ~ '+endMonth+'.'+endDate+'.('+endDay+')';

		if(!val.schdulCn){
			if(getParameterByName('schdulSeNo') == 3){
				if(val.scdStime != null && val.scdStime != '' && val.scdStime != '0000'){
					var stime = val.scdStime.substring(0,2) + ':' + val.scdStime.substring(2,4);
					sub.innerText = '[' + stime + '] ' + val.scdSub;
				}
			}else{
				sub.innerText = ' ' + val.scdSub;
			}
		}

		sub.innerText = ' '+val.scdSub;
        subCt.innerText = ''+val.scdCt+'';
        sub.prepend(subCt);
        schedule.innerText = schdulText;
        ul.appendChild(li).append(sub, schedule);
        if(!!val.schdulCn && getParameterByName('schdulSeNo') == 3){
            schdulCn.innerText = val.schdulCn;
            li.appendChild(schdulCn);
        };
    });
    infoBot.append(ul);
    ele.append(infoTop,infoBot);
};
function TodayCal($schduleCalendar,today,years,month,data){
    years = today.getFullYear(),
    month = today.getMonth(),
    todayDate = today.getDate();
    CalCalendar($schduleCalendar,years,month,data);
    window.years = years;
};
window.CalCalendar = CalCalendar;
window.CallSchedule = CallSchedule;