## 初期構築の手順

yarn -v
1.22.18
npm -v
9.3.0
node -v
v16.17.0

npx create-next-app calendar-test --typescript

## 追加したもの

// MUI
yarn add @mui/material @emotion/react @emotion/styled @material-ui/core

// fullcalendar
yarn add \
 @fullcalendar/core \
 @fullcalendar/react \
 @fullcalendar/daygrid \
 @fullcalendar/timegrid \
 @fullcalendar/interaction \
 @fullcalendar/list \
 @fullcalendar/resource-timeline \
 @fullcalendar/resource \
 @fullcalendar/resource-timegrid

// datapicker
yarn add react-datepicker @types/react-datepicker date-fns

// validate
yarn add react-hook-form yup @hookform/resolvers

// reactstrap
https://reactstrap.github.io/?path=/story/home-installation--page
yarn add reactstrap

// sweetalert2
https://sweetalert2.github.io/
yarn add sweetalert2

## .env
