export type scheduleDataInfo = {
  date: Date;
  start: Date;
  end: Date;
  locationName: string;
  operatorName: string;
  title: string;
  memo: string;
  avatar: string;
};

export type editScheduleDataInfo = {
  title: string;
  memo: string;
  avatar: string;
};

export type editMemoInfo = {
  memo: string;
};
