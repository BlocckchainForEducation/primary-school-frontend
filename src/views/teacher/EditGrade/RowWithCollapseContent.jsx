import { Box, Collapse, IconButton, makeStyles, TableCell, TableRow } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import AskOTP from "../../../layouts/TeacherDashboardLayout/AskOTP";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { isEnable2FA } from "../../../utils/mng-2fa";
import { ERR_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../../utils/snackbar-utils";
import EditGradeForm from "./EditGradeForm";
import EditGradeHistory from "./EditGradeHistory";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  timeline: {
    paddingLeft: 0,
    "& .MuiTimelineItem-missingOppositeContent:before": {
      flex: 0,
      padding: 0,
    },
  },
});

export default function RowWithCollapseContent(props) {
  const { claxx, student, index, setClaxx } = props;
  const [open, setOpen] = useState(false);
  const cls = useRowStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [askOTPDialog, setAskOTPDialog] = useState(null);

  async function hdSubmit(halfSemesterPoint, finalSemesterPoint) {
    if (isEnable2FA()) {
      setAskOTPDialog(
        <AskOTP
          open={true}
          hdCancel={() => setAskOTPDialog(null)}
          hdFail={() => {
            enqueueSnackbar("Mã OTP không chính xác, vui lòng thử lại", ERR_TOP_CENTER);
          }}
          hdSuccess={() => {
            setAskOTPDialog(null);
            sendEditedGrade(halfSemesterPoint, finalSemesterPoint);
          }}
        ></AskOTP>
      );
    } else {
      sendEditedGrade(halfSemesterPoint, finalSemesterPoint);
    }
  }

  async function sendEditedGrade(halfSemesterPoint, finalSemesterPoint) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    try {
      const response = await axios.post("/teacher/edit-grade", {
        privateKeyHex,
        claxx,
        student,
        halfSemesterPoint,
        finalSemesterPoint,
      });
      const clonedClass = { ...claxx };
      const stdInClonedClass = clonedClass.students.find((std) => std.studentId === student.studentId);
      stdInClonedClass.versions.push(response.data);
      setClaxx(clonedClass);
      enqueueSnackbar("Sửa điểm thành công!", SUCCESS_TOP_CENTER);
    } catch (error) {
      console.error(error);
      if (error.response) enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  return (
    <>
      <TableRow className={cls.root}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{student.studentId}</TableCell>
        <TableCell>{student.name}</TableCell>
        <TableCell>{student.birthday}</TableCell>
        <TableCell>{student.email}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box px={1} pb={3}>
              <Box p={2} border="1px solid grey">
                <EditGradeHistory student={student}></EditGradeHistory>
                <Box mt={4}></Box>
                <EditGradeForm hdSubmit={hdSubmit}></EditGradeForm>
                {askOTPDialog}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
