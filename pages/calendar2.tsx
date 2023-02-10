/**
 * resourceTimeGridPluginを使っている
 * https://fullcalendar.io/docs/vertical-resource-view
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
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { Draggable, DropArg } from '@fullcalendar/interaction';
// lib
import { eventConstraints, resources } from '../lib/data';
import eventControl from '../lib/eventControl';
import { Loading } from '../components/Loading/loading';
import EventControl from '../lib/eventControl';

export type UpdateFormDataInfo = {
  title: string;
  start: Date;
  end: Date;
};

const SampleCalendar = () => {
  // 予定を追加する際にCalendarオブジェクトのメソッドを使用する必要がある。 (CalendarオブジェクトはRef経由でアクセスする必要がある。)
  const calendarRef = createRef<FullCalendar>();

  // const [countId, setCountId] = useState<number>(0);
  // const [myEvents, setMyEvents] = useState<EventApi[]>([]);
  // const [myEvents, setMyEvents] = useState<any>([]);

  const { getEvents } = EventControl();

  // useEffect(() => {
  //   const events = getEvents();
  //   // イベントリスト収納
  //   setMyEvents(events);
  //   // IDの初期値設定
  //   setCountId(events.length + 1);
  // }, []);

  const events = getEvents();

  const handleDateSelect = ({
    resource,
    start,
    end,
    view: { calendar },
  }: DateSelectArg): void => {
    const title = prompt('Please enter a new title for your event');
    calendar.unselect();

    const add = countId + 1;
    setCountId(add);

    if (!title) return;
    calendar.addEvent({
      id: String(countId),
      title,
      start,
      end: end + '01:00:00',
      resourceId: resource?.id,
      // slotDuration: '01:00:00',// 間隔決めれる
      allDay: false,
      color: '#3CB371',
    });
    console.log('eventRef:', calendarRef.current);
  };

  // 予約削除
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`${clickInfo.event.title}の予定を削除してよろしいでしょうか。`))
      clickInfo.event.remove();
  };

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          height: '100%',
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
            <h2>予約一覧 ( {myEvents.length} )</h2>
            <ul>
              {myEvents.map((event: any) => (
                <li key={event.id}>
                  <b>
                    {formatDate(event.start!, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </b>
                  <i>{event.title}</i>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item sm={10}>
            <FullCalendar
              initialEvents={events}
              ref={calendarRef}
              locales={[jaLocale]}
              locale='ja'
              eventColor='#6A5ACD'
              resources={resources}
              slotDuration='00:30:00'
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5, 6], // 0:日曜 〜 6:土曜
                startTime: '8:00:00',
                endTime: '20:00:00',
              }}
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
              // ここからボタンとか
              // customButtons={{
              //   futureDay: {
              //     text: 'Future Date',
              //     click: () => {
              //       const calendarApi = calendarRef?.current?.getApi();
              //       let futureDate = new Date('2021-07-30');
              //       calendarApi?.gotoDate(futureDate);
              //     },
              //   },
              // }}
              select={handleDateSelect}
              eventClick={handleEventClick}
              // dateClick={handleDateClick}
              eventsSet={(events: EventApi[]) => {
                // console.log('events:', events);
                setMyEvents(events);
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SampleCalendar;

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  const text = `${eventContent.timeText}  ${eventContent.event.title}`;
  return <Typography>{text}</Typography>;
}
