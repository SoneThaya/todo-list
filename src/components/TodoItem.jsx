import React from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const TodoItem = ({
  todo,
  handleEditTodo,
  handleDeleteTodo,
  handleComplete,
}) => {
  return (
    <li
      key={todo.id}
      className="todoItem__styles"
      style={{ textDecoration: todo.complete && "line-through" }}
    >
      <p onClick={() => handleComplete(todo.id)}>{todo.text}</p>
      <div>
        <button onClick={() => handleEditTodo(todo)}>
          <MdEdit className="todoItem__icon edit__icon" />
        </button>
        <button onClick={() => handleDeleteTodo(todo.id)}>
          <FaTrashAlt className="todoItem__icon trash__icon" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
