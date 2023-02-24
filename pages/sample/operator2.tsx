// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Typography } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import { EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/core';
// lib
import EventControl from '../../lib/operatorEventControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/Operator/ScheduleInfoDialog';
import EditScheduleDialog from '../../components/Dialog/Operator/EditScheduleDialog';
import Month from '../../components/FullCalendar/Operator/SubCalendar';
import MainCalendar from '../../components/FullCalendar/Operator/MainCalendar';
import { CalendarHeader } from '../../components/FullCalendar/Operator/Header';

const SampleCalendar: React.FC = () => {
  const calendarRef = createRef<FullCalendar>();
  const subCalendarRef = createRef<FullCalendar>();

  const [today, setToday] = useState<'week' | 'day' | 'day2' | 'list'>('day');

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
   * イベント追加したりした時に発火
   */
  const handleEventSet = (events: EventApi[]) => {
    console.log('events:', events);
    setMyEvents(events);
  };

  /**
   * サブカレンダーの日付選択
   */
  const handleNavLinkDayClick = (date: Date) => {
    const mainCalApi = calendarRef.current?.getApi();
    if (!mainCalApi) return console.log('calApi none');
    mainCalApi.changeView('resourceTimeGridDay', date);
    setToday('day');
  };

  /**
   * カレンダーの表示変更
   */
  const handleViewChange = (
    direction: 'week' | 'day' | 'day2' | 'list'
  ): void => {
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
    if (direction === 'day2') {
      calApi.changeView('timeGridDay');
      setToday('day2');
    }
    if (direction === 'list') {
      calApi.changeView('listMonth');
      setToday('list');
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
        {myEvents.length != 0 && (
          <Grid container direction='row'>
            <Grid item sm={3}>
              <Month
                initialEvents={myEvents}
                subCalendarRef={subCalendarRef}
                handleNavLinkDayClick={handleNavLinkDayClick}
              />
            </Grid>
            <Grid item sm={9}>
              <CalendarHeader
                calendarRef={calendarRef}
                handleViewChange={handleViewChange}
                today={today}
              />
              <MainCalendar
                calendarRef={calendarRef}
                myEvents={myEvents}
                handleEventClick={handleEventClick}
                handleEventSet={handleEventSet}
              />
            </Grid>
          </Grid>
        )}
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
