import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import NewTodoForm from "../components/NewTodoForm";
import EditTodoForm from "../components/EditTodoForm";
import TodoList from "../components/TodoList";
import { useTodos } from "../context/TodoProvider.js";

const TodoPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddNewTodo, setIsAddNewTodo] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { setEditTodo, todos } = useTodos();

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setEditTodo({ ...todo });
    setIsAddNewTodo(false);
  };

  const searchedTodos = todos.filter((entry) =>
    Object.values(entry).some(
      (val) => typeof val === "string" && val.includes(keyword)
    )
  );

  return (
    <>
      <div className="todo__container">
        <h2>My To-Do List</h2>

        <div className="search__container">
          <input
            type="text"
            placeholder="Search To-Do"
            className="input__styles search__input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <FiSearch className="search__icon" />
          <button
            className="todo__btn new__btn"
            onClick={() => {
              setIsAddNewTodo(true);
              setIsEditing(false);
            }}
          >
            New Todo
          </button>
        </div>

        {isAddNewTodo && <NewTodoForm setIsAddNewTodo={setIsAddNewTodo} />}

        {isEditing && <EditTodoForm setIsEditing={setIsEditing} />}

        <TodoList
          searchedTodos={searchedTodos}
          handleEditTodo={handleEditTodo}
        />
      </div>
    </>
  );
};

export default TodoPage;
