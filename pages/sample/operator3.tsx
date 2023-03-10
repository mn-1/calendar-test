/**
 * サブカレンダー一つ
 *
 */

// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import { EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/core';
// lib
import EventControl from '../../lib/operatorEventControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/Operator/ScheduleInfoDialog';
import EditScheduleDialog from '../../components/Dialog/Operator/EditScheduleDialog';
import Month from '../../components/FullCalendar/Operator/OneSubCalendar';
import MainCalendar from '../../components/FullCalendar/Operator/MainCalendar';
import { CalendarHeader } from '../../components/FullCalendar/Operator/Header';
import { MobileHeader } from '../../components/FullCalendar/Operator/MobileHeader';

const SampleCalendar: React.FC = () => {
  const matches: boolean = useMediaQuery('(min-width:992px)');
  const calendarRef = createRef<FullCalendar>();

  const [today, setToday] = useState<{
    type: 'month' | 'week' | 'day';
  }>({ type: 'day' });
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);

  const {
    myEvents,
    eventInfo,
    editDialogOpen,
    failedSnackbarOpen,
    setFailedSnackbarOpen,
    setEditDialogOpen,
    editMemo,
    setEventInfo,
    getEvents,
    setMyEvents,
  } = EventControl();

  useEffect(() => {
    getEvents();
  }, [calendarRef]);

  /**
   * メモ編集ダイアログ開く
   */
  const handleEventClick = async (arg: EventClickArg) => {
    setEventInfo(arg);
    setInfoDialogOpen(true);
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
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return setFailedSnackbarOpen(true);

    calApi.changeView('resourceTimeGridDay', date);
    setToday({ ...today, type: 'day' });
  };

  /**
   * カレンダーの表示変更
   */
  const handleViewChange = (direction: 'week' | 'day' | 'month'): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return;
    if (direction === 'month') {
      calApi.changeView('dayGridMonth');
      setToday({ ...today, type: 'month' });
    }
    if (direction === 'week') {
      calApi.changeView('timeGridWeek');
      setToday({ ...today, type: 'week' });
    }
    if (direction === 'day') {
      calApi.changeView('resourceTimeGridDay');
      setToday({ ...today, type: 'day' });
    }
  };

  /**
   * カレンダーの日付前後する
   */
  const handleDateChange = (direction: 'prev' | 'today' | 'next'): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return setFailedSnackbarOpen(true);

    if (direction === 'prev') calApi.prev();
    if (direction === 'next') calApi.next();
    if (direction === 'today') calApi.today();
  };

  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          height: '100%',
          mt: '1rem',
        }}
      >
        {myEvents.length != 0 && (
          <Grid container direction='row'>
            {matches && (
              <Grid item xs={3}>
                <Month handleSelect={handleNavLinkDayClick} />
              </Grid>
            )}

            <Grid item xs={matches ? 9 : 12}>
              {matches ? (
                <CalendarHeader
                  calendarRef={calendarRef}
                  handleViewChange={handleViewChange}
                  today={today.type}
                  handleDateChange={handleDateChange}
                />
              ) : (
                <MobileHeader
                  today={today.type}
                  handleViewChange={handleViewChange}
                  calendarRef={calendarRef}
                  handleDateChange={handleDateChange}
                />
              )}

              {/* <Stack
                overflow='scroll'
                sx={{
                  minWidth: '800px',
                  border: 1,
                  borderWidth: 3,
                  borderColor: '#dcdcdc',
                }}
              > */}
              <Stack
                sx={{
                  border: 1,
                  borderWidth: 1,
                  borderColor: '#dcdcdc',
                  overflow: 'scroll',
                }}
              >
                <MainCalendar
                  calendarRef={calendarRef}
                  myEvents={myEvents}
                  handleEventClick={handleEventClick}
                  handleEventSet={handleEventSet}
                  handleNavLinkDayClick={handleNavLinkDayClick}
                />
              </Stack>
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
