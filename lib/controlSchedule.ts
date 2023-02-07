import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

var calendarEl = document.getElementById('calendar');

let calendar = new Calendar(calendarEl, {
  schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  plugins: [interactionPlugin, resourceTimelinePlugin],
  initialView: 'resourceTimelineDay',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
  },
  locale: 'ja',

  // ドラッグで移動が可能
  editable: true,
  // ヘッダのタイトルを変更
  resourceAreaHeaderContent: '予定一覧',
  // 左側のリソースの一覧
  resources: [
    { id: 'a', title: '田中' },
    { id: 'b', title: '鈴木', eventColor: 'green' },
  ],
  // リソースごとのイベントを定義
  events: [
    {
      resourceId: 'a',
      title: '打ち合わせ',
      start: '2021-11-21T14:00:00',
      end: '2021-11-21T16:00:00',
    },
    {
      resourceId: 'b',
      title: '外出',
      start: '2021-11-21T10:00:00',
      end: '2021-11-21T15:00:00',
    },
  ],
});
calendar.render();
