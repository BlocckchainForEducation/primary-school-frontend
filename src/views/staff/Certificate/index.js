import { Box } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Page from "../../../shared/Page";
import { ERR_TOP_CENTER } from "../../../utils/snackbar-utils";
import ClassCollapse from "./ClassCollapse";

export default function Certificate(props) {
  const [classes, setClasses] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetch5thClasses();
  }, []);

  async function fetch5thClasses() {
    try {
      const response = await axios.get("/staff/5th-classes");
      setClasses(response.data);
    } catch (error) {
      error.response && enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  return (
    <div>
      <Page title="Công nhận hoàn thành CTTH">
        {classes.map((claxx, index) => (
          <Box key={index} mb={2}>
            <ClassCollapse claxx={claxx}></ClassCollapse>
          </Box>
        ))}
      </Page>
    </div>
  );
}
