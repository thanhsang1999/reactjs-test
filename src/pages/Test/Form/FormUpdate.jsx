import React, { useState } from "react";
import testApi from "../../../api/testApi";

FormUpdate.propTypes = {};

function FormUpdate(props) {
  const [dataForm, setDataForm] = useState({
    id: "",
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
      const { data } = await testApi.updateNew(dataForm.id, dataForm);
      // const { data } = await testApi.getNew();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>id</span>
        <input type="text" name="id" onChange={handleOnChangeInput} />
        <br />
        <span>title</span>
        <input type="text" name="title" onChange={handleOnChangeInput} />
        <br />
        <span>content</span>
        <input type="text" name="content" onChange={handleOnChangeInput} />
        <br />
        <span>shortDescription</span>
        <input
          type="text"
          name="shortDescription"
          onChange={handleOnChangeInput}
        />
        <br />
        <span>thumbnail</span>
        <input type="text" name="thumbnail" onChange={handleOnChangeInput} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default FormUpdate;
