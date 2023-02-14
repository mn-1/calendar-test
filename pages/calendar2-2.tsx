/**
 * resourceTimeGridPluginを使っている
 * https://fullcalendar.io/docs/vertical-resource-view
 *
 * libから配列に入れたものを持ってくるパターン
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
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
// lib
import { resources } from '../lib/data';
import EventControl from '../lib/eventControl-2';

export type UpdateFormDataInfo = {
  title: string;
  start: Date;
  end: Date;
};

const SampleCalendar = () => {
  // 予定を追加する際にCalendarオブジェクトのメソッドを使用する必要がある。 (CalendarオブジェクトはRef経由でアクセスする必要がある。)
  const calendarRef = createRef<FullCalendar>();

  const { myEvents, getEvents, handleDateSelect, setMyEvents } = EventControl();

  useEffect(() => {
    getEvents();
  });

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
        {myEvents.length != 0 && (
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
                initialEvents={myEvents}
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
        )}
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
