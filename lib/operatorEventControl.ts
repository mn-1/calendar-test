// react
import { useState } from "react";
// lib
import { events } from "./data";
import { editMemoInfo } from "./inputData";
// Fullcalendar
import { CalendarApi, EventClickArg } from "@fullcalendar/core";

export default function EventControl() {
  // イベント一覧収納ー顧客全体の予定
  const [myEvents, setMyEvents] = useState<any>([]);
  // 予定情報
  const [eventInfo, setEventInfo] = useState<EventClickArg | null>(null);
  // 予定編集ダイアログopen
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  // 失敗した時のスナックバー
  const [failedSnackbarOpen, setFailedSnackbarOpen] = useState<boolean>(false);

  /**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
   * DBから撮ってきたeventsをカレンダーに入れる
   * 
   ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
  const getEvents = () => {
    setMyEvents(events);
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
    myEvents,
    eventInfo,
    editDialogOpen,
    failedSnackbarOpen,
    getEvents,
    setFailedSnackbarOpen,
    setEditDialogOpen,
    editMemo,
    setEventInfo,
  };
}
