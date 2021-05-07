import { AppBar, Box, Button, Grid, Paper, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import Page from "../../../shared/Page";

export default function CreateClass(props) {
  const [classLevel, setClassLevel] = useState(0);
  const [teacher, setTeacher] = useState("");
  const classLevelOptions = [1, 2, 3, 4, 5];
  const [teacherOptions, setTeacherOptions] = useState([{ name: "test.." }]);
  const [nameOfClass, setNameOfClass] = useState("");

  const [currentTab, setCurrentTab] = useState(0);

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
                value={classLevel}
                onChange={(event, newValue) => {
                  setClassLevel(newValue);
                }}
                options={classLevelOptions}
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

        <Box mt={2}></Box>
        <Typography variant="h3" gutterBottom>
          Danh sách học sinh
        </Typography>

        <AppBar position="static">
          <Tabs centered value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} aria-label="simple tabs example">
            <Tab label="Nhập trực tiếp" />
            <Tab label="Upload file Excel" />
            {/* <Tab label="Item Three" /> */}
          </Tabs>
        </AppBar>
        <Box hidden={currentTab !== 0}></Box>
        <Box hidden={currentTab !== 1}>goodbye world</Box>

        <Box mt={4} textAlign="right">
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Page>
    </div>
  );
}
