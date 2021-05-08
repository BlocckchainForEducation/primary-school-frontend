import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import Page from "../../../shared/Page";
import "date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import DragnDropZone from "../../../shared/DragnDropZone";
import axios from "axios";
import { useSnackbar } from "notistack";
import { ERR_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../../utils/snackbar-utils";

export default function CreateClass(props) {
  const [classGroup, setClassGroup] = useState(null);
  const [teacher, setTeacher] = useState({});
  const classGroupOptions = [1, 2, 3, 4, 5];
  const [teacherOptions, setTeacherOptions] = useState([{ name: "" }]);
  const [nameOfClass, setNameOfClass] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [currentTab, setCurrentTab] = useState(0);
  const [students, setStudents] = useState([{}]);
  console.log({ students });

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    try {
      const response = await axios.get("/staff/teachers");
      const teachersData = response.data.map((teacher, index) => ({ ...teacher, id: index + 1 }));
      setTeacherOptions(teachersData);
    } catch (error) {
      error.response && enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  async function hdSubmit() {
    try {
      console.log(students);
      const claxx = { classGroup, nameOfClass, teacher, students };
      const response = await axios.post("/staff/create-class", { claxx });
      enqueueSnackbar("Tạo lớp thành công!", SUCCESS_TOP_CENTER);
      setClassGroup(null);
      setNameOfClass("");
      setTeacher({});
      setStudents([]);
    } catch (error) {
      error.response && enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  return (
    <div>
      <Page title="Tạo lớp học">
        <Typography variant="h3" gutterBottom>
          Thông tin lớp học
        </Typography>
        <Paper style={{ padding: 16 }}>
          <Grid container spacing={4}>
            <Grid item md={4}>
              <Autocomplete
                value={classGroup}
                onChange={(event, newValue) => {
                  setClassGroup(newValue);
                }}
                options={classGroupOptions}
                getOptionLabel={(option) => `Khối lớp ${option}`}
                renderInput={(params) => <TextField {...params} label="Khối lớp" variant="outlined"></TextField>}
              ></Autocomplete>
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Tên lớp"
                value={nameOfClass}
                onChange={(e) => setNameOfClass(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item md={4}>
              <Autocomplete
                value={teacher}
                onChange={(event, newValue) => {
                  setTeacher(newValue);
                }}
                options={teacherOptions}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Giáo viên chủ nhiệm" variant="outlined"></TextField>}
              ></Autocomplete>
            </Grid>
          </Grid>
        </Paper>

        <Box mt={4}></Box>
        <Typography variant="h3" gutterBottom>
          Danh sách học sinh
        </Typography>

        <AppBar position="static">
          <Tabs centered value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} aria-label="simple tabs example">
            <Tab label="Nhập trực tiếp" />
            <Tab label="Upload file Excel" />
          </Tabs>
        </AppBar>
        <Box hidden={currentTab !== 0}>
          <TableContainer component={Paper}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Họ và Tên</TableCell>
                  <TableCell>Ngày sinh</TableCell>
                  <TableCell>Giới tính</TableCell>
                  <TableCell>Quê quán</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>
                      <TextField
                        value={student.name}
                        onChange={(e) => {
                          const clone = students;
                          clone[index].name = e.target.value;
                          setStudents(clone);
                        }}
                      ></TextField>
                    </TableCell>

                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableFuture
                          autoOk
                          format="dd/MM/yyyy"
                          value={student.birthday}
                          onChange={(selectedDate) => {
                            const clone = [...students];
                            clone[index].birthday = selectedDate;
                            setStudents(clone);
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>

                    <TableCell>
                      <Autocomplete
                        value={student.gender}
                        onChange={(event, newValue) => {
                          const clone = [...students];
                          clone[index].gender = newValue;
                          setStudents(clone);
                        }}
                        options={["Nam", "Nữ"]}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params}></TextField>}
                      ></Autocomplete>
                    </TableCell>

                    <TableCell>
                      <TextField
                        value={student.locale}
                        onChange={(e) => {
                          const clone = [...students];
                          clone[index].locale = e.target.value;
                          setStudents(clone);
                        }}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => {
                          const resultStudents = students.filter((std, idx) => idx !== index);
                          setStudents(resultStudents);
                        }}
                      >
                        <DeleteIcon></DeleteIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box p={2} textAlign="right">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setStudents([...students, {}]);
                }}
              >
                Thêm hàng
              </Button>
            </Box>
          </TableContainer>
        </Box>
        <Box hidden={currentTab !== 1}>
          <Paper>
            <DragnDropZone></DragnDropZone>
          </Paper>
        </Box>

        <Box mt={4} textAlign="right">
          <Button variant="contained" color="primary" onClick={hdSubmit}>
            Gửi
          </Button>
        </Box>
      </Page>
    </div>
  );
}
