import "../Components/Users.css";
import Nav from "./Nav";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";

const formDefaultValues = {
  mode: "add",
  index: null,
  firstName: { value: "dfffdf", error: "" },
  lastName: { value: "fdfdfdfdf", error: "" },
  userName: { value: "dfdfd@ksd.com", error: "" },
  email: { value: "fdfd@ksd.com", error: "" },
  status: { value: "", error: "" },
};

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [showMessaga, setShowMessage] = useState(false);
  const [inputList, setInputList] = useState(formDefaultValues);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const records = list.slice(startIndex, endIndex);
  const nPage = Math.ceil(list.length / itemsPerPage);

  console.log(list);
  const changeCpage = (id) => {
    setCurrentPage(id.selected);
    console.log(id);
  };

  const handleClose = () => {
    setInputList(formDefaultValues);
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const messageClose = () => {
    setShowMessage(false);
  };
  const messageDelete = () => {
    setShowMessage(true);
  };
  const editHandler = (item, index) => {
    setInputList({
      ...item,
      mode: "edit",
      index,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      userName: item.userName,
      status: item.status,
    });
    console.log(editHandler);

    handleShow();
  };

  const deleteHandler = (index) => {
    setList((oldValue) => {
      return oldValue.filter((id) => index !== id);
    });
    messageClose();
  };

  const inputHandler = (value, identifier) => {
    setInputList((inputList) => {
      return {
        ...inputList,
        [identifier]: { value, error: "" },
      };
    });
    ModalHandler(value, identifier);
  };

  const ModalHandler = (value, identifier) => {
    console.log(value);
    console.log(identifier);

    if (identifier == "firstName" && value.length < 5) {
      setInputList((firstName) => ({
        ...firstName,
        firstName: {
          ...firstName.firstName,
          error: "firstName Must Have 5 Characters",
        },
      }));
    }

    if (identifier == "lastName" && value.length < 5) {
      setInputList((lastName) => ({
        ...lastName,
        lastName: {
          lastName,
          error: "lastName Must Have 5 Characters",
        },
      }));
    }

    if (
      identifier == "email" &&
      value.length > 0 &&
      !/\S+@\S+\.\S+/.test(value)
    ) {
      setInputList((email) => ({
        ...email,
        email: { ...email.email, error: "Invalid email" },
      }));
    }
    if (identifier == "userName" && value.length < 7) {
      setInputList((userName) => ({
        ...userName,
        userName: {
          ...userName.userName,
          error: "userName Must Have 7 Characters",
        },
      }));
    }
  };
  const handelChange = (event) => {
    setInputList((status) => ({
      ...status,
      status: { ...status.status, value: event.target.value },
    }));
  };

  const ListOfItems = (event, indentifier = "add") => {
    event.preventDefault();
    let isValid = true;
    if (inputList.firstName.value.trim() === "") {
      setInputList((firstName) => ({
        ...firstName,
        firstName: { ...firstName.firstName, error: "firstName is required" },
      }));
      isValid = false;
    } else if (inputList.firstName.value.length < 5) {
      setInputList((firstName) => ({
        ...firstName,
        firstName: {
          ...firstName.firstName,
          error: "firstName Must Have 5 Characters",
        },
      }));
      isValid = false;
    }
    if (inputList.lastName.value.trim() === "") {
      setInputList((lastName) => ({
        ...lastName,
        lastName: { ...lastName.lastName, error: "lastName is required" },
      }));
      isValid = false;
    } else if (inputList.lastName.value.length < 5) {
      setInputList((lastName) => ({
        ...lastName,
        lastName: {
          ...lastName.lastName,
          error: "lastName Must Have 5 Characters",
        },
      }));
      isValid = false;
    }
    if (inputList.email.value.trim() === "") {
      setInputList((email) => ({
        ...email,
        email: { ...email.email, error: "Email is required" },
      }));
      isValid = false;
    } else if (
      inputList.email.value.length > 0 &&
      !/\S+@\S+\.\S+/.test(inputList.email.value)
    ) {
      setInputList((email) => ({
        ...email,
        email: { ...email.email, error: "Invalid email" },
      }));
      isValid = false;
    }
    if (inputList.userName.value.trim() === "") {
      setInputList((userName) => ({
        ...userName,
        userName: { ...userName.userName, error: "userName is required" },
      }));
      isValid = false;
    }
    if (!inputList.status.value) {
      setInputList((status) => ({
        ...status,
        status: {
          ...status.status,
          error: "Please Select One Option",
        },
      }));
      isValid = false;
    }
    if (isValid == true) {
      if (indentifier === "add") {
        setList((prevList) => [...prevList, inputList]);
      } else {
        const clonedList = records;
        clonedList[inputList.index] = {
          firstName: inputList.firstName,
          lastName: inputList.lastName,
          email: inputList.email,
          userName: inputList.userName,
          status: inputList.status,
        };

        setList(clonedList);
      }
      handleClose();
    }
  };

  return (
    <>
      <Nav />
      <Button
        variant="dark btn-add"
        onClick={handleShow}
        style={{ display: "flex", marginLeft: "auto" }}
      >
        Add New
      </Button>
      <Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {records.length > 0 ? (
          <tbody>
            {records.map((item, index) => {
              return (
                <tr key={index}>
                  {records.length > 0}
                  <td>{index + startIndex + 1}</td>
                  <td>{item.firstName.value}</td>
                  <td>{item.lastName.value}</td>
                  <td>{item.email.value}</td>
                  <td>{item.userName.value}</td>
                  <td>{item.status.value}</td>
                  <td>
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={() => editHandler(item, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => messageDelete(item, index)}
                    >
                      Delete
                    </button>
                  </td>

                  <Modal show={showMessaga} onHide={messageClose}>
                    <Modal.Header>
                      <Modal.Title>Delete Items</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="form-modal">
                      <Form.Label>Do You Want To Delete This Item?</Form.Label>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button variant="secondary p-3" onClick={messageClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary p-3"
                        onClick={() => deleteHandler(item, index)}
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <th colSpan={7} className="error">
            No Data Found
          </th>
        )}
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={changeCpage}
        pageCount={nPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="paginationBttns"
        previousClassName="previousBttns"
        nextLinkClassName="nextBttns"
        disabledClassName="paginationDisabled"
        activeClassName="paginationActive"
      />
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
                onChange={(event) =>
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
                onChange={(event) =>
                  inputHandler(event.target.value, "lastName")
                }
              />
              <span className="e-m">{inputList.lastName.error}</span>
            </Col>
          </Row>

          <Form.Control
            className="mb-2"
            type="text"
            value={inputList.email.value}
            placeholder="Email"
            onChange={(event) => inputHandler(event.target.value, "email")}
          />
          <span className="e-m">{inputList.email.error}</span>

          <Row>
            <Col>
              <Form.Control
                className="mb-2"
                type="text"
                value={inputList.userName.value}
                placeholder="UserName"
                onChange={(event) =>
                  inputHandler(event.target.value, "userName")
                }
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
                {/* <option value="Active">Active</option> */}
                {/* <option value="In-Active"> In-active</option> */}
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
            onClick={(e) => ListOfItems(e, inputList.mode)}
          >
            {inputList.mode === "add" ? "Save" : "Edit"}
          </Button>

          <br />
        </Modal.Footer>
      </Modal>
    </>
  );
}
