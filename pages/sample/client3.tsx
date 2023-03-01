import MobileClientCalendar from '../../components/FullCalendar/Client/MobileCalendar';
// react
import React, { useState, useRef, createRef, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import PcCalendar from '../../components/FullCalendar/Client/PcCalendar';

const Client = () => {
  const matches: boolean = useMediaQuery('(min-width:992px)');

  return (
    <>
      {matches ? (
        <PcCalendar matches={matches} />
      ) : (
        <MobileClientCalendar matches={matches} />
      )}

      {/* utils ↓ */}
      {/* <ScheduleInfoDialog
          editMode={!editMode}
          eventInfo={eventInfo}
          open={infoDialogOpen}
          delete={deleteEvent}
          edit={() => {
            setEditDialogOpen(true);
            setInfoDialogOpen(false);
          }}
          handleClose={() => setInfoDialogOpen(false)}
        /> */}
      {/* utils ↑ */}
    </>
  );
};

export default Client;
