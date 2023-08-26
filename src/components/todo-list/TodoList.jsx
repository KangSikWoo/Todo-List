import React, { useEffect, useState } from "react";
import AddTodo from "../add-todo/AddTodo";
import Todo from "../todo/Todo";
import styles from "./TodoList.module.css";

export default function TodoList({ filter }) {
  // 초기값 넣는 공간에 콜백 함수를 작성한 이유 : 함수가 불필요하게 호출되는 것을 막기 위해서, 초기값은 새로고침이 됐을 때 한번만 필요
  const [todos, setTodos] = useState(() => readTodosFromLocal());
  // 밑의 코드는 값이 추가될 때마디 함수를 호출함
  // 하지만 useState가 자동으로 자신의 내부의 값을 이용할 수 있기 때문에, 그리고 새로고침 할 때만 초기값의 업데이트가 필요하기 때문에 계속 호출 될 필요가 없다.
  // const [todos, setTodos] = useState(readTodosFromLocal());

  // 새로운 투두를 todos를 업데이트 해야 함.
  // 콜백 함수 형태로 전달해주기 위해서 해준 것
  const handleAdd = (todo) => setTodos([...todos, todo]);
  const handleUpdate = (updated) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItem(todos, filter);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      {/* onAdd() 를 인자로 전달 */}
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItem(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}

function readTodosFromLocal() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
