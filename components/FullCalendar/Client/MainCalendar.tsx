// react
import React, { useState, createRef, useEffect, RefObject } from 'react';
// MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { Container, Tooltip } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
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
  DayCellContentArg,
} from '@fullcalendar/core';
import interactionPlugin, {
  EventResizeDoneArg,
  EventReceiveArg,
} from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
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
import { EventApi } from '@fullcalendar/core';

type calendarProps = {
  editMode: boolean;
  setBorderColor: Function;
  handleEventClick: Function;
  changeColor: Function;
  handleEventReceive: Function;
  handleNavLinkDayClick: Function;
  calendarRef: RefObject<FullCalendar>;
  view: string;
  myEvents: any;
  eventsSet: Function;
};

export default function Calendar(props: calendarProps) {
  const {
    handleEventClick,
    changeColor,
    handleEventReceive,
    handleNavLinkDayClick,
    editMode,
    setBorderColor,
    calendarRef,
    view,
    myEvents,
    eventsSet,
  } = props;

  const matches: boolean = useMediaQuery('(min-width:992px)');

  let plugins = [
    resourceTimeGridPlugin,
    resourceTimelinePlugIn,
    interactionPlugin,
    dayGridPlugin,
    timeGridPlugin,
    multiMonthPlugin,
  ];
  if (!matches)
    plugins = [
      resourceTimeGridPlugin,
      resourceTimelinePlugIn,
      interactionPlugin,
      scrollGridPlugin, //これの警告
      dayGridPlugin,
      timeGridPlugin,
      multiMonthPlugin,
    ];

  return (
    <FullCalendar
      locale='ja'
      locales={[jaLocale]}
      contentHeight={'auto'}
      dayMinWidth={matches ? undefined : 100} //これの警告
      initialEvents={myEvents}
      ref={calendarRef}
      resources={resources}
      slotMinTime='05:00:00'
      slotMaxTime='22:00:00'
      slotDuration='00:30:00'
      snapDuration='00:05:00'
      plugins={plugins}
      initialView={view}
      eventContent={renderEventContent}
      dayCellContent={dayCellContent}
      //
      eventResizableFromStart={editMode}
      eventResourceEditable={editMode}
      eventDurationEditable={editMode}
      eventStartEditable={editMode}
      droppable={editMode}
      editable={false}
      //
      stickyHeaderDates={true}
      slotEventOverlap={true}
      fixedWeekCount={false}
      headerToolbar={false}
      eventOverlap={false}
      selectMirror={true}
      nowIndicator={true}
      selectable={false}
      allDaySlot={false}
      expandRows={true}
      weekends={true}
      navLinks={true}
      //
      eventResizeStart={() => setBorderColor('#0000FF')}
      eventResizeStop={() => setBorderColor('#DCDCDC')}
      eventDragStart={() => setBorderColor('#0000FF')}
      eventDragStop={() => setBorderColor('#DCDCDC')}
      eventsSet={(events) => eventsSet(events)}
      navLinkDayClick={(arg) => handleNavLinkDayClick(arg)}
      drop={() => setBorderColor('#DCDCDC')}
      eventReceive={(arg) => handleEventReceive(arg)}
      eventClick={(arg) => handleEventClick(arg)}
      eventResize={(arg) => changeColor(arg)}
      eventDrop={(arg) => changeColor(arg)}
    />
  );
}

/**ーーーーーーーーーーーーーーーーーー
 * イベントに表示する内容
 ーーーーーーーーーーーーーーーーーー*/
function renderEventContent(eventContent: EventContentArg) {
  return (
    <Tooltip
      title={eventContent.event.extendedProps.operatorName}
      placement='top-end'
    >
      <Grid container direction='column'>
        <Grid container direction='row' alignItems='center'>
          <AccessTimeOutlinedIcon />
          <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
            {eventContent.timeText}
          </Typography>
        </Grid>
        <Grid container direction='row' alignItems='center'>
          <PersonOutlineOutlinedIcon />
          <Typography sx={{ fontSize: { xs: '0.7rem', md: '1rem' } }}>
            {eventContent.event.extendedProps.operatorName}
          </Typography>
        </Grid>
      </Grid>
    </Tooltip>
  );
}

/**ーーーーーーーーーーーーーーーーーー
   * カレンダー上の日付
   ーーーーーーーーーーーーーーーーーー*/
function dayCellContent(e: DayCellContentArg) {
  e.dayNumberText = e.dayNumberText.replace('日', '');
  return <Typography fontSize='14px'>{e.dayNumberText}</Typography>;
}
