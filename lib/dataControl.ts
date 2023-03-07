import { event } from "./data";
import { divideColor2 } from "./colorControl";

export const SortData = (type: "location" | "operator") => {
  let data: any;

  let locationData: Array<any> = [];
  let operatorData: Array<any> = [];

  for (let i = 0; i < event.length; i++) {
    const e = event[i];

    let resourceId: string = "";
    if (type === "location") resourceId = e.location_cognito_user_id;
    if (type === "operator") resourceId = e.operator_cognito_user_id;

    const { color } = divideColor2(new Date(e.start), new Date(e.end));

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

    if (type === "location") locationData.push(data);
    if (type === "operator") operatorData.push(data);
  }
  return { locationData, operatorData };
};
