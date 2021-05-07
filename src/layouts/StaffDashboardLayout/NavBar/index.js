import { Avatar, Box, Divider, Drawer, Hidden, List, makeStyles, Typography } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NavItem from "./NavItem";

const items = [
  {
    href: "/cb-truong/dang-ki-tham-gia",
    icon: AccountBalanceIcon,
    title: "Đăng kí tham gia",
  },
  {
    href: "/cb-truong/tao-giao-vien",
    icon: HowToVoteIcon,
    title: "Tạo TK Giáo viên",
  },
  {
    href: "/cb-truong/tao-lop-hoc",
    icon: HowToVoteIcon,
    title: "Tạo lớp học",
  },
  {
    href: "/cb-truong/ds-lop-hoc",
    icon: HowToVoteIcon,
    title: "Danh sách lớp học",
  },
  {
    href: "/cb-truong/cong-nhan-hoan-thanh",
    icon: HowToVoteIcon,
    title: "Công nhận hoàn thành CTTH",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  const user = useSelector((state) => state.profileSlice);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} component={RouterLink} src={user.imgSrc} to="/cb-truong/dang-ki-tham-gia" />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.universityName || "Trường Cấp 1 ABC"}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {"Cán bộ Trường"}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer anchor="left" classes={{ paper: classes.mobileDrawer }} onClose={onMobileClose} open={openMobile} variant="temporary">
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
