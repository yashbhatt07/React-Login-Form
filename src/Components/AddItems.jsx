import { useEffect } from "react";
import PropTypes from "prop-types";
import AddImage from "./AddImage";

import * as yup from "yup";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import SelectItems from "./SelectItems";

function AddItems({
  inputList,
  show,
  onSubmit,
  data,
  defaultOptions,
  handleClose,
  selectedImage,
  setSelectedImage,
  clicked,
  onClicked,
}) {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("FirstName is required")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "Name can only contain Latin letters."
      )
      .min(3, "firstName must be at least 4 characters")
      .max(10, "firstName must be less then 10 characters"),

    lastName: yup
      .string()
      .required("LastName is required")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "Name can only contain Latin letters."
      )
      .min(3, "lastName must be at least 4 characters")
      .max(10, "lastName must be less then 10 characters"),

    email: yup.string().email("Invalid email").required("Email is required"),
    userName: yup
      .string()
      .required("userName is required")
      .min(3, "userName must be at least 4 characters")
      .max(10, "userName must be less then 10 characters"),
    status: yup
      .object()
      .shape({
        label: yup.string().required("status is required (from label)"),
        value: yup.string().required("status is required"),
      })
      .nullable()
      .required("status is required (from outter null check)"),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (inputList.mode === "edit" && data) {
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("email", data.email);
      setValue("userName", data.userName);
      setValue("status", data.status);
    }
  }, [data, inputList.mode, setValue]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Items</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="form-modal">
            <div style={{ marginBottom: "15px" }}>
              {clicked === false ? (
                <AddImage setSelectedImage={setSelectedImage} />
              ) : (
                <img src={selectedImage} width={15} />
              )}
            </div>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    autoFocus
                    placeholder="FirstName"
                    {...register("firstName")}
                  />
                  <span className="e-m">{errors.firstName?.message}</span>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="LastName"
                    {...register("lastName")}
                  />
                  <span className="e-m">{errors.lastName?.message}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <span className="e-m">{errors.email?.message}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="UserName"
                    {...register("userName")}
                  />
                  <span className="e-m">{errors.userName?.message}</span>
                </Form.Group>
              </Col>
              <Col>
                <SelectItems
                  control={control}
                  options={defaultOptions}
                  name="status"
                />
                <br />
                <span className="e-m">{errors.status?.value?.message}</span>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {inputList.mode === "add" ? "Save" : "Update"}
            </Button>
            <br />
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

AddItems.propTypes = {
  inputList: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default AddItems;
