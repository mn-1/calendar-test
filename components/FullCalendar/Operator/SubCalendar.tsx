import { useEffect, useState, createRef, RefObject } from 'react';
// MUI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid, Container, Typography, Button, Stack, Box } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import listPlugin from '@fullcalendar/list';
import { EventContentArg, EventSourceInput } from '@fullcalendar/core';
import { CalendarApi } from '@fullcalendar/core';

type Props = {
  initialEvents: any;
  handleNavLinkDayClick: Function;
  dateRange: any;
};

export default function Month({
  initialEvents,

  handleNavLinkDayClick,
  dateRange,
}: Props) {
  const subCalendarRef1 = createRef<FullCalendar>();
  const subCalendarRef2 = createRef<FullCalendar>();

  const [title1, setTitle1] = useState<string | undefined>();
  const [title2, setTitle2] = useState<string | undefined>();

  useEffect(() => {
    if (subCalendarRef1.current) {
      const calApi = subCalendarRef1.current.getApi();
      setTitle1(calApi.view.title);
    }
    if (subCalendarRef2.current) {
      const calApi = subCalendarRef2.current.getApi();
      setTitle2(calApi.view.title);
    }
  }, [subCalendarRef1, subCalendarRef2]);

  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Typography variant='h6'>{title1}</Typography>

      <Box
        position='relative'
        top='0'
        left='0'
        right='0'
        bottom='0'
        height={'20rem'}
        sx={{ m: 0, p: 0, border: 1, borderColor: '#dcdcdc' }}
      >
        <FullCalendar
          ref={subCalendarRef1}
          locales={[jaLocale]}
          height='100%'
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          eventBackgroundColor='#FFA500'
          initialEvents={events}
          // eventContent={renderEventContent}
          dayCellContent={(e) => {
            e.dayNumberText = e.dayNumberText.replace('???', '');
            return <Typography fontSize='14px'>{e.dayNumberText}</Typography>;
          }}
          //
          headerToolbar={false}
          fixedWeekCount={false}
          expandRows={true}
          stickyHeaderDates={false}
          dayMaxEvents={true}
          selectable={true}
          select={(arg) => {
            handleNavLinkDayClick(arg.start);
          }}
        />
      </Box>

      <Typography variant='h6'>{title2}</Typography>

      <Box
        position='relative'
        top='0'
        left='0'
        right='0'
        bottom='0'
        height={'20rem'}
        sx={{ m: 0, p: 0, border: 1, borderColor: '#dcdcdc' }}
      >
        <FullCalendar
          ref={subCalendarRef2}
          locales={[jaLocale]}
          height='100%'
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          eventBackgroundColor='#FFA500'
          initialEvents={events}
          dayCellContent={(e) => {
            e.dayNumberText = e.dayNumberText.replace('???', '');
            return <Typography fontSize='14px'>{e.dayNumberText}</Typography>;
          }}
          validRange={(now) => {
            return { start: dateRange };
          }}
          //
          headerToolbar={false}
          // navLinks={true}
          fixedWeekCount={false}
          expandRows={true}
          dayMaxEvents={true}
          selectable={true}
          select={(arg) => {
            handleNavLinkDayClick(arg.start);
          }}
        />
      </Box>
    </Container>
  );
}

const events = [
  {
    id: '1',

    resourceId: '1',
    start: new Date('2023/2/11 15:00').toISOString().slice(0, 10),
    end: new Date('2023/2/11 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '???????????????',
      operatorName: '??????????????????A??????',
      avatar: '????????????E',
    },

    display: 'background',
  },
  {
    id: '2',

    resourceId: '2',
    start: new Date('2023/4/21 15:00').toISOString().slice(0, 10),
    end: new Date('2023/4/21 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '',
      operatorName: '??????????????????A??????',
      avatar: '????????????E',
    },
    display: 'background',
  },
  {
    id: '3',

    resourceId: '3',
    start: new Date('2023/4/16 15:00').toISOString().slice(0, 10),
    end: new Date('2023/4/16 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '???????????????',
      operatorName: '??????????????????A??????',
      avatar: '????????????E',
    },

    display: 'background',
  },
  {
    id: '4',

    resourceId: '2',
    start: new Date('2023/3/21 15:00').toISOString().slice(0, 10),
    end: new Date('2023/3/21 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '???????????????',
      operatorName: '??????????????????A??????',
      avatar: '????????????K',
    },

    display: 'background',
  },
  {
    id: '5',

    resourceId: '2',
    start: new Date('2023/3/25 10:00').toISOString().slice(0, 10),
    end: new Date('2023/3/25 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '???????????????',
      operatorName: '??????????????????A??????',
      avatar: '????????????L',
    },

    display: 'background',
  },
  {
    id: '6',

    resourceId: '3',
    start: new Date('2023/3/01 10:00').toISOString().slice(0, 10),
    end: new Date('2023/3/01 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '???????????????',
      operatorName: '??????????????????A??????',
      avatar: '????????????X',
    },
    display: 'background',
  },
];
