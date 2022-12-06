import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CounterContext } from "../../../Providers/counter";

export const Register = ({ setForm }) => {
  const {Transform} = useContext(CounterContext)
  const schemaForm = yup.object().shape({
    name: yup
      .string()
      .min(6, "Digite seu nome completo")
      .required("Digite seu nome completo"),
    email: yup.string().required("Digite seus e-mails"),
    telefone: yup.string().required("Digite seus telefones"),
    password: yup
      .string()
      .min(6, "A senha deve ter mais que 6 caracteres")
      .required("Digite sua senha"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
  });
  function onHandleSubmit(formRegister) {
    console.log(setForm);
    setForm({
      name: formRegister.name,
      telefone: Transform(formRegister.telefone),
      email: Transform(formRegister.email),
      password: formRegister.password,
      type: "Register",
    });
  }
  return (
    <section className="flex flex-col items-center space-y-5">
      <h3 className="font-bold text-2xl">Registre-se</h3>
      <form
        className="flex flex-col space-y-5 items-center"
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="Nome">Nome Completo</label>
          <input id="Nome" {...register("name")} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Email">Email</label>
          <input id="Email" {...register("email")} />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Telefones">Telefone</label>
          <input id="Telefones" {...register("telefone")} />
          {errors.telefone && (
            <span className="error">{errors.telefone.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Password">Password</label>
          <input id="Password" {...register("password")} />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <button className="w-32 items-center bg-red-400">Registro</button>
      </form>{" "}
    </section>
  );
};
