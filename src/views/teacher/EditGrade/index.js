import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Page from "../../../shared/Page";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import InputClassId from "./InputClassId";
import RowWithCollapseContent from "./RowWithCollapseContent.jsx";

export default function EditGrade() {
  const [claxx, setClaxx] = useState(false);
  const [classId, setClassId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  async function hdGetClass() {
    try {
      const response = await axios.get("/teacher/classes/" + classId);
      setClaxx(response.data);
    } catch (error) {
      console.error(error);
      if (error.response) enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  return (
    <Page title="Sửa điểm">
      <InputClassId {...{ classId, setClassId, hdGetClass }}></InputClassId>
      <Box mt={2}> </Box>

      {/* if not found */}
      {claxx === null && (
        <Paper>
          <Box p={2}>
            <Typography>{`Không tìm thấy lớp ${classId}`}</Typography>
          </Box>
        </Paper>
      )}

      {/* if found but not submit yet */}
      {claxx && !claxx.isSubmited && (
        <Paper>
          <Box p={2}>
            <Typography>{`Lớp này chưa được nhập điểm!`}</Typography>
          </Box>
        </Paper>
      )}

      {/* if found and already submited */}
      {claxx && claxx.isSubmited && (
        <Paper>
          <Box px={1} py={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>MSSV</TableCell>
                    <TableCell>Họ và tên</TableCell>
                    <TableCell>Ngày sinh</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claxx.students.map((student, index) => {
                    return (
                      <RowWithCollapseContent
                        key={index}
                        student={student}
                        index={index}
                        claxx={claxx}
                        setClaxx={setClaxx}
                      ></RowWithCollapseContent>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      )}
    </Page>
  );
}
