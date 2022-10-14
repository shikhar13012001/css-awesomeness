import BASE_URL_e from "../config/server";
import { toast } from "react-toastify";
const BASE_URL= `${BASE_URL_e}/user`;
const LocalToken = (data) => {
  // save in localsotrage
  localStorage.setItem("token", data.accessToken); 
};
const removeToken = () => {
  localStorage.removeItem("token");
};
export const RegisterHandler = async ({
  name,
  email,
  password,
  history,
  key,
}) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }); 
   if(res.status!==200){
    return null;
   }
  const data = await res.json();
   
  history.push("/login");

  return data;
};

export const LoginHandler = async ({
    email,
    password,
    history,
    key,
    setAuth
  }) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.status === 200) {
      const data = await res.json();
      LocalToken(data);
      history.push("/");
      setAuth(data);
      return data;
    } else {
      
      return null;
    }
  };
  

export const logoutHandler = async () => {
  // const res = await fetch(`${BASE_URL}/logout`, {
  //   method: "GET",
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data = await res.json();
  removeToken();
  window.location.href = "/"; 
}

export const fetchUser = async () => {
  const res = await fetch(`${BASE_URL}/fetchuser`, {
    method: "GET",
    credentials: "include",
    headers: {
      "token":`Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}