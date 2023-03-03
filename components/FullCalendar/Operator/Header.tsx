import { ReactElement, RefObject, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { Button, Typography, Grid } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ButtonGroup from '@mui/material/ButtonGroup';

type Props = {
  calendarRef: RefObject<FullCalendar>;
  handleViewChange: Function;
  today: 'month' | 'week' | 'day';
  handleDateChange: Function;
};

export const CalendarHeader = (props: Props): ReactElement => {
  const { calendarRef, handleViewChange, today, handleDateChange } = props;

  const [title, setTitle] = useState<string>();

  useEffect(() => {
    if (calendarRef.current) {
      const calApi = calendarRef.current.getApi();
      setTitle(calApi.view.title);
    }
  }, [calendarRef]);

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
            {today === 'month' && '今月'}
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
