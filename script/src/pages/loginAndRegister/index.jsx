import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { Login } from "./login";
import { Register } from "./regiter";

export const LoginAndRegister = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate()
  function ResponseOfAPI(form) {
    console.log(form);
    if (form.type === "Login") {
      delete form.type;
      axios
        .post("http://localhost:3001/", form)
        .then((response) => {
          localStorage.setItem("@token", JSON.stringify(response.data.token));
          localStorage.setItem("@userId", JSON.stringify(response.data.id));
          toast.success("login realizado com sucesso", {
            position: "top-right",
            autoClose: 2500,
          });
          setTimeout(()=>{
            navigate("/home")
          },3000)
        })
        .catch(() => {
          toast.error("Credenciais incorretas", {
            position: "top-right",
            autoClose: 2500,
          });
        });
    } else if (form.type === "Register") {
      delete form.type;
      console.log(form);
      axios
        .post("http://localhost:3001/user/", { ...form, type: undefined })
        .then(() => {
          toast("Cadastro realizado", {
            position: "top-right",
            autoClose: 2500,
          });
        })
        .catch(() => {
          toast.error("Email ou telefone já cadastrados", {
            position: "top-right",
            autoClose: 2500,
          });
        });
    }
  }

  useEffect(() => {
    if (form !== {}) {
      ResponseOfAPI(form);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  return (
    <section className="bg-gray-400 h-96 w-9/12 flex flex-row gap-x-32 justify-center items-center">
      <Login setForm={setForm} />
      <Register setForm={setForm} />
    </section>
  );
};
