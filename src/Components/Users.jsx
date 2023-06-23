import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import Nav from "./Nav";
// import SelectItems from "./SelectItems";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Form, Table, Button } from "react-bootstrap";
import AddItems from "../Components/AddItems";
import AddImage from "./AddImage";
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
        value: "Active",
        label: "Active",
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
  const [showDropMessage, setShowDropMessage] = useState(false);
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
  // const [drop, setDrop] = useState(false);
  const [clickedObject, setClickObject] = useState({});

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
      .nullable() // for handling null value when clearing options via clicking "x"
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
  console.log("🚀 ~ file: AddItems.jsx:47 ~ AddItems ~ errors:", errors);
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

  const onStatus = () => {
    // console.log("clickedObject", clickedObject);
    const { index, status } = clickedObject;

    const setValue = status === "Active" ? "In-Active" : "Active";
    // console.log("setValue", setValue);
    // return;
    const temp = [...list];
    temp[index].status = { value: setValue, label: setValue };
    setList([...temp]);
    closeModal();
  };

  const openModal = (index, status) => {
    console.log(index, status);
    // return;
    const myObj = {
      index: index,
      status: status.value,
    };
    setClickObject(myObj);
    setShowDropMessage(true);
  };
  const closeModal = () => {
    setShowDropMessage(false);
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
                    <img src={selectedImage} width={15} />
                  </td>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email}</td>
                  <td>{data.userName}</td>
                  <td onClick={() => openModal(index, data.status)}>
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
                      <AddImage setSelectedImage={setSelectedImage} />
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
          <Modal show={showDropMessage} onHide={closeModal}>
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
          </Modal>
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
          register={register}
          control={control}
          handleSubmit={handleSubmit}
          setValue={setValue}
          defaultOptions={defaultOptions}
          errors={errors}
        />
      )}
    </>
  );
}
