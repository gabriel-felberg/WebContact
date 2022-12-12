import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Login } from "./login";
import { Register } from "./regiter";

export const LoginAndRegister = () => {
  const [form, setForm] = useState({});
  const [home, setHome] = useState(true);
  const navigate = useNavigate();
  function ResponseOfAPI(form) {
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
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        })
        .catch(() => {
          toast.error("Credenciais incorretas", {
            position: "top-right",
            autoClose: 2500,
          });
        });
    } else if (form.type === "Register") {
      delete form.type;
      axios
        .post("http://localhost:3001/user/", { ...form, type: undefined })
        .then(() => {
          toast.success("Cadastro realizado", {
            position: "top-right",
            autoClose: 2500,
          });
        })
        .catch(() => {
          toast.error("Email ou telephone já cadastrados", {
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
    <section className="flex justify-end  h-screen ">
      <div className="md:image bg-no-repeat bg-cover  md:w-7/12" />
      <div className="flex flex-col items-center justify-center gradient text-white bg-blue-700 w-full md:w-5/12 border-black border-4">
        <h1 className="text-4xl font-bold">Web Contact</h1>
        <div className="flex flex-col justify-center h-4/6 ">
          {home ? (
            <section className="flex flex-col justify-around h-96">
              <Login setForm={setForm} />
              <div className="flex flex-col mt-32">
                <h3 className="text-lg ">Não possui conta?</h3>
                <button
                  onClick={() => setHome(!home)}
                  className="bg-blue-400 hover:bg-blue-500 text-black p-1 rounded-lg font-bold border border-black "
                >
                  Cadastre-se
                </button>
              </div>
            </section>
          ) : (
            <section className="flex flex-col justify-around h-96">
              <Register setForm={setForm} />
              <div className="flex flex-col mt-5">
                <h3 className="text-lg ">Já possui conta?</h3>
                <button
                  onClick={() => setHome(!home)}
                  className={
                    "bg-blue-300 hover:bg-blue-400 text-black p-1 rounded-lg font-bold border border-black"
                  }
                >
                  Login
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};
