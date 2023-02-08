/**
 * resourceTimeGridPluginを使っている
 */
import React, { useState } from 'react';
// MUI
import { Box, Container, Grid } from '@mui/material';
// FullCalendar
import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // 週表示を可能にする
import dayGridPlugin from '@fullcalendar/daygrid'; // 月表示を可能にする
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // 日付や時間が選択できるようになる
import jaLocale from '@fullcalendar/core/locales/ja';
import listPlugin from '@fullcalendar/list'; // 予定をリスト表示
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
// components
import InputSchedule from '../components/Dialog/inputSchedule';

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

const SampleCalendar: React.FC = (props) => {
  /**
   * 予定を追加する際にCalendarオブジェクトのメソッドを使用する必要がある。
   * (CalendarオブジェクトはRef経由でアクセスする必要がある。)
   */
  const ref = React.createRef<any>();

  const [inView, setInView] = useState<boolean>(false);
  // 登録されたイベントが格納されていく配列
  const [myEvents, setMyEvents] = useState<newEventsType[]>([]);

  const events = [
    { title: 'eventを', start: '2023-01-09' },
    {
      title: 'こんな感じで追加できます',
      start: '2023-01-10',
      end: '2023-01-12',
    },
  ];

  const eventData = { title: 'my event', duration: '02:00' };
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
              // this allows things to be dropped onto the calendar
              droppable={true}
              drop={(arg) => {
                console.log(arg);
              }}
              plugins={[resourceTimeGridPlugin]}
              initialView='resourceTimeGridDay'
              resources={[
                { title: '店舗A' },
                { title: '店舗B' },
                { title: '店舗C' },
              ]}
              slotDuration='00:30:00'
              selectable={true}
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5], // 0:日曜 〜 7:土曜
                startTime: '00:00',
                endTIme: '24:00',
              }}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: '',
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
