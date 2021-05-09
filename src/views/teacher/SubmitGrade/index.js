import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Page from "../../../shared/Page";
import { ERR_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../../utils/snackbar-utils";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getLinkFromTxid } from "../../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-input.Mui-disabled": {
      color: "black",
    },
  },
}));

export default function SubmitGrade(props) {
  const cls = useStyles();

  const [groupsOfClasses, setGroupsOfClasses] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchClasses();
  }, []);

  async function fetchClasses() {
    try {
      const response = await axios.get("/teacher/classes");
      const classes = response.data;
      const groupsOfClasses = classes.reduce((accumulator, claxx) => {
        accumulator[claxx.classGroup] = [...(accumulator[claxx.classGroup] || []), claxx];
        return accumulator;
      }, {});
      setGroupsOfClasses(groupsOfClasses);
    } catch (error) {
      error.response && enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  async function hdSubmit(claxx) {
    try {
      const response = await axios.post("/teacher/submit-grade", { claxx });
      enqueueSnackbar("Ghi điểm thành công!", SUCCESS_TOP_CENTER);
    } catch (error) {
      error.response && enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  return (
    <div>
      <Page title="Ghi điểm tổng kết">
        {Object.entries(groupsOfClasses).map((entry, index) => (
          <Box mb={3} className={cls.root}>
            <Typography variant="h4" gutterBottom>
              Khối lớp {entry[0]}:
            </Typography>
            {entry[1].map((claxx, cIndex) => (
              <Accordion key={cIndex}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  {`Lớp ${claxx.nameOfClass}, GVCN: ${claxx.teacher.name}`}
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell style={{}}>Họ và Tên</TableCell>
                          <TableCell style={{ width: 100 }}>Toán</TableCell>
                          <TableCell style={{ width: 100 }}>Tiếng Việt</TableCell>
                          <TableCell style={{ width: 100 }}>Ngoại ngữ</TableCell>
                          <TableCell style={{ width: 100 }}>TN&amp;XH</TableCell>
                          <TableCell style={{ width: 100 }}>LS&amp;ĐL</TableCell>
                          <TableCell style={{ width: 100 }}>Khoa học</TableCell>
                          <TableCell style={{ width: 100 }}>TH&amp;CN</TableCell>
                          <TableCell style={{ width: 100 }}>Thể dục</TableCell>
                          <TableCell style={{ width: 100 }}>Nghệ thuật</TableCell>
                          {claxx.isSubmited && <TableCell style={{ width: 100 }}>Txid</TableCell>}
                          {claxx.isSubmited && <TableCell style={{ width: 100 }}>Ngày ghi</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {claxx.students.map((student, sIndex) => (
                          <TableRow key={sIndex}>
                            <TableCell>{sIndex + 1}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                              <TextField
                                disabled={claxx.isSubmited}
                                fullWidth
                                value={student.math}
                                onChange={(e) => {
                                  student.math = e.target.value;
                                  const clone = { ...groupsOfClasses };
                                  setGroupsOfClasses(clone);
                                }}
                              ></TextField>
                            </TableCell>
                            <TableCell>
                              <TextField
                                disabled={claxx.isSubmited}
                                fullWidth
                                value={student.literacy}
                                onChange={(e) => {
                                  student.literacy = e.target.value;
                                  const clone = { ...groupsOfClasses };
                                  setGroupsOfClasses(clone);
                                }}
                              ></TextField>
                            </TableCell>
                            <TableCell>
                              <TextField
                                disabled={claxx.isSubmited}
                                fullWidth
                                value={student.language}
                                onChange={(e) => {
                                  student.language = e.target.value;
                                  const clone = { ...groupsOfClasses };
                                  setGroupsOfClasses(clone);
                                }}
                              ></TextField>
                            </TableCell>
                            <TableCell>
                              <TextField
                                disabled={claxx.isSubmited}
                                fullWidth
                                value={student.naturalNsocial}
                                onChange={(e) => {
                                  student.naturalNsocial = e.target.value;
                                  const clone = { ...groupsOfClasses };
                                  setGroupsOfClasses(clone);
                                }}
                              ></TextField>
                            </TableCell>
                            <TableCell>
                              <TextField
                                disabled={claxx.isSubmited}
                                fullWidth
                                value={student.historyNgeography}
                                onChange={(e) => {
                                  student.historyNgeography = e.target.value;
                                  const clone = { ...groupsOfClasses };
                                  setGroupsOfClasses(clone);
                                }}
                              ></TextField>
                            </TableCell>
                            <TableCell>
                              <TextField
                                disabled={claxx.isSubmited}
                                fullWidth
                                value={student.science}
                                onChange={(e) => {
                                  student.science = e.target.value;
                                  const clone = { ...groupsOfClasses };
                                  setGroupsOfClasses(clone);
                                }}
                              ></TextField>
                            </TableCell>
                            <TableCell>
                              <TextField
                                disabled={claxx.isSubmited}
                                fullWidth
                                value={student.itNtech}
                                onChange={(e) => {
                                  student.itNtech = e.target.value;
                                  const clone = { ...groupsOfClasses };
                                  setGroupsOfClasses(clone);
                                }}
                              ></TextField>
                            </TableCell>
                            <TableCell>
                              <TextField
                                disabled={claxx.isSubmited}
                                fullWidth
                                value={student.healthEdu}
                                onChange={(e) => {
                                  student.healthEdu = e.target.value;
                                  const clone = { ...groupsOfClasses };
                                  setGroupsOfClasses(clone);
                                }}
                              ></TextField>
                            </TableCell>
                            <TableCell>
                              <TextField
                                disabled={claxx.isSubmited}
                                fullWidth
                                value={student.art}
                                onChange={(e) => {
                                  student.art = e.target.value;
                                  const clone = { ...groupsOfClasses };
                                  setGroupsOfClasses(clone);
                                }}
                              ></TextField>
                            </TableCell>
                            {claxx.isSubmited && <TableCell>{getLinkFromTxid(student.txid, 8)}</TableCell>}
                            {claxx.isSubmited && <TableCell>{new Date(student.timestamp).toISOString().split("T")[0]}</TableCell>}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
                {!claxx.isSubmited && (
                  <AccordionActions>
                    <Box mt={4} textAlign="right">
                      <Button variant="contained" color="primary" onClick={() => hdSubmit(claxx)}>
                        Gửi
                      </Button>
                    </Box>
                  </AccordionActions>
                )}
              </Accordion>
            ))}
          </Box>
        ))}
      </Page>
    </div>
  );
}
