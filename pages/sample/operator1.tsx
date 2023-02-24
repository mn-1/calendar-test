// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Typography } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
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
import interactionPlugin from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import listPlugin from '@fullcalendar/list'; // 予定をリスト表示
import { DateClickArg } from '@fullcalendar/interaction';
// lib
import { resources, operator } from '../../lib/data';
import EventControl from '../../lib/operatorEventControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/Operator/ScheduleInfoDialog';
import EditScheduleDialog from '../../components/Dialog/Operator/EditScheduleDialog';
import Month from '../../components/FullCalendar/Operator/SubCalendar';
import { CalendarHeader } from '../../components/FullCalendar/Operator/Header';

const SampleCalendar: React.FC = (props) => {
  const calendarRef = createRef<FullCalendar>();

  const [today, setToday] = useState<'month' | 'week' | 'day'>('day');

  const {
    myEvents,
    eventInfo,
    editDialogOpen,
    setEditDialogOpen,
    editMemo,
    setEventInfo,
    getEvents,
    setMyEvents,
  } = EventControl();

  useEffect(() => {
    getEvents();
  }, []);

  /**
   * メモ編集ダイアログ開く
   */
  const handleEventClick = async (arg: EventClickArg) => {
    setEventInfo(arg);
    setEditDialogOpen(true);
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
              {/* <Month initialEvents={myEvents} /> */}
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
                  interactionPlugin,
                  scrollGridPlugin,
                  dayGridPlugin,
                  timeGridPlugin,
                  multiMonthPlugin,
                ]}
                initialView='resourceTimeGrid'
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
            editMemo={editMemo}
            eventInfo={eventInfo}
            open={editDialogOpen}
            handleClose={() => setEditDialogOpen(false)}
          />
        )}

        {/* <ScheduleInfoDialog
          editMemo={() => {
            setInfoDialogOpen(false);
          }}
          eventInfo={eventInfo}
          open={infoDialogOpen}
          handleClose={() => setInfoDialogOpen(false)}
        /> */}

        {/* utils ↑ */}
      </Container>
    </>
  );
};

export default SampleCalendar;

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  const {
    timeText,
    event: {
      extendedProps: { avatar, memo },
      title,
    },
  } = eventContent;
  return (
    <>
      <Typography>{timeText}</Typography>

      {title && (
        <>
          タイトル
          <br />
          <Typography>{title}</Typography>
        </>
      )}
      {avatar && (
        <>
          アバター
          <br />
          <Typography>{avatar}</Typography>
        </>
      )}
      {memo && (
        <>
          メモ
          <br />
          <Typography>{memo}</Typography>
        </>
      )}
    </>
  );
}
