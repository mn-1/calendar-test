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
  handleDateChange: Function;
};

export const CalendarHeader = (props: Props): ReactElement => {
  const {
    calendarRef,
    editMode,
    setEditMode,
    editButtonDisable,
    handleViewChange,
    today,
    handleDateChange,
  } = props;

  const [title, setTitle] = useState<string>();

  useEffect(() => {
    if (calendarRef.current) {
      const calApi = calendarRef.current.getApi();
      setTitle(calApi.view.title);
    }
  }, [calendarRef]);

  return (
    <header>
      <Button
        variant='contained'
        disabled={editButtonDisable}
        sx={{ mb: '1rem' }}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? '編集終了' : '編集する'}
      </Button>
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
            {today === 'month' && '今月'}
          </Button>
          <Button onClick={(): void => handleDateChange('next')}>
            <ChevronRightIcon />
          </Button>
        </ButtonGroup>

        <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
          {title}
        </Typography>

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
      </Grid>
    </header>
  );
};
