import React, { RefObject } from "react";
// MUI
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Tooltip, Stack, Box } from "@mui/material";
// FullCalendar
import FullCalendar from "@fullcalendar/react";
import jaLocale from "@fullcalendar/core/locales/ja";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import resourceTimelinePlugIn from "@fullcalendar/resource-timeline";
import {
  EventContentArg,
  DayCellContentArg,
  DayHeaderContentArg,
  SlotLabelContentArg,
} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
// lib
import { resources } from "../../../lib/data";

type calendarProps = {
  editMode: boolean;
  setBorderColor: Function;
  handleEventClick: Function;
  changeColor: Function;
  handleEventReceive: Function;
  handleNavLinkDayClick: Function;
  calendarRef: RefObject<FullCalendar>;
  view: string;
  myEvents: any;
  eventsSet: Function;
};

export default function Calendar(props: calendarProps) {
  const {
    handleEventClick,
    changeColor,
    handleEventReceive,
    handleNavLinkDayClick,
    editMode,
    setBorderColor,
    calendarRef,
    view,
    myEvents,
    eventsSet,
  } = props;

  const matches: boolean = useMediaQuery("(min-width:992px)");

  let plugins = [
    resourceTimeGridPlugin,
    resourceTimelinePlugIn,
    interactionPlugin,
    dayGridPlugin,
    timeGridPlugin,
    multiMonthPlugin,
  ];
  if (!matches)
    plugins = [
      resourceTimeGridPlugin,
      resourceTimelinePlugIn,
      interactionPlugin,
      scrollGridPlugin, //これの警告
      dayGridPlugin,
      timeGridPlugin,
      multiMonthPlugin,
    ];

  return (
    <FullCalendar
      locale="ja"
      locales={[jaLocale]}
      contentHeight={"auto"}
      dayMinWidth={matches ? undefined : 100} //これの警告
      initialEvents={myEvents}
      ref={calendarRef}
      resources={resources}
      slotMinTime="00:00:00"
      slotMaxTime="24:00:00"
      slotDuration="00:30:00"
      snapDuration="00:05:00"
      plugins={plugins}
      initialView={view}
      eventContent={renderEventContent}
      dayCellContent={dayCellContent}
      dayHeaderContent={dayHeaderContent}
      // slotLabelContent={slotLabelContent}
      //
      eventResizableFromStart={editMode}
      eventResourceEditable={editMode}
      eventDurationEditable={editMode}
      eventStartEditable={editMode}
      droppable={editMode}
      editable={false}
      //
      stickyHeaderDates={true}
      slotEventOverlap={true}
      fixedWeekCount={false}
      headerToolbar={false}
      eventOverlap={false}
      selectMirror={true}
      nowIndicator={true}
      selectable={false}
      allDaySlot={false}
      expandRows={true}
      weekends={true}
      navLinks={true}
      //
      eventResizeStart={() => setBorderColor("#0000FF")}
      eventResizeStop={() => setBorderColor("#DCDCDC")}
      eventDragStart={() => setBorderColor("#0000FF")}
      eventDragStop={() => setBorderColor("#DCDCDC")}
      eventsSet={(events) => eventsSet(events)}
      navLinkDayClick={(arg) => handleNavLinkDayClick(arg)}
      drop={() => setBorderColor("#DCDCDC")}
      eventReceive={(arg) => handleEventReceive(arg)}
      eventClick={(arg) => handleEventClick(arg)}
      eventResize={(arg) => changeColor(arg)}
      eventDrop={(arg) => changeColor(arg)}
    />
  );
}

/**ーーーーーーーーーーーーーーーーーー
 * イベントに表示する内容
 ーーーーーーーーーーーーーーーーーー*/
function renderEventContent(eventContent: EventContentArg) {
  const {
    event: { title, extendedProps },
    timeText,
  } = eventContent;

  return (
    <Tooltip
      title={eventContent.event.extendedProps.operatorName}
      placement="top-start"
    >
      <Grid container direction="column">
        <Typography sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }}>
          {eventContent.event.extendedProps.locationName ?? ""}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }}>
          {extendedProps.operatorName}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }}>
          {timeText}
        </Typography>
      </Grid>
    </Tooltip>
  );
}

/**ーーーーーーーーーーーーーーーーーー
   * カレンダーのヘッダーの表示
 ーーーーーーーーーーーーーーーーーー*/
function dayHeaderContent(e: DayHeaderContentArg) {
  const date = e.date.getDate();
  const day = ["日", "月", "火", "水", "木", "金", "土"][e.date.getDay()];

  if (e.isToday)
    return (
      <Stack
        sx={{
          backgroundColor: "#4682B4",
          width: "50px",
          height: "50px",
          color: "#ffffff",
          borderRadius: "25px",
        }}
      >
        <Grid container direction="column">
          <Typography sx={{ fontWeight: "bold" }}>
            {day}
            <br />
            {date}
          </Typography>
        </Grid>
      </Stack>
    );
  else
    return (
      <Grid container direction="column">
        <Typography sx={{ fontWeight: "bold" }}>
          {day}
          <br />
          {date}
        </Typography>
      </Grid>
    );
}

/**ーーーーーーーーーーーーーーーーーー
   * カレンダー上の日付
 ーーーーーーーーーーーーーーーーーー*/
function dayCellContent(e: DayCellContentArg) {
  e.dayNumberText = e.dayNumberText.replace("日", "");

  return <Typography fontSize="14px">{e.dayNumberText}</Typography>;
}

/**ーーーーーーーーーーーーーーーーーー
   * 横軸の表示
 ーーーーーーーーーーーーーーーーーー*/
// const slotLabelContent = (e: SlotLabelContentArg) => {
//   const now = Number(
//     new Date()
//       .toLocaleTimeString()
//       .substring(0, new Date().toLocaleTimeString().indexOf(":"))
//   );
//   const date = Number(e.text.substring(0, e.text.indexOf("時")));
//   console.log(now, date);
//   let color: string = "#FF0000";
//   if (now >= date) color = "#4682B4";
//   return <Typography color={color}>{e.text}</Typography>;
// };
