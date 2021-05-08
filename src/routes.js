import React from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout";
import StaffDashboardLayout from "src/layouts/StaffDashboardLayout";
import TeacherDashboardLayout from "src/layouts/TeacherDashboardLayout";
import NotFoundView from "src/shared/NotFoundView";
import SignInView from "src/views/guest/SignIn";
import { getRole, ROLE } from "./utils/mng-role";
import Certificate from "./views/staff/Certificate";
import ClassList from "./views/staff/ClassList";
import CreateClass from "./views/staff/CreateClass";
import CreateTeacherAccount from "./views/staff/CreateTeacherAccount";
import MakeRequest from "./views/staff/Register";
import TeacherProfile from "./views/teacher/Profile";
import ClassListOfTeacher from "./views/teacher/ClassList";

const routes = [
  {
    path: "/cb-truong",
    element: <StaffDashboardLayout />,
    children: [
      { path: "dang-ki-tham-gia", element: <MakeRequest /> },
      { path: "tao-giao-vien", element: <CreateTeacherAccount /> },
      { path: "tao-lop-hoc", element: <CreateClass /> },
      { path: "ds-lop-hoc", element: <ClassList /> },
      { path: "cong-nhan-hoan-thanh", element: <Certificate /> },
      { path: "*", element: <Navigate to="/404" replace={true} /> },
    ],
  },
  {
    path: "/giao-vien",
    element: <TeacherDashboardLayout />,
    children: [
      { path: "thong-tin-ca-nhan", element: <TeacherProfile /> },
      { path: "ds-lop-hoc", element: <ClassListOfTeacher /> },
      { path: "ghi-diem-tong-ket", element: <TeacherProfile /> },
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
    to = "/giao-vien/thong-tin-ca-nhan";
  }
  return <Navigate to={to} />;
}

export default routes;
