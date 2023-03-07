import { divideColor2 } from "../../lib/colorControl";

export default function Test() {
  const data = locationEvents();
  console.log(data);
  return <></>;
}

// resourceIDを拠点にする
function locationEvents() {
  let data: any;
  let setData: Array<any> = [];

  for (let i = 0; i < event.length; i++) {
    const e = event[i];

    const { color } = divideColor2(new Date(e.start), new Date(e.end));

    data = {
      id: String(e.id),
      title: e.title,
      resourceId: e.location_cognito_user_id,
      start: new Date(e.start),
      end: new Date(e.end),
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
}

const event = [
  {
    id: 1,
    //
    operator_name: "オペレーターA",
    operator_cognito_user_id: "DE-RQxKOBdkE7whg8DO",
    //
    location_name: "盛岡支店",
    location_cognito_user_id: "RC-hY7CuvT2dLPayj8g",
    //
    title: "sample title",
    location_memo: "拠点のメモ",
    operator_memo: "オペレーターのメモ",
    avatar: "アバターD",
    start: "2023-03-21 14:00:00",
    end: "2023-03-21 18:00:00",
    //
    created_at: "2023-02-07 03:32:16",
  },
  {
    id: 2,
    //
    operator_name: "オペレーターB",
    operator_cognito_user_id: "DE-*26(0B}x[I3eV6P-",
    //
    location_name: "川崎支店",
    location_cognito_user_id: "RC-WCa6s=7jiqnmH?QO",
    //
    title: "sample title",
    location_memo: "拠点のメモ",
    operator_memo: "オペレーターのメモ",
    avatar: "アバターC",
    start: "2023-03-07 10:00:00",
    end: "2023-03-207 16:00:00",
    //
    created_at: "2023-02-07 03:32:16",
  },
];
