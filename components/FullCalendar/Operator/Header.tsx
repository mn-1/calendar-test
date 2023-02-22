import { ReactElement, RefObject, useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { Button, Stack, Typography, Grid } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ButtonGroup from '@mui/material/ButtonGroup';
import { CalendarApi } from '@fullcalendar/core';

export type Props = {
  calendarRef: RefObject<FullCalendar>;

  handleViewChange: Function;
  today: 'month' | 'week' | 'day';
};

export const CalendarHeader = (props: Props): ReactElement => {
  const { calendarRef, handleViewChange, today } = props;

  const [title, setTitle] = useState<string>();
  const [calApi, setCalApi] = useState<CalendarApi>();

  useEffect(() => {
    if (calendarRef.current) {
      const calApi = calendarRef.current.getApi();
      setTitle(calApi.view.title);
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
    <header>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: '1rem' }}
      >
        <ButtonGroup>
          <Button onClick={(): void => handleDateChange('prev')}>
            <ChevronLeftIcon />
          </Button>
          <Button onClick={(): void => handleDateChange('today')}>
            {today === 'day' && '今日'}
            {today === 'week' && '今週'}
          </Button>
          <Button onClick={(): void => handleDateChange('next')}>
            <ChevronRightIcon />
          </Button>
        </ButtonGroup>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <ButtonGroup>
          <Button
            onClick={() => handleViewChange('week')}
            variant={today === 'week' ? 'contained' : 'outlined'}
          >
            週
          </Button>
          <Button
            onClick={() => handleViewChange('day')}
            variant={today === 'day' ? 'contained' : 'outlined'}
          >
            日
          </Button>
        </ButtonGroup>
      </Grid>
    </header>
  );
};
