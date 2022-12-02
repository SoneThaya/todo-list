import React from "react";
import TodoItem from "./TodoItem";
import { useTodos } from "../context/TodoProvider";

const TodoList = ({ searchedTodos, handleEditTodo }) => {
  const { handleDeleteTodo, handleComplete } = useTodos();

  return (
    <ul className="todoList__container">
      {searchedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleComplete={handleComplete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
