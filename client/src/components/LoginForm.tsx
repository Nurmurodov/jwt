import React, {FC, useContext, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {store} = useContext(Context)
  return (
    <div>
      <input
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        value={email}
        placeholder={"Email"}
        type="text"/>
      <input
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        value={password}
        placeholder={"Password"}
        type="password"/>
      <button
        onClick={() => {
          store.login(email,password)
        }}>
        Log in
      </button>
      <button
        onClick={() => {
          store.singUp(email,password)
        }}>
        Sign up
      </button>
    </div>
  )
}

export default observer(LoginForm)

