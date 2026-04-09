import axios from "axios";
import React from "react";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://e-tuition-server-iota.vercel.app/",
  withCredentials: true,
});

const useAxios = () => {
  return instance;
};

export default useAxios;
