import * as yup from 'yup';

export const scheduleSchema = yup.object().shape({
  date: yup.date(),
  locationName: yup.string().required('拠点名を選択してください。'),
  operatorName: yup.string().required('オペレーター名を選択してください。'),
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
