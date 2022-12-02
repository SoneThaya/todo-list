import React, { useState } from "react";
import { FcTodoList } from "react-icons/fc";
import { useTodos } from "../context/TodoProvider";

const NewTodoForm = ({ setIsAddNewTodo }) => {
  const [todo, setTodo] = useState("");
  const { handleToDoSubmit } = useTodos();

  const onSubmit = (e) => {
    e.preventDefault();
    handleToDoSubmit(todo);
    setIsAddNewTodo(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="todoForm__container">
        <input
          type="text"
          name={todo}
          placeholder="Enter a To-Do"
          onChange={(e) => setTodo(e.target.value)}
          className="input__styles todo__input"
          maxLength={25}
        />
        <FcTodoList className="search__icon" />
        <div>
          <button type="submit" className="todo__btn save__btn">
            Save
          </button>
          <button
            onClick={() => setIsAddNewTodo(false)}
            className="todo__btn cancel__btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewTodoForm;
