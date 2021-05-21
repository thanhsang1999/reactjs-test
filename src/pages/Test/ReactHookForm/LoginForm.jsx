import React from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import userApi from "../../../api/userApi";
import { Checkbox, Input, TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";

LoginForm.propTypes = {};
const schema = yup.object().shape({
  username: yup
    .string()
    .required()
    .test("check account used", "account used ", async (username) => {
      if (username === "sang@gmail.com") {
        return false;
      }
      return true;
    }),
  password: yup
    .string()
    .required()
    .test("check password used", "password used ", async (password) => {
      if (password === "sang") {
        return false;
      }
      return true;
    }),
});
function LoginForm(props) {
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
      number: 0,
    },
    resolver: yupResolver(schema),
  });
  const handleOnSubbmit = async (value) => {
    try {
      const { data } = await userApi.login(value);
      //   console.log(value);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div style={{ marginTop: 20 }}>
      <form onSubmit={form.handleSubmit(handleOnSubbmit)}>
        <CustomInput name="username" label="Username" form={form} />
        <CustomInput
          name="password"
          label="Password"
          type="password"
          form={form}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default LoginForm;
