import { makeStyles } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import testApi from "../../api/testApi";
import CustomButton from "../../components/CustomButton";
import CustomSelect from "../../components/CustomSelect";
import { DateToString } from "../../components/Utils/Tools";
const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
    "&>span": {
      fontSize: 25,
      fontWeight: 600,
    },
  },
  row1: {
    display: "flex",
    justifyContent: "space-between",
  },
  row2: {
    display: "flex",
    alignItems: "center",
    "&>div": {
      minWidth: 100,
      marginLeft: 20,
      marginBottom: 20,
    },
  },
  row3: {},
  table: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-55%, -50%)",
    height: "400px",
    width: 852,
    margin: 50,
    "& .MuiDataGrid-columnHeaderWrapper": {
      backgroundColor: "#3498db",
      color: "white",
    },
  },
}));
function DanhSach(props) {
  const classes = useStyles();
  const columns = [
    { field: "hoten", headerName: "Họ và tên", width: 200 },
    {
      field: "ngaysinh",
      headerName: "Ngày sinh",
      width: 200,
      renderCell: ({ row }) => {
        return <>{DateToString(row.ngaysinh)}</>;
      },
    },
    {
      field: "nu",
      headerName: "Giới tính",
      width: 200,
      renderCell: ({ row }) => {
        return <>{row.nu ? "Nữ" : "Nam"}</>;
      },
    },

    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: ({ row }) => {
        return (
          <>
            {
              <Link
                style={{
                  textDecoration: "none",
                }}
                to={`/thanhvien/${row.email}`}
              >
                <span>{row.email}</span>
              </Link>
            }
          </>
        );
      },
    },
  ];
  const [rows, setRows] = useState([]);
  const [nu, setNu] = useState();
  const [filter, setFilter] = useState({});
  const handleOnChangeNu = (event) => {
    console.log(event.target);
    if (event.target.value === "none") {
      setFilter({});
    } else {
      setFilter({ ...filter, [event.target.name]: event.target.value });
    }
    setNu(event.target.value);
  };
  console.log(filter);
  useEffect(() => {
    (async () => {
      try {
        const res = await testApi.getMember(filter);
        const tmpData = res.data;
        Array.from(tmpData).map((item, index) => {
          setRows((pre) => {
            return [...pre, { id: index, ...item }];
          });
        });
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      setRows([]);
    };
  }, [filter]);
  // console.log(rows);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span>DANH SÁCH THÀNH VIÊN</span>
      </div>
      <div className={classes.row1}>
        <span>Tổng số thành viên: {rows.length}</span>
        <Link
          style={{
            textDecoration: "none",
          }}
          to="/dangki"
        >
          <CustomButton title="Thêm thành viên" css={true} />
        </Link>
      </div>
      <div className={classes.row2}>
        <span>Chọn giới tính: </span>
        <CustomSelect
          name="nu"
          label="Giới Tính"
          fullWidth={false}
          value={nu}
          onChange={handleOnChangeNu}
          data={[
            { value: "none", title: "All" },
            { value: "true", title: "Nữ" },
            { value: "false", title: "Nam" },
          ]}
        />
      </div>
      <div className={classes.row3}>
        <DataGrid
          className={classes.table}
          rows={rows}
          columns={columns}
          pageSize={5}
        />
      </div>
    </div>
  );
}

export default DanhSach;
