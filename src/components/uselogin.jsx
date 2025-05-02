import { useState } from "react";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e, navigate) => {
    e.preventDefault();
    // Accept ANY login for UI test
    sessionStorage.setItem("isLoggedIn", "true");
    navigate("/admin");
  };

  return { email, password, setEmail, setPassword, handleLogin, error };
};

export default useLogin;
