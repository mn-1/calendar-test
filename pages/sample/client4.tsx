// react
import React, { useState, createRef, useEffect } from 'react';
// MUI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Container } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import { EventClickArg, EventDropArg } from '@fullcalendar/core';
import { EventResizeDoneArg, EventReceiveArg } from '@fullcalendar/interaction';
import { EventApi } from '@fullcalendar/core';
// lib
import { resources, operator, externalEvents } from '../../lib/data';
import EventControl from '../../lib/eventControl-3';
import { divideColor } from '../../lib/colorControl';
import { scheduleDataInfo } from '../../lib/inputDataControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/Client/ScheduleInfoDialog';
import DeleteSnackbar from '../../components/Snackbar/DeleteSnackbar';
import { MobileHeader } from '../../components/FullCalendar/Client/MobileHeader';
import AddScheduleDialog from '../../components/Dialog/Client/AddScheduleDialog';
import MobileEditScheduleDialog from '../../components/Dialog/Client/MobileEditDialog';
import { ExternalEvent } from '../../components/FullCalendar/Client/ExternalEvents';
import { CalendarHeader } from '../../components/FullCalendar/Client/Header';
import FailedSnackbar from '../../components/Snackbar/FailedSnackbar';
import { SubCalendar } from '../../components/FullCalendar/Client/SubCalendar';
import EditScheduleDialog from '../../components/Dialog/Client/EditDialog';
import Calendar from '../../components/FullCalendar/Client/MainCalendar';

const ClientCalendar = () => {
  const matches: boolean = useMediaQuery('(min-width:992px)');

  const calendarRef = createRef<FullCalendar>();
  const subCalendarRef = createRef<FullCalendar>();

  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editButtonDisable, setEditButtonDisable] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>('#DCDCDC');
  const [today, setToday] = useState<{
    type: 'month' | 'week' | 'day';
    date: Date;
    view: string;
  }>({
    type: 'day',
    date: new Date(new Date().toLocaleDateString()),
    view: 'resourceTimeGridDay',
  });

  const {
    countId,
    myEvents,
    eventInfo,
    editDialogOpen,
    addDialogOpen,
    faliledSnackbarOpen,
    setFailedSnackbarOpen,
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
      setToday({ ...today, type: 'month', view: 'dayGridMonth' });
    }
    if (direction === 'week') {
      calApi.changeView('timeGridWeek');
      setEditButtonDisable(true);
      setToday({ ...today, type: 'week', view: 'timeGridWeek' });
    }
    if (direction === 'day') {
      calApi.changeView('resourceTimeGridDay');
      setEditButtonDisable(false);
      setToday({ ...today, type: 'day', view: 'resourceTimeGridDay' });
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
    setToday({ ...today, type: 'day', view: 'resourceTimeGridDay' });
  };

  /**
   * カレンダーの日付前後する
   */
  const handleDateChange = (direction: 'prev' | 'today' | 'next'): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return setFailedSnackbarOpen(true);

    if (direction === 'prev') {
      calApi.prev();
      setToday({ ...today, date: calApi.getDate() });
    }
    if (direction === 'next') {
      calApi.next();
      setToday({ ...today, date: calApi.getDate() });
    }
    if (direction === 'today') {
      calApi.today();
      setToday({ ...today, date: calApi.getDate() });
    }
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
                handleDateChange={handleDateChange}
              />

              <Stack
                sx={{
                  border: 1,
                  borderWidth: 1,
                  borderColor: borderColor,
                }}
              >
                {myEvents.length != 0 && (
                  <Calendar
                    calendarRef={calendarRef}
                    handleEventClick={handleEventClick}
                    changeColor={changeColor}
                    handleEventReceive={handleEventReceive}
                    handleNavLinkDayClick={handleNavLinkDayClick}
                    editMode={editMode}
                    setBorderColor={setBorderColor}
                    view={today.view}
                    myEvents={myEvents}
                    eventsSet={(arg: EventApi) => setMyEvents(arg)}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Grid container direction='column'>
            <CalendarHeader
              today={today.type}
              handleViewChange={handleViewChange}
              editButtonDisable={editButtonDisable}
              calendarRef={calendarRef}
              editMode={editMode}
              setEditMode={setEditMode}
              handleDateChange={handleDateChange}
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
                <Calendar
                  calendarRef={calendarRef}
                  handleEventClick={handleEventClick}
                  changeColor={changeColor}
                  handleEventReceive={handleEventReceive}
                  handleNavLinkDayClick={handleNavLinkDayClick}
                  editMode={editMode}
                  setBorderColor={setBorderColor}
                  view={today.view}
                  myEvents={myEvents}
                  eventsSet={(arg: EventApi) => setMyEvents(arg)}
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
