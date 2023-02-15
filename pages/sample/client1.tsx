/**
 * resourceTimeGridPluginを使っている
 * https://fullcalendar.io/docs/vertical-resource-view
 *
 * calendar2から
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
import { eventConstraints, resources } from '../../lib/data';
import { getEvents } from '../../lib/eventControl';
import { divideColor } from '../../lib/colorControl';

// components
import Header from '../../components/Header/Header';
import InputSchedule from '../../components/Dialog/inputSchedule';

const ClientCalendar = () => {
  const calendarRef = createRef<FullCalendar>();

  // const [myEvents, setMyEvents] = useState<EventApi[]>([]);
  const [myEvents, setMyEvents] = useState<any>([]);
  const [countId, setCountId] = useState<number>(0);
  const [inputScheduleDialogOpen, setInputShceduleDialogOpen] =
    useState<boolean>(false);
  const [newSchedule, setNewSchedule] = useState({
    id: 0,
    start: '',
    end: '',
    resourceId: '',
  });

  useEffect(() => {
    const events = getEvents();
    // イベントリスト収納
    setMyEvents(events);
    // IDの初期値設定
    setCountId(events.length + 1);
  }, []);

  // イベント追加
  const handleDateSelect = (arg: DateSelectArg): void => {
    const { resource, start, end, view } = arg;

    setInputShceduleDialogOpen(true);

    view.calendar.unselect();

    const { backgroundColor, borderColor } = divideColor(
      new Date(start).getTime(),
      new Date(end).getTime()
    );

    const add = countId + 1;
    setCountId(add);

    if (!title || !resource) return;
    view.calendar.addEvent({
      id: String(countId),
      title,
      start,
      end,
      resourceId: resource.id,
      allDay: false,
      backgroundColor,
      borderColor,
    });
  };

  // イベント削除
  const handleEventClick = (arg: EventClickArg) => {
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
                // Whether to draw a “placeholder” event while the user is dragging
                selectMirror={true}
                // 週末表示するか否か
                weekends={true}
                //Whether the user can resize an event from its starting edge.
                eventResizableFromStart={true}
                // expandRows={true}
                nowIndicator={true}
                slotEventOverlap={false}
                eventReceive={() => {}}
                select={handleDateSelect}
                eventClick={handleEventClick}
                // dateClick={handleDateClick}
                eventsSet={(events: EventApi[]) => {
                  console.log('events:', events);
                  setMyEvents(events);
                }}
                eventResize={handleEventResize}
                eventDrop={handleInnerEventDrop}
                // eventChange={handleEventChange}
              />
            </Grid>
          )}
        </Grid>
        {/* utils ↓ */}
        <InputSchedule
          open={inputScheduleDialogOpen}
          handleClose={() => {
            setInputShceduleDialogOpen(false);
          }}
        />
        {/* utils ↑ */}
      </Container>
    </>
  );
};

export default ClientCalendar;

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  const text = `${eventContent.timeText} ${eventContent.event.title}`;
  return <Typography>{text}</Typography>;
}
