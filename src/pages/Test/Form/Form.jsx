import React, { useState } from "react";
import PropTypes from "prop-types";
import { parse } from "query-string";
import userApi from "../../../api/userApi";
import testApi from "../../../api/testApi";

Form.propTypes = {};

function Form(props) {
  const [dataForm, setDataForm] = useState({
    title: "",
    content: "",
    shortDescription: "",
    categoryCode: "the-thao",
    thumbnail: "",
  });
  const handleOnChangeInput = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await testApi.new(dataForm);
      // const { data } = await testApi.getNew();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>title</span>
        <input type="text" name="title" onChange={handleOnChangeInput} />
        <br />
        <span>content</span>
        <input type="text" name="content" onChange={handleOnChangeInput} />
        <br />
        <input
          type="text"
          name="shortDescription"
          onChange={handleOnChangeInput}
        />
        <br />
        <input type="text" name="thumbnail" onChange={handleOnChangeInput} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Form;
