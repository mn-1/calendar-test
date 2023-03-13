import { ReactElement, RefObject, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { Button, Typography, Grid, Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";

export type Props = {
  calendarRef: RefObject<FullCalendar>;
  editMode: boolean;
  setEditMode: Function;
  editButtonDisable: boolean;
  handleViewChange: Function;
  today: "month" | "week" | "day";
  handleDateChange: Function;
};

export const CalendarHeader = (props: Props): ReactElement => {
  const {
    calendarRef,
    editMode,
    setEditMode,
    editButtonDisable,
    handleViewChange,
    today,
    handleDateChange,
  } = props;

  const [title, setTitle] = useState<string>();

  useEffect(() => {
    if (calendarRef.current) {
      const calApi = calendarRef.current.getApi();
      setTitle(calApi.view.title);
    }
  }, [calendarRef]);

  return (
    <header>
      <CssButton
        variant="contained"
        disabled={editButtonDisable}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? "編集終了" : "編集する"}
      </CssButton>
      <Grid
        container
        direction="row"
        // justifyContent="space-between"
        alignItems="center"
        sx={{ mb: "1rem" }}
      >
        <Grid item xs={4}>
          <CssButton
            onClick={() => handleViewChange("month")}
            variant={today === "month" ? "contained" : "text"}
            sx={{ borderRadius: 0 }}
          >
            月
          </CssButton>
          <CssButton
            onClick={() => handleViewChange("week")}
            variant={today === "week" ? "contained" : "text"}
            sx={{ borderRadius: 0 }}
          >
            週
          </CssButton>
          <CssButton
            onClick={() => handleViewChange("day")}
            variant={today === "day" ? "contained" : "text"}
            sx={{ borderRadius: 0 }}
          >
            日
          </CssButton>

          <CssButton onClick={(): void => handleDateChange("prev")}>
            <ChevronLeftIcon />
          </CssButton>
          <CssButton onClick={(): void => handleDateChange("today")}>
            {today === "day" && "今日"}
            {today === "week" && "今週"}
            {today === "month" && "今月"}
          </CssButton>
          <CssButton onClick={(): void => handleDateChange("next")}>
            <ChevronRightIcon />
          </CssButton>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{ fontWeight: "bold", fontSize: "2rem", textAlign: "center" }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box />
        </Grid>
      </Grid>
    </header>
  );
};

const CssButton = styled(Button)({
  borderRadius: 0,
});
