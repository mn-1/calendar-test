/**
 * 予定登録
 * 予定クリックしたら削除
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
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { Draggable, DropArg } from '@fullcalendar/interaction';
// lib
import { resources, operator } from '../../lib/data';
import EventControl from '../../lib/eventControl-2';
import { divideColor } from '../../lib/colorControl';
// components
import Header from '../../components/Header/Header';
import RegisterScheduleDialog from '../../components/Dialog/AddScheduleDialog';

const ClientCalendar = () => {
  const calendarRef = createRef<FullCalendar>();

  const {
    countId,
    myEvents,
    inputScheduleDialogOpen,
    getEvents,
    setCountId,
    setView,
    setMyEvents,
    setNewSchedule,
    registerSchedule,
    setInputScheduleDialogOpen,
  } = EventControl();

  useEffect(() => {
    getEvents();
  }, []);

  // 予定追加ダイアログopen
  const handleDateSelect = (arg: DateSelectArg) => {
    const { resource, start, end, view } = arg;

    const endDate = new Date(end.setHours(start.getHours() + 2));

    setInputScheduleDialogOpen(true);

    const add = countId + 1;
    setCountId(add);

    if (resource)
      setNewSchedule({
        id: String(countId),
        start: start,
        end: endDate,
        resourceId: resource.id,
      });
    setView(view);
  };

  // イベント削除
  const handleEventClick = (arg: EventClickArg) => {
    console.log('eventClickArg:', arg);
    if (confirm(`${arg.event.title}の予定を削除してよろしいでしょうか。`))
      arg.event.remove();
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
                resources={resources}
                slotDuration='00:30:00'
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
                allDaySlot={false}
                droppable={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                weekends={true}
                eventResizableFromStart={true}
                nowIndicator={true}
                slotEventOverlap={false}
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
          open={inputScheduleDialogOpen}
          handleClose={() => {
            setInputScheduleDialogOpen(false);
          }}
          registerSchedule={registerSchedule}
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
    <>
      <Typography>
        時間：{eventContent.timeText} <br />
        オペレーター：{eventContent.event.extendedProps.operatorName} <br />
        アバター：{eventContent.event.extendedProps.avatar}
        <br />
        タイトル：{eventContent.event.title}
        <br />
        メモ：{eventContent.event.extendedProps.memo}
      </Typography>
    </>
  );
}
