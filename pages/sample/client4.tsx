/** */

// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Typography, Button } from '@mui/material';
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
  DropArg,
  EventReceiveArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
// lib
import { resources, externalEvents, operator } from '../../lib/data';
import EventControl from '../../lib/eventControl-3';
import { divideColor } from '../../lib/colorControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/ScheduleInfoDialog';
import DeleteSnackbar from '../../components/Snackbar/DeleteSnackbar';
import EditScheduleDialog from '../../components/Dialog/EditScheduleDialog';
import { ExternalEvent } from '../../components/FullCalendar/ExternalEvents';
import { CalendarHeader } from '../../components/FullCalendar/Header';

const ClientCalendar = () => {
  const calendarRef = createRef<FullCalendar>();

  // ダイアログ
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    countId,
    myEvents,
    addDialogOpen,
    eventInfo,
    editDialogOpen,

    setEditDialogOpen,
    editSchedule,
    setEventInfo,
    getEvents,
    setCountId,
    setMyEvents,

    setAddDialogOpen,
  } = EventControl();

  useEffect(() => {
    getEvents();
    if (calendarRef.current) console.log(calendarRef.current.getApi().view);
  }, []);

  // イベント詳細表示ダイアログ開く
  const handleEventClick = (arg: EventClickArg) => {
    setInfoDialogOpen(true);
    setEventInfo(arg);
  };

  // 予定を削除したのを取り消す
  const undoDelete = () => {
    if (!eventInfo || !calendarRef.current) return;
    const {
      id,
      borderColor,
      backgroundColor,
      title,
      startStr,
      endStr,
      extendedProps,
    } = eventInfo.event;

    calendarRef.current.getApi().addEvent({
      id,
      title,
      start: startStr,
      end: endStr,
      resourceId: eventInfo.event.getResources()[0]._resource.id,
      extendedProps: {
        memo: extendedProps.memo ?? '',
        operatorName: extendedProps.operatorName ?? '',
        avatar: extendedProps.avatar ?? '',
      },
      allDay: false,
      backgroundColor,
      borderColor,
    });

    setDeleteSnackbarOpen(false);
  };

  /**
   * イベント移動
   */
  const handleInnerEventDrop = (arg: EventDropArg) => {
    const { start, end } = arg.event;

    // startとendを取得できなかったら戻す
    if (!start || !end) return arg.revert();
    const { color } = divideColor(
      new Date(start).getTime(),
      new Date(end).getTime()
    );

    arg.event.setProp('color', color);
  };

  /**
   * 予定のサイズ変更
   */
  const handleEventResize = (arg: EventResizeDoneArg) => {
    const { start, end } = arg.event;

    // startとendを取得できなかったら戻す
    if (!start || !end) return arg.revert();
    const { color } = divideColor(start.getTime(), end.getTime());

    arg.event.setProp('color', color);
  };

  /**
   * 外部のイベント追加
   */
  const drop = (arg: DropArg) => {
    console.log(arg);
  };

  /**
   * 外部のイベント受付
   */
  const handleEventReceive = (arg: EventReceiveArg) => {
    const start = arg.event.start;
    let end = start;

    if (!start || !end) return arg.event.remove();
    end = new Date(end.setHours(start.getHours() + 2));

    const { color } = divideColor(start.getTime(), end.getTime());

    const add = countId + 1;
    setCountId(add);

    arg.event.setProp('id', `${add}`);
    arg.event.setProp('color', color);
    arg.event.setEnd(end);
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
        <Button
          variant='contained'
          sx={{ mb: '1rem', mx: '1rem' }}
          onClick={() => {
            if (!calendarRef.current) return;
            console.log(calendarRef.current.getApi().view.type);
            if (calendarRef.current.getApi().view.type != 'resourceTimeGridDay')
              return;
            setEditMode(!editMode);
          }}
        >
          {editMode ? '編集終了' : '編集する'}
        </Button>

        <Grid
          container
          direction='row'
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          {editMode && (
            <Grid item sm={3} sx={{ px: '1rem' }}>
              <Grid container direction='column'>
                {externalEvents.map((event) => (
                  <ExternalEvent
                    key={event.extendedProps.Username}
                    event={event}
                  />
                ))}
              </Grid>
            </Grid>
          )}

          <Grid item sm={calendarSize} sx={{ px: '1rem' }}>
            <CalendarHeader calendarRef={calendarRef} editMode={editMode} />
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
                headerToolbar={false}
                droppable={true}
                editable={true}
                selectable={false}
                selectMirror={true}
                weekends={true}
                eventResizableFromStart={true}
                nowIndicator={true}
                allDaySlot={false}
                slotEventOverlap={true}
                //
                eventReceive={handleEventReceive}
                drop={drop}
                eventClick={handleEventClick}
                eventsSet={(events: EventApi[]) => {
                  console.log('events:', events);
                  setMyEvents(events);
                }}
                eventResize={handleEventResize}
                eventDrop={handleInnerEventDrop}
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
            operator={operator}
            location={resources}
            handleClose={() => setEditDialogOpen(false)}
            editSchedule={editSchedule}
          />
        )}
        <ScheduleInfoDialog
          eventInfo={eventInfo}
          open={infoDialogOpen}
          delete={() => {
            if (eventInfo) eventInfo.event.remove();
            setInfoDialogOpen(false);
            setDeleteSnackbarOpen(true);
          }}
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
    <Typography>
      {eventContent.timeText}
      {eventContent.event.extendedProps.operatorName}
    </Typography>
  );
}
