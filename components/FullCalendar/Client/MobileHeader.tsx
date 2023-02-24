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
  setEditMode: Function;
  editButtonDisable: boolean;
  handleViewChange: Function;
  today: 'month' | 'week' | 'day';
};

export const MobileHeader = (props: Props): ReactElement => {
  const {
    calendarRef,
    editMode,
    setEditMode,
    editButtonDisable,
    handleViewChange,
    today,
  } = props;

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
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{ width: { xs: '100vw' } }}
    >
      <Typography sx={{ fontSize: '1.2rem' }}>{title}</Typography>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: '1rem', width: '100%' }}
      >
        <Grid item xs={6}>
          <ButtonGroup variant='text'>
            <Button onClick={(): void => handleDateChange('prev')}>
              <ChevronLeftIcon />
            </Button>
            <Button onClick={(): void => handleDateChange('today')}>
              {today === 'day' && '今日'}
              {today === 'week' && '今週'}
              {today === 'month' && '今月'}
            </Button>
            <Button onClick={(): void => handleDateChange('next')}>
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={6}>
          <Grid container direction='row' justifyContent='end'>
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
        </Grid>
      </Grid>
    </Grid>
  );
};
