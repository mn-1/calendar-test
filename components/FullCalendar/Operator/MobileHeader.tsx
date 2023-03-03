import { ReactElement, RefObject, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { Button, Typography, Grid } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ButtonGroup from '@mui/material/ButtonGroup';

export type Props = {
  calendarRef: RefObject<FullCalendar>;
  handleViewChange: Function;
  today: 'month' | 'week' | 'day';
  handleDateChange: Function;
};

export const MobileHeader = (props: Props): ReactElement => {
  const { calendarRef, handleViewChange, today, handleDateChange } = props;

  const [title, setTitle] = useState<string>();

  useEffect(() => {
    if (calendarRef.current) {
      const calApi = calendarRef.current.getApi();
      setTitle(calApi.view.title);
    }
  }, [calendarRef]);

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{ width: '100%', mb: '0.5rem' }}
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
            <ButtonGroup variant='text'>
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
