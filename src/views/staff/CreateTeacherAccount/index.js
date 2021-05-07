import React, { useEffect, useState } from "react";
import Page from "src/shared/Page";
import TeacherDataExample from "./TeacherDataExample";
import DragnDropZone from "../../../shared/DragnDropZone";
import { makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { requirePrivateKeyHex } from "../../../utils/keyholder";
import { ERR_TOP_CENTER, SUCCESS_BOTTOM_CENTER } from "../../../utils/snackbar-utils";
import axios from "axios";

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
  const [uploading, setUploading] = useState(false);
  const [teachers, setTeachers] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchTeachers();
  });

  async function fetchTeachers() {}

  async function hdUploadFile(files) {
    const privateKeyHex = await requirePrivateKeyHex(enqueueSnackbar);
    setUploading(true);
    const formData = new FormData();
    formData.append("excel-file", files[0]);
    formData.append("privateKeyHex", privateKeyHex);
    try {
      const response = await axios.post("/staff/create-teacher", formData);
      setUploading(false);
      const updatedTeachers = [...teachers, ...response.data];
      setTeachers(updatedTeachers);
      enqueueSnackbar("Tạo tài khoản các giáo viên thành công!", SUCCESS_BOTTOM_CENTER);
    } catch (error) {
      setUploading(false);
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
