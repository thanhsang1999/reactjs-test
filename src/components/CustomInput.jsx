import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { stringify } from "query-string";

CustomInput.propTypes = {};

function CustomInput(props) {
  const {
    form = {},
    name = "",
    label = "",
    value = "",
    type = "string",
    fullWidth = true,
    multiline = false,
    rows = 1,
  } = props;
  const { control, formState } = form;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value}
      render={({ field }) => (
        <TextField
          variant="outlined"
          label={label}
          type={type}
          fullWidth={fullWidth}
          multiline={multiline}
          rows={rows}
          error={!!formState.errors?.[name]}
          helperText={formState.errors?.[name]?.message}
          {...field}
        />
      )}
    />
  );
}

export default CustomInput;
