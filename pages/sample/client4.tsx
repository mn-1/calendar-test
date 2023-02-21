/** */

// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Typography, Button } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import jaLocale from '@fullcalendar/core/locales/ja';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import resourceTimelinePlugIn from '@fullcalendar/resource-timeline';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
  CalendarApi,
} from '@fullcalendar/core';
import interactionPlugin, {
  DropArg,
  EventReceiveArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
// lib
import { resources, externalEvents, operator } from '../../lib/data';
import EventControl from '../../lib/eventControl-3';
import { divideColor } from '../../lib/colorControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/ScheduleInfoDialog';
import DeleteSnackbar from '../../components/Snackbar/DeleteSnackbar';
import EditScheduleDialog from '../../components/Dialog/EditScheduleDialog';
import { ExternalEvent } from '../../components/FullCalendar/ExternalEvents';
import { CalendarHeader } from '../../components/FullCalendar/Header';

const ClientCalendar = () => {
  const calendarRef = createRef<FullCalendar>();

  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    countId,
    myEvents,
    eventInfo,
    editDialogOpen,
    setEditDialogOpen,
    editSchedule,
    setEventInfo,
    getEvents,
    setCountId,
    setMyEvents,
  } = EventControl();

  useEffect(() => {
    getEvents();
    // console.log(
    //   'これは表示してからgetできるのか',
    //   calendarRef.current?.getApi()
    // );
  }, [myEvents]);

  // イベント詳細表示ダイアログ開く
  const handleEventClick = (arg: EventClickArg) => {
    setInfoDialogOpen(true);
    setEventInfo(arg);
    console.log('イベント詳細：', arg);
  };

  // 予定を削除
  const deleteEvent = () => {
    const calApi = calendarRef.current?.getApi();
    if (!eventInfo || !calApi) return;

    eventInfo.event.remove();
    setInfoDialogOpen(false);
    setDeleteSnackbarOpen(true);
  };

  // 予定を削除したのを取り消す
  const undoDelete = () => {
    const calApi = calendarRef.current?.getApi();
    if (!eventInfo || !calApi) return;
    const {
      id,
      borderColor,
      backgroundColor,
      title,
      startStr,
      endStr,
      extendedProps: { memo, operatorName, avatar },
    } = eventInfo.event;

    calApi.addEvent({
      id,
      title,
      start: startStr,
      end: endStr,
      resourceId: eventInfo.event.getResources()[0]._resource.id,
      extendedProps: {
        memo: memo ?? '',
        operatorName: operatorName ?? '',
        avatar: avatar ?? '',
      },
      backgroundColor,
      borderColor,
    });

    setDeleteSnackbarOpen(false);
  };

  /**
   * イベント移動
   */
  const handleInnerEventDrop = (arg: EventDropArg) => {
    const { start, end } = arg.event;

    // startとendを取得できなかったら戻す
    if (!start || !end) return arg.revert();
    const { color } = divideColor(start.getTime(), end.getTime());

    arg.event.setProp('color', color);
  };

  /**
   * 予定のサイズ変更
   */
  const handleEventResize = (arg: EventResizeDoneArg) => {
    const { start, end } = arg.event;

    // startとendを取得できなかったら戻す
    if (!start || !end) return arg.revert();
    const { color } = divideColor(start.getTime(), end.getTime());

    arg.event.setProp('color', color);
  };

  /**
   * 外部のイベント追加
   */
  const drop = (arg: DropArg) => {
    console.log('drop info', arg);
  };

  /**
   * 外部のイベント受付
   */
  const handleEventReceive = (arg: EventReceiveArg) => {
    const start = arg.event.start;
    let end = start;

    if (!start || !end) return arg.event.remove();
    end = new Date(end.setHours(start.getHours() + 2));

    const { color } = divideColor(start.getTime(), end.getTime());

    const add = countId + 1;
    setCountId(add);

    arg.event.setProp('id', `${add}`);
    arg.event.setProp('color', color);
    arg.event.setEnd(end);
  };

  let calendarSize: any = 12;
  if (editMode) calendarSize = 9;

  return (
    <>
      <Header userType='client' />
      <Typography>
        説明
        <br />
        ・日表示の時だけ予定の追加ができる <br />
        ・月、週表示の時も予定の編集、削除はできる <br />
        ・予想した動線：月（または週）表示に切り替える →
        予定を追加したい日を選択 → 日表示になる <br />
      </Typography>
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          height: '100%',
          mt: '4rem',
        }}
      >
        <Grid
          container
          direction='row'
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          {editMode && (
            <Grid item sm={3} sx={{ px: '1rem' }}>
              <Grid container direction='column'>
                {externalEvents.map((event) => (
                  <ExternalEvent
                    key={event.extendedProps.Username}
                    event={event}
                  />
                ))}
              </Grid>
            </Grid>
          )}

          <Grid item sm={calendarSize} sx={{ px: '1rem' }}>
            <CalendarHeader
              calendarRef={calendarRef}
              editMode={editMode}
              setEditMode={setEditMode}
            />
            {myEvents.length != 0 && (
              <FullCalendar
                initialEvents={myEvents}
                ref={calendarRef}
                locales={[jaLocale]}
                locale='ja'
                eventColor='#6A5ACD'
                contentHeight='auto'
                resources={resources}
                slotDuration='00:30:00'
                slotMinTime='05:00:00'
                slotMaxTime='23:00:00'
                plugins={[
                  resourceTimeGridPlugin,
                  resourceTimelinePlugIn,
                  interactionPlugin,
                  scrollGridPlugin,
                  dayGridPlugin,
                  timeGridPlugin,
                  multiMonthPlugin,
                ]}
                initialView='resourceTimeGridDay'
                eventContent={renderEventContent}
                //
                headerToolbar={false}
                droppable={true}
                editable={true}
                selectable={false}
                selectMirror={true}
                weekends={true}
                eventResizableFromStart={true}
                nowIndicator={true}
                allDaySlot={false}
                slotEventOverlap={true}
                navLinks={true}
                //
                drop={drop}
                eventReceive={handleEventReceive}
                eventClick={handleEventClick}
                eventResize={handleEventResize}
                eventDrop={handleInnerEventDrop}
                eventsSet={(events: EventApi[]) => {
                  console.log('events:', events);
                  setMyEvents(events);
                }}
                navLinkDayClick={(date) => {
                  const calApi = calendarRef.current?.getApi();
                  if (!calApi) return console.log('nai');
                  calApi.changeView('resourceTimeGridDay', date);
                }}
              />
            )}
          </Grid>
        </Grid>
        {/* utils ↓ */}
        {/* defalutValueを動的にしないためにレンダリング少なくしている */}

        {eventInfo && editDialogOpen && (
          <EditScheduleDialog
            open={editDialogOpen}
            eventInfo={eventInfo}
            handleClose={() => setEditDialogOpen(false)}
            editSchedule={editSchedule}
          />
        )}
        <ScheduleInfoDialog
          eventInfo={eventInfo}
          open={infoDialogOpen}
          delete={deleteEvent}
          edit={() => {
            setEditDialogOpen(true);
            setInfoDialogOpen(false);
          }}
          handleClose={() => setInfoDialogOpen(false)}
        />
        <DeleteSnackbar
          open={deleteSnackbarOpen}
          undoDelete={undoDelete}
          handleClose={() => setDeleteSnackbarOpen(false)}
        />
        {/* utils ↑ */}
      </Container>
    </>
  );
};

export default ClientCalendar;

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  return (
    <Typography>
      {eventContent.timeText}
      {eventContent.event.extendedProps.operatorName}
    </Typography>
  );
}
