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
export function formatDate(start: Date, end: Date) {
  const year = start.getFullYear();
  const month = start.getMonth() + 1;
  const date = start.getDate();
  const day = ['日', '月', '火', '水', '木', '金', '土'][start.getDay()];
  const st = start.toTimeString().slice(0, 5);
  const et = end.toTimeString().slice(0, 5);

  return (
    year +
    '年 ' +
    month +
    '月 ' +
    date +
    '日 ' +
    '(' +
    day +
    '曜日)　' +
    st +
    ' − ' +
    et
  );
}

export function formatDateTime(date: any) {
  const toDate = new Date(date);
  const dateTime = toDate.toLocaleString();

  return dateTime;
}
