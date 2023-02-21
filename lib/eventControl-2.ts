// react
import { useState } from 'react';
// lib
import { resources, events } from './data';
import { divideColor } from './colorControl';
import { scheduleDataInfo } from './inputDataControl';
// Fullcalendar
import { CalendarApi, EventClickArg } from '@fullcalendar/core';

export interface SelectInfoType {
  id: string;
  startStr: string;
  endStr: string;
  resourceId: string;
  resourceTitle: string;
  calendar: CalendarApi;
}

export default function EventControl() {
  // IDセット
  const [countId, setCountId] = useState<number>(0);
  // イベント一覧収納
  const [myEvents, setMyEvents] = useState<any>([]);
  // 予約登録
  const [selectInfo, setSelectInfo] = useState<SelectInfoType | null>(null);
  // 予定情報
  const [eventInfo, setEventInfo] = useState<EventClickArg | null>(null);
  // 予定登録ダイアログopen
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  // 予定編集ダイアログopen
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

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

    setMyEvents(events);
  };

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * 予定登録
   * @param values 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  // const addSchedule = async (values: scheduleDataInfo) => {
  //   if (!selectInfo) return console.log('selectInfo none');

  //   const start = new Date(selectInfo.startStr).getTime();
  //   const end = new Date(selectInfo.endStr).getTime();
  //   const { color } = divideColor(start, end);

  //   const resource = resources.find((item) => {
  //     if (item.title === values.locationName) return item;
  //   });

  //   if (!resource) return console.log('resorce none');

  //   selectInfo.calendar.addEvent({
  //     id: `${countId}`,
  //     title: values.title,
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //     resourceId: `${resource.id}`,
  //     extendedProps: {
  //       memo: values.memo,
  //       operatorName: values.operatorName,
  //       avatar: values.avatar,
  //     },
  //     allDay: false,
  //     color,
  //   });

  //   setAddDialogOpen(false);
  // };

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * 予定編集
   * @param values 
   * @returns 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  // const editSchedule = async (values: scheduleDataInfo) => {
  //   const event = eventInfo?.event;

  //   if (!event) return console.log('event none');

  //   event.setProp('title', values.title);
  //   event.setExtendedProp('memo', values.memo);
  //   event.setExtendedProp('operatorName', values.operatorName);
  //   event.setExtendedProp('avatar', values.avatar);

  //   setEditDialogOpen(false);
  // };

  return {
    countId,
    myEvents,
    addDialogOpen,
    eventInfo,
    editDialogOpen,
    selectInfo,
    setEditDialogOpen,
    // editSchedule,
    setEventInfo,
    setSelectInfo,
    getEvents,
    setCountId,
    setMyEvents,
    // addSchedule,
    setAddDialogOpen,
  };
}
