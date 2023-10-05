import React from "react";
import TodoForm from "../components/TodoForm";

const TodoPage: React.FC = () => {
  return (
    <div className="w-1/3 m-auto">
      <TodoForm />
      {/* <TodoList/> */}
    </div>
  );
};

export default TodoPage;
