// react
import { useState } from 'react';
// lib
import { resources, eventsOperator } from './data';
import { divideColor, divideColor2 } from './colorControl';
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
  // 失敗した時のスナックバー
  const [failedSnackbarOpen, setFailedSnackbarOpen] = useState<boolean>(false);

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * DBから撮ってきたeventsを色分けしてカレンダーに入れる
   *
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const getEvents = () => {
    // 背景色を変更してから収納
    for (let i = 0; i < eventsOperator.length; i++) {
      const item = eventsOperator[i];

      const { color } = divideColor2(new Date(item.start), new Date(item.end));
      item.color = color;
    }

    const add = eventsOperator.length;
    setCountId(add);

    setMyEvents(eventsOperator);
  };

  // const getColorEvents = () => {
  //   // 背景色を変更してから収納
  //   for (let i = 0; i < eventsOperator.length; i++) {
  //     const item = eventsOperator[i];

  //     const { color } = divideColor2(new Date(item.start), new Date(item.end));
  //     item.color = color;

  //     item.start = item.start.slice(0, 10);
  //     item.end = item.end.slice(0, 10);
  //     item.display = 'background';
  //   }

  //   const add = eventsOperator.length;
  //   setCountId(add);

  //   setMyEvents2(eventsOperator);
  // };

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
    failedSnackbarOpen,
    setFailedSnackbarOpen,
    setEditDialogOpen,
    editMemo,
    setEventInfo,
    getEvents,
    setCountId,
    setMyEvents,
  };
}
