import icon from "../assets/icons/icon.png";
import Button from "./Button";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Title(props) {
  // grab user name from context
  const {user} = useContext(AuthContext)

  const {click, type} = props
  return (
    <div
      className="flex flex-row justify-between items-center border-b-2 border-slate-300
        py-4 px-6">
      <img src={icon} alt="icon" />
      <p className="font-bold text-lg"> To-do </p>
      <Button title={type ? 'close' : 'add'} type={type ? 'close' : 'add'} onclick={click} />
    </div>
  );
}
