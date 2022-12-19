import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CounterContext } from "../../../Providers/counter";

export interface IFormProps {
  setForm(form:object):void
}
interface IformRegister{
  name: string,
  telephone: string,
  email: string,
  password: string,
  type: "Register",
}

export const Register = ({ setForm }:IFormProps) => {
  const { Transform } = useContext(CounterContext);
  const schemaForm = yup.object().shape({
    name: yup
      .string()
      .min(6, "Digite seu nome completo")
      .required("Digite seu nome completo"),
    email: yup.string().required("Digite seus e-mails"),
    telephone: yup.string().required("Digite seus telephones"),
    password: yup
      .string()
      .min(6, "A senha deve ser maior")
      .required("Digite sua senha"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IformRegister>({
    resolver: yupResolver(schemaForm),
  });
  function onHandleSubmit(formRegister:IformRegister):void {
    setForm({
      name: formRegister.name,
      telephone: Transform(formRegister.telephone),
      email: Transform(formRegister.email),
      password: formRegister.password,
      type: "Register",
    });
  }
  return (
    <section className="flex flex-col items-center space-y-5 h-6/6 mt-16">
      <h3 className="font-bold text-3xl">Registre-se</h3>
      <form
        className="flex flex-col space-y-5 items-center"
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="Nome" className="text-lg">
            Nome Completo
          </label>
          <input className="input" id="Nome" {...register("name")} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Email" className="text-lg">
            Email
          </label>
          <input className="input" id="Email" {...register("email")} />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Telephones" className="text-lg">
            Telephone
          </label>
          <input className="input" id="Telephones" {...register("telephone")} />
          {errors.telephone && (
            <span className="error">{errors.telephone.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="Password" className="text-lg">
            Password
          </label>
          <input className="input" id="Password" {...register("password")} />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <button className="w-44 bg-blue-400 hover:bg-blue-500 text-black p-1 rounded-lg font-bold border border-black">
          Registro
        </button>
      </form>{" "}
    </section>
  );
};
