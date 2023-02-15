// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// lib
import { resources, events } from './data';
import { divideColor } from './colorControl';
import { RegisterScheduleDataInfo } from './inputDataControl';
// validate
import { SubmitHandler } from 'react-hook-form';
import { ViewApi } from '@fullcalendar/core';

export default function EventControl() {
  // IDセット
  const [countId, setCountId] = useState<number>(0);
  // イベントリスト収納
  const [myEvents, setMyEvents] = useState<any>([]);
  // イベント登録用
  const [newSchedule, setNewSchedule] = useState({
    id: '',
    start: new Date(),
    end: new Date(),
    resourceId: '',
  });
  // ref.current.getApi().calendar.view登録用
  const [view, setView] = useState<ViewApi>();
  // 予定登録ダイアログopen
  const [inputScheduleDialogOpen, setInputScheduleDialogOpen] =
    useState<boolean>(false);

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * DBから撮ってきたeventsを色分けしてカレンダーに入れる
   * @param calendarRef
   * @returns イベントリスト
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const getEvents = () => {
    // 背景色を変更してから収納
    for (let i = 0; i < events.length; i++) {
      const item = events[i];

      const { backgroundColor, borderColor } = divideColor(
        item.start,
        item.end
      );
      item.backgroundColor = backgroundColor;
      item.borderColor = borderColor;
    }

    setMyEvents(events);
  };

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * 予定登録
   * @param values 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const registerSchedule = async (values: RegisterScheduleDataInfo) => {
    if (!view) return console.log('view none');

    const { backgroundColor, borderColor } = divideColor(
      new Date(newSchedule.start).getTime(),
      new Date(newSchedule.end).getTime()
    );

    view.calendar.unselect();

    view.calendar.addEvent({
      id: newSchedule.id,
      title: values.title,
      start: newSchedule.start,
      end: newSchedule.end,
      resourceId: newSchedule.resourceId,
      extendedProps: { memo: values.memo },
      allDay: false,
      backgroundColor,
      borderColor,
    });
    setInputScheduleDialogOpen(false);
  };

  return {
    countId,
    myEvents,
    inputScheduleDialogOpen,
    getEvents,
    setCountId,
    setView,
    setMyEvents,
    setNewSchedule,
    registerSchedule,
    setInputScheduleDialogOpen,
  };
}
