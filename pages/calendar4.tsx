/**
 * resourceTimeGridPluginを使っているcalendar2に
 * calendar3を追加していくやつ
 */
import React, { useState } from 'react';
// MUI
import { Box, Container, Grid } from '@mui/material';
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
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// components
import InputSchedule from '../components/Dialog/RegisterScheduleDialog';

// 追加するイベントの型。
interface newEventsType {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

export type UpdateFormDataInfo = {
  title: string;
  start: Date;
  end: Date;
};

const SampleCalendar = () => {
  // 予約の配列
  const [myEvents, setMyEvents] = useState<EventApi[]>([]);
  // IDカウント
  const [countId, setCountId] = useState<number>(0);
  const [inView, setInView] = useState<boolean>(false);

  // 予約追加
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

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

  // dropした時
  const eventDrop = (event: any) => {};

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
            <div
              id='draggable-el'
              draggable={true}
              data-event='{ "title": "my event", "duration": "02:00" }'
            >
              drag me
            </div>
          </Grid>
          <Grid item sm={10}>
            <FullCalendar
              locales={[jaLocale]}
              locale='ja'
              plugins={[resourceTimeGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: '',
              }}
              initialView='resourceTimeGridDay'
              droppable={true}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              select={handleDateSelect}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              eventsSet={(events: EventApi[]) => {
                console.log(events);
                setMyEvents(events);
              }}
              resources={[
                { title: '店舗A' },
                { title: '店舗B' },
                { title: '店舗C' },
              ]}
              slotDuration='00:30:00'
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5], // 0:日曜 〜 7:土曜
                startTime: '00:00',
                endTIme: '24:00',
              }}

              // events={myEvents}
            />
          </Grid>
        </Grid>
        {/* utils　↓ */}
        <InputSchedule open={inView} handleClose={() => setInView(false)} />
        {/* utils　↑ */}
      </Container>
    </>
  );
};

export default SampleCalendar;

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}
