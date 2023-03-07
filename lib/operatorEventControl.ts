// react
import { useState } from "react";
// lib
import { events, operatorEvents } from "./data";
import { divideColor2, divideColor } from "./colorControl";
import { editMemoInfo } from "./inputDataControl";
// Fullcalendar
import { CalendarApi, EventClickArg } from "@fullcalendar/core";

export default function EventControl() {
  // IDセット
  const [countId, setCountId] = useState<number>(0);
  // イベント一覧収納ー顧客全体の予定
  const [myEvents, setMyEvents] = useState<any>([]);
  // イベント一覧収納ー顧客全体の予定
  const [operatorEvent, setOperatorEvent] = useState<any>([]);
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
    for (let i = 0; i < events.length; i++) {
      const item = events[i];

      const { color } = divideColor2(new Date(item.start), new Date(item.end));

      item.color = color;
    }

    setMyEvents(events);
  };

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * DBから撮ってきたeventsを色分けしてカレンダーに入れる
   * オペレーター表示用
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const getOperatorEvents = () => {
    //   // 背景色を変更してから収納
    for (let i = 0; i < operatorEvents.length; i++) {
      const item = operatorEvents[i];

      const { color } = divideColor2(new Date(item.start), new Date(item.end));

      item.color = color;
    }

    setOperatorEvent(operatorEvents);
  };

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * 予定編集
   * 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const editMemo = async (values: editMemoInfo) => {
    const event = eventInfo?.event;
    console.log(values);
    if (!event) return console.log("event none");

    event.setExtendedProp("memo", values.memo);

    setEditDialogOpen(false);
  };

  return {
    countId,
    myEvents,
    eventInfo,
    editDialogOpen,
    failedSnackbarOpen,
    operatorEvent,
    getOperatorEvents,
    getEvents,
    setFailedSnackbarOpen,
    setEditDialogOpen,
    editMemo,
    setEventInfo,
    setCountId,
  };
}
