import { useEffect, useState, createRef, RefObject } from 'react';
// MUI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid, Container, Typography, Button, Stack, Box } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import listPlugin from '@fullcalendar/list';
import { DayCellContentArg } from '@fullcalendar/core';

type Props = {
  handleSelect: Function;
};

export default function Month(props: Props) {
  const { handleSelect } = props;

  const calendarRef = createRef<FullCalendar>();

  const [title, setTitle] = useState<string | undefined>();

  useEffect(() => {
    if (calendarRef.current) {
      const calApi = calendarRef.current.getApi();
      setTitle(calApi.view.title);
    }
  }, [calendarRef]);

  /**
   * カレンダーの日付前後する
   */
  const handleDateChange = (direction: 'prev' | 'today' | 'next'): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return;

    if (direction === 'prev') calApi.prev();
    if (direction === 'next') calApi.next();
    if (direction === 'today') calApi.today();

    setTitle(calApi.view.title);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box>
          <Button onClick={(): void => handleDateChange('prev')} size={'small'}>
            <ChevronLeftIcon />
          </Button>
          <Button
            onClick={(): void => handleDateChange('today')}
            size={'small'}
          >
            今月
          </Button>
          <Button onClick={(): void => handleDateChange('next')} size={'small'}>
            <ChevronRightIcon />
          </Button>
        </Box>
      </Grid>

      <Box
        position='relative'
        top='0'
        left='0'
        right='0'
        bottom='0'
        height={'20rem'}
        sx={{ m: 0, p: 0, border: 1, borderColor: '#dcdcdc' }}
      >
        <FullCalendar
          locales={[jaLocale]}
          height='100%'
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          eventBackgroundColor='#FFA500'
          //
          headerToolbar={false}
          fixedWeekCount={false}
          expandRows={true}
          stickyHeaderDates={false}
          dayMaxEvents={true}
          selectable={true}
          //
          ref={calendarRef}
          initialEvents={events}
          dayCellContent={dayCellContent}
          select={(arg) => handleSelect(arg.start)}
        />
      </Box>
    </Container>
  );
}

/**ーーーーーーーーーーーーーーーーーー
 * カレンダー上の日付
 ーーーーーーーーーーーーーーーーーー*/
function dayCellContent(e: DayCellContentArg) {
  e.dayNumberText = e.dayNumberText.replace('日', '');
  return <Typography fontSize='14px'>{e.dayNumberText}</Typography>;
}

const events = [
  {
    id: '1',

    resourceId: '1',
    start: new Date('2023/2/11 15:00').toISOString().slice(0, 10),
    end: new Date('2023/2/11 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '遅れるかも',
      operatorName: 'オペレーターAさん',
      avatar: 'アバターE',
    },

    display: 'background',
  },
  {
    id: '2',

    resourceId: '2',
    start: new Date('2023/4/21 15:00').toISOString().slice(0, 10),
    end: new Date('2023/4/21 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターAさん',
      avatar: 'アバターE',
    },
    display: 'background',
  },
  {
    id: '3',

    resourceId: '3',
    start: new Date('2023/4/16 15:00').toISOString().slice(0, 10),
    end: new Date('2023/4/16 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '遅れるかも',
      operatorName: 'オペレーターAさん',
      avatar: 'アバターE',
    },

    display: 'background',
  },
  {
    id: '4',

    resourceId: '2',
    start: new Date('2023/3/21 15:00').toISOString().slice(0, 10),
    end: new Date('2023/3/21 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '遅れるかも',
      operatorName: 'オペレーターAさん',
      avatar: 'アバターK',
    },

    display: 'background',
  },
  {
    id: '5',

    resourceId: '2',
    start: new Date('2023/3/25 10:00').toISOString().slice(0, 10),
    end: new Date('2023/3/25 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '遅れるかも',
      operatorName: 'オペレーターAさん',
      avatar: 'アバターL',
    },

    display: 'background',
  },
  {
    id: '6',

    resourceId: '3',
    start: new Date('2023/3/01 10:00').toISOString().slice(0, 10),
    end: new Date('2023/3/01 20:00').toISOString().slice(0, 10),
    extendedProps: {
      memo: '遅れるかも',
      operatorName: 'オペレーターAさん',
      avatar: 'アバターX',
    },
    display: 'background',
  },
];
