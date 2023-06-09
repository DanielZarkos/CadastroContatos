import "./RegisterPage.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { IUserRegister } from "../../interfaces/interfaces";

export default function Register() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Apenas Letras")
      .required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "Mínimo de 8 dígitos"),
    phone: yup.number().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    resolver: yupResolver(schema),
  });

  const onFormSubmit = async (formdata: IUserRegister) => {
    console.log(formdata);
    registerUser(formdata);
  };

  const registerUser = async (data: IUserRegister) => {
    console.log(data);
    await api
      .post("/users", data)
      .then((res) => {
        toast.success("Cadastro realizado!");
        handleClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <h1>Crie sua conta</h1>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="major">
            <div className="div-register-login">
              <span>Usuário</span>
              <input
                id="user"
                className="password-and-email"
                type="text"
                placeholder="Digite seu usuário aqui"
                {...register("name")}
              />
              <div className="error-div">
                <p className="error-text">{errors.name?.message}</p>
              </div>
            </div>

            <div className="div-register-login">
              <span>E-mail</span>
              <input
                className="password-and-email"
                type="text"
                placeholder="Digite seu email aqui"
                {...register("email")}
              />
              <div className="error-div">
                <p className="error-text">{errors.email?.message}</p>
              </div>
            </div>

            <div className="div-register-login">
              <span>Senha</span>
              <input
                className="password-and-email"
                type="password"
                placeholder="Digite sua senha aqui"
                {...register("password")}
              />{" "}
              <div className="error-div">
                <p className="error-text">{errors.password?.message}</p>
              </div>
            </div>

            <div className="div-register-login">
              <span>Telefone</span>
              <input
                className="password-and-email"
                type="string"
                placeholder="Digite seu telefone aqui"
                {...register("phone")}
              />{" "}
              <div className="error-div">
                <p className="error-text">{errors.email?.message}</p>
              </div>
            </div>
          </div>
          <div className="div-register-login">
            <button type="submit">Criar Conta</button>
          </div>

          <span className="cadastre-se">Já possui uma conta?</span>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="button-cadastrar"
          >
            Clique aqui
          </button>
        </form>
      </div>
    </>
  );
}
