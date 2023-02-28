import { ReactElement, RefObject, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { Button, Typography, Grid } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ButtonGroup from '@mui/material/ButtonGroup';
import { CalendarApi } from '@fullcalendar/core';

export type Props = {
  calendarRef: RefObject<FullCalendar>;
  editMode: boolean;
  handleViewChange: Function;
  today: 'month' | 'week' | 'day';
  setToday: Function;
};

export const MobileHeader = (props: Props): ReactElement => {
  const { calendarRef, editMode, handleViewChange, today, setToday } = props;

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

    if (direction === 'prev') calApi.prev();
    if (direction === 'next') calApi.next();
    if (direction === 'today') calApi.today();

    setToday({ type: today, date: calApi.getDate() });
  };

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ my: '1rem', mx: '0.5rem', width: '100%' }}
    >
      <Typography sx={{ fontSize: '1rem' }}>{title}</Typography>

      <ButtonGroup disabled={editMode} variant='text'>
        <Button
          onClick={() => handleViewChange('month')}
          variant={today === 'month' ? 'contained' : 'text'}
        >
          月
        </Button>
        <Button
          onClick={() => handleViewChange('week')}
          variant={today === 'week' ? 'contained' : 'text'}
        >
          週
        </Button>
        <Button
          onClick={() => handleViewChange('day')}
          variant={today === 'day' ? 'contained' : 'text'}
        >
          日
        </Button>
      </ButtonGroup>
    </Grid>
  );
};
