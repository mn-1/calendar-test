// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Typography } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import jaLocale from '@fullcalendar/core/locales/ja';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import resourceTimelinePlugIn from '@fullcalendar/resource-timeline';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from '@fullcalendar/core';
import interactionPlugin, {
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import listPlugin from '@fullcalendar/list'; // 予定をリスト表示
// lib
import { resources, operator } from '../../lib/data';
import EventControl from '../../lib/eventControl-2';
import { divideColor } from '../../lib/colorControl';
// components
import Header from '../../components/Header/Header';
import AddScheduleDialog from '../../components/Dialog/AddScheduleDialog';
import ScheduleInfoDialog from '../../components/Dialog/ScheduleInfoDialog';
import DeleteSnackbar from '../../components/Snackbar/DeleteSnackbar';
import EditScheduleDialog from '../../components/Dialog/EditScheduleDialog';
import Month from '../../components/FullCalendar/Month';
import { DateClickArg } from '@fullcalendar/interaction';
import { CalendarHeader } from '../../components/FullCalendar/Operator/Header';

const SampleCalendar: React.FC = (props) => {
  const calendarRef = createRef<FullCalendar>();

  const {
    countId,
    myEvents,

    getEvents,
    setCountId,
    setMyEvents,
  } = EventControl();

  useEffect(() => {
    getEvents();
  }, []);

  // イベント削除
  const handleEventClick = (arg: EventClickArg) => {
    if (confirm(`${arg.event.title}の予定を削除してよろしいでしょうか。`))
      arg.event.remove();
  };

  return (
    <>
      <Header userType='operator' />
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          height: '100%',
          mt: '4rem',
        }}
      >
        <Grid
          container
          direction='row'
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          {myEvents.length != 0 && (
            <Grid item sm={3}>
              <Month initialEvents={myEvents} />
            </Grid>
          )}
          <Grid item sm={9}>
            {myEvents.length != 0 && (
              <FullCalendar
                initialEvents={myEvents}
                ref={calendarRef}
                locales={[jaLocale]}
                locale='ja'
                eventColor='#6A5ACD'
                contentHeight='auto'
                resources={resources}
                slotDuration='00:30:00'
                slotMinTime='05:00:00'
                slotMaxTime='23:00:00'
                plugins={[
                  timeGridPlugin,
                  dayGridPlugin,
                  interactionPlugin,
                  listPlugin,
                  resourceTimeGridPlugin,
                  resourceTimelinePlugIn,
                  interactionPlugin,
                  scrollGridPlugin,
                  dayGridPlugin,
                  timeGridPlugin,
                  multiMonthPlugin,
                ]}
                initialView='timeGridWeek'
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
                //
                eventClick={handleEventClick}
                eventsSet={(events: EventApi[]) => {
                  console.log('events:', events);
                  setMyEvents(events);
                }}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SampleCalendar;

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  return (
    <Typography>
      {eventContent.timeText}
      {eventContent.event.extendedProps.operatorName}
    </Typography>
  );
}
