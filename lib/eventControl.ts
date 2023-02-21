//ここでDBから撮ってきたのをフロントに渡す

// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// lib
import { resources, events } from './data';
import { divideColor } from './colorControl';
// validate
import { SubmitHandler } from 'react-hook-form';

/**
 * event配列をDBからとってくる
 * @returns event配列
 */
export const getEvents = () => {
  // 背景色を変更してから収納
  for (let i = 0; i < events.length; i++) {
    const item = events[i];

    const { color } = divideColor(item.start, item.end);
    item.color = color;
  }

  const countId = events.length;

  return { events, countId };
};

// export const registerSchedule: SubmitHandler<RegisterScheduleDataInfo> = async (
//   values: RegisterScheduleDataInfo
// ) => {
//   const { backgroundColor, borderColor } = divideColor(
//     new Date(start).getTime(),
//     new Date(end).getTime()
//   );
// };
