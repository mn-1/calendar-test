// ヘッダーのタイトル
export const resources = [
  {
    id: '1', // ここstring
    title: '盛岡本社',
    businessHours: [
      {
        endTime: '18:00:00',
        startTime: '9:00:00',
        daysOfWeek: [1, 2, 3, 4, 5],
      },
    ],
  },
  {
    id: '2',
    title: '川崎支社',
    businessHours: [
      {
        endTime: '16:00:00',
        startTime: '10:00:00',
        daysOfWeek: [4],
      },
      {
        endTime: '',
        startTime: '',
        daysOfWeek: [],
      },
    ],
  },
  {
    id: '3',
    title: '高松支社',
    businessHours: [
      {
        endTime: '16:00:00',
        startTime: '8:00:00',
        daysOfWeek: [1, 2, 3, 4, 5],
      },
    ],
  },
  {
    id: '4',
    title: '美唄支社',
    businessHours: [
      {
        endTime: '18:00:00',
        startTime: '9:00:00',
        daysOfWeek: [1, 2, 3, 4, 5],
      },
    ],
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
      operatorName: 'オペレーターEさん',
      avatar: 'アバターE',
    },
    // groupId: '',
    backgroundColor: '',
    borderColor: '',
    editable: true,
    // 時間をドラッグで変更できるか
    durationEditable: true,
    resourceEditable: true,
    startEditable: true,
  },
  {
    id: '2',
    title: 'Haircut',
    resourceId: '2',
    start: new Date().setHours(date.getHours() - 1),
    end: new Date().setHours(date.getHours() + 1),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターEさん',
      avatar: 'アバターE',
    },
    backgroundColor: '',
    borderColor: '',
    editable: true,
    durationEditable: true,
    resourceEditable: true,
    startEditable: true,
  },
  {
    id: '3',
    title: 'Pedicure',
    resourceId: '3',
    start: new Date().setHours(date.getHours() + 2),
    end: new Date().setHours(date.getHours() + 4),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターEさん',
      avatar: 'アバターE',
    },
    // groupId: '',
    backgroundColor: '',
    borderColor: '',
    durationEditable: true,
    editable: true,
    resourceEditable: true,
    startEditable: true,
  },
  {
    id: '4',
    title: 'Bread Trim',
    resourceId: '1',
    start: new Date().setHours(date.getHours() + 2),
    end: new Date().setHours(date.getHours() + 4),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターEさん',
      avatar: 'アバターE',
    },
    backgroundColor: '',
    borderColor: '',
    constraint: 'sample1',
    durationEditable: true,
    editable: true,
    resourceEditable: true,
    startEditable: true,
  },
  {
    id: '5',
    title: 'Shampoo',
    resourceId: '4',
    start: new Date().setHours(date.getHours() - 4),
    end: new Date().setHours(date.getHours() - 2),
    extendedProps: {
      memo: '',
      operatorName: 'オペレーターEさん',
      avatar: 'アバターE',
    },
    backgroundColor: '',
    borderColor: '',
    // textColor: '#000',
    durationEditable: true,
    editable: true,
    resourceEditable: true,
    startEditable: true,
  },
];

// Eオペレーター一覧
export const operator = [
  { id: 1, name: 'オペレーターAさん' },
  { id: 2, name: 'オペレーターBさん' },
  { id: 3, name: 'オペレーターCさん' },
  { id: 4, name: 'オペレーターDさん' },
  { id: 5, name: 'オペレーターEさん' },
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
