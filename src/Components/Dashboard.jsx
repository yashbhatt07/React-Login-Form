import "../Components/Dashboard.css";
import Nav from "./Nav";
import { useState } from "react";

export default function Dashboard() {
  const [isShow, setIsShow] = useState(false);
  const list = [
    { id: 0, name: "yash bhatt", age: 19 },
    { id: 1, name: "karan", age: 23 },
    { id: 2, name: "mahendra", age: 25 },
    { id: 3, name: "devanshu", age: 22 },
    { id: 4, name: "rahul", age: 18 },
    { id: 5, name: "ram", age: 15 },
    { id: 6, name: "mayank", age: 20 },
    { id: 7, name: "harsh", age: 40 },
  ];

  const toggle = () => {
    setIsShow((n) => !n);
  };

  return (
    <>
      <Nav />
      <button onClick={toggle} className="button">
        {isShow ? "Hide" : "Show"}
      </button>
      {isShow ? (
        <table>
          {list.map((list, index) => {
            return (
              <th id={index}>
                <td>Name :- {list.name}</td>
                <td>Age:- {list.age}</td>
              </th>
            );
          })}
        </table>
      ) : (
        <p>Please Click On The Button To Show Table</p>
      )}
    </>
  );
}
