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
  // 失敗した時のスナックバー
  const [failedSnackbarOpen, setFailedSnackbarOpen] = useState<boolean>(false);

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * DBから撮ってきたeventsを色分けしてカレンダーに入れる
   * 一覧取得
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
    console.log(values);

    if (!event) return setFailedSnackbarOpen(true);

    event.setProp('title', values.title);
    event.setExtendedProp('memo', values.memo);
    event.setExtendedProp('avatar', values.avatar);

    setEditDialogOpen(false);
  };

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * スマホで予定編集
   * 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const mobileEditSchedule = async (values: scheduleDataInfo) => {
    const event = eventInfo?.event;
    const start = new Date(
      `${values.date.toDateString()} ${values.start.toTimeString()}`
    );
    const end = new Date(
      `${values.date.toDateString()} ${values.end.toTimeString()}`
    );
    const { color } = divideColor(start.getTime(), end.getTime());

    const resource = resources.find((item) => {
      if (item.title === values.locationName) return item;
    });

    if (!resource || !event) return setFailedSnackbarOpen(true);

    event.setStart(start);
    event.setEnd(end);
    event.setProp('color', color);
    event.setProp('title', values.title);
    event.setResources([resource.id]);
    event.setExtendedProp('operatorName', values.operatorName);
    event.setExtendedProp('memo', values.memo);
    event.setExtendedProp('avatar', values.avatar);

    setEditDialogOpen(false);
  };

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * 予定登録
   * @param values 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const addSchedule = async (values: scheduleDataInfo, calApi: CalendarApi) => {
    const start = new Date(
      `${values.date.toDateString()} ${values.start.toTimeString()}`
    );
    const end = new Date(
      `${values.date.toDateString()} ${values.end.toTimeString()}`
    );

    const { color } = divideColor(start.getTime(), end.getTime());

    const resource = resources.find((item) => {
      if (item.title === values.locationName) return item;
    });

    if (!resource || !calApi) return setFailedSnackbarOpen(true);

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
      color,
      durationEditable: false,
    });

    setAddDialogOpen(false);
  };

  return {
    countId,
    myEvents,
    addDialogOpen,
    eventInfo,
    editDialogOpen,
    failedSnackbarOpen,
    setFailedSnackbarOpen,
    mobileEditSchedule,
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
