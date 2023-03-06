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
  // Install component (community version)
  yarn add @mui/x-date-pickers
  // Install date library (if not already installed)
  yarn add dayjs

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
   @fullcalendar/resource-daygrid \
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
- slotEventOverlap
  - 予定同士が被って表示してもいいか
  - https://fullcalendar.io/docs/slotEventOverlap
- selectable
  - Allows a user to highlight multiple days or timeslots by clicking and dragging.
  - https://fullcalendar.io/docs/selectable
- expandRows
  - If the rows of a given view don’t take up the entire height, they will expand to fit.
  - https://fullcalendar.io/docs/expandRows
- stickyHeaderDates
  - Whether to fix the date-headers at the top of the calendar to the viewport while scrolling
  - https://fullcalendar.io/docs/stickyHeaderDates
- fixedWeekCount
  - 5 行の月は 5 行のままになる
  - https://fullcalendar.io/docs/fixedWeekCount
