// 拠点一覧
export const resources = [
  { id: "RC-hY7CuvT2dLPayj8g", title: "盛岡本社" },
  { id: "RC-WCa6s=7jiqnmH?QO", title: "川崎支社" },
  { id: "RC-0omXWfyNlV1(a.%G", title: "高松支社" },
  { id: "RC-tsO1SA4b7Hw!UH_s", title: "美唄支社" },
  { id: "RC-?K5_3p8JIOVRR4oF", title: "仙台支社" },
];

// オペレーター一覧
export const operator = [
  { id: "DE-RQxKOBdkE7whg8DO", name: "オペレーターAさん" },
  { id: "DE-*26(0B}x[I3eV6P-", name: "オペレーターBさん" },
  { id: "DE-lhKCB=}<(E,Wr0Ai", name: "オペレーターCさん" },
  { id: "DE-KTSVs(ty=xAH#YLi", name: "オペレーターDさん" },
];

// DBから返ってくる予定の内容
export const events = [
  {
    id: 1,
    //
    operator_name: "オペレーターA",
    operator_cognito_user_id: "DE-RQxKOBdkE7whg8DO",
    //
    location_name: "盛岡支店",
    location_cognito_user_id: "RC-hY7CuvT2dLPayj8g",
    //
    title: "sample title",
    location_memo: "拠点のメモ",
    operator_memo: "オペレーターのメモ",
    avatar: "アバターD",
    start: "2023-03-21 14:00:00",
    end: "2023-03-21 18:00:00",
    //
    created_at: "2023-02-07 03:32:16",
  },
  {
    id: 2,
    //
    operator_name: "オペレーターB",
    operator_cognito_user_id: "DE-*26(0B}x[I3eV6P-",
    //
    location_name: "川崎支店",
    location_cognito_user_id: "RC-WCa6s=7jiqnmH?QO",
    //
    title: "sample title",
    location_memo: "拠点のメモ",
    operator_memo: "オペレーターのメモ",
    avatar: "アバターC",
    start: "2023-03-07 10:00:00",
    end: "2023-03-07 16:00:00",
    //
    created_at: "2023-02-07 03:32:16",
  },
  {
    id: 3,
    //
    operator_name: "オペレーターA",
    operator_cognito_user_id: "DE-RQxKOBdkE7whg8DO",
    //
    location_name: "美唄支店",
    location_cognito_user_id: "RC-tsO1SA4b7Hw!UH_s",
    //
    title: "sample title",
    location_memo: "拠点のメモ",
    operator_memo: "オペレーターのメモ",
    avatar: "アバターC",
    start: "2023-03-07 16:00:00",
    end: "2023-03-07 21:00:00",
    //
    created_at: "2023-02-07 03:32:16",
  },
];

export const eventConstraints = [
  {
    id: "sample1",
    groupId: "sample1",
    resourceId: "1",
    display: "background",
  },
  {
    id: "sample2",
    groupId: "sample2",
    resourceId: "3",
    display: "background",
  },
];

export const externalEvents = [
  {
    title: "",
    extendedProps: {
      memo: "",
      operatorName: "オペレーターKさん",
      Username: "RC-HvIzf9STs8JB3M5Q",
      avatar: "",
    },
    color: "",
    id: "",
  },
  {
    title: "",
    extendedProps: {
      memo: "",
      operatorName: "オペレーターLさん",
      Username: "RC-t6vWhbAiYLSUT2kR",
      avatar: "",
    },
    color: "",
    id: "",
  },
  {
    title: "",
    extendedProps: {
      memo: "",
      operatorName: "オペレーターMさん",
      Username: "RC-ijuixbWWY8lww4US",
      avatar: "",
    },
    color: "",
    id: "",
  },
  {
    title: "",
    extendedProps: {
      memo: "",
      operatorName: "オペレーターNさん",
      Username: "RC-WvD67gCo7h24mCud",
      avatar: "",
    },
    color: "",
    id: "",
  },
];

// DBから撮ってきたのを整形したものってことにする
export const operatorEvents = [
  {
    id: "2",
    title: "sample title",
    resourceId: "1",
    start: new Date("2023/4/21 15:00").toISOString(),
    end: new Date("2023/4/21 20:00").toISOString(),
    extendedProps: {
      memo: "",
      operatorName: "オペレーターAさん",
      locationName: "川崎支店",
      avatar: "アバターE",
    },
    color: "#ff9f89",
    display: "",
    durationEditable: false,
  },
];
