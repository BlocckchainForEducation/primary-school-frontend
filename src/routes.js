import React from "react";
import { Navigate } from "react-router-dom";
import StaffDashboardLayout from "src/layouts/StaffDashboardLayout";
import TeacherDashboardLayout from "src/layouts/TeacherDashboardLayout";
import MainLayout from "src/layouts/MainLayout";
import NotFoundView from "src/shared/NotFoundView";

import SignInView from "src/views/guest/SignIn";

import MakeRequest from "./views/staff/Register";
import TeacherProfile from "./views/teacher/Profile";
import { getRole, ROLE } from "./utils/mng-role";
import Teachers from "./views/staff/Teachers";
import CreateClass from "./views/staff/CreateClass";
import ClassList from "./views/staff/ClassList";
import Certificate from "./views/staff/Certificate";

const routes = [
  {
    path: "/cb-truong",
    element: <StaffDashboardLayout />,
    children: [
      { path: "dang-ki-tham-gia", element: <MakeRequest /> },
      { path: "ds-giao-vien", element: <Teachers /> },
      { path: "tao-lop-hoc", element: <CreateClass /> },
      { path: "ds-lop-hoc", element: <ClassList /> },
      { path: "cong-nhan-hoan-thanh", element: <Certificate /> },
      { path: "*", element: <Navigate to="/404" replace={true} /> },
    ],
  },
  {
    path: "/giang-vien",
    element: <TeacherDashboardLayout />,
    children: [
      { path: "thong-tin-ca-nhan", element: <TeacherProfile /> },
      { path: "*", element: <Navigate to="/404" replace={true} /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // { path: "dang-ki", element: <SignUpView /> },
      { path: "dang-nhap", element: <SignInView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Redirector /> },
      { path: "*", element: <Navigate to="/404" replace={true} /> },
    ],
  },
];

function Redirector(props) {
  const role = getRole();
  let to = "";
  if (!role) {
    to = "/dang-nhap";
  } else if (role === ROLE.STAFF) {
    to = "/cb-truong/dang-ki-tham-gia";
  } else if (role === ROLE.TEACHER) {
    to = "/giang-vien/thong-tin-ca-nhan";
  }
  return <Navigate to={to} />;
}

export default routes;
