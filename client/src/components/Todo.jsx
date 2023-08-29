import Title from "./Title";
import Tasks from "./Tasks";
import Form from "./Form";
import { useState } from "react";


export default function Todo() {

  // state to control the form display
  const [showForm, setShowForm] = useState(false);

  function handleShow() {
    setShowForm((prev) => !prev);
  }

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="Todo">
        <Title click={handleShow} type={showForm} />
        {showForm && <Form />}
        <Tasks />
      </div>
    </div>
  );
}
