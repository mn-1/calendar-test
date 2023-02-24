// react
import { useState } from 'react';
// lib
import { resources, eventsOperator } from './data';
import { divideColor } from './colorControl';
import { editMemoInfo } from './inputDataControl';
// Fullcalendar
import { CalendarApi, EventClickArg } from '@fullcalendar/core';

export default function EventControl() {
  // IDセット
  const [countId, setCountId] = useState<number>(0);
  // イベント一覧収納
  const [myEvents, setMyEvents] = useState<any>([]);
  // 予定情報
  const [eventInfo, setEventInfo] = useState<EventClickArg | null>(null);
  // 予定編集ダイアログopen
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * DBから撮ってきたeventsを色分けしてカレンダーに入れる
   *
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const getEvents = () => {
    // 背景色を変更してから収納
    for (let i = 0; i < eventsOperator.length; i++) {
      const item = eventsOperator[i];

      const { color } = divideColor(item.start, item.end);
      item.color = color;
    }

    const add = eventsOperator.length;
    setCountId(add);

    setMyEvents(eventsOperator);
  };

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * 予定編集
   * 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const editMemo = async (values: editMemoInfo) => {
    const event = eventInfo?.event;
    console.log(values);
    if (!event) return console.log('event none');

    event.setExtendedProp('memo', values.memo);

    setEditDialogOpen(false);
  };

  return {
    countId,
    myEvents,
    eventInfo,
    editDialogOpen,
    setEditDialogOpen,
    editMemo,
    setEventInfo,
    getEvents,
    setCountId,
    setMyEvents,
  };
}
