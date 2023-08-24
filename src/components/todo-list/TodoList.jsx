import React, { useState } from "react";
import AddTodo from "../add-todo/AddTodo";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: "123", text: "장보기", status: "active" },
    { id: "124", text: "공부하기", status: "active" },
  ]);

  // 새로운 투두를 todos를 업데이트 해야 함.
  const handleAdd = (todo) => setTodos([...todos, todo]);

  return (
    <section>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      {/* onAdd() 를 인자로 전달 */}
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
