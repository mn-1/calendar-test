/**
 * これできた
 * https://codesandbox.io/s/fullcalendar-react-draggable-forked-ehr0h?file=/src/App.js:0-3783
 *
 * https://github.com/fullcalendar/fullcalendar-react/issues/118
 */
import React, { useEffect, useState, useRef, memo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {
  Draggable,
  EventReceiveArg,
} from '@fullcalendar/interaction';
import { ExternalEvent } from '../components/FullCalendar/ExternalEvents';

const externalEvents = [
  { title: 'Art 1', color: '#0097a7', id: 34432 },
  { title: 'Art 2', color: '#f44336', id: 323232 },
  { title: 'Art 3', color: '#f57f17', id: 1111 },
  { title: 'Art 4', color: '#90a4ae', id: 432432 },
];

export default function App() {
  // IDセット
  const [countId, setCountId] = useState<number>(0);
  // イベント一覧収納
  const [myEvents, setMyEvents] = useState<any>([
    {
      id: 1,
      title: 'All-day event',
      color: '#388e3c',
      start: '2020-12-12',
      end: '2020-12-12',
    },
    {
      id: 2,
      title: 'Timed event',
      color: '#0097a7',
      start: '2020-12-07',
      end: '2020-12-10',
    },
  ]);

  // handle event receive
  const handleEventReceive = (eventInfo: EventReceiveArg) => {
    const newEvent = {
      id: eventInfo.draggedEl.getAttribute('data-id'),
      title: eventInfo.draggedEl.getAttribute('title'),
      color: eventInfo.draggedEl.getAttribute('data-color'),
      start: eventInfo.event.start,
      end: eventInfo.event.end,
      custom: eventInfo.draggedEl.getAttribute('data-custom'),
    };

    setMyEvents((myEvents: any) => {
      return {
        ...myEvents,
        newEvent,
      };
    });
    console.log(myEvents);
  };

  return (
    <div>
      <div style={{ float: 'left', width: '25%' }}>
        {externalEvents.map((event) => (
          <ExternalEvent key={event.id} event={event} />
        ))}
      </div>

      <div style={{ float: 'left', width: '75%' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          //
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          droppable={true}
          //
          weekends={true}
          initialEvents={myEvents}
          //   events={state.calendarEvents}
          drop={(arg) => {
            console.log('drop から', arg);
          }}
          eventReceive={handleEventReceive}
          eventsSet={(event: any) => {
            console.log(event);
            // setMyEvents(event);
          }}
        />
      </div>
    </div>
  );
}
