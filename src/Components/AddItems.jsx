import { useEffect } from "react";
import PropTypes from "prop-types";
// import * as yup from "yup";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

import SelectItems from "./SelectItems";

function AddItems({
  inputList,
  show,
  handleClose,
  onSubmit,
  data,
  handleSubmit,
  register,
  setValue,
  errors,
  control,
  defaultOptions,
}) {
  // const {
  //   register,
  //   control,
  //   watch,
  //   handleSubmit,
  //   setValue,
  //   // watch
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  //   mode: "onChange",
  // });
  // console.log("🚀 ~ file: AddItems.jsx:47 ~ AddItems ~ errors:", errors);
  // watch();
  // const defaultOptions = [
  //   { value: "Active", label: "Active" },
  //   { value: "In-Active", label: "In-Active" },
  // ];

  useEffect(() => {
    if (inputList.mode !== "edit" && data) {
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("email", data.email);
      setValue("userName", data.userName);
      setValue("status", data.status);
    }
  }, [data]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Items</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="form-modal">
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
