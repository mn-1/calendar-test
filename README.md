## 初期構築の手順

yarn -v
1.22.18
npm -v
9.3.0
node -v
v16.17.0

npx create-next-app calendar-test --typescript

## 追加したもの

- MUI
  yarn add @mui/material @emotion/react @emotion/styled @material-ui/core

- fullcalendar
  yarn add \
   @fullcalendar/core \
   @fullcalendar/react \
   @fullcalendar/daygrid \
   @fullcalendar/timegrid \
   @fullcalendar/interaction \
   @fullcalendar/list \
   @fullcalendar/resource \
   @fullcalendar/resource-timeline \
   @fullcalendar/resource-timegrid \
   @fullcalendar/moment-timezone \
   @fullcalendar/multimonth

- datapicker
  yarn add react-datepicker @types/react-datepicker date-fns

- validate
  yarn add react-hook-form yup @hookform/resolvers

- reactstrap
  https://reactstrap.github.io/?path=/story/home-installation--page
  yarn add reactstrap

- sweetalert2
  https://sweetalert2.github.io/
  yarn add sweetalert2

- react-beautiful-dnd
  yarn add @types/react-beautiful-dnd react-beautiful-dnd

## .env

## 参考

- fullcalendar + typescript
  https://github.com/fullcalendar/fullcalendar-examples/tree/main/typescript
- イベントの中身
  https://fullcalendar.io/docs/event-parsing

### アクション

https://fullcalendar.io/docs/event-dragging-resizing

- eventChange

  - fire after eventDrop and eventResize
  - https://fullcalendar.io/docs/eventChange

- eventReceive

  - Called when an external draggable element with associated event data was dropped onto the calendar
  - https://fullcalendar.io/docs/eventReceive

- eventDrop
  - カレンダー内部の event が drop された時に発火

### イベント追加・更新・削除

- update
  - https://fullcalendar.io/docs/Resource-setProp
- remove
  - https://fullcalendar.io/docs/Resource-remove

### オプション

- selectMirror
  - Whether to draw a “placeholder” event while the user is dragging
- weekends
  - 週末表示するか否か
- eventResizableFromStart
  - Whether the user can resize an event from its starting edge
