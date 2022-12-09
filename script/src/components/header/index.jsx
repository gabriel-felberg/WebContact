import { useNavigate } from "react-router-dom"

 

export const Header = ({OpenAndCloseModal}) => {
  const navigate = useNavigate()
  function Logout() {
    localStorage.removeItem("@token")
    localStorage.removeItem("@userId")
    navigate("/")
  }
  return (
    <header className="flex h-16 space-x-5 items-center justify-end bg-violet-900 pr-5">
        <button onClick={()=>OpenAndCloseModal({type: "Perfile"})} className="h-10 w-32 rounded-lg text-white bg-gray-800 ">Editar Perfil</button>
        <button onClick={()=>Logout()}className="h-10 w-32 rounded-lg text-white bg-gray-800 ">Logout</button>
    </header>
  )
}
