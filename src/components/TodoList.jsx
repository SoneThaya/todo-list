import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  searchedTodos,
  handleEditTodo,
  handleDeleteTodo,
  handleComplete,
}) => {
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
