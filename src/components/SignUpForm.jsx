import { useState } from "react";

export default function SignUpForm({ setToken, setIsSubmitted }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setPasswordError("");
    setUsernameError("");

    if (!username && !password) {
        setUsernameError("Username can't be empty");
        setPasswordError("Password can't be empty");
        return;
    }
    if (!username) {
        setUsernameError("Username can't be empty");
        return;
    }
    if (!password) {
        setPasswordError("Password can't be empty");
        return;
    } else if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
        return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      console.log(result);
      setToken(result.token);
      if (result.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {usernameError && <p>{usernameError}</p>}
        <label>
          Password:{" "}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {passwordError && <p>{passwordError}</p>}
        <button>Submit</button>
      </form>
    </div>
  );
}
