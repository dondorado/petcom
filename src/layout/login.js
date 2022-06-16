import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://dentaldriversteam.herokuapp.com/api/auth/login",
        { username, password }
      );
      if (response.data) {
        setUsername("");
        setPassword("");
        history.push("/report");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username...</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
