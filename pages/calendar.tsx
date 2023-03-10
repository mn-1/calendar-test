/**
 * 基本の使い方の説明
 */
import React from 'react';
// FullCalendar
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // 週表示を可能にする
import dayGridPlugin from '@fullcalendar/daygrid'; // 月表示を可能にする
import interactionPlugin from '@fullcalendar/interaction'; // 日付や時間が[ 選択 ]きるようになる
import jaLocale from '@fullcalendar/core/locales/ja';
import listPlugin from '@fullcalendar/list'; // 予定をリスト表示
import { Grid } from '@mui/material';

const SampleCalendar: React.FC = () => {
  /**
   * 予定を追加する際にCalendarオブジェクトのメソッドを使用する必要がある。
   * (CalendarオブジェクトはRef経由でアクセスする必要がある。)
   */
  const ref = React.createRef<any>();

  return (
    <>
      {/* <Container maxWidth={false}> */}
      <Grid container direction='column' sx={{ width: '100%' }}>
        <FullCalendar
          ref={ref}
          // 日本語表記
          locales={[jaLocale]}
          locale='ja'
          // 週表示、月表示、日付等のクリックを可能にするプラグインを設定
          plugins={[
            timeGridPlugin,
            dayGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          // カレンダーの初期表示設定
          initialView='dayGridMonth'
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
          // タイトルのフォーマット。(詳細は後述。※1)
          titleFormat={{
            year: 'numeric',
            month: 'short',
          }}
          // ヘッダー設定
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek listWeek',
          }}
        />
      </Grid>
      {/* </Container> */}
    </>
  );
};

export default SampleCalendar;
