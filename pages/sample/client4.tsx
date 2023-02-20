/** */

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
import AddScheduleDialog from '../../components/Dialog/AddScheduleDialog';
import ScheduleInfoDialog from '../../components/Dialog/ScheduleInfoDialog';
import DeleteSnackbar from '../../components/Snackbar/DeleteSnackbar';
import EditScheduleDialog from '../../components/Dialog/EditScheduleDialog';
import { ExternalEvent } from '../../components/FullCalendar/ExternalEvents';

const ClientCalendar = () => {
  const calendarRef = createRef<FullCalendar>();

  // ダイアログ
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);

  const {
    countId,
    myEvents,
    addDialogOpen,
    eventInfo,
    editDialogOpen,
    selectInfo,
    setEditDialogOpen,
    editSchedule,
    setEventInfo,
    getEvents,
    setCountId,
    setMyEvents,
    setSelectInfo,
    addSchedule,
    setAddDialogOpen,
  } = EventControl();

  useEffect(() => {
    getEvents();
  }, []);

  // 予定登録ダイアログ開く
  const handleDateSelect = (arg: DateSelectArg) => {
    console.log('selectInfo:', arg);
    setAddDialogOpen(true);

    const add = countId + 1;
    setCountId(add);

    setSelectInfo({
      id: `${countId}`,
      startStr: arg.startStr,
      endStr: arg.endStr,
      resourceId: arg.resource ? arg.resource.id : '',
      resourceTitle: arg.resource ? arg.resource.title : '',
      calendar: arg.view.calendar,
    });
  };

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

  // イベント移動
  const handleInnerEventDrop = (arg: EventDropArg) => {
    const { start, end } = arg.event;

    // startとendを取得できなかったら戻す
    if (!start || !end) return arg.revert();
    const { color } = divideColor(
      new Date(start).getTime(),
      new Date(end).getTime()
    );

    // 色だけ修正
    arg.event.setProp('color', color);
  };

  // 予定のサイズ変更
  const handleEventResize = (arg: EventResizeDoneArg) => {
    const { start, end } = arg.event;

    // startとendを取得できなかったら戻す
    if (!start || !end) return arg.revert();
    const { color } = divideColor(
      new Date(start).getTime(),
      new Date(end).getTime()
    );

    // 色だけ修正
    arg.event.setProp('color', color);
  };

  // 外部のイベント追加
  const drop = (arg: DropArg) => {
    console.log(arg);
  };

  // 外部のイベント受付
  const handleEventReceive = (arg: EventReceiveArg) => {
    const start = arg.event.start;
    let end = start;

    if (!start || !end) return console.log('start none');
    end = new Date(end.setHours(start.getHours() + 2));

    const { color } = divideColor(
      new Date(start).getTime(),
      new Date(end).getTime()
    );

    arg.event.setProp('color', color);
    arg.event.setEnd(end);
  };

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
        <Grid
          container
          direction='row'
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Grid item sm={2}>
            <Grid container direction='column'>
              {externalEvents.map((event) => (
                <ExternalEvent
                  key={event.extendedProps.Username}
                  event={event}
                />
              ))}
            </Grid>
          </Grid>
          <Grid item sm={9} sx={{ mx: 6 }}>
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
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right:
                    'dayGridMonth,timeGridWeek,resourceTimeGridWeek,resourceTimelineDay,resourceTimeGridDay',
                }}
                initialView='resourceTimeGridDay'
                eventContent={renderEventContent}
                //
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
                select={handleDateSelect}
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
        {selectInfo && addDialogOpen && (
          <AddScheduleDialog
            selectInfo={selectInfo}
            operator={operator}
            location={resources}
            open={addDialogOpen}
            handleClose={() => {
              setAddDialogOpen(false);
            }}
            addSchedule={addSchedule}
          />
        )}
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
