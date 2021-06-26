import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import { getLinkFromTxid } from "../../../utils/utils";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ClassCollapse({ claxx, minWidth }) {
  const cls = useStyles();
  const [show, setShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [stateClass, setStateClass] = useState(claxx);

  async function hdIssueAll(e, stateClass) {
    e.stopPropagation();
    try {
      const response = await axios.post("/staff/issue-all", { claxx: stateClass });
      setStateClass(response.data);
    } catch (error) {
      error.response && enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  function toggleCollapse() {
    setShow(!show);
  }

  return (
    <Paper>
      <Box
        pl={2}
        pr={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={toggleCollapse}
        style={{ cursor: "pointer" }}
      >
        <Typography variant="h4">
          Lớp {stateClass.nameOfClass}, GVCN: {stateClass.teacher.name}
        </Typography>
        <Box>
          {stateClass.isIssued ? (
            <i>Đã công nhận</i>
          ) : (
            <Button
              className={cls.button}
              variant="outlined"
              color="primary"
              onClick={(e) => hdIssueAll(e, claxx)}
              disabled={stateClass.isIssued}
            >
              Công nhận cả lớp
            </Button>
          )}
          {show ? (
            <IconButton onClick={toggleCollapse}>
              <KeyboardArrowUpIcon />
            </IconButton>
          ) : (
            <IconButton onClick={toggleCollapse}>
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider></Divider>
      <Collapse in={show}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell style={{ width: "20%" }}>Họ và Tên</TableCell>
                <TableCell>Ngày sinh</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Quê quán</TableCell>
                {claxx.isIssued && <TableCell>Ngày công nhận</TableCell>}
                {claxx.isIssued && <TableCell>Người công nhận</TableCell>}
                {claxx.isIssued ? <TableCell>Txid</TableCell> : <TableCell>Công nhận</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {stateClass.students.map((student, sIndex) => (
                <TableRow key={sIndex}>
                  <TableCell>{sIndex + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.birthday.split("T")[0]}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.locale}</TableCell>
                  {claxx.isIssued && <TableCell>{new Date(claxx.issueDate).toISOString().split("T")[0]}</TableCell>}
                  {claxx.isIssued && <TableCell>{claxx.issuer}</TableCell>}
                  <TableCell>
                    {student.issueTxid ? (
                      getLinkFromTxid(student.issueTxid, 10)
                    ) : (
                      <Button variant="contained" color="primary" size="small">
                        Công nhận
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Paper>
  );
}
