import FullCalendar from '@fullcalendar/react';
import { Calendar } from '@fullcalendar/core';

export default function Test() {
  document.addEventListener('DOMContentLoaded', function () {
    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendar.Draggable;

    var containerEl = document.getElementById('external-events');
    var calendarEl = document.getElementById('calendar');
    var checkbox = document.getElementById('drop-remove');

    // initialize the external events
    // -----------------------------------------------------------------

    new Draggable(containerEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
        };
      },
    });

    // initialize the calendar
    // -----------------------------------------------------------------

    var calendar = new Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      drop: function (info) {
        // is the "remove after drop" checkbox checked?
        if (checkbox.checked) {
          // if so, remove the element from the "Draggable Events" list
          info.draggedEl.parentNode.removeChild(info.draggedEl);
        }
      },
    });

    calendar.render();
  });

  return (
    <>
      <div id='external-events'>
        <p>
          <strong>Draggable Events</strong>
        </p>

        <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
          <div className='fc-event-main'>My Event 1</div>
        </div>
        <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
          <div className='fc-event-main'>My Event 2</div>
        </div>
        <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
          <div className='fc-event-main'>My Event 3</div>
        </div>
        <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
          <div className='fc-event-main'>My Event 4</div>
        </div>
        <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
          <div className='fc-event-main'>My Event 5</div>
        </div>
      </div>

      <div id='calendar-container'>
        <div id='calendar'></div>
      </div>
    </>
  );
}
