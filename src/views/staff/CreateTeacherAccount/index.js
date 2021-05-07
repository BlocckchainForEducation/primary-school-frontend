import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Page from "src/shared/Page";
import DragnDropZone from "../../../shared/DragnDropZone";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER, SUCCESS_BOTTOM_CENTER } from "../../../utils/snackbar-utils";
import { startUploadFile, uploadFileFail, uploadFileSuccess } from "./redux";
import TeacherDataExample from "./TeacherDataExample";
import TeacherUploadHistory from "./TeacherUploadHistory";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
      "&:last-child": {
        marginBottom: 0,
      },
    },
    paddingBottom: theme.spacing(2.5),
  },
}));

export default function CreateTeacherAccount() {
  const cls = useStyles();
  const [isFetching, setIsFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function hdUploadFile(files) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    setUploading(true);
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    formData.append("privateKeyHex", privateKeyHex);
    try {
      const response = await axios.post("/staff/create-teacher", formData);
      dp(uploadFileSuccess(response.data));

      enqueueSnackbar("Tạo tài khoản các giáo viên thành công!", SUCCESS_BOTTOM_CENTER);
    } catch (error) {
      dp(uploadFileFail());
      console.error(error);
      if (error.response) enqueueSnackbar(JSON.stringify(error.response.data), ERR_TOP_CENTER);
    }
  }

  return (
    <Page title="Tạo tài khoản giáo viên">
      <div className={cls.root}>
        <TeacherDataExample></TeacherDataExample>
        <DragnDropZone onDropAccepted={hdUploadFile} uploading={uploading}></DragnDropZone>
        {/* <TeacherUploadHistory></TeacherUploadHistory> */}
      </div>
    </Page>
  );
}
