import React from "react";
import { FcTodoList } from "react-icons/fc";
import { useTodos } from "../context/TodoProvider";

const EditTodoForm = ({ setIsEditing }) => {
  const { todo, handleEditForm, editTodo, handleEditInputChange } = useTodos();

  const onSubmit = (e) => {
    e.preventDefault();
    handleEditForm(todo);
    setIsEditing(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="todoForm__container">
        <input
          type="text"
          name={todo}
          placeholder="Edit To-Do"
          value={editTodo.text}
          onChange={handleEditInputChange}
          className="input__styles todo__input"
          maxLength={25}
        />
        <FcTodoList className="search__icon" />
        <div>
          <button type="submit" className="todo__btn save__btn">
            Edit
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="todo__btn cancel__btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditTodoForm;
