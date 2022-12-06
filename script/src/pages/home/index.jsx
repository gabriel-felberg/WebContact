import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [g, setG] = useState([]);
  function Render() {
    axios
      .get(
        `http://localhost:3001/user/${JSON.parse(
          localStorage.getItem("@userId")
        )}`
      )
      .then((res) => {
        setG(res.data);
        console.log(res);
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    Render();
  }, []);
  console.log(g.list_contacts);
  return (
    <section>
      <h1>Olá {g.name}, Seja bem vindo os seus contatos salvos</h1>

      {g.list_contacts === undefined || []  ? (
        <h3>Nenhum contato salvo</h3>
      ) : (
        g.list_contacts?.map((e) => {
          return (
            <div>
              <h3>{e.name}</h3>
              <p>{e.email}</p>
              <p>{e.telefone}</p>
            </div>
          );
        })
      )}
    </section>
  );
};

export default Home;
