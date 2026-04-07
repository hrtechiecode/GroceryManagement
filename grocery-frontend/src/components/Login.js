import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (email === "admin@gmail.com") {
      localStorage.setItem("role", "admin");
    } else {
      localStorage.setItem("role", "user");
    }

    window.location.href = "/dashboard";
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

      {/* TOP TITLE */}
      <h1 style={{
        color: "white",
        marginBottom: "20px",
        textShadow: "2px 2px 5px black"
      }}>
        Grocery Management System
      </h1>

      {/* LOGIN BOX */}
      <div style={{
        background: "grey",
        padding: "30px",
        borderRadius: "10px",
        textAlign: "center"
      }}>
        <h2>Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/><br/>

        <button onClick={login}>Login</button>

        {/* ✅ SIGNUP LINK INSIDE RETURN */}
        <p style={{ marginTop: "15px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => window.location.href = "/signup"}
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;