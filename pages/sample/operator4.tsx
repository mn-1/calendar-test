import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// react
import React, { useState, useRef, createRef, useEffect } from "react";
// MUI
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
// FullCalendar
import FullCalendar from "@fullcalendar/react";
import { EventApi, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { CalendarApi } from "@fullcalendar/core";
// lib
import EventControl from "../../lib/operatorEventControl";
import { resources } from "../../lib/data";
import { locationSortData, operatorSortData } from "../../lib/dataControl";
// components
import Header from "../../components/Header/Header";
import ScheduleInfoDialog from "../../components/Dialog/Operator/ScheduleInfoDialog";
import EditScheduleDialog from "../../components/Dialog/Operator/EditScheduleDialog";
import { NewHeader } from "../../components/FullCalendar/Operator/NewHeader";
import FailedSnackbar from "../../components/Snackbar/FailedSnackbar";
import MainCalendar from "../../components/FullCalendar/Operator/MainCalendar-2";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function BasicTabs() {
  const matches: boolean = useMediaQuery("(min-width:992px)");
  const calendarRef = createRef<FullCalendar>();

  const [tab, setTab] = useState<number>(0);
  const [calApi, setCalApi] = useState<CalendarApi | null>(null);

  const [today, setToday] = useState<{
    type: "month" | "week" | "day";
    date: Date;
    view: string;
  }>({
    type: "day",
    date: new Date(new Date().toLocaleDateString()),
    view: "resourceTimelineDay",
  });
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);

  const {
    eventInfo,
    editDialogOpen,
    failedSnackbarOpen,
    myEvents,
    setFailedSnackbarOpen,
    setEditDialogOpen,
    editMemo,
    setEventInfo,
    getEvents,
  } = EventControl();

  useEffect(() => {
    getEvents();

    // ここで取得する必要がある
    if (calendarRef.current) {
      const calApi = calendarRef.current?.getApi();
      setCalApi(calApi);
    }
  }, [calendarRef]);

  /**
   * データ整形
   */
  const locationData = locationSortData(myEvents);
  const operatorData = operatorSortData("DE-RQxKOBdkE7whg8DO", myEvents);

  /**
   * タブ切り替え
   */
  const handleChange = async (e: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);

    if (today.type === "day") {
      if (newValue === 0) setToday({ ...today, view: "resourceTimelineDay" });
      if (newValue === 1) setToday({ ...today, view: "resourceTimeGridDay" });
    }
  };

  /**
   * メモ編集ダイアログ開く
   */
  const handleEventClick = async (arg: EventClickArg) => {
    console.log("arg:", arg);
    setEventInfo(arg);
    setInfoDialogOpen(true);
  };

  /**
   * イベント追加したりした時に発火
   */
  const handleEventSet = (events: EventApi[]) => {
    // setMyEvents(events);
  };

  /**
   * ナビリンクの日付選択
   */
  const handleNavLinkDayClick = (date: Date) => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return setFailedSnackbarOpen(true);

    if (tab === 0) calApi.changeView("resourceTimelineDay", date);
    if (tab === 1) calApi.changeView("resourceTimeGridDay", date);

    setToday({ ...today, type: "day", date: calApi.getDate() });
  };

  /**
   * カレンダーの表示変更
   */
  const handleViewChange = (direction: "week" | "day" | "month"): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return setFailedSnackbarOpen(true);

    if (direction === "month") {
      calApi.changeView("dayGridMonth");
      setToday({ ...today, type: "month", view: "dayGridMonth" });
    }
    if (direction === "week") {
      calApi.changeView("timeGridWeek");
      setToday({ ...today, type: "week", view: "timeGridWeek" });
    }
    if (direction === "day") {
      if (tab === 0) {
        calApi.changeView("resourceTimelineDay");
        setToday({ ...today, type: "day", view: "resourceTimelineDay" });
      }
      if (tab === 1) {
        calApi.changeView("resourceTimeGridDay");
        setToday({ ...today, type: "day", view: "resourceTimeGridDay" });
      }
    }
  };

  /**
   * カレンダーの日付前後する
   */
  const handleDateChange = (direction: "prev" | "today" | "next"): void => {
    const calApi = calendarRef.current?.getApi();
    if (!calApi) return setFailedSnackbarOpen(true);

    if (direction === "prev") calApi.prev();
    if (direction === "next") calApi.next();
    if (direction === "today") calApi.today();

    setToday({ ...today, date: calApi.getDate() });
  };

  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          height: "100%",
          mt: "4rem",
        }}
      >
        <NewHeader
          calendarRef={calendarRef}
          handleViewChange={handleViewChange}
          today={today.type}
          handleDateChange={handleDateChange}
        />
        {/* タブの部分ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            scrollButtons={false}
          >
            <Tab label="オペレーター名" {...a11yProps(0)} />
            <Tab label="拠点名" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* タブの中身ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}
        <TabPanel value={tab} index={0}>
          {myEvents.length != 0 && (
            <Stack sx={{ overflow: "scroll" }}>
              <MainCalendar
                handleNavLinkDayClick={handleNavLinkDayClick}
                handleEventClick={handleEventClick}
                handleEventSet={handleEventSet}
                calendarRef={calendarRef}
                initialView={today.view}
                initialDate={today.date}
                myEvents={operatorData.setData}
                resources={[
                  { id: "DE-RQxKOBdkE7whg8DO", name: "オペレーターAさん" },
                ]}
              />
            </Stack>
          )}
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {myEvents.length != 0 && (
            <Stack sx={{ overflow: "scroll" }}>
              <MainCalendar
                handleNavLinkDayClick={handleNavLinkDayClick}
                handleEventClick={handleEventClick}
                handleEventSet={handleEventSet}
                calendarRef={calendarRef}
                initialView={today.view}
                initialDate={today.date}
                myEvents={locationData.setData}
                resources={resources}
              />
            </Stack>
          )}
        </TabPanel>

        {/* utils ↓ ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}
        {/* defalutValueを動的にしないためにレンダリング少なくしている */}
        {eventInfo && editDialogOpen && (
          <EditScheduleDialog
            editMemo={editMemo}
            eventInfo={eventInfo}
            open={editDialogOpen}
            handleClose={() => setEditDialogOpen(false)}
          />
        )}
        <ScheduleInfoDialog
          eventInfo={eventInfo}
          open={infoDialogOpen}
          edit={() => {
            setEditDialogOpen(true);
            setInfoDialogOpen(false);
          }}
          handleClose={() => setInfoDialogOpen(false)}
        />
        <FailedSnackbar
          open={failedSnackbarOpen}
          handleClose={() => setFailedSnackbarOpen(false)}
        />
        {/* utils ↑ */}
      </Container>
    </>
  );
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
