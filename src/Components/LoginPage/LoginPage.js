import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [userName, setUserName] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    let name =
      window.localStorage.getItem("userName") !== null
        ? JSON.parse(window.localStorage.getItem("userName"))
        : null;
    setUserName(name);
  }, []);

  const handlerLogin = () => {
    window.localStorage.setItem("userName", JSON.stringify(userName));
    setUserName(userName);
    if(userName)
      navigate("/chatbot");
    else  
      return;
  };


function onKeyUp(event){
    event.charCode === 13 && handlerLogin()
}

  return (
    <>
      <div className="app-container">
        <input
          type="text"
          placeholder="Enter your name"
          onKeyPress={onKeyUp}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        ></input>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handlerLogin}
        >
          Login
        </button>
      </div>
    </>
  );
}
