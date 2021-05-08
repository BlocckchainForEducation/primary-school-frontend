import { Paper } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "#", width: 75, type: "string" },
  { field: "teacherId", headerName: "Mã giáo viên", width: 135, type: "string" },
  { field: "name", headerName: "Họ và Tên", width: 250, type: "string" },
  { field: "email", headerName: "Email/Account", width: 250, type: "string" },
  { field: "firstTimePassword", headerName: "1st Mật khẩu", width: 150, type: "string" },
  { field: "phone", headerName: "Số điện thoại", width: 150, type: "string" },
  { field: "publicKey", headerName: "Khóa công khai", width: 350, type: "string" },
];

export default function TeacherTable({ isFetching, teachers }) {
  return (
    <div>
      <Paper style={{ height: "650px", width: "100%" }}>
        {isFetching ? null : (
          <DataGrid
            rows={teachers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rowHeight={48}
            loading={isFetching}
          />
        )}
      </Paper>
    </div>
  );
}
