const Test = () => {
  //

  // これを使い回すとdateが書き換えられていく
  const date = new Date();

  const addYear = new Date().setFullYear(date.getFullYear() + 1);
  //月を1つ加算する
  const addMonth = new Date().setMonth(date.getMonth() + 1);
  //日を1つ加算する
  const addDay = new Date().setDate(date.getDate() + 1);
  //時を1つ加算する
  const addHours = date.setHours(date.getHours() + 1);
  //分を1つ加算する
  const addMinutes = date.setMinutes(date.getMinutes() + 1);

  // 2時間前
  const b = new Date().setHours(date.getHours() - 2);
  // 今一時間
  // 2時間後

  const a = {
    date: date.toString(),
    一ヶ月加算: new Date(addMonth).toString(),
    '2時間前': new Date(b).toISOString(),
    '2時間前string': new Date(b).toString(),
    UNIXタイム: new Date().getTime(),
  };
  console.log(a);
  return <></>;
};

export default Test;
