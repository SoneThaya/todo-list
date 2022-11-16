import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import NewTodoForm from "../components/NewTodoForm";
import EditTodoForm from "../components/EditTodoForm";
import TodoList from "../components/TodoList";

const TodoPage = () => {
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAddNewTodo, setIsAddNewTodo] = useState(false);
  const [editTodo, setEditTodo] = useState({});
  const [keyword, setKeyword] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleToDoSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: todo.trim(), complete: false },
      ]);
    }
    setIsAddNewTodo(false);
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    handleUpdateTodo(editTodo.id, editTodo);
  };

  const handleEditInputChange = (e) => {
    setEditTodo({ ...editTodo, text: e.target.value });
  };

  const handleDeleteTodo = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  const handleUpdateTodo = (id, editTodo) => {
    const item = todos.map((todo) => {
      return todo.id === id ? editTodo : todo;
    });

    setIsEditing(false);
    setTodos(item);
  };

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setEditTodo({ ...todo });
    setIsAddNewTodo(false);
  };

  const handleComplete = (id) => {
    let list = todos.map((text) => {
      let item = {};
      if (text.id === id) {
        item = { ...text, complete: !text.complete };
      } else item = { ...text };
      return item;
    });
    setTodos(list);
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

        {isAddNewTodo && (
          <NewTodoForm
            todo={todo}
            handleToDoSubmit={handleToDoSubmit}
            setTodo={setTodo}
            setIsAddNewTodo={setIsAddNewTodo}
          />
        )}

        {isEditing && (
          <EditTodoForm
            todo={todo}
            handleEditForm={handleEditForm}
            editTodo={editTodo}
            handleEditInputChange={handleEditInputChange}
            setIsEditing={setIsEditing}
          />
        )}

        <TodoList
          searchedTodos={searchedTodos}
          key={todo.id}
          todo={todo}
          handleEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleComplete={handleComplete}
        />
      </div>
    </>
  );
};

export default TodoPage;
