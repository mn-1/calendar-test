/**
 *
 * test4を修正したやつ
 */

// react
import React, { useState, useRef, createRef } from 'react';
// MUI
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
// fullcalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DropArg } from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';

export default function Test5() {
  const eventRef = createRef<any>();
  // 予約の配列
  const [myEvents, setMyEvents] = useState<EventApi[]>([]);
  // IDカウント
  const [countId, setCountId] = useState<number>(0);

  // 予約追加
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // select https://fullcalendar.io/docs/select-callback
    // selectInfoの中身 {allDay:true,end:Wed Feb 08 2023 00:00:00 GMT+0900 (日本標準時),endStr:"2023-02-08",jsEvent:MouseEvent,start:Tue Feb 07 2023 00:00:00 GMT+0900 (日本標準時),sartStr:"2023-02-07",view:ViewImpl}
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    // https://fullcalendar.io/docs/unselect-callback
    calendarApi.unselect();

    const add = countId + 1;
    setCountId(add);

    if (!title) return;
    calendarApi.addEvent({
      id: String(countId),
      title,
      start: selectInfo.startStr,
      // end: selectInfo.endStr,
      slotDuration: '01:00:00',
      allDay: false,
      color: '#3CB371',
    });
  };

  // 同じく予約追加
  const add = ({ start, end, view: { calendar } }: DateSelectArg): void => {
    const title = prompt('Please enter a new title for your event');
    calendar.unselect();

    const add = countId + 1;
    setCountId(add);

    if (!title) return;
    calendar.addEvent({
      id: String(countId),
      title,
      start,
      end: end,
      // slotDuration: '01:00:00',// 間隔決めれる
      allDay: false,
      color: '#3CB371',
    });
    console.log('eventRef:', eventRef.current);
  };

  // 予約削除
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`${clickInfo.event.title}の予定を削除してよろしいでしょうか。`))
      clickInfo.event.remove();
  };

  const handleDrop = (arg: DropArg) => {
    console.log(arg);
    const calendarApi = arg.view.calendar;

    calendarApi.unselect();

    const add = countId + 1;
    setCountId(add);

    const event = {
      id: myEvents.length,
      title: 'test',
      start: new Date(),
      slotDuration: '01:00:00',
    };

    eventRef.current.getApi().addEvent(event);

    calendarApi.addEvent({
      id: String(countId),
      title: 'drop test',
      duration: '02:00',
    });
  };
  //

  return (
    <>
      <Container maxWidth={false}>
        <Grid
          container
          direction='row'
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Grid item sm={2}>
            <div
              id='mydraggable'
              draggable={true}
              data-event='{ "title": "my event", "duration": "02:00" }'
            >
              drag me
            </div>
            <h2>予約一覧 ( {myEvents.length} )</h2>
            <ul>
              {myEvents.map((event) => (
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
              ref={eventRef}
              locales={[jaLocale]}
              locale='ja'
              eventColor='#6A5ACD'
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              initialView='timeGridWeek'
              eventContent={renderEventContent}
              droppable={true}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              nowIndicator={true}
              allDaySlot={false}
              drop={handleDrop}
              // select={handleDateSelect}
              select={add}
              eventClick={handleEventClick}
              // これは予約が変更・追加・削除全部
              eventsSet={(events: EventApi[]) => {
                console.log('events:', events);
                setMyEvents(events);
              }}
              /* こっちは個別の設定できる DB操作とかに使う
              you can update a remote database when these fire:*/
              eventChange={(changeInfo) =>
                console.log('changeInfo:', changeInfo)
              }
              eventRemove={(removeInfo) => {
                console.log('removeInfo:', removeInfo);
              }}
              eventAdd={(addInfo) => {
                console.log('addInfo:', addInfo);
              }}
              // 登録済みのeventをドロップした時
              eventDrop={(eventDropInfo) => {
                console.log('eventDropInfo:', eventDropInfo);
              }}
              eventReceive={(eventReceiveInfo) => {
                console.log(eventReceiveInfo);
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  const text = `${eventContent.timeText}  ${eventContent.event.title}`;
  return <Typography>{text}</Typography>;
}
