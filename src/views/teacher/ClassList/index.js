import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Page from "../../../shared/Page";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ClassList(props) {
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

  return (
    <div>
      <Page title="Danh sách lớp học">
        {Object.entries(groupsOfClasses).map((entry, index) => (
          <Box mb={3}>
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
                          <TableCell style={{ width: "30%" }}>Họ và Tên</TableCell>
                          <TableCell>Ngày sinh</TableCell>
                          <TableCell>Giới tính</TableCell>
                          <TableCell>Quê quán</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {claxx.students.map((student, sIndex) => (
                          <TableRow key={sIndex}>
                            <TableCell>{sIndex + 1}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.birthday.split("T")[0]}</TableCell>
                            <TableCell>{student.gender}</TableCell>
                            <TableCell>{student.locale}</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
      </Page>
    </div>
  );
}
