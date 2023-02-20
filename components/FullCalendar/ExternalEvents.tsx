import React, { useEffect, useRef } from 'react';
import { Draggable } from '@fullcalendar/interaction';
import Button from '@mui/material/Button';

export const ExternalEvent = ({ event }: any) => {
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;
    const draggable = new Draggable(elRef.current, {
      eventData: function () {
        console.log('external Event', event);
        return { ...event, create: true };
      },
    });

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
        mt: '0.6rem',
      }}
    >
      {event.extendedProps.operatorName}
    </Button>
  );
};
