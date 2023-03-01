/**
 * フッターバージョン
 * 👉没
 */

// react
import React, { useState, createRef, useEffect } from 'react';
// MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ButtonGroup } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import jaLocale from '@fullcalendar/core/locales/ja';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import resourceTimelinePlugIn from '@fullcalendar/resource-timeline';
import {
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from '@fullcalendar/core';
import interactionPlugin, {
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
// lib
import { resources, operator } from '../../lib/data';
import EventControl from '../../lib/eventControl-3';
import { divideColor } from '../../lib/colorControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/Client/ScheduleInfoDialog';
import DeleteSnackbar from '../../components/Snackbar/DeleteSnackbar';
import { MobileHeader } from '../../components/FullCalendar/Client/MobileHeader-2';
import AddScheduleDialog from '../../components/Dialog/Client/AddScheduleDialog';
import { scheduleDataInfo } from '../../lib/inputDataControl';
import MobileEditScheduleDialog from '../../components/Dialog/Client/MobileEditDialog';

const ClientCalendar = () => {
  //   const matches: boolean = useMediaQuery('(min-width:576px)');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('xs'));

  const calendarRef = createRef<FullCalendar>();

  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editButtonDisable, setEditButtonDisable] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>('#DCDCDC');
  const [today, setToday] = useState<{
    type: 'month' | 'week' | 'day';
    date: Date;
  }>({ type: 'day', date: new Date(new Date().toLocaleDateString()) });

  const {
    countId,
    myEvents,
    eventInfo,
    editDialogOpen,
    addDialogOpen,
    mobileEditSchedule,
    addSchedule,
    setAddDialogOpen,
    setEditDialogOpen,
    setEventInfo,
    getEvents,
    setCountId,
    setMyEvents,
  } = EventControl();

  useEffect(() => {
    console.log(matches);
    getEvents();
  }, [matches]);

  /**
   * イベント詳細表示ダイアログ開く
   */
  const handleEventClick = (arg: EventClickArg) => {
    setInfoDialogOpen(true);
    setEventInfo(arg);
  };

  /**
   * イベントを削除
   */
  const deleteEvent = () => {
    const calApi = calendarRef.current?.getApi();
    if (!eventInfo || !calApi) return;

    eventInfo.event.remove();
    setInfoDialogOpen(false);
    setDeleteSnackbarOpen(true);
  };

  /**
   * イベントを削除したのを取り消す
   */
  const undoDelete = () => {
    const calApi = calendarRef.current?.getApi();
    if (!eventInfo || !calApi) return;

    const {
      id,
      borderColor,
      backgroundColor,
      title,
      startStr,
      endStr,
      extendedProps: { memo, operatorName, avatar },
    } = eventInfo.event;

    calApi.addEvent({
      id,
      title,
      start: startStr,
      end: endStr,
      resourceId: eventInfo.event.getResources()[0]._resource.id,
      extendedProps: {
        memo: memo ?? '',
        operatorName: operatorName ?? '',
        avatar: avatar ?? '',
      },
      backgroundColor,
      borderColor,
    });

    setDeleteSnackbarOpen(false);
  };

  /**
   * イベント移動した時に色変える
   * 日表示以外だったら戻す
   */
  const handleInnerEventDrop = (arg: EventDropArg) => {
    const calApi = calendarRef.current?.getApi();
    const { start, end } = arg.event;

    // 取得できない,日表示でなかったら戻す
    if (!calApi || !start || !end || !editMode) return arg.revert();

    const { color } = divideColor(start.getTime(), end.getTime());

    arg.event.setProp('color', color);
  };

  /**
   * イベントのサイズ変更した時に色変える
   */
  const handleEventResize = (arg: EventResizeDoneArg) => {
    const calApi = calendarRef.current?.getApi();
    const { start, end } = arg.event;

    // 取得できない,日表示でなかったら戻す
    if (!calApi || !start || !end || !editMode) return arg.revert();

    const { color } = divideColor(start.getTime(), end.getTime());

    arg.event.setProp('color', color);
  };

  /**
   * カレンダーの表示変更
   */
  const handleViewChange = (direction: 'month' | 'week' | 'day'): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return;

    if (direction === 'month') {
      calApi.changeView('dayGridMonth');
      setEditButtonDisable(true);
      setToday({ ...today, type: 'month' });
    }
    if (direction === 'week') {
      calApi.changeView('timeGridWeek');
      setEditButtonDisable(true);
      setToday({ ...today, type: 'week' });
    }
    if (direction === 'day') {
      calApi.changeView('resourceTimeGridDay');
      setEditButtonDisable(false);
      setToday({ ...today, type: 'day' });
    }
  };

  const handleDateChange = (direction: 'prev' | 'today' | 'next'): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return;

    if (direction === 'prev') calApi.prev();
    if (direction === 'next') calApi.next();
    if (direction === 'today') calApi.today();

    setToday({ ...today, date: calApi.getDate() });
  };

  return (
    <>
      <Header />
      <Grid container direction='row' sx={{ width: '100%', height: '100%' }}>
        <MobileHeader
          today={today.type}
          setToday={setToday}
          handleViewChange={handleViewChange}
          calendarRef={calendarRef}
          editMode={editMode}
        />

        <Grid
          item
          xs={12}
          sx={{ mx: { md: '1rem', xs: '0.5rem' }, overflow: 'scroll' }}
        >
          {myEvents.length != 0 && (
            <Stack
              sx={{
                minWidth: '800px',
                border: 1,
                borderWidth: 3,
                borderColor: borderColor,
              }}
            >
              <FullCalendar
                initialEvents={myEvents}
                ref={calendarRef}
                locales={[jaLocale]}
                locale='ja'
                eventColor='#6A5ACD'
                contentHeight='100vh'
                // resourceAreaWidth='300px'
                resources={resources}
                slotMinTime='00:00:00'
                slotMaxTime='24:00:00'
                slotDuration='00:30:00'
                snapDuration='00:05:00'
                plugins={[
                  resourceTimeGridPlugin,
                  resourceTimelinePlugIn,
                  interactionPlugin,
                  scrollGridPlugin,
                  dayGridPlugin,
                  timeGridPlugin,
                  multiMonthPlugin,
                ]}
                initialView='resourceTimeGridDay'
                eventContent={renderEventContent}
                // edit関連
                eventResourceEditable={editMode}
                eventStartEditable={editMode}
                eventDurationEditable={editMode}
                editable={false}
                selectable={false}
                eventResizableFromStart={false}
                //
                eventOverlap={false}
                headerToolbar={false}
                selectMirror={true}
                weekends={true}
                nowIndicator={true}
                allDaySlot={false}
                slotEventOverlap={true}
                navLinks={true}
                expandRows={true}
                stickyHeaderDates={true}
                fixedWeekCount={false}
                //
                eventResizeStart={() => {
                  if (editMode) setBorderColor('#0000FF');
                }}
                eventResizeStop={() => {
                  if (editMode) setBorderColor('#DCDCDC');
                }}
                eventDragStart={() => {
                  if (editMode) setBorderColor('#0000FF');
                }}
                eventDragStop={() => {
                  if (editMode) setBorderColor('#DCDCDC');
                }}
                //
                eventClick={handleEventClick}
                eventResize={handleEventResize}
                eventDrop={handleInnerEventDrop}
                eventsSet={(events) => {
                  console.log('events:', events);
                  setMyEvents(events);
                }}
                navLinkDayClick={(date) => {
                  const calApi = calendarRef.current?.getApi();
                  if (!calApi) return console.log('calApi none');
                  calApi.changeView('resourceTimeGridDay', date);
                  setEditButtonDisable(false);
                  setToday({ type: 'day', date: calApi.getDate() });
                }}
              />
            </Stack>
          )}
        </Grid>
      </Grid>

      <Stack
        position='sticky'
        bottom='0'
        zIndex={1}
        sx={{ py: '0.5rem', backgroundColor: '#2E8B57' }}
      >
        <Grid container direction='row' justifyContent='space-between'>
          <Button
            variant='contained'
            disabled={editButtonDisable}
            sx={{ ml: '0.5rem' }}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? '編集終了' : '編集する'}
          </Button>
          {editMode && (
            <Button
              onClick={() => setAddDialogOpen(true)}
              sx={{ ml: '0.5rem', color: '#ffffff' }}
            >
              <AddCircleIcon />
            </Button>
          )}
          <ButtonGroup variant='text' sx={{ color: '#ffffff' }}>
            <Button
              color='inherit'
              onClick={(): void => handleDateChange('prev')}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              color='inherit'
              onClick={(): void => handleDateChange('today')}
            >
              {today.type === 'day' && '今日'}
              {today.type === 'week' && '今週'}
              {today.type === 'month' && '今月'}
            </Button>
            <Button
              color='inherit'
              onClick={(): void => handleDateChange('next')}
            >
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
        </Grid>
      </Stack>
      {/* utils ↓ */}
      {/* defalutValueを動的にしないためにレンダリング少なくしている */}

      {eventInfo && editDialogOpen && (
        <MobileEditScheduleDialog
          open={editDialogOpen}
          operator={operator}
          location={resources}
          handleClose={() => setEditDialogOpen(false)}
          editSchedule={mobileEditSchedule}
          eventInfo={eventInfo}
        />
      )}

      <ScheduleInfoDialog
        editMode={!editMode}
        eventInfo={eventInfo}
        open={infoDialogOpen}
        delete={deleteEvent}
        edit={() => {
          setEditDialogOpen(true);
          setInfoDialogOpen(false);
        }}
        handleClose={() => setInfoDialogOpen(false)}
      />
      <DeleteSnackbar
        open={deleteSnackbarOpen}
        undoDelete={undoDelete}
        handleClose={() => setDeleteSnackbarOpen(false)}
      />
      {today.date && addDialogOpen && (
        <AddScheduleDialog
          date={today.date}
          open={addDialogOpen}
          handleClose={() => setAddDialogOpen(false)}
          operator={operator}
          location={resources}
          addSchedule={(values: scheduleDataInfo) => {
            if (calendarRef.current) {
              const calApi = calendarRef.current.getApi();

              addSchedule(values, calApi);
            }
          }}
        />
      )}

      {/* utils ↑ */}
    </>
  );
};

export default ClientCalendar;

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  return (
    <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
      {eventContent.timeText}
      <br />
      {eventContent.event.extendedProps.operatorName}
    </Typography>
  );
}
