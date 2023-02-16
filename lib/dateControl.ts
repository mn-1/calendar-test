/**ーーーーーーーーーーーー
 *
 * @param date
 * @returns 経過時間
 ーーーーーーーーーーーー*/
export function createDate(date: Date) {
  const nowDate = new Date(Date.now());
  const getCreateDate = new Date(date);
  const passTime = (nowDate.getTime() - getCreateDate.getTime()) / 1000;
  let text: string;
  if (passTime < 60) {
    text = `${Math.floor(passTime)}秒前`;
  } else if (passTime < 60 * 60) {
    text = `${Math.floor(passTime / 60)}分前`;
  } else if (passTime < 60 * 60 * 24) {
    text = `${Math.floor(passTime / 3600)}時間前`;
  } else {
    text = `${Math.floor(passTime / 86400)}日前`;
  }
  return text;
}

/**ーーーーーーーーーーーー
   *
   * @param date
   * @returns 日時
   ーーーーーーーーーーーー*/
export function formatDate(date: Date) {
  return (
    date.getFullYear() +
    '年' +
    (date.getMonth() + 1) +
    '月' +
    date.getDate() +
    '日' +
    date.getHours() +
    '時' +
    date.getMinutes() +
    '分'
  );
}

export function formatDateTime(date: any) {
  const toDate = new Date(date);
  const dateTime = toDate.toLocaleString();

  return dateTime;
}
