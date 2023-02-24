import { useEffect, useState, createRef, RefObject } from 'react';
// MUI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid, Container, Typography, Button, Stack } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import listPlugin from '@fullcalendar/list';
import { EventSourceInput } from '@fullcalendar/core';
import { EventContentArg } from '@fullcalendar/core';
import { CalendarApi } from '@fullcalendar/core';

type Props = {
  subCalendarRef: RefObject<FullCalendar>;
  handleNavLinkDayClick: Function;
};

export const SubCalendar = ({
  subCalendarRef,
  handleNavLinkDayClick,
}: Props) => {
  const [calApi, setCalApi] = useState<CalendarApi>();
  const [title, setTitle] = useState<string | undefined>();

  useEffect(() => {
    if (subCalendarRef.current) {
      const calApi = subCalendarRef.current.getApi();
      setTitle(calApi.view.title);
      setCalApi(calApi);
    }
  }, [subCalendarRef]);

  const handleDateChange = (direction: 'prev' | 'today' | 'next'): void => {
    if (!calApi) return;

    console.log(calApi.getDate(), new Date());

    if (direction === 'prev') calApi.prev();
    if (direction === 'next') calApi.next();
    if (direction === 'today') calApi.today();

    setTitle(calApi.view.title);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100%',
        height: '100%',
        my: '2rem',
      }}
    >
      <header>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6'>{title}</Typography>
          <Grid item>
            <Button onClick={(): void => handleDateChange('prev')}>
              <ChevronLeftIcon />
            </Button>
            <Button onClick={(): void => handleDateChange('next')}>
              <ChevronRightIcon />
            </Button>
          </Grid>
        </Grid>
      </header>
      <Stack sx={{ border: 1, borderColor: '', width: '40vh', height: '40vh' }}>
        <FullCalendar
          ref={subCalendarRef}
          locales={[jaLocale]}
          locale='ja'
          contentHeight='40vh'
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          initialView='dayGridMonth'
          eventContent={renderEventContent}
          //
          selectable={true}
          weekends={true}
          headerToolbar={false}
          navLinks={true}
          expandRows={true}
          //
          navLinkDayClick={(date) => handleNavLinkDayClick(date)}
        />
      </Stack>
    </Container>
  );
};

// カレンダーに表示する内容
function renderEventContent() {
  return (
    <Grid container direction='column' alignItems='center'>
      <Typography>●</Typography>
    </Grid>
  );
}
