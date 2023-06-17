import { useEffect,useState } from "react";
import "../Components/Login.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login() {
  const [error, setError] = useState("")
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("required"),
    password: yup
      .string()
      .required('required')
      .min(8,'Password must be at least 8 characters')
      .max(12,'Password must be less then 12 characters')
      
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    localStorage.removeItem("login");
  }, []);
  const navigate = useNavigate();

  // const [loginForm, setLoginForm] = useState({
  //   email: { value: "", error: "" },
  //   password: { value: "", error: "" },
  //   message: { error: "" }
  // });

  // const changeHandler = (value, identifier) => {
  //   setLoginForm(loginForm => {
  //     return {
  //       ...loginForm,
  //       [identifier]: { value, error: "" }
  //     };
  //   });
  //   validation(value, identifier);
  // };

  // const validation = (value, identifier) => {
  //   if (
  //     identifier == "email" &&
  //     value.length > 0 &&
  //     !/\S+@\S+\.\S+/.test(value)
  //   ) {
  //     setLoginForm(email => ({
  //       ...email,
  //       email: { ...email.email, error: "Invalid email" }
  //     }));
  //   }
  //   if (identifier == "password" && value.length > 0 && value.length < 8) {
  //     setLoginForm(password => ({
  //       ...password,
  //       password: {
  //         ...password.password,
  //         error: "Password must be at least 8 characters long"
  //       }
  //     }));
  //   }
  // };
  const validEmail = "admin@gmail.com";
  const validPassword = "admin@123";

  const submit =  (data) => {
    event.preventDefault();

 
     schema.validate(data)
    const { email, password } = data;

 
    if (email === validEmail && password === validPassword) {
      localStorage.setItem("login", true);
      navigate("/dashboard");
    } else {
      // setLoginForm({ ...loginForm, message: { error: "Wrong Credentials" } });
      setError("Invalid Credential")
    }
    
  };

    // let isValid = true;

    // if (loginForm.email.value.trim() === "") {
    //   setLoginForm(email => ({
    //     ...email,
    //     email: { ...email.email, error: "Email is required" }
    //   }));
    //   isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(loginForm.email.value)) {
    //   setLoginForm(email => ({
    //     ...email,
    //     email: { ...email.email, error: "Invalid email" }
    //   }));
    //   isValid = false;
    // }
    // if (loginForm.password.value.trim() === "") {
    //   setLoginForm(password => ({
    //     ...password,
    //     password: { ...password.password, error: "Password is required" }
    //   }));
    //   isValid = false;
    // } else if (loginForm.password.value.length < 8) {
    //   setLoginForm(password => ({
    //     ...password,
    //     password: {
    //       ...password.password,
    //       error: "Password must be at least 8 characters long"
    //     }
    //   }));
    //   isValid = false;
    // }

    // localStorage.setItem("login", true);
    // navigate("/dashboard");

    // if (
    //   isValid &&
    //   loginForm.email.value === email &&
    //   loginForm.password.value === password
    // ) {
    //   localStorage.setItem("login", true);
    //   navigate("/dashboard");
    // }
    // if (
    //   loginForm.email.value.length > 0 &&
    //   loginForm.password.value.length > 0
    // ) {
    //   if (
    //     loginForm.email.value != email &&
    //     loginForm.password.value != password
    //   ) {
    //     setLoginForm({
    //       ...loginForm,
    //       message: { error: "Wrong Credential" }
    //     });
    //   }
    // }
  // console.log(loginForm);
  return (
    <div className="form">
      <h3>Login</h3>
      <form onSubmit={handleSubmit(submit)}>
        <div className="fields">
          <input
            type="text"
            name="email"
            // value={loginForm.email.value}
            // onChange={e => setLoginForm({ ...loginForm, email: { value: e.target.value, error: "" } })}
            placeholder="email"
            autoComplete="off"
            {...register("email")}
          />
          <br />
          <span className="e-m">{errors.email?.message}</span>
        </div>
        <div className="fields">
          <input
            type="password"
            name="password"
            // value={loginForm.password.value}
            // onChange={e => setLoginForm({ ...loginForm, password: { value: e.target.value, error: "" } })}
            placeholder="password"
            autoComplete="off"
            {...register("password")}
          />
          <br />
          <span className="e-m">{errors.password?.message}</span>

          {/* <span className="e-m">{loginForm.password.error}</span>{" "} */}
        </div>
        <button className="btn-primary btn" type="submit">
          LogIn
        </button>
        <br />
        <span className="e-m"> {error}</span>
      </form>
    </div>
  );
}
