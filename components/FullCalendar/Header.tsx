import { ReactElement, RefObject, useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { Button, Stack, Typography, Grid } from '@mui/material';
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

export const CalendarHeader = (props: Props): ReactElement => {
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
    <header>
      <Button
        variant='contained'
        disabled={editButtonDisable}
        sx={{ mb: '1rem' }}
        onClick={() => {
          if (!calApi) return console.log('nai');
          if (calApi.view.type != 'resourceTimeGridDay') return;
          setEditMode(!editMode);
        }}
      >
        {editMode ? '編集終了' : '編集する'}
      </Button>
      <Grid container direction='row' sx={{ mb: '1rem' }}>
        <Grid item xs={4}>
          <ButtonGroup>
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
              <Button
                onClick={() => handleViewChange('month')}
                variant={today === 'month' ? 'contained' : 'outlined'}
              >
                月
              </Button>
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
          </Stack>
        </Grid>
      </Grid>
    </header>
  );
};
