import React, { useState } from "react";
import Heading from "../ReusableComponents/Heading";
import InputBox from "../ReusableComponents/InputBox";
import Button from "../ReusableComponents/Button";
import BottomWarning from "../ReusableComponents/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signin() {
  const navigate = useNavigate();


  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div>
      <div className="flex justify-center bg-slate-900 h-screen w-screen">

        <div className="flex flex-col justify-center">

          <div className="bg-white h-max p-2 px-2 w-80 text-center rounded-lg">

            <Heading label="Signin" />

            <InputBox
              label="Email"
              onChange={(e) => {
                console.log("reached here");
                setUserName(e.target.value);
              }}
            />
            <InputBox
              label="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            
            <Button
              label="Signin"
              onClick={async () => {
                console.log("clicked");
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    userName,
                    password,
                  }
                );


                if (response.data.token) {
                  console.log("the response is :" + response.data.token);
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } else {
                  alert("user does not exist");
                }
              }}
            />


            <BottomWarning
              label="Not Signed up yet?"
              buttontext="Signup"
              to="/Signup"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
