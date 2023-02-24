// react
import React, { useState, RefObject, useEffect } from 'react';
// MUI
import { Box, Container, Grid, Typography } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import jaLocale from '@fullcalendar/core/locales/ja';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventContentArg, EventDropArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import listPlugin from '@fullcalendar/list'; // 予定をリスト表示
// lib
import { resources, operator } from '../../../lib/data';

export type Props = {
  calendarRef: RefObject<FullCalendar>;
  myEvents: any;
  handleEventClick: Function;
  handleEventSet: Function;
};

const MainCalendar = ({
  calendarRef,
  myEvents,
  handleEventClick,
  handleEventSet,
}: Props) => {
  return (
    <>
      <FullCalendar
        initialEvents={myEvents}
        ref={calendarRef}
        locales={[jaLocale]}
        locale='ja'
        eventColor='#6A5ACD'
        contentHeight='auto'
        resources={resources}
        slotDuration='00:30:00'
        slotMinTime='05:00:00'
        slotMaxTime='23:00:00'
        plugins={[
          timeGridPlugin, // 縦軸時間に
          dayGridPlugin, // 日付ごとに
          interactionPlugin,
          listPlugin,
          resourceTimeGridPlugin,
          interactionPlugin,
          scrollGridPlugin,
        ]}
        initialView='resourceTimeGrid'
        eventContent={renderEventContent}
        //
        droppable={false}
        editable={false}
        //
        eventOverlap={false}
        headerToolbar={false}
        selectable={false}
        selectMirror={true}
        weekends={true}
        eventResizableFromStart={true}
        nowIndicator={true}
        allDaySlot={false}
        slotEventOverlap={true}
        navLinks={true}
        expandRows={true}
        //
        eventClick={(arg) => handleEventClick(arg)}
        eventsSet={(events) => handleEventSet(events)}
      />
    </>
  );
};

export default MainCalendar;

// カレンダーに表示する内容
function renderEventContent(eventContent: EventContentArg) {
  const {
    timeText,
    event: {
      extendedProps: { avatar, memo },
      title,
    },
  } = eventContent;
  return (
    <>
      <Typography>{timeText}</Typography>

      {title && (
        <>
          タイトル
          <br />
          <Typography>{title}</Typography>
        </>
      )}
      {avatar && (
        <>
          アバター
          <br />
          <Typography>{avatar}</Typography>
        </>
      )}
      {memo && (
        <>
          メモ
          <br />
          <Typography>{memo}</Typography>
        </>
      )}
    </>
  );
}
