// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Typography, Button, Stack } from '@mui/material';
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
  DropArg,
  EventReceiveArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
// lib
import { resources, externalEvents } from '../../lib/data';
import EventControl from '../../lib/eventControl-3';
import { divideColor } from '../../lib/colorControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/Client/ScheduleInfoDialog';
import DeleteSnackbar from '../../components/Snackbar/DeleteSnackbar';
import EditScheduleDialog from '../../components/Dialog/Client/EditScheduleDialog';
import { ExternalEvent } from '../../components/FullCalendar/Client/ExternalEvents';
import { CalendarHeader } from '../../components/FullCalendar/Client/Header';
import FailedSnackbar from '../../components/Snackbar/FailedSnackbar';
import { SubCalendar } from '../../components/FullCalendar/Client/SubCalendar';
import { MobileHeader } from '../../components/FullCalendar/Client/MobileHeader';

const ClientCalendar = () => {
  const calendarRef = createRef<FullCalendar>();
  const subCalendarRef = createRef<FullCalendar>();

  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editButtonDisable, setEditButtonDisable] = useState<boolean>(false);
  const [today, setToday] = useState<'month' | 'week' | 'day'>('day');
  const [borderColor, setBorderColor] = useState<string>('#DCDCDC');

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
    // console.log('これは表示してからgetできるのか',calendarRef.current?.getApi());
  }, []);

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
   * 外部のイベント追加
   */
  const drop = (arg: DropArg) => {
    console.log('drop info', arg);
    setBorderColor('#DCDCDC');
  };

  /**
   * 外部のイベント受付
   */
  const handleEventReceive = (arg: EventReceiveArg) => {
    console.log('event receive');
    const start = arg.event.start;
    let end = start;

    if (!start || !end) return arg.event.remove();
    end = new Date(end.setMinutes(start.getMinutes() + 30));

    const { color } = divideColor(start.getTime(), end.getTime());

    const add = countId + 1;
    setCountId(add);

    arg.event.setProp('id', `${add}`);
    arg.event.setProp('color', color);
    arg.event.setEnd(end);
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
      setToday('month');
    }
    if (direction === 'week') {
      calApi.changeView('timeGridWeek');
      setEditButtonDisable(true);
      setToday('week');
    }
    if (direction === 'day') {
      calApi.changeView('resourceTimeGridDay');
      setEditButtonDisable(false);
      setToday('day');
    }
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

  let calendarSize: any = 12;
  if (editMode) calendarSize = 9;

  return (
    <>
      <Header userType='client' />
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          height: '100%',
          mt: '4rem',
        }}
      >
        <Grid container direction='row' sx={{ width: '100%', height: '100%' }}>
          {editMode && (
            <Grid item sm={3} sx={{ px: '1rem', mt: '3rem' }}>
              <Grid container direction='column'>
                <SubCalendar
                  subCalendarRef={subCalendarRef}
                  handleNavLinkDayClick={handleNavLinkDayClick}
                />
                {externalEvents.map((event) => (
                  <ExternalEvent
                    event={event}
                    key={event.extendedProps.Username}
                  />
                ))}
              </Grid>
            </Grid>
          )}

          <Grid item md={calendarSize} sx={{ px: { md: '1rem' } }}>
            <CalendarHeader
              today={today}
              handleViewChange={handleViewChange}
              editButtonDisable={editButtonDisable}
              calendarRef={calendarRef}
              editMode={editMode}
              setEditMode={setEditMode}
            />

            {myEvents.length != 0 && (
              <Stack
                sx={{
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
                  resources={resources}
                  slotMinTime='05:00:00'
                  slotMaxTime='23:00:00'
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
                  //
                  droppable={true}
                  editable={true}
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
                  drop={drop}
                  eventReceive={handleEventReceive}
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
                    setToday('day');
                  }}
                />
              </Stack>
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
        {/* utils ↑ */}
      </Container>
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
