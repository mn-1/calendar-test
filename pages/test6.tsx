import React from 'react';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import listPlugin from '@fullcalendar/list';
import { Grid, Container } from '@mui/material';

const SampleCalendar: React.FC = () => {
  const ref = React.createRef<any>();

  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <FullCalendar
        ref={ref}
        locales={[jaLocale]}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin]}
        initialView='dayGridMonth'
        slotDuration='00:30:00'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek listWeek',
        }}
        //
        selectable={true}
        weekends={true}
      />
    </Container>
  );
};

export default SampleCalendar;
