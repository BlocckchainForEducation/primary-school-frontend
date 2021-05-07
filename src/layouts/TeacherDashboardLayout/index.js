import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loading from "src/shared/Loading";
import { setProfile } from "src/views/teacher/Profile/redux";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.background.dark,
  },
  wrapper: {
    flex: "1 1 auto",
    display: "flex",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    flex: "1 1 auto",
    display: "flex",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    // height: "100%",
    overflow: "auto",
  },
}));

const TeacherDashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const loading = useSelector((state) => state.teacherProfileSlice.fetching);
  const dp = useDispatch();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProfile() {
    try {
      const response = await axios.get("/teacher/profile");
      dp(setProfile(response.data));
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={classes.root}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
            <div className={classes.wrapper}>
              <div className={classes.contentContainer}>
                <div className={classes.content}>
                  <PerfectScrollbar>
                    <Outlet />
                  </PerfectScrollbar>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TeacherDashboardLayout;
