/**
 * 予定登録
 * 予定クリックしたら詳細開く
 */

// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import jaLocale from '@fullcalendar/core/locales/ja';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventInput,
  EventDropArg,
  EventChangeArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {
  DateClickArg,
  EventResizeDoneArg,
  Draggable,
  DropArg,
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { EventImpl } from '@fullcalendar/core/internal';
// lib
import { eventConstraints, resources, operator, avatar } from '../../lib/data';
import EventControl from '../../lib/eventControl-2';
import { divideColor } from '../../lib/colorControl';
import { RegisterScheduleDataInfo } from '../../lib/inputDataControl';
// components
import Header from '../../components/Header/Header';
import RegisterScheduleDialog from '../../components/Dialog/RegisterScheduleDialog';
import ScheduleInfoDialog from '../../components/Dialog/ScheduleInfoDialog';
import DeleteSnackbar from '../../components/Snackbar/DeleteSnackbar';
import EditScheduleDialog from '../../components/Dialog/EditScheduleDialog';

const ClientCalendar = () => {
  const calendarRef = createRef<FullCalendar>();

  // ダイアログ
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  // 予定情報
  const [eventInfo, setEventInfo] = useState<EventClickArg | null>(null);

  const {
    countId,
    myEvents,
    registerDialogOpen,
    getEvents,
    setCountId,
    setMyEvents,
    setSelectInfo,
    registerSchedule,
    setRegisterDialogOpen,
  } = EventControl();

  useEffect(() => {
    getEvents();
  }, []);

  const handleDateSelect = (arg: DateSelectArg) => {
    setRegisterDialogOpen(true);

    const add = countId + 1;
    setCountId(add);

    setSelectInfo(arg);
  };

  // イベント詳細表示
  const handleEventClick = (arg: EventClickArg) => {
    setInfoDialogOpen(true);
    setEventInfo(arg);
  };

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

    console.log(eventInfo);
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
    const { backgroundColor, borderColor } = divideColor(
      new Date(start).getTime(),
      new Date(end).getTime()
    );

    // 色だけ修正
    arg.event.setProp('backgroundColor', backgroundColor);
    arg.event.setProp('borderColor', borderColor);
  };

  const handleEventResize = (arg: EventResizeDoneArg) => {
    const { start, end } = arg.event;

    // startとendを取得できなかったら戻す
    if (!start || !end) return arg.revert();
    const { backgroundColor, borderColor } = divideColor(
      new Date(start).getTime(),
      new Date(end).getTime()
    );

    // 色だけ修正
    arg.event.setProp('backgroundColor', backgroundColor);
    arg.event.setProp('borderColor', borderColor);
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
          {myEvents.length != 0 && (
            <Grid item sm={12} sx={{ mx: 6 }}>
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
                  interactionPlugin,
                  scrollGridPlugin,
                ]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: '',
                }}
                initialView='resourceTimeGridDay'
                eventContent={renderEventContent}
                //
                droppable={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                weekends={true}
                eventResizableFromStart={true}
                nowIndicator={true}
                allDaySlot={false}
                slotEventOverlap={false}
                //
                eventReceive={() => {}}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventsSet={(events: EventApi[]) => {
                  console.log('events:', events);
                  setMyEvents(events);
                }}
                eventResize={handleEventResize}
                eventDrop={handleInnerEventDrop}
              />
            </Grid>
          )}
        </Grid>
        {/* utils ↓ */}
        <RegisterScheduleDialog
          operator={operator}
          avatar={avatar}
          open={registerDialogOpen}
          handleClose={() => {
            setRegisterDialogOpen(false);
          }}
          registerSchedule={registerSchedule}
        />
        <EditScheduleDialog
          operator={operator}
          avatar={avatar}
          open={editDialogOpen}
          handleClose={() => {
            setEditDialogOpen(false);
          }}
          registerSchedule={registerSchedule}
        />
        <ScheduleInfoDialog
          eventInfo={eventInfo}
          open={infoDialogOpen}
          delete={() => {
            if (eventInfo) eventInfo.event.remove();
            setInfoDialogOpen(false);
            setDeleteSnackbarOpen(true);
          }}
          edit={() => setEditDialogOpen(true)}
          close={() => {
            setInfoDialogOpen(false);
          }}
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
  const text = `${eventContent.timeText}  ${eventContent.event.title}`;
  return (
    <Typography>
      {eventContent.timeText} {eventContent.event.extendedProps.operatorName}
    </Typography>
  );
}
