import React, { useEffect, useRef } from 'react';
import { Draggable } from '@fullcalendar/interaction';
import Button from '@mui/material/Button';

type Props = {
  event: any;
};

export const ExternalEvent = ({ event }: Props) => {
  const elRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!elRef.current) return;

    const draggable = new Draggable(elRef.current, {
      eventData: () => {
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
        mb: '0.6rem',
      }}
    >
      {event.extendedProps.operatorName}
    </Button>
  );
};
