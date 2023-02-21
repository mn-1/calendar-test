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

const SampleCalendar: React.FC = (props) => {
  const calendarRef = createRef<FullCalendar>();

  const {
    countId,
    myEvents,
    addDialogOpen,
    eventInfo,
    editDialogOpen,
    selectInfo,
    setEditDialogOpen,

    setEventInfo,
    getEvents,
    setCountId,
    setMyEvents,
    setSelectInfo,

    setAddDialogOpen,
  } = EventControl();

  useEffect(() => {
    getEvents();
  }, []);

  // イベント削除
  const handleEventClick = (arg: EventClickArg) => {
    if (confirm(`${arg.event.title}の予定を削除してよろしいでしょうか。`))
      arg.event.remove();
  };

  const handleDateSelect = (arg: DateSelectArg) => {
    console.log(arg);
    const title = prompt('Please enter a new title for your event');
    const calendarApi = arg.view.calendar;

    // https://fullcalendar.io/docs/unselect-callback
    calendarApi.unselect();

    const add = countId + 1;
    setCountId(add);

    if (!title) return;
    calendarApi.addEvent({
      id: String(countId),
      title,
      start: arg.startStr,
      resourceId: arg.resource?.id,
      // end: selectInfo.endStr,
      slotDuration: '01:00:00',
      allDay: false,
      color: '#3CB371',
    });
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
                contentHeight='auto'
                initialView='timeGridWeek'
                slotDuration='00:30:00'
                slotMinTime='05:00:00'
                slotMaxTime='23:00:00'
                plugins={[
                  timeGridPlugin,
                  dayGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'timeGridWeek,timeGridDay listMonth',
                }}
                businessHours={{
                  daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // 0:日曜 〜 6:土曜
                  startTime: '8:00:00',
                  endTime: '20:00:00',
                }}
                //
                selectable={true}
                weekends={true}
                editable={true}
                selectMirror={true}
                nowIndicator={true}
                allDaySlot={false}
                slotEventOverlap={true}
                //
                select={handleDateSelect}
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
