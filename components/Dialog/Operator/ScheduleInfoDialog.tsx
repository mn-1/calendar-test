import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Face3OutlinedIcon from "@mui/icons-material/Face3Outlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  Box,
  DialogActions,
  Dialog,
  DialogContent,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { EventClickArg } from "@fullcalendar/core";
import { formatDate } from "../../../lib/dateControl";
import FailedDialog from "../FailedDialog";

type Props = {
  open: boolean;
  eventInfo: EventClickArg | null;
  handleClose: VoidFunction;
  edit: VoidFunction;
};

export default function ScheduleInfoDialog(props: Props) {
  const event = props.eventInfo?.event;
  const { open, handleClose, edit } = props;

  if (!event)
    return <FailedDialog open={props.open} handleClose={props.handleClose} />;

  const {
    start,
    end,
    title,
    extendedProps: { avatar, operatorMemo, operatorName },
  } = event;

  if (start && end)
    return (
      <Dialog open={open} fullWidth>
        <DialogActions>
          <Grid container justifyContent="end" alignItems="center">
            <Tooltip title="編集">
              <span>
                <IconButton onClick={edit}>
                  <ModeEditOutlineTwoToneIcon fontSize="medium" />
                </IconButton>
              </span>
            </Tooltip>
            <Box sx={{ px: 1 }} />
            <Tooltip title="閉じる">
              <IconButton onClick={handleClose}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Grid>
        </DialogActions>
        <DialogContent>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={1} sx={{ mb: "1rem", mr: "0.4rem" }} />
            <Grid
              item
              xs={10}
              sx={{ mb: "2rem", borderBottom: "solid", borderColor: "#dddddd" }}
            >
              {title != "" ? (
                <Typography variant="h5">{title}</Typography>
              ) : (
                <Typography variant="h5" color="textSecondary">
                  タイトル
                </Typography>
              )}
            </Grid>

            <Grid item xs={1} sx={{ mb: "1rem", mr: "0.4rem" }}>
              <LocationOnOutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: "1rem" }}>
              <Typography variant="h6">
                {event.extendedProps.locationName ?? ""}
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{ mb: "1rem", mr: "0.4rem" }}>
              <PersonOutlineOutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: "1rem" }}>
              <Typography>{operatorName}</Typography>
            </Grid>
            <Grid item xs={1} sx={{ mb: "1rem", mr: "0.4rem" }}>
              <AccessTimeOutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: "1rem" }}>
              <Typography variant="h6">{formatDate(start, end)}</Typography>
            </Grid>

            <Grid item xs={1} sx={{ mb: "1rem", mr: "0.4rem" }}>
              <Face3OutlinedIcon />
            </Grid>
            <Grid item xs={10} sx={{ mb: "1rem" }}>
              <Typography color={avatar === "" ? "textSecondary" : "inherit"}>
                {avatar != "" ? avatar : "アバター"}
              </Typography>
            </Grid>
            <Grid container direction="row">
              <Grid item xs={1} sx={{ mb: "1rem", mr: "0.4rem" }}>
                メモ
              </Grid>
              <Grid
                item
                xs={10}
                sx={{
                  mb: "1rem",
                  border: 1,
                  borderRadius: 1,
                  borderColor: "#dcdcdc",
                  height: "5rem",
                  overflow: "auto",
                }}
              >
                <Typography
                  color={operatorMemo === "" ? "textSecondary" : "inherit"}
                >
                  {operatorMemo != "" ? operatorMemo : ""}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  else return <FailedDialog open={open} handleClose={handleClose} />;
}
