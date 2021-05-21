import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core";
import { setDate } from "date-fns";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as yup from "yup";
import testApi from "../../api/testApi";
import CustomButton from "../../components/CustomButton";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomCheckBoxForm from "../../components/Form/CustomCheckBoxForm";
import CustomInputForm from "../../components/Form/CustomInputForm";
import CustomSelectForm from "../../components/Form/CustomSelectForm";
import { isEmpty } from "../../components/Utils/Tools";
import ThanhCong from "./ThanhCong";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    marginTop: 50,
  },
  top: {
    textAlign: "center",
    marginBottom: 40,
    "&>.title": {
      fontSize: "20px",
      fontWeight: "600",
    },
  },
  center: {
    "&>div": {
      "&>span": {
        marginRight: 20,
        minWidth: 100,
      },
    },
  },
  spaceSmall: {
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
  },
  bottom: {
    marginTop: 30,
    display: "flex",
    justifyContent: "space-evenly",
    "&>a": {
      textDecoration: "none",
    },
  },
}));
let checkEmail = {
  status: false,
  email: "",
};
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Vui lòng nhập đúng email")
    .test(
      "check account used",
      "Địa chỉ email đã được sử dụng",
      async (email) => {
        // console.log(checkEmail);
        if (checkEmail.email != email) {
          checkEmail.status = false;
        }
        if (checkEmail.status === false) {
          // console.log(email);
          const res = await testApi.checkEmail({ email: email });
          // console.log(res);
          if (!isEmpty(res?.data)) {
            return false;
          } else {
            checkEmail.status = true;
            checkEmail.email = email;
            return true;
          }
        } else {
          return true;
        }
      }
    ),
  matkhau: yup
    .string()
    .required("Vui lòng nhập password")
    .min(8, "Nhập ít nhất 8 kí tự"),
  retypePassword: yup
    .string()
    .required("Vui lòng nhập lại password")
    .min(8, "Nhập ít nhất 8 kí tự")
    .oneOf([yup.ref("matkhau")], "Password không trùng khớp"),
  hoten: yup.string().required("Vui lòng nhập họ và tên"),
  dienthoai: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .min(10, "Nhập ít nhất 10 số")
    .max(10, "Vui lòng nhập đúng điện thoại")
    .test("check-phone", "Vui lòng nhập đúng điện thoại", (dienthoai) => {
      const regularExp = /(84|0[3|5|7|8|9])+([0-9]{8})/g;
      if (dienthoai.match(regularExp)) {
        return true;
      } else {
        return false;
      }
    }),
  diachi: yup.string().required("Vui lòng chọn địa chỉ"),
  tdvanhoa: yup.string().required("Vui lòng chọn trình độ học vấn"),
});
function Dangki(props) {
  const { push } = useHistory();
  const classes = useStyles();
  const [date, setDate] = useState(new Date("1999-06-22"));
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      matkhau: "",
      retypePassword: "",
      hoten: "",
      ngaysinh: date,
      nu: false,
      tdvanhoa: "",
      diachi: "",
      dienthoai: "",
    },
    resolver: yupResolver(schema),
  });
  const handleOnSubmit = async (value) => {
    console.log(value);
    try {
      const res = await testApi.newMenber(value);
      console.log(res);
      if (!isEmpty(res?.data)) {
        // <ThanhCong data={res.data} />;
        push("/thanhcong", { data: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.root}>
      <form
        className={classes.form}
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <div className={classes.top}>
          <span className="title">Đăng kí thành viên</span>
        </div>
        <div className={classes.center}>
          <div className={classes.spaceSmall}>
            <span>Địa chỉ Email</span>
            <CustomInputForm
              name="email"
              title="Địa chỉ email"
              label="Địa chỉ email"
              form={form}
            />
          </div>
          <div className={classes.spaceSmall}>
            <span>Mật khẩu</span>
            <CustomInputForm
              name="matkhau"
              title="Mật Khẩu"
              label="Mật Khẩu"
              type="password"
              form={form}
            />
          </div>
          <div className={classes.spaceSmall}>
            <span>Nhập lại mật khẩu</span>
            <CustomInputForm
              name="retypePassword"
              title="Nhập lại mật Khẩu"
              label="Nhập lại mật Khẩu"
              type="password"
              form={form}
            />
          </div>
          <div className={classes.spaceSmall}>
            <span>Họ Tên</span>
            <CustomInputForm
              name="hoten"
              title="Họ và tên"
              label="Họ và tên"
              form={form}
            />
          </div>
          <div className={classes.spaceSmall}>
            <span>Ngày sinh</span>
            <CustomDatePicker
              name="ngaysinh"
              value={date}
              onChange={(value) => {
                setDate(value);
                form.setValue("ngaysinh", value);
              }}
            />
          </div>

          <div className={classes.spaceSmall}>
            <span>Giới Tính</span>
            <CustomCheckBoxForm
              form={form}
              name="nu"
              defaultValue={false}
              label="Nữ"
            />
          </div>
          <div className={classes.spaceSmall}>
            <span>Trình độ văn hóa</span>
            <CustomSelectForm
              name="tdvanhoa"
              label="Trình độ văn hóa"
              form={form}
              data={[
                {
                  value: "Tốt nghiệp phổ thông",
                  title: "Tốt nghiệp phổ thông",
                },
                { value: "Cao đẳng", title: "Cao đẳng" },
                { value: "Đại học", title: "Đại học" },
                { value: "Thạc sĩ", title: "Thạc sĩ" },
                { value: "Tiến sĩ", title: "Tiến sĩ" },
              ]}
            />
          </div>
          <div className={classes.spaceSmall}>
            <span>Địa chỉ</span>
            <CustomSelectForm
              name="diachi"
              label="Địa chỉ"
              form={form}
              data={[
                { value: "TP Hồ Chí Minh", title: "TP Hồ Chí Minh" },
                { value: "Đà Nẵng", title: "Đà Nẵng" },
                { value: "Huế", title: "Huế" },
                { value: "Hà Nội", title: "Hà Nội" },
              ]}
            />
          </div>
          <div className={classes.spaceSmall}>
            <span>Điện thoại</span>
            <CustomInputForm
              name="dienthoai"
              label="Điện thoại"
              title="Điện thoại"
              form={form}
              type="number"
            />
          </div>
        </div>
        <div className={classes.bottom}>
          <CustomButton title="Đăng kí" type="submit" css={true} />
          <Link to="/">
            <CustomButton title="Hủy Bỏ" type="submit" css={true} />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Dangki;
