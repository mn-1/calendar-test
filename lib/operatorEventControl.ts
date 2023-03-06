// react
import { useState } from 'react';
// lib
import { eventsOperator, events } from './data';
import { divideColor2, divideColor } from './colorControl';
import { editMemoInfo } from './inputDataControl';
// Fullcalendar
import { CalendarApi, EventClickArg } from '@fullcalendar/core';

export default function EventControl() {
  // IDセット
  const [countId, setCountId] = useState<number>(0);
  // イベント一覧収納ーオペレーターごとの予定
  const [operatorEvents, setOperatorEvents] = useState<any>([]);
  // イベント一覧収納ー顧客全体の予定
  const [clientEvents, setClientEvents] = useState<any>([]);
  // 予定情報
  const [eventInfo, setEventInfo] = useState<EventClickArg | null>(null);
  // 予定編集ダイアログopen
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  // 失敗した時のスナックバー
  const [failedSnackbarOpen, setFailedSnackbarOpen] = useState<boolean>(false);

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * DBから撮ってきたeventsを色分けしてカレンダーに入れる
   *
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const getOperatorEvents = () => {
    // 背景色を変更してから収納
    for (let i = 0; i < eventsOperator.length; i++) {
      const item = eventsOperator[i];

      const { color } = divideColor2(new Date(item.start), new Date(item.end));
      item.color = color;
    }

    const add = eventsOperator.length;
    setCountId(add);

    setOperatorEvents(eventsOperator);
  };

  const getClientEvents = () => {
    // 背景色を変更してから収納
    for (let i = 0; i < events.length; i++) {
      const item = events[i];

      const { color } = divideColor(item.start, item.end);
      item.color = color;
    }

    const add = events.length;
    setCountId(add);

    setClientEvents(events);
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
    operatorEvents,
    clientEvents,
    eventInfo,
    editDialogOpen,
    failedSnackbarOpen,
    getClientEvents,
    setFailedSnackbarOpen,
    setEditDialogOpen,
    editMemo,
    setEventInfo,
    getOperatorEvents,
    setCountId,
    setOperatorEvents,
  };
}
