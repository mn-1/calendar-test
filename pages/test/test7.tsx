import React from "react";
// FullCalendar
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import listPlugin from "@fullcalendar/list";
import { Grid, Container } from "@mui/material";
import { ExternalEvent } from "../../components/FullCalendar/Client/ExternalEvents";

const SampleCalendar: React.FC = () => {
  const ref = React.createRef<FullCalendar>();

  const events = [
    {
      id: "1",
      title: "脚トレ",
    },
    {
      id: "2",
      title: "胸トレ",
    },
    {
      id: "3",
      title: "背中トレ",
    },
  ];

  const drop = () => {
    console.log("dropした");
  };

  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* {events.map((event) => (
        <ExternalEvent events={event} key={event.id} />
      ))} */}
      <FullCalendar
        ref={ref}
        locales={[jaLocale]}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        slotDuration="00:30:00"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        //
        selectable={true}
        weekends={true}
        eventDurationEditable={true}
        droppable={true}
        drop={drop}
      />
    </Container>
  );
};

export default SampleCalendar;
