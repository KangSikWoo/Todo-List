import React from "react";
import { BsFillTrashFill } from "react-icons/bs";

export default function Todo({ todo, onUpdate, onDelete }) {
  // 이렇게 쓰면 일일이 todo.text를 안 써도 된다.
  const { text, status } = todo;
  const handleChange = (e) => {
    const status = e.target.checked ? "completed" : "active";
    onUpdate({ ...todo, status });
  };
  const handleDelete = () => onDelete(todo);
  return (
    <li>
      <input
        type="checkbox"
        id="checkbox"
        checked={status === "completed"}
        onChange={handleChange}
      />
      <label htmlFor="checkbox">{text}</label>
      <button onClick={handleDelete}>
        <BsFillTrashFill />
      </button>
    </li>
  );
}
