import * as yup from 'yup';

export const scheduleSchema = yup.object().shape({
  //
  date: yup.date().typeError('正しい日付を入力してください。'),
  start: yup.date().typeError('正しい時間を入力してください。'),
  end: yup
    .date()
    .typeError('正しい時間を入力してください。')
    .required()
    .test('end', '開始時刻より後の時間を入力してください。', function (value) {
      if (!value) return false;
      if (value.getTime() <= this.parent.start.getTime()) {
        return false;
      }
      return true;
    }),
  //
  locationName: yup.string().required('拠点名を選択してください。'),
  operatorName: yup.string().required('オペレーター名を選択してください。'),
  //
  title: yup.string(),
  memo: yup.string(),
  avatar: yup.string(),
});

export const editScheduleSchema = yup.object().shape({
  title: yup.string(),
  memo: yup.string(),
  avatar: yup.string(),
});

export const editMemoSchema = yup.object().shape({
  memo: yup.string(),
});
