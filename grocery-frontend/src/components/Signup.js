import { useState } from "react";
import axios from "axios";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await axios.post("http://localhost:8080/users", {
        name,
        email,
        password
      });

      alert("Signup Successful 🎉");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Error while signup");
    }
  };

  const bgStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e')",
    height: "100vh",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div style={bgStyle}>

      {/* TITLE */}
      <h1 style={{
        color: "white",
        marginBottom: "20px",
        textShadow: "2px 2px 5px black"
      }}>
        Grocery Management System
      </h1>

      {/* BOX */}
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px"
      }}>
        <h2>Signup</h2>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br/><br/>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/><br/>

        <button onClick={signup}>Signup</button>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => window.location.href = "/"}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;