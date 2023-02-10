/**
 * できた
 * https://codesandbox.io/s/full-calendar-react-template-7o7bl?file=/src/data.ts:0-3430
 */
import { createRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import moment from 'moment-timezone';
import { events, eventConstraints, resources } from '../lib/data';

export default function App() {
  const calendarRef = createRef<FullCalendar>();

  // IDカウント
  const [countId, setCountId] = useState<number>(0);

  const handleDateClick = (arg: DateClickArg) => {
    console.log(arg);
    const title = prompt('Please enter a new title for your event');
    const calendarApi = arg.view.calendar;

    // https://fullcalendar.io/docs/unselect-callback
    calendarApi.unselect();

    const add = countId + 1;
    setCountId(add);

    if (!title) return;
    calendarApi.addEvent({
      id: String(countId),
      title,
      start: arg.dateStr,
      resourceId: arg.resource?.id,
      // end: selectInfo.endStr,
      slotDuration: '01:00:00',
      allDay: false,
      color: '#3CB371',
    });
  };

  const handleEventClick = (arg: any) => {
    console.log(arg);
  };

  useEffect(() => {
    // カレンダーが先にあってその後に取ってるから遅いのか
    if (calendarRef && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      //   window.dateOnClick = calendarApi.select;

      // イベント一覧取得
      console.log('calendarApi:', calendarApi.getEvents());
    }
  }, [calendarRef]);

  // 設定以上に予定を大きくできなくする
  const handleResizeStart = (arg: any) => {
    const resources = arg.event.getResources();
    const eventEndTime = moment(arg.event.endStr).minute();
    if (calendarRef.current) {
      if (+eventEndTime === 10) {
        console.log('sfsdfsd');
        calendarRef.current?.getApi().setOption('snapDuration', { minute: 5 });
      }
      eventConstraints.forEach((item) => {
        if (+resources[0].id === +item.resourceId) {
          calendarRef.current?.getApi().addEvent(item);
        }
      });
    }
  };

  const handleResizeStop = () => {
    if (calendarRef.current) {
      calendarRef.current?.getApi().setOption('snapDuration', { minute: 15 });

      eventConstraints.forEach((item) => {
        const event = calendarRef.current?.getApi().getEventById(item.id);

        event?.remove();
      });
    }
  };

  const businessHours = {
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    startTime: '8:00:00',
    endTime: '18:00:00',
  };

  return (
    <div className='App'>
      <FullCalendar
        events={events}
        businessHours={businessHours}
        plugins={[
          resourceTimeGridPlugin,
          interactionPlugin,
          //   momentTimezonePlugin,
          scrollGridPlugin,
        ]}
        headerToolbar={{
          start: 'title',
          center: 'futureDay',
          end: 'today prev,next',
        }}
        initialView='resourceTimeGridDay'
        //
        allDaySlot={false}
        editable={true}
        eventResizableFromStart={true}
        expandRows={true}
        nowIndicator={true}
        selectable={true}
        slotEventOverlap={false}
        //
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        // eventConstraint={businessHours}
        // eventResizeStart={handleResizeStart}
        // eventResizeStop={handleResizeStop}
        ref={calendarRef}
        resources={resources}
        slotLabelInterval={{ hour: 1 }}
        slotDuration={{ minute: 30 }}
      />
    </div>
  );
}
