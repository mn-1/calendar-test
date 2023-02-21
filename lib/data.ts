// ヘッダーのタイトル
export const resources = [
  {
    id: '1', // ここstring
    title: '盛岡本社',
    // businessHours: [
    //   {
    //     endTime: '18:00:00',
    //     startTime: '9:00:00',
    //     daysOfWeek: [1, 2, 3, 4, 5],
    //   },
    // ],
  },
  {
    id: '2',
    title: '川崎支社',
    businessHours: [],
  },
  {
    id: '3',
    title: '高松支社',
  },
  {
    id: '4',
    title: '美唄支社',
  },
];

const date = new Date();

// Eイベント一覧
export const events = [
  {
    id: '1',
    title: '90 Minute Massage',
    resourceId: '1', // 拠点ID
    start: new Date().setHours(date.getHours() - 4),
    end: new Date().setHours(date.getHours() - 2),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターAさん',
      avatar: 'アバターE',
    },
    color: '',
  },
  {
    id: '2',
    title: 'Haircut',
    resourceId: '2',
    start: new Date().setHours(date.getHours() - 1),
    end: new Date().setHours(date.getHours() + 1),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターBさん',
      avatar: 'アバターE',
    },
    color: '',
    // editable: true,
    // durationEditable: true,
    // resourceEditable: true,
    // startEditable: true,
  },
  {
    id: '3',
    title: 'Pedicure',
    resourceId: '3',
    start: new Date().setHours(date.getHours() + 2),
    end: new Date().setHours(date.getHours() + 4),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターCさん',
      avatar: 'アバターE',
    },
    // groupId: '',
    color: '',
  },
  {
    id: '4',
    title: 'Bread Trim',
    resourceId: '1',
    start: new Date('2023/2/21 15:00').getTime(),
    end: new Date('2023/2/21 20:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターDさん',
      avatar: 'アバターE',
    },
    color: '',
    // constraint: 'sample1',
  },
  {
    id: '5',
    title: 'Shampoo',
    resourceId: '4',
    start: new Date('2023/2/21 11:00').getTime(),
    end: new Date('2023/2/21 19:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターEさん',
      avatar: 'アバターE',
    },
    color: '',
    // textColor: '#000',
    // durationEditable: true,
    // editable: true,
    // resourceEditable: true,
    // startEditable: true,
  },
  {
    id: '6',
    title: '',
    resourceId: '4',
    start: new Date('2023/2/19 11:00').getTime(),
    end: new Date('2023/2/19 15:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターLさん',
      avatar: 'アバターE',
    },
    color: '',
    // textColor: '#000',
    // durationEditable: true,
    // editable: true,
    // resourceEditable: true,
    // startEditable: true,
  },
  {
    id: '7',
    title: '',
    resourceId: '3',
    start: new Date('2023/2/16 10:00').getTime(),
    end: new Date('2023/2/16 19:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターLさん',
      avatar: 'アバターE',
    },
    color: '',
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
      avatar: 'アバターE',
    },
    color: '',
  },
  {
    id: '9',
    title: '',
    resourceId: '2',
    start: new Date('2023/2/27 16:00').getTime(),
    end: new Date('2023/2/27 22:00').getTime(),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターMさん',
      avatar: 'アバターE',
    },
    color: '',
  },
  {
    id: '10',
    resourceId: '2',
    start: new Date('2023/2/3 16:00').getTime(),
    end: new Date('2023/2/3 22:00').getTime(),
    extendedProps: {
      operatorName: 'オペレーターEさん',
    },
  },
  {
    id: '10',
    resourceId: '2',
    start: new Date('2023/3/3 9:00').getTime(),
    end: new Date('2023/3/3 18:00').getTime(),
    extendedProps: {
      operatorName: 'オペレーターEさん',
    },
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
