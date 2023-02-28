/**
 * resourceTimeGridPluginを使っている
 * https://fullcalendar.io/docs/vertical-resource-view
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
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
  formatDate,
} from '@fullcalendar/core';
import interactionPlugin, {
  EventResizeDoneArg,
  Draggable,
  DropArg,
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
// lib
import { resources } from '../lib/data';
import { getEvents } from '../lib/eventControl';
import { divideColor } from '../lib/colorControl';

export type UpdateFormDataInfo = {
  title: string;
  start: Date;
  end: Date;
};

const SampleCalendar = () => {
  const calendarRef = createRef<FullCalendar>();
  const extarnalEventsRef = createRef<HTMLElement>();

  const [countId, setCountId] = useState<number>(0);
  const [myEvents, setMyEvents] = useState<any>([]);

  useEffect(() => {
    const events = getEvents();
    // イベントリスト収納
    setMyEvents(events);
    // IDの初期値設定
    // setCountId(events.length + 1);

    if (calendarRef.current) console.log(calendarRef.current);

    (() => {
      if (extarnalEventsRef.current)
        new Draggable(extarnalEventsRef.current, {
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
    })();
  }, []);

  // イベント追加
  const handleDateSelect = (arg: DateSelectArg): void => {
    const { resource, start, end, view } = arg;
    const title = prompt('Please enter a new title for your event');
    view.calendar.unselect();

    const { color } = divideColor(
      new Date(start).getTime(),
      new Date(end).getTime()
    );

    const add = countId + 1;
    setCountId(add);

    if (!title || !resource) return;
    view.calendar.addEvent({
      id: String(countId),
      title,
      start,
      end,
      resourceId: resource.id,
      allDay: false,
      color,
    });
  };

  // イベント削除
  const handleEventClick = (arg: EventClickArg) => {
    if (confirm(`${arg.event.title}の予定を削除してよろしいでしょうか。`))
      arg.event.remove();
  };

  // イベント移動
  const handleInnerEventDrop = (arg: EventDropArg) => {
    const { start, end } = arg.event;

    // startとendを取得できなかったら戻す
    if (!start || !end) return arg.revert();
    const { color } = divideColor(
      new Date(start).getTime(),
      new Date(end).getTime()
    );

    // 色だけ修正
    arg.event.setProp('color', color);
  };

  const handleEventResize = (arg: EventResizeDoneArg) => {
    const { start, end } = arg.event;

    // startとendを取得できなかったら戻す
    if (!start || !end) return arg.revert();
    const { color } = divideColor(
      new Date(start).getTime(),
      new Date(end).getTime()
    );

    // 色だけ修正
    arg.event.setProp('color', color);
  };

  const extarnalEvents = [
    { title: 'Event 1', id: '1' },
    { title: 'Event 2', id: '2' },
    { title: 'Event 3', id: '3' },
    { title: 'Event 4', id: '4' },
    { title: 'Event 5', id: '5' },
  ];

  function componentDidMount() {
    if (extarnalEventsRef.current)
      new Draggable(extarnalEventsRef.current, {
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
  }

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          height: '100%',
          mt: '4rem',
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
              <Grid container direction='column'>
                <div
                  id='draggable-el'
                  draggable={true}
                  data-event='{ "title": "my event", "duration": "02:00" }'
                >
                  drag me
                </div>
                <Box ref={extarnalEventsRef}>
                  <p> Events</p>

                  {extarnalEvents.map((event) => (
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
                </Box>
                <div
                  id='external-events'
                  style={{
                    padding: '10px',
                    width: '80%',
                    height: 'auto',
                    maxHeight: '-webkit-fill-available',
                  }}
                ></div>
                {/* <h2>予約一覧 ( {myEvents.length} )</h2>
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
                </ul> */}
              </Grid>
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
                // ここからボタンとか
                // customButtons={{
                //   futureDay: {
                //     text: 'Future Date',
                //     click: () => {
                //       const calendarApi = calendarRef?.current?.getApi();
                //       let futureDate = new Date('2021-07-30');
                //       calendarApi?.gotoDate(futureDate);
                //     },
                //   },
                // }}
                // 登録済みのeventをドロップした時
                eventDrop={handleInnerEventDrop}
                // eventDidMount={componentDidMount}

                eventReceive={(eventReceiveInfo) => {
                  console.log(eventReceiveInfo);
                }}
                eventAdd={(addInfo) => {
                  console.log('addInfo:', addInfo);
                }}
                /* こっちは個別の設定できる DB操作とかに使う
              you can update a remote database when these fire:*/
                eventChange={(changeInfo) =>
                  console.log('changeInfo:', changeInfo)
                }
                eventRemove={(removeInfo) => {
                  console.log('removeInfo:', removeInfo);
                }}
                select={handleDateSelect}
                eventClick={handleEventClick}
                // dateClick={handleDateClick}
                eventsSet={(events: EventApi[]) => {
                  console.log('events:', events);
                  setMyEvents(events);
                }}
                eventResize={handleEventResize}
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
