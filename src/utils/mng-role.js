import { getRemember } from "./mng-token";

const ROLE = {
  STAFF: "STAFF",
  BUREAU: "BUREAU",
  TEACHER: "TEACHER",
};

function setLocalRole(role) {
  localStorage.setItem("role", role);
}

function setSessionRole(role) {
  sessionStorage.setItem("role", role);
}

function setRole(role) {
  if (getRemember()) {
    localStorage.setItem("role", role);
  } else {
    sessionStorage.setItem("role", role);
  }
}

function getRole() {
  const remember = getRemember();
  return remember ? localStorage.getItem("role") : sessionStorage.getItem("role");
}

function clearRole() {
  const remember = getRemember();
  return remember ? localStorage.removeItem("role") : sessionStorage.removeItem("role");
}

function getRouteByRole(role) {
  if (role === ROLE.STAFF) {
    return "/cb-truong/dang-ki-tham-gia";
  } else if (role === ROLE.TEACHER) {
    return "/giang-vien/thong-tin-ca-nhan";
  } else if (role === ROLE.BUREAU) {
    return "/giao-vu/thong-tin-ca-nhan";
  }
}

export { ROLE, getRouteByRole, setLocalRole, setSessionRole, getRole, clearRole, setRole };
