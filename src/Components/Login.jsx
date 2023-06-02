import { useState } from "react";
import "../Components/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  // const [name, setName] = useState({
  //   value: "",
  //   error: "",
  // });
  // const [email, setEmail] = useState({
  //   value: "",
  //   error: "",
  // });
  // const [password, setPassword] = useState({
  //   value: "",
  //   error: "",
  // });

  const [loginForm, setLoginForm] = useState({
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });
  const changeHandler = (value, identifier) => {
    setLoginForm((loginForm) => {
      return {
        ...loginForm,
        [identifier]: { value, error: "" },
      };
    });
    validation(value, identifier);
  };

  const validation = (value, identifier) => {
    if (identifier == "name" && value.length > 0 && value.length < 5) {
      setLoginForm((value) => ({
        ...value,
        name: {
          ...value.name,
          error: "name must be at least 5 characters long",
        },
      }));
    }
    if (
      identifier == "email" &&
      value.length > 0 &&
      !/\S+@\S+\.\S+/.test(value)
    ) {
      setLoginForm((email) => ({
        ...email,
        email: { ...email.email, error: "Invalid email" },
      }));
    }
    if (identifier == "password" && value.length > 0 && value.length < 8) {
      setLoginForm((password) => ({
        ...password,
        password: {
          ...password.password,
          error: "Password must be at least 8 characters long",
        },
      }));
    }
  };

  const submit = (event) => {
    event.preventDefault();
    let isValid = true;
    if (loginForm.name.value.trim() === "") {
      setLoginForm((value) => ({
        ...value,
        name: { ...value.name, error: "Name is required" },
      }));
      isValid = false;
    } else if (loginForm.name.value.length < 5) {
      setLoginForm((value) => ({
        ...value,
        name: {
          name,
          error: "name must be at least 5 characters long",
        },
      }));
      isValid = false;
    }

    if (loginForm.email.value.trim() === "") {
      setLoginForm((email) => ({
        ...email,
        email: { email, error: "Email is required" },
      }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email.value)) {
      setLoginForm((email) => ({
        ...email,
        email: { email, error: "Invalid email" },
      }));
      isValid = false;
    }
    if (loginForm.password.value.trim() === "") {
      setLoginForm((password) => ({
        ...password,
        password: { password, error: "Password is required" },
      }));
      isValid = false;
    } else if (loginForm.password.value.length < 8) {
      setLoginForm((password) => ({
        ...password,
        password: {
          password,
          error: "Password must be at least 8 characters long",
        },
      }));
      isValid = false;
    }
    if (isValid) {
      navigate("/Dashboard");
    }
  };
  return (
    <div className="form">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div className="fields">
          <input
            type="text"
            name="name"
            value={loginForm.name.value}
            onChange={(e) => changeHandler(e.target.value, "name")}
            placeholder="Name"
          />
          <p>
            <span className="e-m">{loginForm.name.error}</span>{" "}
          </p>
        </div>
        <div className="fields">
          <input
            type="text"
            name="email"
            value={loginForm.email.value}
            onChange={(e) => changeHandler(e.target.value, "email")}
            placeholder="email"
          />
          <br />
          <span className="e-m">{loginForm.email.error}</span>
        </div>
        <div className="fields">
          <input
            type="password"
            name="password"
            value={loginForm.password.value}
            onChange={(e) => changeHandler(e.target.value, "password")}
            placeholder="password"
          />
          <br />
          <span className="e-m">{loginForm.password.error}</span>{" "}
        </div>

        <button className="btn" type="submit">
          LogIn
        </button>
      </form>
    </div>
  );
}
