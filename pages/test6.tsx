import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {
  Draggable,
  DropArg,
} from '@fullcalendar/interaction';
import Alert from 'sweetalert2';
import { EventClickArg } from '@fullcalendar/core';
import { Grid } from '@mui/material';
import { useRef } from 'react';

const state = {
  calendarEvents: [
    {
      title: 'Atlanta Monster',
      start: new Date('2019-04-04 00:00'),
      id: '99999998',
    },
    {
      title: 'My Favorite Murder',
      start: new Date('2019-04-05 00:00'),
      id: '99999999',
    },
  ],
  events: [
    { title: 'Event 1', id: '1' },
    { title: 'Event 2', id: '2' },
    { title: 'Event 3', id: '3' },
    { title: 'Event 4', id: '4' },
    { title: 'Event 5', id: '5' },
  ],
};

export default function Test() {
  const calendarComponentRef = useRef(null);

  const componentDidMount = () => {
    let draggableEl = document.getElementById('external-events');
    if (draggableEl)
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          let title = eventEl.getAttribute('title');
          let id = eventEl.getAttribute('data');
          return {
            title: title,
            id: id,
          };
        },
      });
  };

  const eventClick = (clickInfo: EventClickArg) => {
    Alert.fire({
      title: clickInfo.event.title,
      html:
        `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr >
      <td>Title</td>
      <td><strong>` +
        clickInfo.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ` +
        clickInfo.event.start +
        `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Remove Event',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.value) {
        clickInfo.event.remove(); // It will remove event from the calendar
        Alert.fire('Deleted!', 'Your Event has been deleted.', 'success');
      }
    });
  };
  return (
    <>
      <div className='animated fadeIn p-4 demo-app'>
        <Row>
          <Col lg={3} sm={3} md={3}>
            <div
              id='external-events'
              style={{
                padding: '10px',
                width: '80%',
                height: 'auto',
                maxHeight: '-webkit-fill-available',
              }}
            >
              <Grid container alignItems='center'>
                <strong> Events</strong>
                {state.events.map((event) => (
                  <div
                    draggable={true}
                    className='fc-event'
                    title={event.title}
                    // data={event.id}
                    key={event.id}
                  >
                    {event.title}
                  </div>
                ))}
              </Grid>
            </div>
          </Col>

          <Col lg={9} sm={9} md={9}>
            <div className='demo-app-calendar' id='mycalendartest'>
              <FullCalendar
                initialView='dayGridMonth'
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                }}
                rerenderDelay={10}
                eventDurationEditable={false}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={calendarComponentRef}
                weekends={true}
                events={state.calendarEvents}
                // eventDrop={drop}
                // drop={drop}
                // eventReceive={this.eventReceive}
                eventClick={eventClick}
                selectable={true}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
