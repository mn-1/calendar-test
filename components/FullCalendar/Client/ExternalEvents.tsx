import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Draggable } from '@fullcalendar/interaction';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

type Props = {
  event: any;
};

export const ExternalEvent = ({ event }: Props) => {
  const elRef = useRef<any>(null);

  useEffect(() => {
    if (!elRef.current) return;

    const draggable = new Draggable(elRef.current, {
      eventData: function (e) {
        console.log('external Event', event);
        return { ...event, create: true };
      },
    });
    elRef.current.onDragStart = () => {
      console.log('drag start');
    };

    // a cleanup function
    return () => draggable.destroy();
  });

  return (
    <Button
      ref={elRef}
      title={event.title}
      variant='contained'
      sx={{
        fontWeight: 'bold',
        cursor: 'grab',
        mb: '0.6rem',
      }}
    >
      {event.extendedProps.operatorName}
    </Button>
  );
};
