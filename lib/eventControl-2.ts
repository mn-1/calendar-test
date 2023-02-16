// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// lib
import { resources, events } from './data';
import { divideColor } from './colorControl';
import {
  EditScheduleDataInfo,
  RegisterScheduleDataInfo,
} from './inputDataControl';
// Fullcalendar
import { DateSelectArg, EventClickArg, ViewApi } from '@fullcalendar/core';

export default function EventControl() {
  // IDセット
  const [countId, setCountId] = useState<number>(0);
  // イベント一覧収納
  const [myEvents, setMyEvents] = useState<any>([]);
  // 予約登録
  const [selectInfo, setSelectInfo] = useState<DateSelectArg>();
  // 予定情報
  const [eventInfo, setEventInfo] = useState<EventClickArg | null>(null);
  // 予定登録ダイアログopen
  const [registerDialogOpen, setRegisterDialogOpen] = useState<boolean>(false);
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

    // calendar.unselect();

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

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * 予定編集
   * @param values 
   * @returns 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const editSchedule = async (values: EditScheduleDataInfo) => {
    const event = eventInfo?.event;

    if (!event) return console.log('event none');

    event.setProp('title', values.title);
    event.setExtendedProp('memo', values.memo);
    event.setExtendedProp('operatorName', values.operatorName);
    event.setExtendedProp('avatar', values.avatar);

    setEditDialogOpen(false);
  };

  return {
    countId,
    myEvents,
    registerDialogOpen,
    eventInfo,
    editDialogOpen,
    setEditDialogOpen,
    editSchedule,
    setEventInfo,
    setSelectInfo,
    getEvents,
    setCountId,
    setMyEvents,
    registerSchedule,
    setRegisterDialogOpen,
  };
}
