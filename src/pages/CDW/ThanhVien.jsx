import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import testApi from "../../api/testApi";
import CustomButton from "../../components/CustomButton";
import { DateToString, isEmpty } from "../../components/Utils/Tools";
const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "'Open Sans', sans-serif",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  header: {
    marginBottom: 20,
    "&>span": {
      fontSize: 25,
      fontWeight: 600,
    },
  },
  content: {
    "&>div>div": {},
  },
  marginSmall: {
    fontSize: 18,
    display: "flex",
    width: "300px",
    margin: "5px 0",
    "&>span:first-of-type": {
      minWidth: 150,
    },
  },
  footer: {
    marginTop: 25,
    "&>a": {
      textDecoration: "none",
    },
  },
}));
function ThanhVien(props) {
  const classes = useStyles();
  const { email } = useParams();
  const [dataTV, setDataTV] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await testApi.getMemberByEmail(email);
        if (!isEmpty(res?.data)) {
          const { data } = res;
          setDataTV(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span>Chi tiết thành viên</span>
      </div>
      <div className={classes.content}>
        <div className={classes.marginSmall}>
          <span>Họ tên</span>
          <span>{dataTV.hoten}</span>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.marginSmall}>
          <span>Ngày sinh</span>
          <span>{DateToString(dataTV.ngaysinh)}</span>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.marginSmall}>
          <span>Giới tính</span>
          <span>{dataTV.nu ? "Nữ" : "Nam"}</span>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.marginSmall}>
          <span>Trình độ văn hóa</span>
          <span>{dataTV.tdvanhoa}</span>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.marginSmall}>
          <span>Địa chỉ</span>
          <span>{dataTV.diachi}</span>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.marginSmall}>
          <span>Điện thoại</span>
          <span>{dataTV.dienthoai}</span>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.marginSmall}>
          <span>Địa chỉ email</span>
          <Link to={`/thanhvien/${dataTV.email}`}>
            <span>{dataTV.email}</span>
          </Link>
        </div>
      </div>
      <div className={classes.footer}>
        <Link to="/">
          <CustomButton title="Danh sách thành viên" css={true} />
        </Link>
      </div>
    </div>
  );
}

export default ThanhVien;
