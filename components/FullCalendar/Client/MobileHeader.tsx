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
  setEditMode: Function;
  editButtonDisable: boolean;
};

export const MobileHeader = (props: Props): ReactElement => {
  const {
    calendarRef,
    editMode,
    handleViewChange,
    today,
    setEditMode,
    editButtonDisable,
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
      sx={{ mt: '1.2rem', width: '100%' }}
    >
      <Typography sx={{ fontSize: '1rem' }}>{title}</Typography>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
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
      <Button
        fullWidth
        variant='contained'
        disabled={editButtonDisable}
        sx={{ my: '0.5rem' }}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? '編集終了' : '編集する'}
      </Button>
    </Grid>
  );
};
