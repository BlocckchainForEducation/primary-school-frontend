import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER, SUCCESS_TOP_CENTER } from "../../../utils/snackbar-utils";

export default function LevelUpDialog({ hdClose, claxx, refresh }) {
  const [teacher, setTeacher] = useState({});
  const [teacherOptions, setTeacherOptions] = useState([{ name: "" }]);
  const [nameOfClass, setNameOfClass] = useState("");

  const { enqueueSnackbar } = useSnackbar();

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

  async function hdLevelUp() {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    try {
      const response = await axios.post("/staff/class-level-up", { privateKeyHex, claxx, teacher, nameOfClass });
      enqueueSnackbar("Thực hiện lên lớp thành công!", SUCCESS_TOP_CENTER);
      refresh();
      hdClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, ERR_TOP_CENTER);
    }
  }

  return (
    <Dialog open={true} onClose={hdClose}>
      <Box minWidth={350}>
        <DialogTitle>Nhập thông tin lớp mới</DialogTitle>

        <Box px={2} py={2}>
          <Autocomplete
            value={teacher}
            onChange={(event, newValue) => {
              setTeacher(newValue);
            }}
            options={teacherOptions}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Giáo viên chủ nhiệm" variant="outlined"></TextField>}
          ></Autocomplete>
          <Box pt={2}></Box>
          <TextField
            fullWidth
            variant="outlined"
            label="Tên lớp"
            value={nameOfClass}
            onChange={(e) => setNameOfClass(e.target.value)}
          ></TextField>
        </Box>

        <DialogActions>
          <Button onClick={hdClose} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={hdLevelUp} color="primary">
            OK
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
