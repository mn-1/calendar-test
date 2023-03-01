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

      {/* utils ↑ */}
    </>
  );
};

export default Client;
