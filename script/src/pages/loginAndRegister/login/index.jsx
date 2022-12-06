import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login = ({ setForm }) => {
  const schemaForm = yup.object().shape({
    email: yup
      .string()
      .required("Digite seu e-mail")
      .email("Digite um e-mail válido"),
    password: yup.string().required("Digite sua senha"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
  });
  function onHandleSubmit(formLogin) {
    setForm({ ...formLogin, type: "Login" });
  }
  return (
    <section className=" clsss flex flex-col items-center space-y-5">
      <h3 className="font-bold text-2xl">Login</h3>
      <form
        className="flex flex-col space-y-5 items-center"
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="Email">Email</label>
          <input id="Email" {...register("email")} />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Password">Password</label>
          <input id="Password" {...register("password")} />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
          <button className="w-32 items-center bg-red-400">Login</button>
      </form>{" "}
    </section>
  );
};
