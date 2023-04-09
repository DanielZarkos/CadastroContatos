import { useState, useEffect } from "react";
import "./Dashboard.css";
import api from "../../services/api";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IAddContactForm, IContact } from "../../interfaces/interfaces";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState<IContact[]>([]);
  const token = localStorage.getItem("@token");
  const navigate = useNavigate();

  const listContacts = async () => {
    await api
      .get("/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContacts(res.data.contacts);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      listContacts();
    } else {
      navigate("/login");
    }
  }, [token]);

  const addContact = async (data: IAddContactForm) => {
    await api
      .post("/users/contact", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Contato adicionado!");
        setContacts((previousContacts) => [res.data, ...previousContacts]);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = async () => {
    toast.success("Você saiu!");
    localStorage.clear();
    navigate("/login");
  };

  const deleteUser = async () => {
    await api
      .delete(`/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Usuário deletado!");
        navigate("/login");
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteContact = async (contactId: string) => {
    await api
      .delete(`/users/contact/${contactId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Contato deletado!");

        const newContactsList = contacts.filter(
          (contact) => contact.id !== contactId
        );
        setContacts(newContactsList);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório"),
    phone: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddContactForm>({
    resolver: yupResolver(schema),
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setIsModalDeleteOpen(true);
  };

  return (
    <div className="dashboard-container">
      <button className="logout-button" onClick={() => logout()}>
        Logout
      </button>
      <button className="delete-button" onClick={handleOpenDeleteModal}>
        Deletar Usuário
      </button>
      {isModalDeleteOpen && (
        <div className="modal">
          <div className="modal-content">
            <p> Deseja mesmo APAGAR sua conta?</p>
            <div className="container-yes-no">
              <button onClick={() => deleteUser()} className="yes-button">
                Sim
              </button>
              <button
                className="no-button"
                onClick={() => setIsModalDeleteOpen(false)}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Contacts Manager</h1>
        <div className="user-info">
          <p className="user-name">Seja bem-vindo {name}!</p>
          <p className="user-email">Seu email é: {email}</p>
          <p className="user-email">Seu telefone é: {phone}</p>
          <button className="green-button" onClick={handleOpenModal}>
            Adicionar Contato
          </button>
          {isModalOpen && (
            <div>
              <div className="modal">
                <form
                  className="modal-content"
                  onSubmit={handleSubmit(addContact)}
                >
                  <label>
                    <div>
                      Name:
                      <input
                        className="input-modal"
                        type="text"
                        {...register("name")}
                      />
                      <p className="error-text">{errors.name?.message}</p>
                    </div>
                  </label>

                  <label>
                    <div>
                      Email:
                      <input
                        className="input-modal"
                        type="email"
                        {...register("email")}
                      />
                      <p className="error-text">{errors.email?.message}</p>
                    </div>
                  </label>

                  <div>
                    <label>
                      Phone:
                      <input
                        className="input-modal"
                        type="phone"
                        {...register("phone")}
                      />
                    </label>
                    <p className="error-text">{errors.phone?.message}</p>
                  </div>

                  <button type="submit" className="green-button">
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <form className="search-bar">
        <input
          className="input-search"
          type="text"
          placeholder="Search for a contact"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form> */}
      <div className="slider-container">
        <div className="contacts-container">
          {contacts?.map((contact: IContact) => (
            <div key={contact.id} className="contact-card">
              <div className="contact-info">
                <p className="contact-name">{contact.name}</p>
                <p className="contact-email">{contact.email}</p>
                <p className="contact-phone">{contact.phone}</p>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="red-button"
                >
                  Deletar Contato
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
