//ここでDBから撮ってきたのをフロントに渡す

// react
import React, { useState, useRef, createRef, useEffect } from 'react';
// lib
import { resources, events } from './data';
import { divideColor } from './colorControl';
import { RegisterScheduleDataInfo } from './inputDataControl';
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

    const { backgroundColor, borderColor } = divideColor(item.start, item.end);
    item.backgroundColor = backgroundColor;
    item.borderColor = borderColor;
  }
  return events;
};

// export const registerSchedule: SubmitHandler<RegisterScheduleDataInfo> = async (
//   values: RegisterScheduleDataInfo
// ) => {
//   const { backgroundColor, borderColor } = divideColor(
//     new Date(start).getTime(),
//     new Date(end).getTime()
//   );
// };
