import { divideColor } from "./color";

/**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
 * 拠点をリソースにしたのカレンダーイベント形式配列
 ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
export const locationSortData = (events: any) => {
  let data: any;
  let setData: Array<any> = [];

  for (let i = 0; i < events.length; i++) {
    const e = events[i];

    const { color } = divideColor(new Date(e.start), new Date(e.end));

    // FullCalendarのイベントの型にして配列に収納
    data = {
      id: String(e.id),
      title: e.title,
      resourceId: e.location_cognito_user_id,
      start: new Date(e.start).toISOString(),
      end: new Date(e.end).toISOString(),
      extendedProps: {
        locationMemo: e.location_memo,
        operatorMemo: e.operator_memo,
        operatorName: e.operator_name,
        locationName: e.location_name,
        avatar: e.avatar,
      },
      color: color,
      durationEditable: false,
    };
    setData.push(data);
  }
  return { setData };
};

/**ーーーーーーーーーーーーーーーーーーーーーーーーーーー
 * オペレーターをリソースにしたカレンダーイベント形式配列
 * 指定したオペレーターのデータのみ
 ーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
export const operatorSortData = (resourceId: string, events: any) => {
  let data: any;
  let setData: Array<any> = [];

  // 指定したオペレーターIDにがっちする予定だけを抽出
  const userData = events.filter((item: any) => {
    return item.operator_cognito_user_id === resourceId;
  });

  for (let i = 0; i < userData.length; i++) {
    const e = userData[i];
    const { color } = divideColor(new Date(e.start), new Date(e.end));

    // FullCalendarのイベントの型にして配列に収納
    data = {
      id: String(e.id),
      title: e.title,
      resourceId,
      start: new Date(e.start).toISOString(),
      end: new Date(e.end).toISOString(),
      extendedProps: {
        locationMemo: e.location_memo,
        operatorMemo: e.operator_memo,
        operatorName: e.operator_name,
        locationName: e.location_name,
        avatar: e.avatar,
      },
      color: color,
      durationEditable: false,
    };
    setData.push(data);
  }
  return { setData };
};
