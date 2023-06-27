import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import Nav from "./Nav";
import DummyProfile from "../Components/DummyProfile.webp";
import { Modal, Form, Table, Button } from "react-bootstrap";
import AddItems from "../Components/AddItems";
// import AddImage from "./AddImage";
import Pagination from "./Pagination";
import Blue from "../Components/blue.png";
import Green from "../Components/green.png";
import "../Components/Users.css";
export default function Users() {
  const [list, setList] = useState([
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "In-Active",
        label: "In-Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "In-Active",
        label: "In-Active",
      },
    },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
    // {
    //   firstName: "qwqwqwqw",
    //   lastName: "wdwdwdw",
    //   email: "d@gamil.com",
    //   userName: "yyyyty",
    //   status: {
    //     value: "Active",
    //     label: "Active",
    //   },
    // },
  ]);
  const [show, setShow] = useState(false);
  const [showMessaga, setShowMessage] = useState(false);
  // const [showDropMessage, setShowDropMessage] = useState(false);
  const [inputList, setInputList] = useState({ mode: "add", index: null });
  console.log(list);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const records = list.slice(startIndex, endIndex);
  const nPage = Math.ceil(list.length / itemsPerPage);
  console.log("🚀 ~ file: Users.jsx:184 ~ Users ~ nPage:", nPage);
  const [sortOrderF, setSortOrderF] = useState("asc");
  const [sortOrderL, setSortOrderL] = useState("asc");
  const [selectedImage, setSelectedImage] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [file, setFile] = useState();
  const defaultOptions = [
    { value: "Active", label: "Active" },
    { value: "In-Active", label: "In-Active" },
  ];
  const SortingFName = useCallback(() => {
    if (sortOrderF === "asc") {
      list.sort((a, b) => a.firstName.localeCompare(b.firstName));
      setSortOrderF("desc");
    } else {
      list.sort((a, b) => b.firstName.localeCompare(a.firstName));
      setSortOrderF("asc");
    }
    setList([...list]);
  }, [list, sortOrderF]);

  const SortingLName = useCallback(() => {
    if (sortOrderL === "asc") {
      list.sort((a, b) => a.lastName.localeCompare(b.lastName));
      setSortOrderL("desc");
    } else {
      list.sort((a, b) => b.lastName.localeCompare(a.lastName));
      setSortOrderL("asc");
    }
    setList([...list]);
  }, [list, sortOrderL]);

  const onStatus = (index) => {
    const updatedList = [...list];
    const currentStatus = updatedList[index].status.value;
    const newStatus = currentStatus === "Active" ? "In-Active" : "Active";
    updatedList[index].status = { value: newStatus, label: newStatus };
    setList(updatedList);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const changeCpage = (id) => {
    setCurrentPage(id.selected);
  };

  const handleShow = () => {
    setShow(true);
    setInputList({
      mode: "add",
      index: 0,
    });
  };
  const handleClose = () => {
    setInputList(inputList);
    setShow(false);
  };
  const messageClose = () => {
    setShowMessage(false);
  };
  const messageDelete = () => {
    setShowMessage(true);
  };
  const editHandler = (data, index) => {
    setInputList({
      mode: "edit",
      index,
    });

    setShow(true);
  };

  const deleteHandler = (index) => {
    setList((oldValue) => {
      const updatedList = oldValue.filter((id) => index !== id);
      if (updatedList.length % itemsPerPage === 0) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
      return updatedList;
    });
    messageClose();
  };

  const onSubmit = (data) => {
    const newList = _.cloneDeep(list);
    if (inputList.mode === "add") {
      newList.push(data);
    } else {
      newList[startIndex + inputList.index] = data;
    }

    setList(() => {
      return newList;
    });

    setClicked(true);
    handleClose();
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
            <th>Profile</th>
            <th onClick={SortingFName}>
              First Name{" "}
              {sortOrderF === "asc" ? (
                <img src={Blue} alt="Arrow" width={15} />
              ) : (
                <img src={Green} alt="Arrow" width={15} />
              )}
            </th>
            <th onClick={SortingLName}>
              Last Name{" "}
              {sortOrderL === "asc" ? (
                <img src={Blue} alt="Arrow" width={15} />
              ) : (
                <img src={Green} alt="Arrow" width={15} />
              )}
            </th>
            <th>Email</th>
            <th>Username</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((data, index) => {
              return (
                <tr key={index}>
                  {records.length > 0}
                  <td>{index + startIndex + 1}</td>
                  <td>
                    <span>
                      {clicked ? (
                        <img src={selectedImage} width={45} />
                      ) : (
                        <img src={DummyProfile} width={45} />
                      )}
                    </span>
                  </td>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email}</td>
                  <td>{data.userName}</td>
                  <td>
                    <input
                      className={`radio__toggle ${
                        data.status === "In-Active" ? "inactive" : "active"
                      }`}
                      id="radio__toggle1"
                      type="checkbox"
                      onClick={() => onStatus(index)}
                    />
                    {data.status.value}
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-secondary mr-2"
                        onClick={() => editHandler(data, index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => messageDelete(data, index)}
                      >
                        Delete
                      </button>
                    </div>
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
                        onClick={() => deleteHandler(data, index)}
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </tr>
              );
            })
          ) : (
            <tr>
              <th colSpan={8} className="error">
                No Data Found
              </th>
            </tr>
          )}
          {/* <Modal show={showDropMessage} onHide={closeModal}>
            <Modal.Header>
              <Modal.Title>Change Status</Modal.Title>
            </Modal.Header>
            <Modal.Body className="form-modal">
              <Form.Label>Do You Want To Change Status?</Form.Label>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary p-3" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary p-3" onClick={() => onStatus()}>
                Update
              </Button>
            </Modal.Footer>
          </Modal> */}
        </tbody>
      </Table>
      <Pagination changeCpage={changeCpage} nPage={nPage} />
      {show && (
        <AddItems
          inputList={inputList}
          show={show}
          handleClose={handleClose}
          onSubmit={onSubmit}
          data={inputList.mode === "edit" ? records[inputList.index] : null}
          defaultOptions={defaultOptions}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setFiles={setFile}
          clicked={clicked}
        />
      )}
    </>
  );
}
