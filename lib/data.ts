// ヘッダーのタイトル
export const resources = [
  {
    id: '1', // ここstring
    title: '盛岡本社',
    width: '200rem',
  },
  {
    id: '2',
    title: '川崎支社',
    width: '200rem',
  },
  {
    id: '3',
    title: '高松支社',
    width: '200rem',
  },
  {
    id: '4',
    title: '美唄支社',
    width: '200px',
  },
  {
    id: '5',
    title: '仙台支社',
    width: '200px',
  },
];

const date = new Date();

// イベント一覧
export const events = [
  {
    id: '1',
    title: 'sample title',
    resourceId: '1', // 拠点ID
    start: new Date('2023/2/11 15:00').getTime(),
    end: new Date('2023/2/11 20:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターAさん',
      locationName: '',
      avatar: 'アバターE',
    },
    color: '',
    durationEditable: false,
  },
  {
    id: '2',
    title: 'sample title',
    resourceId: '2',
    start: new Date('2023/3/21 15:00').getTime(),
    end: new Date('2023/3/21 20:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターBさん',
      locationName: '',
      avatar: 'アバターE',
    },
    color: '',
    durationEditable: false,
  },
  {
    id: '3',
    title: 'sample title',
    resourceId: '3',
    start: new Date('2023/2/21 11:00').getTime(),
    end: new Date('2023/2/21 20:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターCさん',
      locationName: '',
      avatar: 'アバターE',
    },
    // groupId: '',
    color: '',
    durationEditable: false,
  },
  {
    id: '4',
    title: 'sample title',
    resourceId: '1',
    start: new Date('2023/2/21 15:00').getTime(),
    end: new Date('2023/2/21 20:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターDさん',
      locationName: '',
      avatar: 'アバターE',
    },
    color: '',
    durationEditable: false,
    // constraint: 'sample1',
  },
  {
    id: '5',
    title: 'sample title',
    resourceId: '4',
    start: new Date('2023/2/21 11:00').getTime(),
    end: new Date('2023/2/21 19:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターEさん',
      locationName: '',
      avatar: 'アバターE',
    },
    durationEditable: false,
  },
  {
    id: '6',
    title: 'sample title',
    resourceId: '4',
    start: new Date('2023/2/19 11:00').getTime(),
    end: new Date('2023/2/19 15:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターLさん',
      locationName: '',
      avatar: 'アバターE',
    },
    durationEditable: false,
  },
  {
    id: '7',
    title: 'sample title',
    resourceId: '3',
    start: new Date('2023/2/16 10:00').getTime(),
    end: new Date('2023/2/16 19:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターLさん',
      locationName: '',
      avatar: 'アバターE',
    },
    color: '',
    durationEditable: false,
  },
  {
    id: '8',
    title: '',
    resourceId: '1',
    start: new Date('2023/2/14 10:00').getTime(),
    end: new Date('2023/2/14 19:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターMさん',
      locationName: '',
      avatar: 'アバターE',
    },
    color: '',
    durationEditable: false,
  },
  {
    id: '9',
    title: '',
    resourceId: '2',
    start: new Date('2023/2/27 16:00').getTime(),
    end: new Date('2023/2/27 22:30').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターMさん',
      locationName: '',
      avatar: 'アバターE',
    },
    color: '',
    durationEditable: false,
  },
  {
    id: '10',
    title: 'sample title',
    resourceId: '2',
    start: new Date('2023/2/3 16:00').getTime(),
    end: new Date('2023/2/3 22:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターMさん',
      locationName: '',
      avatar: 'アバターE',
    },
    durationEditable: false,
  },
  {
    id: '10',
    title: 'sample title',
    resourceId: '2',
    start: new Date('2023/3/3 9:00').getTime(),
    end: new Date('2023/3/3 18:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターMさん',
      locationName: '',
      avatar: 'アバターE',
    },
    durationEditable: false,
  },
];

// オペレーター一覧
export const operator = [
  { id: 1, name: 'オペレーターAさん' },
  { id: 2, name: 'オペレーターBさん' },
  { id: 3, name: 'オペレーターCさん' },
  { id: 4, name: 'オペレーターDさん' },
  { id: 5, name: 'オペレーターEさん' },
  { id: 6, name: 'オペレーターKさん' },
  { id: 7, name: 'オペレーターLさん' },
  { id: 8, name: 'オペレーターMさん' },
  { id: 9, name: 'オペレーターNさん' },
  { id: 10, name: 'オペレーターOさん' },
];

export const eventConstraints = [
  {
    id: 'sample1',
    groupId: 'sample1',
    // start: `${moment().format('YYYY-MM-DD')}T09:00:00-0700`,
    // end: `${moment().format('YYYY-MM-DD')}T18:00:00-0700`,
    resourceId: '1',
    display: 'background',
  },
  {
    id: 'sample2',
    groupId: 'sample2',
    // start: `${moment().format('YYYY-MM-DD')}T08:00:00-0700`,
    // end: `${moment().format('YYYY-MM-DD')}T17:00:00-0700`,
    resourceId: '3',
    display: 'background',
  },
];

export const externalEvents = [
  {
    title: '',
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターKさん',
      Username: 'RC-HvIzf9STs8JB3M5Q',
      avatar: '',
    },
    color: '',
    id: '',
  },
  {
    title: '',
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターLさん',
      Username: 'RC-t6vWhbAiYLSUT2kR',
      avatar: '',
    },
    color: '',
    id: '',
  },
  {
    title: '',
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターMさん',
      Username: 'RC-ijuixbWWY8lww4US',
      avatar: '',
    },
    color: '',
    id: '',
  },
  {
    title: '',
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターNさん',
      Username: 'RC-WvD67gCo7h24mCud',
      avatar: '',
    },
    color: '',
    id: '',
  },
];

export const eventsOperator = [
  {
    id: '1',
    title: 'sample title',
    resourceId: '1',
    start: new Date('2023/2/11 15:00').toISOString(),
    end: new Date('2023/2/11 20:00').toISOString(),
    extendedProps: {
      memo: '遅れるかも',
      operatorName: 'オペレーターAさん',
      locationName: '盛岡支店',
      avatar: 'アバターE',
    },
    color: '',
    display: '',
  },
  {
    id: '2',
    title: 'sample title',
    resourceId: '1',
    start: new Date('2023/4/21 15:00').toISOString(),
    end: new Date('2023/4/21 20:00').toISOString(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターAさん',
      locationName: '川崎支店',
      avatar: 'アバターE',
    },
    color: '#ff9f89',
  },
  {
    id: '3',
    title: 'sample title',
    resourceId: '1',
    start: new Date('2023/4/16 15:00').toISOString(),
    end: new Date('2023/4/16 20:00').toISOString(),
    extendedProps: {
      memo: '遅れるかも',
      operatorName: 'オペレーターAさん',
      locationName: '高松支店',
      avatar: 'アバターE',
    },
    color: '',
  },
  {
    id: '4',
    title: 'sample title',
    resourceId: '1',
    start: new Date('2023/3/21 15:00').toISOString(),
    end: new Date('2023/3/21 20:00').toISOString(),
    extendedProps: {
      memo: '遅れるかも',
      operatorName: 'オペレーターAさん',
      locationName: '川崎支店',
      avatar: 'アバターK',
    },
    color: '',
  },
  {
    id: '5',
    title: 'sample title',
    resourceId: '1',
    start: new Date('2023/3/25 10:00').toISOString(),
    end: new Date('2023/3/25 20:00').toISOString(),
    extendedProps: {
      memo: '遅れるかも',
      operatorName: 'オペレーターAさん',
      locationName: '川崎支店',
      avatar: 'アバターL',
    },
    color: '',
  },
  {
    id: '6',
    title: 'sample title',
    resourceId: '1',
    start: new Date('2023/3/01 10:00').toISOString(),
    end: new Date('2023/3/01 20:00').toISOString(),
    extendedProps: {
      memo: '遅れるかも',
      operatorName: 'オペレーターAさん',
      locationName: '高松支店',
      avatar: 'アバターX',
    },
    color: '',
  },
];
