import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { isEmpty } from "../../components/Utils/Tools";
const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "'Open Sans', sans-serif",
    marginTop: 30,
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    "&>span": {
      fontSize: 25,
      fontWeight: 600,
    },
    marginBottom: 30,
  },
  content: {
    marginBottom: 30,
  },
  footer: {
    marginTop: 30,

    "&>a": { textDecoration: "none" },
  },
}));
function ThanhCong(props) {
  const classes = useStyles();
  const { push } = useHistory();
  const { location } = props;
  if (isEmpty(location.state?.data)) {
    push("/");
  }
  const [dataUser, setDataUser] = useState(location.state?.data);
  console.log(dataUser);
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <span>Chào mừng bạn {dataUser.hoten}</span>
      </div>
      <div className={classes.content}>
        <span>
          Bạn có thể đăng nhập với tên: <b>{dataUser.email}</b> và mật khẩu là:{" "}
          <b>{dataUser.matkhau}</b>
        </span>
      </div>
      <div>
        <span>Cam on bạn đã đăng kí!</span>
      </div>
      <div className={classes.footer}>
        <Link to="/">
          <CustomButton css={true} title="Đóng" />
        </Link>
      </div>
    </div>
  );
}

export default ThanhCong;
