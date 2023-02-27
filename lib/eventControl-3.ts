// react
import { useState } from 'react';
// lib
import { resources, events } from './data';
import { divideColor } from './colorControl';
import { scheduleDataInfo } from './inputDataControl';
// Fullcalendar
import { CalendarApi, EventClickArg } from '@fullcalendar/core';

export default function EventControl() {
  // IDセット
  const [countId, setCountId] = useState<number>(0);
  // イベント一覧収納
  const [myEvents, setMyEvents] = useState<any>([]);
  // 予定情報
  const [eventInfo, setEventInfo] = useState<EventClickArg | null>(null);
  // 予定登録ダイアログopen
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  // 予定編集ダイアログopen
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  // カレンダー
  // const [calApi, setCalApi] = useState<CalendarApi | null>(null);

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * DBから撮ってきたeventsを色分けしてカレンダーに入れる
   *
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const getEvents = () => {
    // 背景色を変更してから収納
    for (let i = 0; i < events.length; i++) {
      const item = events[i];

      const { color } = divideColor(item.start, item.end);
      item.color = color;
    }

    const add = events.length;
    setCountId(add);

    setMyEvents(events);
  };

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * 予定編集
   * 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const editSchedule = async (values: scheduleDataInfo) => {
    const event = eventInfo?.event;

    if (!event) return console.log('event none');

    event.setProp('title', values.title);
    event.setExtendedProp('memo', values.memo);
    event.setExtendedProp('avatar', values.avatar);

    setEditDialogOpen(false);
  };

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * 予定登録
   * @param values 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const addSchedule = async (values: scheduleDataInfo, calApi: CalendarApi) => {
    let start = values.date;
    start = new Date(start.setHours(0));
    let end = new Date(start);
    end = new Date(end.setHours(end.getHours() + 2));

    const { color } = divideColor(start.getTime(), end.getTime());

    const resource = resources.find((item) => {
      if (item.title === values.locationName) return item;
    });

    if (!resource) return console.log('resorce none');
    if (!calApi) return console.log('api none');

    calApi.addEvent({
      id: `${countId}`,
      title: values.title,
      start,
      end,
      resourceId: `${resource.id}`,
      extendedProps: {
        memo: values.memo,
        operatorName: values.operatorName,
        avatar: values.avatar,
      },
      allDay: false,
      editable: true,
      color,
    });

    setAddDialogOpen(false);
  };

  return {
    countId,
    myEvents,
    addDialogOpen,
    eventInfo,
    editDialogOpen,
    setEditDialogOpen,
    editSchedule,
    setEventInfo,
    addSchedule,
    getEvents,
    setCountId,
    setMyEvents,
    setAddDialogOpen,
  };
}
