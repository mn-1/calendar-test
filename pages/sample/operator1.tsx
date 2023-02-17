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
// components
import Header from '../../components/Header/Header';
import Month from '../../components/FullCalendar/Month';

export type UpdateFormDataInfo = {
  title: string;
  start: Date;
  end: Date;
};

const SampleCalendar: React.FC = (props) => {
  const ref = React.createRef<any>();

  return (
    <>
      <Header userType='operator' />
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          height: '100%',
          mt: '4rem',
        }}
      >
        <Grid
          container
          direction='row'
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Grid item sm={3}>
            <Month />
          </Grid>
          <Grid item sm={9}>
            <FullCalendar
              locales={[jaLocale]}
              locale='ja'
              // 週表示、月表示、日付等のクリックを可能にするプラグインを設定
              plugins={[
                timeGridPlugin,
                dayGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              initialView='timeGridWeek'
              // 週表示した時の時間軸の単位
              slotDuration='00:30:00'
              // interactionPluginが有効になっている場合のみ日付選択を可能にする
              selectable={true}
              // ビジネス時間の設定。仕事してる時間てことかな
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5, 6], // 0:日曜 〜 6:土曜
                startTime: '8:00:00',
                endTime: '20:00:00',
              }}
              // 週末を強調表示する。
              weekends={true}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay listWeek',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SampleCalendar;
