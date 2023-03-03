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
import { EventContentArg, EventDropArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import listPlugin from '@fullcalendar/list'; // 予定をリスト表示
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
// lib
import { resources, operator } from '../../../lib/data';
import { CalendarApi } from '@fullcalendar/core';
import resourceTimeline from '@fullcalendar/resource-timeline';

type Props = {
  calendarRef: RefObject<FullCalendar>;
  myEvents: any;
  handleEventClick: Function;
  handleEventSet: Function;
  handleNavLinkDayClick: Function;
  initialView: string;
};

const MainCalendar = (props: Props) => {
  const {
    calendarRef,
    myEvents,
    handleEventClick,
    handleEventSet,
    handleNavLinkDayClick,
    initialView,
  } = props;
  const [calApi, setCalApi] = useState<CalendarApi | null>(null);

  useEffect(() => {
    // ここで取得する必要がある
    const calApi = calendarRef.current?.getApi();
    if (calApi) setCalApi(calApi);
  }, [calendarRef]);

  // カレンダーに表示する内容
  function renderEventContent(eventContent: EventContentArg) {
    if (!calApi) return <></>;
    const view = calApi.view.type;

    const location = eventContent.event.extendedProps.locationName ?? '';
    return (
      <Tooltip title={view != 'listMonth' ? location : ''} placement='top-end'>
        <Grid container direction='column'>
          <Grid container direction='row' alignItems='center'>
            <AccessTimeOutlinedIcon />
            <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
              {eventContent.timeText}
            </Typography>
          </Grid>
          <Grid container direction='row' alignItems='center'>
            <LocationOnOutlinedIcon />
            <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
              {location}
            </Typography>
          </Grid>
        </Grid>
      </Tooltip>
    );
  }

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
        timeGridPlugin, // 縦軸時間に
        dayGridPlugin, // 日付ごとに
        interactionPlugin,
        resourceTimeGridPlugin,
        resourceTimelinePlugin,
        interactionPlugin,
        scrollGridPlugin,
      ]}
      initialView={initialView}
      eventContent={renderEventContent}
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
};

export default MainCalendar;
