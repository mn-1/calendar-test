import React, { useState } from 'react';
// MUI
import { Grid, Container, Box } from '@mui/material';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // 週表示を可能にする
import dayGridPlugin from '@fullcalendar/daygrid'; // 月表示を可能にする
import interactionPlugin from '@fullcalendar/interaction'; // 日付や時間が[ 選択 ]きるようになる
import jaLocale from '@fullcalendar/core/locales/ja';
import listPlugin from '@fullcalendar/list'; // 予定をリスト表示

export default function Month() {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100%',
        height: '100%',
        mt: '4rem',
      }}
    >
      <FullCalendar
        locales={[jaLocale]}
        locale='ja'
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin]}
        initialView='dayGridMonth'
        selectable={true}
        // 週末を強調表示する。
        weekends={true}
        // タイトルのフォーマット。
        titleFormat={{
          year: 'numeric',
          month: 'short',
        }}
        headerToolbar={{
          left: 'prev today',
          center: 'title',
          right: 'next',
        }}
      />
    </Container>
  );
}
