import { useNavigate } from "react-router-dom";

export const Header = ({ OpenAndCloseModal }) => {
  const navigate = useNavigate();
  function Logout() {
    localStorage.removeItem("@token");
    localStorage.removeItem("@userId");
    navigate("/");
  }
  return (
    <header className="flex justify-between items-center h-24 md:h-16  bg-violet-900">
      <p className="font-bold text-3xl text-white pl-5">Web Contact</p>
      <section className="flex flex-col md:flex-row justify-center md:justify-end items-end md:items-center space-y-1.5 md:space-y-0 md:space-x-6  pr-5">
        <button
          onClick={() => OpenAndCloseModal({ type: "Perfile" })}
          className="h-10 w-32 rounded-lg text-white bg-gray-800 hover:bg-gray-700 border-2 border-black"
        >
          Editar Perfil
        </button>
        <button
          onClick={() => Logout()}
          className="h-10 w-32 rounded-lg text-white bg-gray-800 hover:bg-gray-700 border-2 border-black"
        >
          Logout
        </button>
      </section>
    </header>
  );
};
