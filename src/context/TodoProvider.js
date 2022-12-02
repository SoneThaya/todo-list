import React, { createContext, useState, useContext, useEffect } from "react";

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export default function TodoProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddNewTodo, setIsAddNewTodo] = useState(false);
  const [editTodo, setEditTodo] = useState({});
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

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const handleToDoSubmit = (todo) => {
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: Math.floor(Math.random() * 100000),
          text: todo.trim(),
          complete: false,
        },
      ]);
    }
    setIsAddNewTodo(false);
  };

  const handleEditForm = (e) => {
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

  return (
    <TodoContext.Provider
      value={{
        editTodo,
        todos,
        loggedInUser,
        setIsAddNewTodo,
        setEditTodo,
        setTodos,
        handleToDoSubmit,
        handleEditForm,
        handleEditInputChange,
        handleDeleteTodo,
        handleUpdateTodo,
        handleEditTodo,
        handleComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
