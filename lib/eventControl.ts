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

/**
 * event配列をDBからとってくる
 * @returns event配列
 */
export const getEvents = () => {
  // 背景色を変更してから収納
  for (let i = 0; i < events.length; i++) {
    const item = events[i];

    const { backgroundColor, borderColor } = divideColor(item.start, item.end);
    item.backgroundColor = backgroundColor;
    item.borderColor = borderColor;
  }
  return events;
};

/**
 * 予定の色分け
 * @param start
 * @param end
 * @returns イベントの色
 */
export const divideColor = (start: number, end: number) => {
  let backgroundColor: string = '';
  let borderColor: string = '';

  const now = new Date().getTime();

  // 予定
  if (start > now) {
    backgroundColor = '#90EE90';
    borderColor = '#90EE90';
  }
  // 稼働中
  if (start <= now && now <= end) {
    backgroundColor = '#4169E1';
    borderColor = '#4169E1';
  }
  // 古い
  if (end < now) {
    backgroundColor = '#A9A9A9';
    borderColor = '#A9A9A9';
  }
  return { backgroundColor, borderColor };
};
