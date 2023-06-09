import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IUserLogin } from "../../interfaces/interfaces";
import { toast } from "react-toastify";

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
        <div className="div-for-email-and-password">
          <span>E-mail</span>

          <input
            className="password-and-email"
            type="text"
            placeholder="Digite seu e-mail aqui"
            {...register("email")}
          />
          <div className="error-div">
            <p className="error-text">{errors.email?.message}</p>
          </div>
        </div>

        <div className="div-for-email-and-password">
          <span>Senha</span>

          <input
            className="password-and-email"
            type="password"
            placeholder="Digite seu password aqui"
            {...register("password")}
          />
          <div className="error-div">
            <p className="error-text">{errors.email?.message}</p>
          </div>
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
