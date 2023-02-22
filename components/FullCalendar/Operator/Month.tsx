import { useEffect, useState, createRef } from 'react';
// MUI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid, Container, Typography, Button } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // 月表示を可能にする
import interactionPlugin from '@fullcalendar/interaction'; // 日付や時間が[ 選択 ]きるようになる
import jaLocale from '@fullcalendar/core/locales/ja';
import listPlugin from '@fullcalendar/list'; // 予定をリスト表示
import { EventSourceInput } from '@fullcalendar/core';
import { EventContentArg } from '@fullcalendar/core';
import { CalendarApi } from '@fullcalendar/core';

type Props = {
  initialEvents: EventSourceInput;
};

export default function Month({ initialEvents }: Props) {
  const calendarRef = createRef<FullCalendar>();
  const [calApi, setCalApi] = useState<CalendarApi>();

  useEffect(() => {
    if (calendarRef.current) {
      const calApi = calendarRef.current.getApi();

      setCalApi(calApi);
    }
  }, [calendarRef]);

  const handleDateChange = (direction: 'prev' | 'today' | 'next'): void => {
    if (!calApi) return;

    console.log(calApi.getDate(), new Date());

    if (direction === 'prev') calApi.prev();
    if (direction === 'next') calApi.next();
    if (direction === 'today') calApi.today();
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100%',
        height: '100%',
        mt: '4rem',
      }}
    >
      <header>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6'>{calApi?.view.title}</Typography>
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
      <FullCalendar
        ref={calendarRef}
        initialEvents={initialEvents}
        locales={[jaLocale]}
        locale='ja'
        contentHeight='50vh'
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView='dayGridMonth'
        eventContent={renderEventContent}
        //
        selectable={true}
        weekends={true}
        headerToolbar={false}
      />
    </Container>
  );
}

// カレンダーに表示する内容
function renderEventContent() {
  return (
    <Grid container direction='column' alignItems='center'>
      <Typography>●</Typography>
    </Grid>
  );
}
