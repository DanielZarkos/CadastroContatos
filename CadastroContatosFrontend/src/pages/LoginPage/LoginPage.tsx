import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IUserLogin } from "../../interfaces/interfaces";

const LoginPage = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: yupResolver(schema),
  });

  const logInFunction = (data: any) => {
    api
      .post("/login", data)
      .then((response) => {
        window.localStorage.setItem("@token", response.data.token);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        toast.error("Login e/ou senha inválidos", { autoClose: 2000 });
        console.error("Esse é o erro", error);
      });
  };

  return (
    <div className="container">
      <h1>Contacts Manager</h1>

      <form onSubmit={handleSubmit(logInFunction)}>
        <div>
          <span>Email</span>
          <input
            className="password-and-email"
            type="text"
            placeholder="Digite seu email aqui"
            {...register("email")}
          />
          <p className="error-text">{errors.email?.message}</p>
        </div>

        <div>
          <span>Password</span>
          <input
            className="password-and-email"
            type="password"
            placeholder="Digite seu password aqui"
            {...register("password")}
          />
          <p className="error-text">{errors.email?.message}</p>
        </div>
        <button type="submit">Entrar</button>
      </form>

      <span className="cadastre-se">Ainda não tem uma conta?</span>
      <button
        onClick={() => {
          navigate("/register");
        }}
        className="button-cadastrar"
      >
        Cadastre-se
      </button>
    </div>
  );
};

export default LoginPage;
