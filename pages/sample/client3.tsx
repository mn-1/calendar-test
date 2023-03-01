// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Typography, Button, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClientCalendar from '../../components/FullCalendar/Client/PC-Mobile-Test';

const Client = () => {
  const matches: boolean = useMediaQuery('(min-width:992px)');

  return (
    <>
      <ClientCalendar />
    </>
  );
};

export default Client;
