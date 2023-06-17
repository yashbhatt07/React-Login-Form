import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function AddItems({
  show,
  setInputList,
  ModalHandler,
  inputList,
  ListOfItems,
  handleClose
}) {
  const inputHandler = (value, identifier) => {
    setInputList(inputList => {
      return {
        ...inputList,
        [identifier]: { value, error: "" }
      };
    });
    ModalHandler(value, identifier);
  };
  const handelChange = event => {
    setInputList(status => ({
      ...status,
      status: { ...status.status, value: event.target.value }
    }));
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Items</Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-modal">
          <Row>
            <Col>
              <Form.Control
                className="mb-2"
                type="text"
                autoFocus
                value={inputList.firstName.value}
                placeholder="FirstName"
                onChange={event =>
                  inputHandler(event.target.value, "firstName")
                }
              />
              <span className="e-m">{inputList.firstName.error}</span>
            </Col>
            <Col>
              <Form.Control
                className="mb-2"
                type="text"
                value={inputList.lastName.value}
                placeholder="LastName"
                onChange={event => inputHandler(event.target.value, "lastName")}
              />
              <span className="e-m">{inputList.lastName.error}</span>
            </Col>
          </Row>

          <Form.Control
            className="mb-2"
            type="text"
            value={inputList.email.value}
            placeholder="Email"
            onChange={event => inputHandler(event.target.value, "email")}
          />
          <span className="e-m">{inputList.email.error}</span>

          <Row>
            <Col>
              <Form.Control
                className="mb-2"
                type="text"
                value={inputList.userName.value}
                placeholder="UserName"
                onChange={event => inputHandler(event.target.value, "userName")}
              />
              <span className="e-m">{inputList.userName.error}</span>
            </Col>
            <Col>
              <Form.Select size="lg" onChange={handelChange}>
                {inputList.mode === "add" ? (
                  <>
                    <option disabled selected value={null}>
                      Select Status{" "}
                    </option>
                    <option value="Active">Active</option>
                    <option value="In-active">In-active</option>
                  </>
                ) : (
                  ""
                )}
                {inputList.mode != "add" ? (
                  inputList.status.value == "Active" ? (
                    <>
                      <option selected value="Active">
                        Active
                      </option>
                      <option value="In-active">In-active</option>
                    </>
                  ) : (
                    <>
                      <option value="Active">Active</option>
                      <option selected value="In-active">
                        In-active
                      </option>
                    </>
                  )
                ) : (
                  ""
                )}
              </Form.Select>
              <br />
              <span className="e-m">{inputList.status.error}</span>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={e => ListOfItems(e, inputList.mode)}
          >
            {inputList.mode === "add" ? "Save" : "Edit"}
          </Button>

          <br />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddItems;