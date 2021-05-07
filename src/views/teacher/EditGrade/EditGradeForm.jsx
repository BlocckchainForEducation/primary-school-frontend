import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

export default function EditGradeForm({ hdSubmit }) {
  const [halfSemesterPoint, setHalfSemesterPoint] = useState();
  const [finalSemesterPoint, setFinalSemesterPoint] = useState();

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={12} md={3}>
        <Typography variant="h4">Nhập điểm mới:</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          variant="outlined"
          color="primary"
          size="small"
          label="Điểm GK"
          value={halfSemesterPoint}
          onChange={(e) => setHalfSemesterPoint(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          variant="outlined"
          color="primary"
          size="small"
          label="Điểm CK"
          value={finalSemesterPoint}
          onChange={(e) => setFinalSemesterPoint(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={12} md={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            hdSubmit(halfSemesterPoint, finalSemesterPoint);
            setHalfSemesterPoint("");
            setFinalSemesterPoint("");
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
