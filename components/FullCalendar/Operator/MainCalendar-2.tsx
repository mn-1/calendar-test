// react
import React, { useState, RefObject, useEffect } from 'react';
// MUI
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Grid, Typography, Stack, Tooltip } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import jaLocale from '@fullcalendar/core/locales/ja';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  DateInput,
  EventContentArg,
  SlotLabelContentArg,
  DayHeaderContentArg,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { DayCellContentArg } from '@fullcalendar/core';
// lib

import { CalendarApi } from '@fullcalendar/core';

type Props = {
  calendarRef: RefObject<FullCalendar>;
  myEvents: any;
  handleEventClick: Function;
  handleEventSet: Function;
  handleNavLinkDayClick: Function;
  initialView: string;
  initialDate: DateInput;
  resources: any;
};

export default function LocationCalendar(props: Props) {
  const {
    calendarRef,
    myEvents,
    handleEventClick,
    handleEventSet,
    handleNavLinkDayClick,
    initialView,
    initialDate,
    resources,
  } = props;
  const [calApi, setCalApi] = useState<CalendarApi | null>(null);

  useEffect(() => {
    // ここで取得する必要がある
    const calApi = calendarRef.current?.getApi();
    if (calApi) setCalApi(calApi);
  }, [calendarRef]);

  return (
    <FullCalendar
      initialEvents={myEvents}
      ref={calendarRef}
      locales={[jaLocale]}
      locale='ja'
      eventColor='#6A5ACD'
      contentHeight='auto'
      dayMinWidth={100}
      resources={resources}
      slotDuration='00:30:00'
      slotMinTime='05:00:00'
      slotMaxTime='23:00:00'
      plugins={[
        timeGridPlugin,
        dayGridPlugin,
        interactionPlugin,
        resourceTimeGridPlugin,
        resourceTimelinePlugin,
        interactionPlugin,
        scrollGridPlugin,
      ]}
      initialView={initialView}
      initialDate={initialDate}
      eventContent={renderEventContent}
      dayCellContent={dayCellContent}
      dayHeaderContent={dayHeaderContent}
      slotLabelContent={slotLabelContent}
      //
      droppable={false}
      editable={false}
      //
      eventOverlap={false}
      headerToolbar={false}
      selectable={false}
      selectMirror={true}
      weekends={true}
      eventResizableFromStart={true}
      nowIndicator={true}
      allDaySlot={false}
      slotEventOverlap={true}
      navLinks={true}
      expandRows={true}
      //
      eventClick={(arg) => handleEventClick(arg)}
      eventsSet={(events) => handleEventSet(events)}
      navLinkDayClick={(date) => handleNavLinkDayClick(date)}
    />
  );
}

/**ーーーーーーーーーーーーーーーーーー
   * カレンダー上の日付
 ーーーーーーーーーーーーーーーーーー*/
function dayCellContent(e: DayCellContentArg) {
  e.dayNumberText = e.dayNumberText.replace('日', '');

  return <Typography fontSize='1rem'>{e.dayNumberText}</Typography>;
}

/**ーーーーーーーーーーーーーーーーーー
 * イベントに表示する内容
 ーーーーーーーーーーーーーーーーーー*/
function renderEventContent(eventContent: EventContentArg) {
  const {
    event: { title, extendedProps },
    timeText,
  } = eventContent;

  return (
    <Tooltip
      title={eventContent.event.extendedProps.operatorName}
      placement='top-end'
    >
      <Grid container direction='column'>
        <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
          {eventContent.event.extendedProps.locationName ?? ''}
        </Typography>
        <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
          {extendedProps.operatorName}
        </Typography>
        <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
          {timeText}
        </Typography>
      </Grid>
    </Tooltip>
  );
}

/**ーーーーーーーーーーーーーーーーーー
   * カレンダーのヘッダーの表示
 ーーーーーーーーーーーーーーーーーー*/
function dayHeaderContent(e: DayHeaderContentArg) {
  const date = e.date.getDate();
  const day = ['日', '月', '火', '水', '木', '金', '土'][e.date.getDay()];

  if (e.isToday)
    return (
      <Stack
        sx={{
          backgroundColor: '#4682B4',
          width: '50px',
          height: '50px',
          color: '#ffffff',
          borderRadius: '25px',
        }}
      >
        <Grid container direction='column'>
          <Typography>
            {day}
            <br />
            {date}
          </Typography>
        </Grid>
      </Stack>
    );
  else
    return (
      <Typography>
        {day}
        <br />
        {date}
      </Typography>
    );
}

/**ーーーーーーーーーーーーーーーーーー
   * 横軸の表示
 ーーーーーーーーーーーーーーーーーー*/
const slotLabelContent = (e: SlotLabelContentArg) => {
  const now = Number(
    new Date()
      .toLocaleTimeString()
      .substring(0, new Date().toLocaleTimeString().indexOf(':'))
  );
  const date = Number(e.text.substring(0, e.text.indexOf('時')));
  console.log(now, date);
  let color: string = '#FF0000';
  if (now >= date) color = '#4682B4';
  return <Typography color={color}>{e.text}</Typography>;
};
