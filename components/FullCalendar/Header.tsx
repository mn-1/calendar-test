import { ReactElement, RefObject, useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { Button, Stack, Typography, Grid } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ButtonGroup from '@mui/material/ButtonGroup';

export type Props = {
  calendarRef: RefObject<FullCalendar>;
  editMode: boolean;
};

export const CalendarHeader = ({
  calendarRef,
  editMode,
}: Props): ReactElement => {
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    const calApi = calendarRef.current?.getApi();
    if (calApi) setTitle(calApi.view.title);
  }, [calendarRef]);

  const handleDateChange = (direction: 'prev' | 'today' | 'next'): void => {
    const calApi = calendarRef.current?.getApi();

    if (!calApi) return;

    if (direction === 'prev') calApi.prev();
    if (direction === 'next') calApi.next();
    if (direction === 'today') calApi.today();

    setDate(new Date(calApi.getDate()));
  };

  const handleViewChange = (direction: 'month' | 'week' | 'day'): void => {
    const calApi = calendarRef.current?.getApi();

    if (!calApi) return;

    if (direction === 'month') {
      calApi.changeView('dayGridMonth');
    }
    if (direction === 'week') calApi.changeView('timeGridWeek');
    if (direction === 'day') calApi.changeView('resourceTimeGridDay');
  };

  return (
    <header>
      <Grid container direction='row' sx={{ mb: '1rem' }}>
        <Grid item xs={4}>
          <ButtonGroup>
            <Button onClick={(): void => handleDateChange('prev')}>
              <ChevronLeftIcon />
            </Button>
            <Button onClick={(): void => handleDateChange('today')}>
              Today
            </Button>
            <Button onClick={(): void => handleDateChange('next')}>
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={4}>
          <Stack justifyContent='center' direction='row'>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack justifyContent='end' direction='row'>
            <ButtonGroup disabled={editMode}>
              <Button onClick={() => handleViewChange('month')}>月</Button>
              <Button onClick={() => handleViewChange('week')}>週</Button>
              <Button onClick={() => handleViewChange('day')}>日</Button>
            </ButtonGroup>
          </Stack>
        </Grid>
      </Grid>
    </header>
  );
};
