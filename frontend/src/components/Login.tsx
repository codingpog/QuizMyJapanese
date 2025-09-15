import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios, { AxiosError } from "axios";

function Login() {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const navigate = useNavigate();

async function handleLogin() {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            username: usernameLogin,
            password: passwordLogin,
    })
        if (response.status === 200) {
            navigate("/dashboard");
        }
        alert(response.data)

    } catch (error: AxiosError | any) {
        if (error.response) {
            alert(error.response.data)
        }
    }
}

  return (
    <div className="centered-container">
        <div className="login-frame">
        <h2>Login Page</h2>
        <p>Username:</p>
        <input type="text" name="usernameLogin" onChange={(event) => {
            setUsernameLogin(event.target.value)
        }}/>
        <p>Password:</p>
        <input type="password" name="passwordLogin" onChange={(event) => {
            setPasswordLogin(event.target.value)
        }}/>
        <button className="login-button" type="submit" onClick={handleLogin}>Login</button>
        <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        </div>
    </div>
  );
}

export default Login;
