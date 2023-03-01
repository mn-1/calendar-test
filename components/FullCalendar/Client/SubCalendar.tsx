import { useEffect, useState, RefObject } from 'react';
// MUI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid, Container, Typography, Button, Box } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import listPlugin from '@fullcalendar/list';
import { CalendarApi, DayCellContentArg } from '@fullcalendar/core';
import { DayCellContainer } from '@fullcalendar/core/internal';

type Props = {
  subCalendarRef: RefObject<FullCalendar>;
  handleNavLinkDayClick: Function;
};

export const SubCalendar = (props: Props) => {
  const { subCalendarRef, handleNavLinkDayClick } = props;

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

    if (direction === 'prev') calApi.prev();
    if (direction === 'next') calApi.next();
    if (direction === 'today') calApi.today();

    setTitle(calApi.view.title);
  };

  return (
    <Container maxWidth={false} sx={{ my: '2rem' }}>
      <header>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography>{title}</Typography>
          <Grid item>
            <Button onClick={(): void => handleDateChange('prev')} size='small'>
              <ChevronLeftIcon />
            </Button>
            <Button onClick={(): void => handleDateChange('next')}>
              <ChevronRightIcon />
            </Button>
          </Grid>
        </Grid>
      </header>
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
          ref={subCalendarRef}
          locales={[jaLocale]}
          height='100%'
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          initialView='dayGridMonth'
          eventContent={renderEventContent}
          dayCellContent={dayCellContent}
          //
          selectable={false}
          weekends={true}
          headerToolbar={false}
          navLinks={true}
          expandRows={true}
          dayMaxEvents={true}
          fixedWeekCount={false}
          //
          navLinkDayClick={(date) => handleNavLinkDayClick(date)}
        />
      </Box>
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

// カレンダー上の日付
function dayCellContent(e: DayCellContentArg) {
  e.dayNumberText = e.dayNumberText.replace('日', '');
  return <Typography fontSize='14px'>{e.dayNumberText}</Typography>;
}
