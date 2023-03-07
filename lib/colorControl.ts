/**
 * 予定の色分け
 * @param start
 * @param end
 * @returns イベントの色
 */
export const divideColor = (start: Date, end: Date) => {
  let color: string = "";

  const startNum = start.getTime();
  const endNum = end.getTime();

  const now = new Date().getTime();

  // 予定
  if (startNum > now) color = "#2E8B57";
  // 稼働中
  if (startNum <= now && now <= endNum) color = "#4169E1";
  // 古い
  if (endNum < now) color = "#A9A9A9";

  return { color };
};

/**
 *顧客用
 * @param start 開始時刻
 * @param end 終わり時刻
 * @param operatorActionType 仕事しているか
 * @returns 表示する色
 */
export const divideColor3 = (
  start: Date,
  end: Date,
  operatorActionType: "LOGIN" | "LOGOUT"
) => {
  let color: string = "";

  const startNum = start.getTime();
  const endNum = end.getTime();

  const now = new Date().getTime();

  // 予約
  if (startNum > now) color = "#2E8B57";
  // 古い
  if (endNum < now) color = "#A9A9A9";
  // 稼働中
  if (startNum <= now && now <= endNum && operatorActionType === "LOGIN")
    color = "#4169E1";
  // 稼働していない
  if (startNum <= now && now <= endNum && operatorActionType === "LOGOUT")
    color = "#FF0000";

  return { color };
};
