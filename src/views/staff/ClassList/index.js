import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Page from "../../../shared/Page";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import LevelUpDialog from "./LevelUpDialog";

export default function ClassList(props) {
  const [groupsOfClasses, setGroupsOfClasses] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchClasses();
  }, []);

  async function fetchClasses() {
    try {
      const response = await axios.get("/staff/classes");
      const classes = response.data;
      const filteLevelUpedClass = classes.filter((claxx) => !claxx.isLevelUp);
      const groupsOfClasses = filteLevelUpedClass.reduce((accumulator, claxx) => {
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
              <ClassAccordion cIndex={cIndex} claxx={claxx} fetchClasses={fetchClasses}></ClassAccordion>
            ))}
          </Box>
        ))}
      </Page>
    </div>
  );
}

function ClassAccordion({ cIndex, claxx, fetchClasses }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Accordion key={cIndex}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box flexGrow="1" display="flex" justifyContent="space-between" alignItems="center" pr={1}>
          <Box>{`Lớp ${claxx.nameOfClass}, GVCN: ${claxx.teacher.name}`}</Box>
          {claxx.isSubmited && (
            <Button
              size="small"
              color="primary"
              variant="outlined"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenDialog(true);
              }}
            >
              Lên lớp
            </Button>
          )}
        </Box>
      </AccordionSummary>
      {openDialog && <LevelUpDialog hdClose={() => setOpenDialog(false)} claxx={claxx} refresh={() => fetchClasses()}></LevelUpDialog>}
      <AccordionDetails>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell style={{}}>Họ và Tên</TableCell>
                <TableCell>Ngày sinh</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Quê quán</TableCell>
                <TableCell>Khóa bí mật</TableCell>
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
                  <TableCell>{student.privateKey}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
