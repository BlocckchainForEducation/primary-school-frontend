import { Avatar, Box, Divider, Drawer, Hidden, List, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { User as UserIcon } from "react-feather";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import GavelIcon from "@material-ui/icons/Gavel";
import EditIcon from "@material-ui/icons/Edit";
import ViewListIcon from "@material-ui/icons/ViewList";
const items = [
  {
    href: "/giao-vien/thong-tin-ca-nhan",
    icon: UserIcon,
    title: "Thông tin cá nhân",
  },
  {
    href: "/giao-vien/ds-lop-hoc",
    icon: ViewListIcon,
    title: "Danh sách lớp học",
  },
  {
    href: "/giao-vien/ghi-diem-tong-ket",
    icon: EditIcon,
    title: "Ghi điểm tổng kết",
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

  const user = useSelector((state) => state.teacherProfileSlice);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} component={RouterLink} src={user.imgSrc} to="/giao-vien/thong-tin-ca-nhan" />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Giáo viên
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
