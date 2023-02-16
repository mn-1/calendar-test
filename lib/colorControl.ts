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
    backgroundColor = '#2E8B57';
    borderColor = '#2E8B57';
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
