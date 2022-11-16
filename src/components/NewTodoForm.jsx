import React from "react";
import { FcTodoList } from "react-icons/fc";

const NewTodoForm = ({ todo, handleToDoSubmit, setTodo, setIsAddNewTodo }) => {
  return (
    <form onSubmit={handleToDoSubmit}>
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
