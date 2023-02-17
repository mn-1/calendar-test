import * as yup from 'yup';

export const scheduleSchema = yup.object().shape({
  title: yup.string().required('タイトルは必須項目です。'),
  memo: yup.string(),
  locationName: yup.string().required('拠点を選択してください。'),
  operatorName: yup.string().required('オペレーターを選択してください。'),
  avatar: yup.string(),
});
