/**
 * 予定をカレンダーの外に出すと消える
 * https://www.mendelowski.com/docs/react/removing-event-from-fullcalendar-by-dragging-out/
 */
import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { EventDragStopArg } from '@fullcalendar/interaction';
import { DateSelectArg } from '@fullcalendar/core';
import { Grid } from '@mui/material';

export default function App() {
  //

  const container = useRef(null);
  const externalEvent = useRef<any>(null);

  // 予定追加
  const add = (selectInfo: DateSelectArg): void => {
    console.log(selectInfo);
    console.log(selectInfo.resource);
    selectInfo.view.calendar.addEvent({
      start: selectInfo.start,
      end: selectInfo.end,
    });
  };

  const remove = ({
    event,
    jsEvent,
    view: { calendar },
  }: EventDragStopArg): void => {
    console.log(jsEvent);
    if (!container.current) return;
    if (inElement({ x: jsEvent.pageX, y: jsEvent.pageY }, container.current!))
      return;

    event.remove();
  };

  return (
    <Grid sx={{ m: '4rem' }}>
      <div
        ref={externalEvent}
        draggable={true}
        onDragStart={(event) => {
          console.log('drag start', externalEvent);
          if (!externalEvent.current) return;
          if (
            !inElement(
              { x: event.pageX, y: event.pageY },
              externalEvent.current!
            )
          )
            return;

          // calendar.addEvent({ start, end });
        }}
        onDragEnd={() => {}}
      >
        要素
      </div>
      <div ref={container}>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          allDaySlot={false}
          dragRevertDuration={0}
          initialView='timeGridWeek'
          headerToolbar={false}
          editable={true}
          eventOverlap={false}
          eventDragStop={remove}
          drop={(arg) => {
            console.log(arg);
          }}
          eventsSet={(event) => {
            console.log(event);
          }}
          //   eventDragStart={}
          select={add}
          selectable={true}
          selectOverlap={false}
          themeSystem='bootstrap'
        />
      </div>
    </Grid>
  );
}

function inElement(
  point: { x: number; y: number },
  element: HTMLElement
): boolean {
  const rect = element.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const bottom = rect.bottom + window.scrollY;
  const left = rect.left + window.scrollX;
  const right = rect.right + window.scrollX;

  return (
    point.x >= left && point.x <= right && point.y >= top && point.y <= bottom
  );
}

function outElement(
  point: { x: number; y: number },
  element: HTMLElement
): boolean {
  const rect = element.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const bottom = rect.bottom + window.scrollY;
  const left = rect.left + window.scrollX;
  const right = rect.right + window.scrollX;

  return (
    point.x >= left && point.x <= right && point.y >= top && point.y <= bottom
  );
}
