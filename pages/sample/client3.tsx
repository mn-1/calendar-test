import MobileClientCalendar from '../../components/FullCalendar/Client/MobileCalendar';
// react

import PcCalendar from '../../components/FullCalendar/Client/PcCalendar';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
// react
import React, {
  useState,
  useRef,
  createRef,
  useEffect,
  RefObject,
} from 'react';
// MUI
import { Box, Container, Grid, Typography, Button, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// FullCalendar

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
import { resources, externalEvents } from '../../lib/data';
import EventControl from '../../lib/eventControl-3';
import { divideColor } from '../../lib/colorControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/Client/ScheduleInfoDialog';
import DeleteSnackbar from '../../components/Snackbar/DeleteSnackbar';
import EditScheduleDialog from '../../components/Dialog/Client/EditScheduleDialog';
import { ExternalEvent } from '../../components/FullCalendar/Client/ExternalEvents';
import { CalendarHeader } from '../../components/FullCalendar/Client/Header';
import FailedSnackbar from '../../components/Snackbar/FailedSnackbar';
import { SubCalendar } from '../../components/FullCalendar/Client/SubCalendar';
import { MobileHeader } from '../../components/FullCalendar/Client/MobileHeader';

const Client = () => {
  const matches: boolean = useMediaQuery('(min-width:992px)');
  const calendarRef = createRef<FullCalendar>();

  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);

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
   */
  const handleInnerEventDrop = (arg: EventDropArg) => {
    const calApi = calendarRef.current?.getApi();
    const { start, end } = arg.event;

    // 取得できない,日表示でなかったら戻す
    if (!calApi || !start || !end) return arg.revert();

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
    if (!calApi || !start || !end) return arg.revert();

    const { color } = divideColor(start.getTime(), end.getTime());

    arg.event.setProp('color', color);
  };

  return (
    <>
      {matches ? (
        <PcCalendar
          matches={matches}
          calendarRef={calendarRef}
          handleEventClick={handleEventClick}
          deleteEvent={deleteEvent}
          undoDelete={undoDelete}
          handleInnerEventDrop={handleInnerEventDrop}
          handleEventResize={handleEventResize}
          setInfoDialogOpen={setInfoDialogOpen}
          infoDialogOpen={infoDialogOpen}
        />
      ) : (
        <MobileClientCalendar matches={matches} />
      )}

      {/* utils ↓ */}

      <DeleteSnackbar
        open={deleteSnackbarOpen}
        undoDelete={undoDelete}
        handleClose={() => setDeleteSnackbarOpen(false)}
      />
      {/* utils ↑ */}
    </>
  );
};

export default Client;
