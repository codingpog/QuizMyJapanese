import { useState } from "react";
import {Link} from "react-router-dom"
import axios, { AxiosError } from "axios";

function Signup(): React.JSX.Element {
  const [usernameReqister, setUsernameRegister] = useState<string>("");
  const [passwordRegister, setPasswordRegister] = useState<string>("");

  async function handleSignup() {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
            username: usernameReqister,
            password: passwordRegister,
    })
        alert(response.data);
    } catch (error: AxiosError | any) {
        if (error.response) {
            alert(error.response.data)
        }
    }
  }

  return (
    <div className="centered-container">
        <div className="login-frame">
            <h2>Signup Page</h2>
            <p>Username:</p>
            <input type="text" name="usernameRegister" onChange={(event) => {
                setUsernameRegister(event.target.value)
            }}/>
            <p>Password:</p>
            <input type="password" name="passwordRegister" onChange={(event) => {
                setPasswordRegister(event.target.value)
            }}/>
            <button className="login-button" type="submit" onClick={handleSignup}>Register</button>
            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    </div>
  );
}

export default Signup;
