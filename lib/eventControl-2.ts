// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// lib
import { resources, events } from './data';
import { divideColor } from './colorControl';
import { RegisterScheduleDataInfo } from './inputDataControl';
// validate
import { SubmitHandler } from 'react-hook-form';
// Fullcalendar
import { DateSelectArg, ViewApi } from '@fullcalendar/core';

export default function EventControl() {
  // IDセット
  const [countId, setCountId] = useState<number>(0);
  // イベントリスト収納
  const [myEvents, setMyEvents] = useState<any>([]);
  // イベント登録用
  const [selectInfo, setSelectInfo] = useState<DateSelectArg>();

  // 予定登録ダイアログopen
  const [registerDialogOpen, setRegisterDialogOpen] = useState<boolean>(false);

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * DBから撮ってきたeventsを色分けしてカレンダーに入れる
   *
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
    if (!selectInfo || !selectInfo.resource)
      return console.log('selectInfo none');

    const calendar = selectInfo.view.calendar;

    const start = new Date(selectInfo.start).getTime();
    const end = new Date(selectInfo.end).getTime();
    const { backgroundColor, borderColor } = divideColor(start, end);

    calendar.unselect();

    calendar.addEvent({
      id: `${countId}`,
      title: values.title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      resourceId: selectInfo.resource?.id,
      extendedProps: {
        memo: values.memo,
        operatorName: values.operatorName,
        avatar: values.avatar,
      },
      allDay: false,
      backgroundColor,
      borderColor,
    });

    setRegisterDialogOpen(false);
  };

  const updateSchedule = () => {};

  return {
    countId,
    myEvents,
    registerDialogOpen,
    setSelectInfo,
    getEvents,
    setCountId,
    setMyEvents,
    registerSchedule,
    setRegisterDialogOpen,
  };
}
