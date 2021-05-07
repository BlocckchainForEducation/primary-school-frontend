import { useEffect } from "react";
import {
  Accordion,
  makeStyles,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  CircularProgress,
  AccordionActions,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { setPreloadHistory } from "./redux";
import { useSnackbar } from "notistack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SimpleTable from "../../../shared/Table/SimpleTable";
import GetAppIcon from "@material-ui/icons/GetApp";
import XLSX from "xlsx";
import { getLinkFromTxid } from "../../../utils/utils";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function TeacherUploadHistory() {
  const cls = useStyles();
  const fetching = useSelector((state) => state.teacherSlice.fetching);
  const history = useSelector((state) => state.teacherSlice.history);
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchHistory() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1.2/staff/teacher-history`, {
      headers: { Authorization: getToken() },
    });
    if (!response.ok) {
      enqueueSnackbar(`${response.status}: ${await response.text()}`, ERR_TOP_CENTER);
    } else {
      const result = await response.json();
      dp(setPreloadHistory(result));
    }
  }
  async function hdDownloadClick(e, item) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(item.profiles);
    XLSX.utils.book_append_sheet(wb, ws, "Giảng viên - " + item.time);
    XLSX.writeFile(wb, item.time + " - " + item.originalFileName);
  }
  const head = ["Bộ môn", "Mã giảng viên", "Họ và tên", "Account", "Password", "Txid"];
  // const title = "Lịch sử upload Giảng viên";
  const content = (
    <Box>
      {history.map((item, index) => {
        const body = item.profiles.map((profile) => [
          profile.department,
          profile.teacherId,
          profile.name,
          profile.email,
          profile.firstTimePassword,
          getLinkFromTxid(profile.txid),
        ]);
        return (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id={item._id}>
              <Typography className={cls.heading}>{`#${index + 1}, ${item.time}, ${item.originalFileName}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SimpleTable head={head} body={body}></SimpleTable>
            </AccordionDetails>
            <AccordionActions>
              <Button startIcon={<GetAppIcon />} variant="outlined" color="primary" onClick={(e) => hdDownloadClick(e, item)}>
                Download
              </Button>
            </AccordionActions>
          </Accordion>
        );
      })}
    </Box>
  );
  return fetching ? null : content;
}
