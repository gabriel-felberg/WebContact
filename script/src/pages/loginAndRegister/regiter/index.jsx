import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const Register = ({setForm}) => {
  const schemaForm = yup.object().shape({
    name: yup.string().min(6, "Digite seu nome completo").required("Digite seu nome completo"),
    email: yup
      .array()
      .required("Digite seus e-mails")
      .email("Digite um e-mail válido"),
    telefone: yup.array().required("Digite seus telefones"),
    password: yup.string().min(6, "A senha deve ter mais que 6 caracteres").required("Digite sua senha"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
  });
  const onHandleSubmit = (formRegister) => setForm({...formRegister, type:"Register"});
  return (
    <section className="flex flex-col items-center space-y-5">
      <h3 className="font-bold text-2xl">Registre-se</h3>
      <form className="flex flex-col space-y-5 items-center" onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="Nome">Nome Completo</label>
          <input id="Nome" {...register("name")}/>
          {errors.name && (
            <span className="error">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Email">Emails</label>
          <input id="Email" {...register("email")}/>
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Telefones">Telefones</label>
          <input id="Telefones" {...register("telefone")}/>
          {errors.telefone && (
            <span className="error">{errors.telefone.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Password">Password</label>
          <input id="Password" {...register("password")}/>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <button className="w-32 items-center bg-red-400">Login</button>
      </form>{" "}
    </section>
  );
};
