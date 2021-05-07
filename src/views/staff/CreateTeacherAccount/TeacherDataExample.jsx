import React from "react";
import DownloadExampleData from "../../../shared/DownloadExampleData";

export default function TeacherDataExample() {
  const title = "Mẫu file dữ liệu Giáo viên";
  const fileName = "v1.2/giang-vien-example.xlsx";
  const head = ["Mã giáo viên*", "Họ và tên*", "Email*", "Số điện thoại", "Khóa công khai"];
  const body = [
    ["GV00001", "Vũ Văn Thiệu", "thieu.vuvan@hust.edu.vn", 982928307, "0286bdc0501ea9625d83b535021faf29a3b3bf563d4fed85ffd63ede0b498304ed"],
    ["GV00002", "Nguyễn Phi Lê", "le.nguyenphi@hust.edu.vn", 1662257624],
    ["GV00003", "Umi Hirose", "umi.hirose@soict.hust.edu.vn", "", "026a80ba4d7b2f12a3cda2fbe1223b37119bda786dec64cc3458e593052dab16bb"],
    ["GV00004", "Nguyễn Ngọc Bích A", "bichann@soict.hust.edu.vn"],
    [
      "GV00005",
      "Ngô Lam Trung",
      "trung.ngolam@hust.edu.vn",
      968395999,
      "0383d83af8b1358baa794d736ddf018eaab7c9a1c0cc6ccf11751cb183b07ec2d1",
    ],
    ["GV00006", "Nguyễn Văn Hiên", "nguyenvanhienbkhn@gmail.com", "", "03870c5a3a1add1875fa125f2194c563f27f75c806cb6a30826caafb1bad8f8a15"],
  ];
  return <DownloadExampleData {...{ title, fileName, head, body }} minWidth={"1500px"}></DownloadExampleData>;
}
