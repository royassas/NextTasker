import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import CategoryService from "../services/categories.service";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { isHexColor } from "validator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons'

const validColor = (value) => {
  if (!isHexColor(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid color HEX.
      </div>
    );
  }
};
const vdescription = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The description must be between 3 and 20 characters.
      </div>
    );
  }
};

const ModAddTask = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [description, setDescription] = useState("");
  const [color, setColor] = useState('#aabbee');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const handleAddCat = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      CategoryService.addCategory(description, color).then(
        (response) => {
          
          setMessage(response.data.message);
          setSuccessful(true);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    } else {
      setLoading(false);
      setSuccessful(true);      
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
      <FontAwesomeIcon icon={faBarsProgress} size="4x" />

        <Form onSubmit={handleAddCat} ref={form}>
        {!successful && (
          <div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Input
              type="text"
              placeholder="Please enter Category Name"
              className="form-control"
              name="description"
              value={description}
              onChange={onChangeDescription}
              validations={[vdescription]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="color">Color</label>
            <HexColorPicker
              name="color"
              color={color}
              onChange={setColor}
              validations={[validColor]}
            />
            <HexColorInput
              name="colorinput"
              color={color}
              onChange={setColor}
              validations={[validColor]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Add Category</span>
            </button>
          </div>
          </div>
        )}
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default ModAddTask;