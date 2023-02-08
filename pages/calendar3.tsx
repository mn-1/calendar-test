/**
 *
 * test4を修正したやつ
 */

// react
import React, { useState } from 'react';
// MUI
import { Box, Container, Grid } from '@mui/material';
// fullcalendar
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventInput,
  EventDropArg,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {
  Draggable,
  DropArg,
} from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

export default function Test5() {
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
      end: selectInfo.endStr,
      allDay: false,
    });
  };

  // 予約削除
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`${clickInfo.event.title}の予定を削除してよろしいでしょうか。`))
      clickInfo.event.remove();
  };

  const handleEventDrop = (arg: DropArg) => {
    const calendarApi = arg.view.calendar;

    calendarApi.unselect();

    const add = countId + 1;
    setCountId(add);

    calendarApi.addEvent({
      id: String(countId),
      title: 'drop test',
      duration: '02:00',
    });
  };

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
              locales={[jaLocale]}
              locale='ja'
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              initialView='timeGridWeek'
              // this allows things to be dropped onto the calendar
              droppable={true}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              // 外からのeventをドロップした時
              drop={handleEventDrop}
              select={handleDateSelect}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              // これは予約が変更・追加・削除全部
              eventsSet={(events: EventApi[]) => {
                console.log(events);
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
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}
