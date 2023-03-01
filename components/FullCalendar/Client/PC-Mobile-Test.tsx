// react
import React, { useState, createRef, useEffect } from 'react';
// MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import jaLocale from '@fullcalendar/core/locales/ja';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import resourceTimelinePlugIn from '@fullcalendar/resource-timeline';
import {
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from '@fullcalendar/core';
import interactionPlugin, {
  EventResizeDoneArg,
  EventReceiveArg,
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import { DayCellContentArg } from '@fullcalendar/core';
// lib
import { resources, operator, externalEvents } from '../../../lib/data';
import EventControl from '../../../lib/eventControl-3';
import { divideColor } from '../../../lib/colorControl';
import { scheduleDataInfo } from '../../../lib/inputDataControl';
// components
import Header from '../../Header/Header';
import ScheduleInfoDialog from '../../Dialog/Client/ScheduleInfoDialog';
import DeleteSnackbar from '../../Snackbar/DeleteSnackbar';
import { MobileHeader } from './MobileHeader';
import AddScheduleDialog from '../../Dialog/Client/AddScheduleDialog';
import MobileEditScheduleDialog from '../../Dialog/Client/MobileEditDialog';
import { ExternalEvent } from '../../FullCalendar/Client/ExternalEvents';
import { CalendarHeader } from './Header';
import FailedSnackbar from '../../Snackbar/FailedSnackbar';
import { SubCalendar } from './SubCalendar';
import EditScheduleDialog from '../../Dialog/Client/EditDialog';

type Props = {};

const ClientCalendar = (props: Props) => {
  const matches: boolean = useMediaQuery('(min-width:992px)');

  const calendarRef = createRef<FullCalendar>();
  const subCalendarRef = createRef<FullCalendar>();

  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editButtonDisable, setEditButtonDisable] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>('#DCDCDC');
  const [faliledSnackbarOpen, setFailedSnackbarOpen] = useState<boolean>(false);
  const [today, setToday] = useState<{
    type: 'month' | 'week' | 'day';
    date: Date;
  }>({ type: 'day', date: new Date(new Date().toLocaleDateString()) });

  const {
    countId,
    myEvents,
    eventInfo,
    editDialogOpen,
    addDialogOpen,
    mobileEditSchedule,
    addSchedule,
    setAddDialogOpen,
    setEditDialogOpen,
    setEventInfo,
    getEvents,
    setCountId,
    setMyEvents,
    editSchedule,
  } = EventControl();

  useEffect(() => {
    getEvents();
  }, [matches]);

  /**ok
   * イベント詳細表示ダイアログ開く
   */
  const handleEventClick = (arg: EventClickArg) => {
    setInfoDialogOpen(true);
    setEventInfo(arg);
  };

  /**
   * イベントを削除
   */
  const deleteEvent = () => {
    const calApi = calendarRef.current?.getApi();
    if (!eventInfo || !calApi) return setFailedSnackbarOpen(true);

    eventInfo.event.remove();
    setInfoDialogOpen(false);
    setDeleteSnackbarOpen(true);
  };

  /**
   * イベントを削除したのを取り消す
   */
  const undoDelete = () => {
    const calApi = calendarRef.current?.getApi();
    if (!eventInfo || !calApi) return setFailedSnackbarOpen(true);

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

  /**ok
   * イベント移動した時に色変える
   * イベントのサイズ変更した時に色変える
   */
  const changeColor = (arg: EventDropArg | EventResizeDoneArg) => {
    const calApi = calendarRef.current?.getApi();
    const { start, end } = arg.event;

    // 取得できない,日表示でなかったら戻す
    if (!calApi || !start || !end || !editMode) {
      arg.revert();
      setFailedSnackbarOpen(true);
      return;
    }

    const { color } = divideColor(start.getTime(), end.getTime());
    arg.event.setProp('color', color);
  };

  /**ok
   * 外部のイベント受付
   */
  const handleEventReceive = (arg: EventReceiveArg) => {
    const start = arg.event.start;
    let end = start;

    if (!start || !end) return arg.event.remove();
    end = new Date(end.setMinutes(start.getMinutes() + 30));

    const { color } = divideColor(start.getTime(), end.getTime());

    const add = countId + 1;
    setCountId(add);

    arg.event.setProp('id', `${add}`);
    arg.event.setProp('color', color);
    arg.event.setEnd(end);
  };

  /**ok
   * メインカレンダーの表示変更
   */
  const handleViewChange = (direction: 'month' | 'week' | 'day'): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return setFailedSnackbarOpen(true);

    if (direction === 'month') {
      calApi.changeView('dayGridMonth');
      setEditButtonDisable(true);
      setToday({ ...today, type: 'month' });
    }
    if (direction === 'week') {
      calApi.changeView('timeGridWeek');
      setEditButtonDisable(true);
      setToday({ ...today, type: 'week' });
    }
    if (direction === 'day') {
      calApi.changeView('resourceTimeGridDay');
      setEditButtonDisable(false);
      setToday({ ...today, type: 'day' });
    }
  };

  /**ok
   * カレンダーの日付選択するとその日に飛ぶ
   */
  const handleNavLinkDayClick = (date: Date) => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return setFailedSnackbarOpen(true);
    calApi.changeView('resourceTimeGridDay', date);
    setEditButtonDisable(false);
    setToday({ ...today, type: 'day' });
  };

  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          height: '100%',
          mt: { lg: '4rem' },
        }}
      >
        {matches ? (
          <Grid container direction='row'>
            {editMode && (
              <Grid item sm={3} sx={{ px: '1rem', mt: '3rem' }}>
                <Grid container direction='column'>
                  <SubCalendar
                    subCalendarRef={subCalendarRef}
                    handleNavLinkDayClick={handleNavLinkDayClick}
                  />
                  {externalEvents.map((event) => (
                    <ExternalEvent
                      event={event}
                      key={event.extendedProps.Username}
                    />
                  ))}
                </Grid>
              </Grid>
            )}

            <Grid item md={editMode ? 9 : 12} sx={{ px: '1rem' }}>
              <CalendarHeader
                today={today.type}
                handleViewChange={handleViewChange}
                editButtonDisable={editButtonDisable}
                calendarRef={calendarRef}
                editMode={editMode}
                setEditMode={setEditMode}
              />
              {myEvents.length != 0 && (
                <Stack
                  sx={{
                    border: 1,
                    borderWidth: 1,
                    borderColor: borderColor,
                  }}
                >
                  <FullCalendar
                    locale='ja'
                    locales={[jaLocale]}
                    dayMinWidth={100}
                    contentHeight='100vh'
                    initialEvents={myEvents}
                    ref={calendarRef}
                    resources={resources}
                    slotMinTime='05:00:00'
                    slotMaxTime='23:00:00'
                    slotDuration='00:30:00'
                    snapDuration='00:05:00'
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
                    dayCellContent={dayCellContent}
                    //
                    droppable={editMode} // ⭐️
                    editable={false}
                    eventResourceEditable={editMode}
                    eventStartEditable={editMode}
                    eventDurationEditable={editMode}
                    eventResizableFromStart={editMode}
                    //
                    fixedWeekCount={false}
                    selectable={false}
                    expandRows={true}
                    stickyHeaderDates={true}
                    selectMirror={true}
                    eventOverlap={false}
                    headerToolbar={false}
                    weekends={true}
                    nowIndicator={true}
                    allDaySlot={false}
                    slotEventOverlap={true}
                    navLinks={true}
                    //
                    eventResizeStart={() => {
                      if (editMode) setBorderColor('#0000FF');
                    }}
                    eventResizeStop={() => {
                      if (editMode) setBorderColor('#DCDCDC');
                    }}
                    eventDragStart={() => {
                      if (editMode) setBorderColor('#0000FF');
                    }}
                    eventDragStop={() => {
                      if (editMode) setBorderColor('#DCDCDC');
                    }}
                    //
                    eventsSet={(events) => setMyEvents(events)}
                    eventClick={handleEventClick}
                    eventResize={changeColor}
                    eventDrop={changeColor}
                    eventReceive={handleEventReceive}
                    drop={() => setBorderColor('#DCDCDC')}
                    navLinkDayClick={handleNavLinkDayClick}
                  />
                </Stack>
              )}
            </Grid>
          </Grid>
        ) : (
          <Grid container direction='column'>
            <MobileHeader
              today={today.type}
              handleViewChange={handleViewChange}
              calendarRef={calendarRef}
              editMode={editMode}
              setEditMode={setEditMode}
              editButtonDisable={editButtonDisable}
            />
            {editMode && (
              <Button
                onClick={() => setAddDialogOpen(true)}
                fullWidth
                variant='contained'
                sx={{ mb: '0.5rem' }}
              >
                予定を追加
              </Button>
            )}

            <Stack
              sx={{
                border: 1,
                borderWidth: 1,
                borderColor: borderColor,
                overflow: 'scroll',
              }}
            >
              {myEvents.length != 0 && (
                <FullCalendar
                  locale='ja'
                  locales={[jaLocale]}
                  contentHeight='100vh'
                  dayMinWidth={100}
                  initialEvents={myEvents}
                  ref={calendarRef}
                  resources={resources}
                  slotMinTime='00:00:00'
                  slotMaxTime='24:00:00'
                  slotDuration='00:30:00'
                  snapDuration='00:05:00'
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
                  dayCellContent={dayCellContent}
                  // resourceAreaWidth='300px'

                  // edit関連
                  droppable={editMode} // ⭐️
                  editable={false}
                  eventResourceEditable={editMode}
                  eventStartEditable={editMode}
                  eventDurationEditable={editMode}
                  eventResizableFromStart={editMode}
                  //
                  fixedWeekCount={false}
                  selectable={false}
                  expandRows={true}
                  stickyHeaderDates={true}
                  selectMirror={true}
                  eventOverlap={false}
                  headerToolbar={false}
                  weekends={true}
                  nowIndicator={true}
                  allDaySlot={false}
                  slotEventOverlap={true}
                  navLinks={true}
                  //
                  eventResizeStart={() => {
                    if (editMode) setBorderColor('#0000FF');
                  }}
                  eventResizeStop={() => {
                    if (editMode) setBorderColor('#DCDCDC');
                  }}
                  eventDragStart={() => {
                    if (editMode) setBorderColor('#0000FF');
                  }}
                  eventDragStop={() => {
                    if (editMode) setBorderColor('#DCDCDC');
                  }}
                  //
                  eventsSet={(events) => setMyEvents(events)}
                  eventClick={handleEventClick}
                  eventResize={changeColor}
                  eventDrop={changeColor}
                  eventReceive={handleEventReceive}
                  drop={() => setBorderColor('#DCDCDC')}
                  navLinkDayClick={handleNavLinkDayClick}
                />
              )}
            </Stack>
          </Grid>
        )}
      </Container>
      {/* utils ↓ */}
      <FailedSnackbar
        open={faliledSnackbarOpen}
        handleClose={() => setFailedSnackbarOpen(false)}
      />
      <ScheduleInfoDialog
        editMode={!editMode}
        eventInfo={eventInfo}
        open={infoDialogOpen}
        delete={deleteEvent}
        edit={() => {
          setEditDialogOpen(true);
          setInfoDialogOpen(false);
        }}
        handleClose={() => setInfoDialogOpen(false)}
      />
      {/* defalutValueを動的にしないためにレンダリング少なくしている */}
      {eventInfo && editDialogOpen && (
        <>
          {matches ? (
            <EditScheduleDialog
              open={editDialogOpen}
              eventInfo={eventInfo}
              handleClose={() => setEditDialogOpen(false)}
              editSchedule={editSchedule}
            />
          ) : (
            <MobileEditScheduleDialog
              open={editDialogOpen}
              eventInfo={eventInfo}
              operator={operator}
              location={resources}
              handleClose={() => setEditDialogOpen(false)}
              editSchedule={mobileEditSchedule}
            />
          )}
        </>
      )}

      <DeleteSnackbar
        open={deleteSnackbarOpen}
        undoDelete={undoDelete}
        handleClose={() => setDeleteSnackbarOpen(false)}
      />
      {today.date && addDialogOpen && (
        <AddScheduleDialog
          date={today.date}
          open={addDialogOpen}
          handleClose={() => setAddDialogOpen(false)}
          operator={operator}
          location={resources}
          addSchedule={(values: scheduleDataInfo) => {
            if (calendarRef.current) {
              const calApi = calendarRef.current.getApi();

              addSchedule(values, calApi);
            }
          }}
        />
      )}
      {/* utils ↑ */}
    </>
  );
};

export default ClientCalendar;

function Calendar() {
  return;
}

/**ーーーーーーーーーーーーーーーーーー
 * イベントに表示する内容
 ーーーーーーーーーーーーーーーーーー*/
function renderEventContent(eventContent: EventContentArg) {
  return (
    <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
      {eventContent.timeText}
      <br />
      {eventContent.event.extendedProps.operatorName}
    </Typography>
  );
}

/**ーーーーーーーーーーーーーーーーーー
 * カレンダー上の日付
 ーーーーーーーーーーーーーーーーーー*/
function dayCellContent(e: DayCellContentArg) {
  e.dayNumberText = e.dayNumberText.replace('日', '');
  return <Typography fontSize='14px'>{e.dayNumberText}</Typography>;
}
