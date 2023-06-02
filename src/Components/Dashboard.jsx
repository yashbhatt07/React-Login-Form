import "../Components/Dashboard.css";
import { useState } from "react";

export default function Nav() {
  const [isShow, setIsShow] = useState(false);

  const toggle = () => {
    setIsShow((n) => !n);
  };

  return (
    <>
      <button onClick={toggle} className="button">
        {isShow ? "Hide" : "Show"}
      </button>
      {isShow ? (
        <table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </table>
      ) : (
        <p>Please Click On The Button To Show Table</p>
      )}
    </>
  );
}
