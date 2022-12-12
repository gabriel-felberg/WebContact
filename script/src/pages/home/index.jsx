import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import Modal from "react-modal";
import { ModalEdit } from "../../components/modal/modalEdit";
import { ModalPerfile } from "../../components/modal/modalPerfile";
import { ModalAdd } from "../../components/modal/modalAdd";
import { api, apiPrivate } from "../../services/api";

const Home = () => {
  const [user, setUser] = useState([]);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState({});
  const [axiosId, setAxiosId] = useState({});

  useEffect(() => {
    AxiosRender({
      method: "get",
      url: `http://localhost:3001/user/${JSON.parse(
        localStorage.getItem("@userId")
      )}`,
      addState: setUser,
    });
  }, [type]);

  function AxiosRender({ method, url, data = {}, addState = console.log }) {
    if (method === "get" || method === "post") {
      console.log(method, url, data, addState, "publica");
      api({ method: method, url: url, data: data })
        .then((res) => {
          addState(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      console.log(method, url, data, addState, "private");
      apiPrivate({ method: method, url: url, data: data })
        .then((res) => {
          addState(res.data);
        })
        .catch((err) => console.error(err));
    }
  }

  function OpenAndCloseModal(obj) {
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
  return (
    <section>
      <Header OpenAndCloseModal={OpenAndCloseModal}/>
      <section className="flex flex-col items-center mt-5 font-bold text-2xl">
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
            user.list_contacts?.map((e) => {
              return (
                <div className="flex flex-col text-center justify-between rounded-2xl text-white bg-gray-800 h-48 w-96 border-black border-2">
                  <h3 className="flex justify-center items-center h-10 bg-violet-900 rounded-t-2xl border-black border-b-2">
                    <b>{e.name}</b>
                  </h3>
                  <div className="flex p-3 ">
                    <div className="w-6/12">
                      <h3>
                        <b>Emails</b>
                      </h3>
                      {e.emailContact.map((e) => (
                        <p>{e.email}</p>
                      ))}
                    </div>
                    <div className="w-6/12">
                      <h3>
                        <b>Telefones</b>
                      </h3>
                      {e.telefoneContact.map((e) => (
                        <p>{e.telefone}</p>
                      ))}
                    </div>
                  </div>
                  <section className="border-black border-t-2 text-black font-bold">
                    <button
                      id={e.id}
                      onClick={(event) =>
                        OpenAndCloseModal({
                          id: event.target.id,
                          type: "Edit",
                        })
                      }
                      className="rounded-bl-2xl bg-yellow-200 p-2 w-6/12 hover:bg-yellow-300"
                    >
                      Editar
                    </button>
                    <button
                      id={e.id}
                      onClick={(event) =>
                        AxiosRender({ method:"delete", url:`http://localhost:3001/contact/${event.target.id}`})
                      }
                      className="rounded-br-2xl bg-red-400 p-2 w-6/12 hover:bg-red-500"
                    >
                      Deletar
                    </button>
                  </section>
                </div>
              );
            })
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
              />
            ) : type.type === "Add" ? (
              <ModalAdd
                OpenAndCloseModal={OpenAndCloseModal}
                AxiosRender={AxiosRender}
                type={type}
              />
            ) : null}
          </Modal>
        </div>
      </main>
    </section>
  );
};

export default Home;