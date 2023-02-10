//ここでDBから撮ってきたのをフロントに渡す

// react
import React, { useState, useRef, createRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventInput,
  EventDropArg,
} from '@fullcalendar/core';
import { RefObject } from '@fullcalendar/core/preact';
import { resources, events } from './data';

export default function EventControl() {
  const [countId, setCountId] = useState<number>(0);
  const [myEvents, setMyEvents] = useState<any>([]);

  /**
   * DBから撮ってきたeventsを色分けしてカレンダーに入れる
   * @param calendarRef
   * @returns イベントリスト
   */
  const getEvents = () => {
    // 背景色を変更してから収納
    for (let i = 0; i < events.length; i++) {
      const item = events[i];
      const now = new Date().getTime();

      if (item.start && item.end) {
        // 予約
        if (item.start > now) {
          item.backgroundColor = '#90EE90';
          item.borderColor = '#90EE90';
        }
        // 稼働中
        if (item.start <= now && now <= item.end) {
          item.backgroundColor = '#4169E1';
          item.borderColor = '#4169E1';
        }
        // 古い
        if (item.end < now) {
          item.backgroundColor = '#A9A9A9';
          item.borderColor = '#A9A9A9';
        }
      }
    }

    return events;
  };

  return { countId, myEvents, getEvents };
}
