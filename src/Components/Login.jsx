import { useEffect, useState } from "react";
import "../Components/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  useEffect(() => {
    localStorage.removeItem("login");
  }, []);
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    message: { error: "" },
  });

  const email = "admin@gmail.com";
  const password = "admin@123";

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

    if (loginForm.email.value.trim() === "") {
      setLoginForm((email) => ({
        ...email,
        email: { ...email.email, error: "Email is required" },
      }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email.value)) {
      setLoginForm((email) => ({
        ...email,
        email: { ...email.email, error: "Invalid email" },
      }));
      isValid = false;
    }
    if (loginForm.password.value.trim() === "") {
      setLoginForm((password) => ({
        ...password,
        password: { ...password.password, error: "Password is required" },
      }));
      isValid = false;
    } else if (loginForm.password.value.length < 8) {
      setLoginForm((password) => ({
        ...password,
        password: {
          ...password.password,
          error: "Password must be at least 8 characters long",
        },
      }));
      isValid = false;
    }

    if (
      isValid &&
      loginForm.email.value === email &&
      loginForm.password.value === password
    ) {
      localStorage.setItem("login", true);
      navigate("/dashboard");
    }
    if (
      loginForm.email.value.length > 0 &&
      loginForm.password.value.length > 0
    ) {
      if (
        loginForm.email.value != email &&
        loginForm.password.value != password
      ) {
        setLoginForm({
          ...loginForm,
          message: { error: "Wrong Credential" },
        });
      }
    }
  };
  console.log(loginForm);
  return (
    <div className="form">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div className="fields">
          <input
            type="text"
            name="email"
            value={loginForm.email.value}
            onChange={(e) => changeHandler(e.target.value, "email")}
            placeholder="email"
            autoComplete="off"
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
            autoComplete="off"
          />
          <br />
          <span className="e-m">{loginForm.password.error}</span>{" "}
        </div>
        <button className="btn-primary btn" type="submit">
          LogIn
        </button>
        <br />
        <span className="e-m"> {loginForm.message.error}</span>
      </form>
    </div>
  );
}
