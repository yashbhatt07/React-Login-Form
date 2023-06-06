import "../Components/Dashboard.css";
import Nav from "./Nav";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

export default function Dashboard() {
  const [isShow, setIsShow] = useState(false);
  const [list, setList] = useState([
    // { id: 0, name: "yash bhatt", age: 19 },
    // { id: 1, name: "karan", age: 23 },
    // { id: 2, name: "mahendra", age: 25 },
    // { id: 3, name: "devanshu", age: 22 },
    // { id: 4, name: "rahul", age: 18 },
    // { id: 5, name: "ram", age: 15 },
    // { id: 6, name: "mayank", age: 20 },
    // { id: 7, name: "harsh", age: 40 },
  ]);
  const [show, setShow] = useState(false);
  const [inputList, setInputList] = useState({
    name: "",
    age: "",
  });

  const toggle = () => {
    setIsShow((n) => !n);
  };

  // const [items, setItems] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputHandler = (value, identifier) => {
    console.log(
      "🚀 ~ file: Dashboard.jsx:36 ~ inputHandler ~ identifier:",
      identifier
    );
    console.log("🚀 ~ file: Dashboard.jsx:36 ~ inputHandler ~ value:", value);
    setInputList((inputList) => {
      return {
        ...inputList,
        [identifier]: value,
      };
    });
  };

  const ListOfItems = () => {
    setList((prevList) => [...prevList, inputList]);
  };

  return (
    <>
      <Nav />
      <Button variant="primary d-flex" className="btn-add" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            className="mb-2"
            type="text"
            value={inputList.name}
            placeholder="Please Enter Name"
            onChange={(event) => inputHandler(event.target.value, "name")}
          />
          <Form.Control
            type="number"
            value={inputList.age}
            placeholder="Please Enter Age"
            onChange={(event) => inputHandler(event.target.value, "age")}
          />
          {/* <input
            type="text"
            className="input"
            placeholder="Enter Name"
            value={items.name}
            // onChange={(event) => setitems}
          />
          <input
            type="number"
            className="input"
            placeholder="Enter Age"
            value={items.age}
            onChange={(event) => {
              event.target.value;
            }} */}
          {/* /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" onClick={ListOfItems}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <button onClick={toggle} className="button">
        {isShow ? "Hide" : "Show"}
      </button>
      {isShow ? (
        // <table>
        //   <thead>
        //     <th>Name</th>
        //     <th>Age</th>
        //     {/* <th>Actions</th> */}
        //   </thead>
        //   <tbody>
        //     {list.map(({ name, age }, index) => {
        //       return (
        //         <tr key={index}>
        //           <td>{name}</td>
        //           <td>{age}</td>
        //         </tr>
        //       );
        //     })}
        //   </tbody>
        // </table>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th> Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>Please Click On The Button To Show Table</p>
      )}
    </>
  );
}
