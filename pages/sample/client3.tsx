import MobileClientCalendar from '../../components/FullCalendar/Client/MobileCalendar';
// react

import PcCalendar from '../../components/FullCalendar/Client/PcCalendar';
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
import { resources, externalEvents } from '../../lib/data';
import EventControl from '../../lib/eventControl-3';
import { divideColor } from '../../lib/colorControl';
// components
import Header from '../../components/Header/Header';
import ScheduleInfoDialog from '../../components/Dialog/Client/ScheduleInfoDialog';
import DeleteSnackbar from '../../components/Snackbar/DeleteSnackbar';
import EditScheduleDialog from '../../components/Dialog/Client/EditDialog';
import { ExternalEvent } from '../../components/FullCalendar/Client/ExternalEvents';
import { CalendarHeader } from '../../components/FullCalendar/Client/Header';
import FailedSnackbar from '../../components/Snackbar/FailedSnackbar';
import { SubCalendar } from '../../components/FullCalendar/Client/SubCalendar';
import { MobileHeader } from '../../components/FullCalendar/Client/MobileHeader';
import ClientCalendar from '../../components/FullCalendar/Client/PC-Mobile-Test';

const Client = () => {
  const matches: boolean = useMediaQuery('(min-width:992px)');

  return (
    <>
      <ClientCalendar />
      {/* utils ↓ */}

      {/* utils ↑ */}
    </>
  );
};

export default Client;
