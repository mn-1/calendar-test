// react
import React, { useState, useRef, createRef, useEffect } from 'react';
import { EventApi, DateSelectArg } from '@fullcalendar/core';
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
    setMyEvents(events);
  };

  const handleDateSelect = ({
    resource,
    start,
    end,
    view: { calendar },
  }: DateSelectArg): void => {
    const title = prompt('Please enter a new title for your event');
    calendar.unselect();

    const add = countId + 1;
    setCountId(add);

    if (!title) return;
    calendar.addEvent({
      id: String(countId),
      title,
      start,
      end: end + '01:00:00',
      resourceId: resource?.id,
      // slotDuration: '01:00:00',// 間隔決めれる
      allDay: false,
      color: '#3CB371',
    });
  };

  return { countId, myEvents, getEvents, handleDateSelect, setMyEvents };
}
