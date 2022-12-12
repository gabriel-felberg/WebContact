import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export const ModalPerfile = ({
  OpenAndCloseModal,
  AxiosRender,
}) => {
  const schemaForm = yup.object().shape({
    name: yup.string().max(30, "Somente dois sobrenomes"),

    password: yup.string().max(10, "Ensira uma senha menor"),

    email1: yup
      .string()
      .max(60, "Ensira um email menor")
      .email("Digite um email válido"),
    email2: yup
      .string()
      .max(60, "Ensira um email menor")
      .email("Digite um email válido"),

    telephone1: yup.string().max(14, "Ensira um telephone menor"),

    telephone2: yup.string().max(14, "Ensira um telephone menor"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
  });
  function onHandleSubmit(data) {
    data = {
      name: data.name,
      email: [data.email1, data.email2],
      telephone: [data.telephone1, data.telephone2],
      password: data.password,
    };
    AxiosRender({
      method: "patch",
      url: `http://localhost:3001/user/${JSON.parse(
        localStorage.getItem("@userId")
      )}`,
      data,
    });
    OpenAndCloseModal();
  }
  const navigate = useNavigate();
  function DeleteUser() {
    AxiosRender({
      method: "delete",
      url: `http://localhost:3001/user/${JSON.parse(
        localStorage.getItem("@userId")
        )}`,
      });
    localStorage.removeItem("@token");
    localStorage.removeItem("@userId");
    navigate("/");
    OpenAndCloseModal();
  }
  return (
    <section>
      <div className="flex font-bold items-center justify-end w-full h-10 bg-violet-800">
        <div className="flex w-44 md:w-72 justify-between items-center ">
          <p className="text-white text-xl">Usuário</p>
          <button
            onClick={OpenAndCloseModal}
            className="flex justify-center items-center font-bold pb-1 rounded-lg w-6 h-6 mr-2 bg-red-400 hover:bg-red-500 border-black border-2"
          >
            x
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="flex flex-col items-center "
      >
        <section className="flex flex-col md:flex-row m-3 gap-5 p-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="Name">Nome completo</label>
            <input
              {...register("name")}
              id="Name"
              className="w-56 h-8 pl-2 border-black border rounded-lg"
            />
            {errors?.name && (
              <span className="error">{errors.name.message}</span>
            )}
            <label htmlFor="Email1">Primeiro Email</label>
            <input
              {...register("email1")}
              className="w-56 h-8 pl-2 border-black border rounded-lg"
            />
            {errors?.email1 && (
              <span className="error">{errors.email1.message}</span>
            )}
            <label htmlFor="Email2">Segundo Email</label>
            <input
              {...register("email2")}
              id="Email2"
              className="w-56 h-8 pl-2 border-black border rounded-lg"
            />
            {errors?.email2 && (
              <span className="error">{errors.email2.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="Password">Password</label>
            <input
              {...register("password")}
              id="Password"
              className="w-56 h-8 pl-2 border-black border rounded-lg"
            />
            {errors?.password && (
              <span className="error">{errors.password.message}</span>
            )}
            <label htmlFor="Telephone1">Primeiro Telephone</label>
            <input
              {...register("telephone1")}
              id="Telephone1"
              className="w-56 h-8 pl-2 border-black border rounded-lg"
            />
            {errors?.telephone1 && (
              <span className="error">{errors.telephone1.message}</span>
            )}
            <label htmlFor="Telephone2">Segundo Telephone</label>
            <input
              {...register("telephone2")}
              id="Telephone2"
              className="w-56 h-8 pl-2 border-black border rounded-lg"
            />
            {errors?.telephone2 && (
              <span className="error">{errors.telephone2.message}</span>
            )}
          </div>
        </section>
        <div className="flex w-full">
          <button className="font-bold rounded-bl-2xl bg-yellow-200 p-2 w-6/12 hover:bg-yellow-300">
            Editar
          </button>
          <button
            onClick={DeleteUser}
            className="font-bold rounded-br-2xl bg-red-400 p-2 w-6/12 hover:bg-red-500"
          >
            Deletar Conta
          </button>
        </div>
      </form>
    </section>
  );
};
