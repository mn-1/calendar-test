import React from 'react';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import listPlugin from '@fullcalendar/list';
import { Grid, Container, Box } from '@mui/material';

const SampleCalendar = () => {
  return (
    <>
      <Box
        position='fixed'
        top='0'
        left='0'
        right='0'
        bottom='0'
        overflow='hidden'
        border='none'
      >
        {/* <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          //
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          expandRows={true}
          fixedWeekCount={false}
          height='100%'
        /> */}

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          height='100%'
          expandRows={true}
          fixedWeekCount={false}
          editable={true}
          selectable={true}
          selectMirror={true}
          // これだっったのか！！！
          dayMaxEvents={true}
          //
        />
      </Box>
    </>
  );
};

export default SampleCalendar;
