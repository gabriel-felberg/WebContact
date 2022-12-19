import { IContact, IEmail, IObj, ITelephone } from "..";

interface ICardProps {
  data:IContact
  OpenAndCloseModal({type, id}:IObj): void 
  DeleteContact(event: any): void 
}



export const Card = ({ data, OpenAndCloseModal, DeleteContact }:ICardProps) => {
  return (
    <div className="flex flex-col text-center justify-between rounded-2xl text-white bg-gray-800 h-48  border-black border-2">
      <h3 className="flex justify-center items-center h-10 bg-violet-900 rounded-t-2xl border-black border-b-2">
        <b>{data.name}</b>
      </h3>
      <div className="flex p-3 ">
        <div className="w-40">
          <h3>
            <b>Emails</b>
          </h3>
          {data.emailContact.map((e:IEmail) => (
            <p>{e.email}</p>
          ))}
        </div>
        <div className="w-40">
          <h3>
            <b>Telephones</b>
          </h3>
          {data.telephoneContact.map((e:ITelephone) => (
            <p>{e.telefone}</p>
          ))}
        </div>
      </div>
      <section className="border-black border-t-2 text-black font-bold">
        <button
          id={data.id}
          name={data.id}
          onClick={() =>
            OpenAndCloseModal({
              id: data.id,
              type: "Edit",
            })
          }
          className="rounded-bl-2xl bg-yellow-200 p-2 w-6/12 hover:bg-yellow-300"
        >
          Editar
        </button>
        <button
          id={data.id}
          onClick={(event) => DeleteContact(event)}
          className="rounded-br-2xl bg-red-400 p-2 w-6/12 hover:bg-red-500"
        >
          Deletar
        </button>
      </section>
    </div>
  );
};
