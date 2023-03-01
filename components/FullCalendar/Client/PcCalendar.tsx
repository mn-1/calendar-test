// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Typography, Button, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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
  DropArg,
  EventReceiveArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
// lib
import { resources, externalEvents } from '../../../lib/data';
import EventControl from '../../../lib/eventControl-3';
import { divideColor } from '../../../lib/colorControl';
// components
import Header from '../../Header/Header';
import ScheduleInfoDialog from '../../Dialog/Client/ScheduleInfoDialog';
import DeleteSnackbar from '../../Snackbar/DeleteSnackbar';
import EditScheduleDialog from '../../Dialog/Client/EditDialog';
import { ExternalEvent } from '../../FullCalendar/Client/ExternalEvents';
import { CalendarHeader } from './Header';
import FailedSnackbar from '../..//Snackbar/FailedSnackbar';
import { SubCalendar } from './SubCalendar';

type Props = {
  matches: boolean;
};

const PcCalendar = (props: Props) => {
  const { matches } = props;
  const calendarRef = createRef<FullCalendar>();

  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editButtonDisable, setEditButtonDisable] = useState<boolean>(false);
  const [today, setToday] = useState<'month' | 'week' | 'day'>('day');
  const [borderColor, setBorderColor] = useState<string>('#DCDCDC');

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
    console.log(matches);
    getEvents();
    // console.log('これは表示してからgetできるのか',calendarRef.current?.getApi());
  }, [matches]);

  /**
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
    if (!eventInfo || !calApi) return;

    eventInfo.event.remove();
    setInfoDialogOpen(false);
    setDeleteSnackbarOpen(true);
  };

  /**
   * イベントを削除したのを取り消す
   */
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
   * イベント移動した時に色変える
   * 日表示以外だったら戻す
   */
  const handleInnerEventDrop = (arg: EventDropArg) => {
    const calApi = calendarRef.current?.getApi();
    const { start, end } = arg.event;

    // 取得できない,日表示でなかったら戻す
    if (!calApi || !start || !end || !editMode) return arg.revert();

    const { color } = divideColor(start.getTime(), end.getTime());

    arg.event.setProp('color', color);
  };

  /**
   * イベントのサイズ変更した時に色変える
   */
  const handleEventResize = (arg: EventResizeDoneArg) => {
    const calApi = calendarRef.current?.getApi();
    const { start, end } = arg.event;

    // 取得できない,日表示でなかったら戻す
    if (!calApi || !start || !end || !editMode) return arg.revert();

    const { color } = divideColor(start.getTime(), end.getTime());

    arg.event.setProp('color', color);
  };

  /**
   * 外部のイベント追加
   */
  const drop = (arg: DropArg) => {
    console.log('drop info', arg);
    setBorderColor('#DCDCDC');
  };

  /**
   * カレンダーの表示変更
   */
  const handleViewChange = (direction: 'month' | 'week' | 'day'): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return;

    if (direction === 'month') {
      calApi.changeView('dayGridMonth');
      setEditButtonDisable(true);
      setToday('month');
    }
    if (direction === 'week') {
      calApi.changeView('timeGridWeek');
      setEditButtonDisable(true);
      setToday('week');
    }
    if (direction === 'day') {
      calApi.changeView('resourceTimeGridDay');
      setEditButtonDisable(false);
      setToday('day');
    }
  };

  let calendarSize: number = 12;
  if (editMode) calendarSize = 9;

  return (
    <>
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

      <DeleteSnackbar
        open={deleteSnackbarOpen}
        undoDelete={undoDelete}
        handleClose={() => setDeleteSnackbarOpen(false)}
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
      {/* utils ↑ */}
    </>
  );
};

export default PcCalendar;

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  return (
    <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
      {eventContent.timeText}
      <br />
      {eventContent.event.extendedProps.operatorName}
    </Typography>
  );
}
