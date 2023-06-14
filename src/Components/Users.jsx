import "../Components/Users.css";
import Nav from "./Nav";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Pagination from "../Components/Pagination";
import AddItems from "../Components/AddItems";
import DeleteItems from "./DeleteItems";

const formDefaultValues = {
  mode: "add",
  index: null,
  firstName: { value: "", error: "" },
  lastName: { value: "", error: "" },
  userName: { value: "", error: "" },
  email: { value: "", error: "" },
  status: { value: "", error: "" }
};

export default function() {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [showMessaga, setShowMessage] = useState(false);
  const [inputList, setInputList] = useState(formDefaultValues);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, list.length);
  const records = list.slice(startIndex, endIndex);
  const nPage = Math.ceil(list.length / itemsPerPage);

  const handleClose = () => {
    setInputList(formDefaultValues);
    setShow(false);
  };

  console.log(list);
  const changeCpage = id => {
    setCurrentPage(id.selected);
    console.log(id);
  };

  const handleShow = () => {
    setShow(true);
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
      status: item.status
    });
    console.log(editHandler);

    handleShow();
  };

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

  const ModalHandler = (value, identifier) => {
    console.log(value);
    console.log(identifier);

    if (identifier == "firstName" && value.length < 5) {
      setInputList(firstName => ({
        ...firstName,
        firstName: {
          ...firstName.firstName,
          error: "firstName Must Have 5 Characters"
        }
      }));
    }

    if (identifier == "lastName" && value.length < 5) {
      setInputList(lastName => ({
        ...lastName,
        lastName: {
          lastName,
          error: "lastName Must Have 5 Characters"
        }
      }));
    }

    if (
      identifier == "email" &&
      value.length > 0 &&
      !/\S+@\S+\.\S+/.test(value)
    ) {
      setInputList(email => ({
        ...email,
        email: { ...email.email, error: "Invalid email" }
      }));
    }
    if (identifier == "userName" && value.length < 7) {
      setInputList(userName => ({
        ...userName,
        userName: {
          ...userName.userName,
          error: "userName Must Have 7 Characters"
        }
      }));
    }
  };

  const ListOfItems = (event, indentifier = "add") => {
    event.preventDefault();
    let isValid = true;
    if (inputList.firstName.value.trim() === "") {
      setInputList(firstName => ({
        ...firstName,
        firstName: { ...firstName.firstName, error: "firstName is required" }
      }));
      isValid = false;
    } else if (inputList.firstName.value.length < 5) {
      setInputList(firstName => ({
        ...firstName,
        firstName: {
          ...firstName.firstName,
          error: "firstName Must Have 5 Characters"
        }
      }));
      isValid = false;
    }
    if (inputList.lastName.value.trim() === "") {
      setInputList(lastName => ({
        ...lastName,
        lastName: { ...lastName.lastName, error: "lastName is required" }
      }));
      isValid = false;
    } else if (inputList.lastName.value.length < 5) {
      setInputList(lastName => ({
        ...lastName,
        lastName: {
          ...lastName.lastName,
          error: "lastName Must Have 5 Characters"
        }
      }));
      isValid = false;
    }
    if (inputList.email.value.trim() === "") {
      setInputList(email => ({
        ...email,
        email: { ...email.email, error: "Email is required" }
      }));
      isValid = false;
    } else if (
      inputList.email.value.length > 0 &&
      !/\S+@\S+\.\S+/.test(inputList.email.value)
    ) {
      setInputList(email => ({
        ...email,
        email: { ...email.email, error: "Invalid email" }
      }));
      isValid = false;
    }
    if (inputList.userName.value.trim() === "") {
      setInputList(userName => ({
        ...userName,
        userName: { ...userName.userName, error: "userName is required" }
      }));
      isValid = false;
    }
    if (!inputList.status.value) {
      setInputList(status => ({
        ...status,
        status: {
          ...status.status,
          error: "Please Select One Option"
        }
      }));
      isValid = false;
    }
    if (isValid == true) {
      if (indentifier === "add") {
        setList(prevList => [...prevList, inputList]);
      } else {
        setList(() => {
          const clonedList = [...list];
          const itemIndex = startIndex + inputList.index;
          clonedList[itemIndex] = {
            firstName: inputList.firstName,
            lastName: inputList.lastName,
            email: inputList.email,
            userName: inputList.userName,
            status: inputList.status
          };
          return clonedList;
        });
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

                  <DeleteItems
                    showMessaga={showMessaga}
                    item={item}
                    index={index}
                    setList={setList}
                    handleClose={handleClose}
                    setShowMessage={setShowMessage}
                  />
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
      <Pagination changeCpage={changeCpage} nPage={nPage} />
      <AddItems
        show={show}
        setShow={setShow}
        ModalHandler={ModalHandler}
        setInputList={setInputList}
        inputList={inputList}
        ListOfItems={ListOfItems}
      />
    </>
  );
}
