import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import Modal from "react-modal";
import { ModalEdit } from "../../components/modal/modalEdit";
import { ModalPerfile } from "../../components/modal/modalPerfile";
import { ModalAdd } from "../../components/modal/modalAdd";
import { api, apiPrivate } from "../../services/api";
import { Card } from "./card";
import { toast } from "react-toastify";

const Home = () => {
  const [user, setUser] = useState([]);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState({});
  const [erroData, setErroData] = useState()

  useEffect(() => {
    AxiosRender({
      method: "get",
      url: `http://localhost:3001/user/${JSON.parse(
        localStorage.getItem("@userId")
      )}`,
      addState: setUser,
    });
  }, [type]);

  function AxiosRender({
    method,
    url,
    data = {},
    addState = console.log,
    message = "Tudo certo",
  }) {

    if (method === "get" || method === "post") {
      
      api({ method: method, url: url, data: data })
        .then((res) => {
          addState(res.data);
          if (
            method !== "get" &&
            url !==
              `http://localhost:3001/user/${JSON.parse(
                localStorage.getItem("@userId")
              )}`
          )
            toast.success(message, {
              position: "top-right",
              autoClose: 2500,
            });
        })
        .catch((err) => {
          toast.error(`${err.response.data.message}`, {
            position: "top-right",
            autoClose: 2500,
          });
          setErroData( err.response.data.message);
        });
    } else {
      apiPrivate({ method: method, url: url, data: data })
        .then((res) => {
          addState(res.data);
          setType({});
        })
        .catch((err) => {
          toast.error(`${err.response.data.message}`, {
            position: "top-right",
            autoClose: 2500,
          });
          setErroData(err.response.data.message);
        });
    }
    return erroData
  }

  function OpenAndCloseModal(obj = {}) {
    setModal(!modal);
    setType(obj);
  }

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      border: "2px solid #000000",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "15px",
      outline: "none",
      padding: "0px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function DeleteContact(event) {
    AxiosRender({
      method: "delete",
      url: `http://localhost:3001/contact/${event.target.id}`,
    });
    setType({});
  }
  return (
    <section>
      <Header OpenAndCloseModal={OpenAndCloseModal} />
      <section className="flex flex-col items-center mt-5 font-bold text-2xl ">
        <h1>Olá {user.name}</h1>
        <h2>Seja bem vindo</h2>
      </section>
      <main className="flex flex-col items-center p-2 gap-5 justify-center m-2 sm:m-10">
        <section className="flex bg-gray-800 text-white p-3 rounded-2xl border-black border-2 items-center">
          <div className="flex justify-center w-64">
            <h3 className="w-96 ">Vamos adicionar alguns contatos ?</h3>
          </div>
          <button
            onClick={() =>
              OpenAndCloseModal({
                type: "Add",
              })
            }
            className="h-7 w-7 rounded font-bold font-mono border border-black text-black bg-green-300 hover:bg-green-400"
          >
            +
          </button>
        </section>
        <div className="flex flex-wrap gap-5 justify-center">
          {user.list_contacts === undefined ? (
            <h3>Nenhum contato salvo</h3>
          ) : (
            user.list_contacts?.map((data) => (
              <Card
                key={data.id}
                data={data}
                OpenAndCloseModal={OpenAndCloseModal}
                DeleteContact={DeleteContact}
              />
            ))
          )}
          <Modal
            isOpen={modal}
            onRequestClose={OpenAndCloseModal}
            style={customStyles}
          >
            {type.type === "Perfile" ? (
              <ModalPerfile
                OpenAndCloseModal={OpenAndCloseModal}
                AxiosRender={AxiosRender}
                user={user}
                type={type}
              />
            ) : type.type === "Edit" ? (
              <ModalEdit
                OpenAndCloseModal={OpenAndCloseModal}
                AxiosRender={AxiosRender}
                type={type}
                setType={setType}
              />
            ) : type.type === "Add" ? (
              <ModalAdd
                OpenAndCloseModal={OpenAndCloseModal}
                AxiosRender={AxiosRender}
                setType={setType}
              />
            ) : null}
          </Modal>
        </div>
      </main>
    </section>
  );
};

export default Home;
