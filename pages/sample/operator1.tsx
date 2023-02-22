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
import EventControl from '../../lib/operatorEventControl';
import { divideColor } from '../../lib/colorControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/Operator/ScheduleInfoDialog';
import EditScheduleDialog from '../../components/Dialog/Client/EditScheduleDialog';
import Month from '../../components/FullCalendar/Operator/Month';
import { DateClickArg } from '@fullcalendar/interaction';
import { CalendarHeader } from '../../components/FullCalendar/Operator/Header';

const SampleCalendar: React.FC = (props) => {
  const calendarRef = createRef<FullCalendar>();

  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [today, setToday] = useState<'month' | 'week' | 'day'>('day');

  const {
    countId,
    myEvents,
    eventInfo,
    editDialogOpen,
    setEditDialogOpen,
    editSchedule,
    setEventInfo,
    getEvents,
    setCountId,
    setMyEvents,
  } = EventControl();

  useEffect(() => {
    getEvents();
  }, []);

  /**
   * イベント詳細表示ダイアログ開く
   */
  const handleEventClick = (arg: EventClickArg) => {
    setInfoDialogOpen(true);
    setEventInfo(arg);
  };

  /**
   * カレンダーの表示変更
   */
  const handleViewChange = (direction: 'week' | 'day'): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return;

    if (direction === 'week') {
      calApi.changeView('timeGridWeek');
      setToday('week');
    }
    if (direction === 'day') {
      calApi.changeView('resourceTimeGridDay');
      setToday('day');
    }
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
            <CalendarHeader
              calendarRef={calendarRef}
              handleViewChange={handleViewChange}
              today={today}
            />
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
        {/* utils ↓ */}
        {/* defalutValueを動的にしないためにレンダリング少なくしている */}

        {eventInfo && editDialogOpen && (
          <EditScheduleDialog
            open={editDialogOpen}
            eventInfo={eventInfo}
            handleClose={() => setEditDialogOpen(false)}
            editSchedule={editSchedule}
          />
        )}
        <ScheduleInfoDialog
          eventInfo={eventInfo}
          open={infoDialogOpen}
          edit={() => {
            setEditDialogOpen(true);
            setInfoDialogOpen(false);
          }}
          handleClose={() => setInfoDialogOpen(false)}
        />

        {/* utils ↑ */}
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
