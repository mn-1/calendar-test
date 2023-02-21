/**
 * 予定の色分け
 * @param start
 * @param end
 * @returns イベントの色
 */
export const divideColor = (start: number, end: number) => {
  let color: string = '';

  const now = new Date().getTime();

  // 予定
  if (start > now) color = '#2E8B57';
  // 稼働中
  if (start <= now && now <= end) color = '#4169E1';
  // 古い
  if (end < now) color = '#A9A9A9';

  return { color };
};

export const divideColor2 = (start: Date, end: Date) => {
  let color: string = '';

  const startNum = start.getTime();
  const endNum = end.getTime();

  const now = new Date().getTime();

  // 予定
  if (startNum > now) color = '#2E8B57';
  // 稼働中
  if (startNum <= now && now <= endNum) color = '#4169E1';
  // 古い
  if (endNum < now) color = '#A9A9A9';

  return { color };
};
