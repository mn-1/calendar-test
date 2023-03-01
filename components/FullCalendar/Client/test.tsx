import React, { MutableRefObject, useEffect, useRef } from 'react';
import { Draggable } from '@fullcalendar/interaction';
import Button from '@mui/material/Button';

type Props = {
  event: any;
};

export const ExternalEvent = ({ event }: Props) => {
  const exRef = useRef<any>(null);

  useEffect(() => {
    if (!exRef.current) return;

    const draggable = new Draggable(exRef.current, {
      eventData: function (e) {
        return { ...event, create: true };
      },
    });
    exRef.current.onDragStart = () => {
      console.log('drag start');
    };

    // a cleanup function
    return () => draggable.destroy();
  });

  return (
    <Button
      ref={exRef}
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
