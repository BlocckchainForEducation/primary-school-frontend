import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { setLocalToken, setRemember, setSessionToken } from "src/utils/mng-token";
import { getRouteByRole, setLocalRole, setSessionRole } from "../../../utils/mng-role";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link component={RouterLink} to="/">
        B4E Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  alert: {
    marginTop: theme.spacing(3),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.primary.main,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [state, setState] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  async function hdSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/acc/signin", { email: state.email, password: state.password });
      const body = response.data;
      if (state.remember) {
        setLocalToken(body.token);
        setLocalRole(body.role);
        setRemember(true);
      } else {
        setSessionToken(body.token);
        setSessionRole(body.role);
        setRemember(false);
      }
      navigate(getRouteByRole(body.role));
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Đăng nhập
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={state.email}
            onChange={(e) => {
              setState({ ...state, email: e.target.value });
              setErrors({ ...errors, email: null });
            }}
            error={Boolean(errors?.email)}
            helperText={errors?.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="password"
            value={state.password}
            onChange={(e) => {
              setState({ ...state, password: e.target.value });
              setErrors({ ...errors, password: null });
            }}
            error={Boolean(errors?.password)}
            helperText={errors?.password}
          />
          <FormControlLabel
            control={
              <Checkbox checked={state.remember} onChange={(e) => setState({ ...state, remember: !state.remember })} color="primary" />
            }
            label="Nhớ đăng nhập"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={hdSubmit}>
            Đăng nhập
          </Button>
          <Grid container justify="flex-end">
            <Grid item xs></Grid>
            <Grid item xs>
              <Typography align="right">
                <Link componet={RouterLink} to="#" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Typography>
            </Grid>
            {/* <Grid item>
              <Link component={RouterLink} to="/dang-ki">
                {"Chưa có tài khoản? Đăng kí"}
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      <Box mt={6}>
        <Copyright />
      </Box>
    </Container>
  );
}
