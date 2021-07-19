import React, { FC } from "react";
import { BsPlusSquare } from "react-icons/bs";

interface CreateTodoListButtonProps {
  show: boolean;
  onClick: () => void;
}

const CreateTodoListButton: FC<CreateTodoListButtonProps> = ({
  show,
  onClick,
}) => {
  if (show) {
    return (
      <button onClick={onClick}>
        <div
          className="fixed bottom-10 right-10 md:bottom-24 md:right-24 w-72 h-18 bg-gradient-to-b from-blue-400 to-blue-500 rounded-3xl shadow-lg p-5"
        >
          <div className="flex flex-row w-full h-full text-white">
            <BsPlusSquare className="w-14 h-14 my-auto ml-3" />
            <div className="font-semibold text-2xl my-auto w-full text-center">
              Create Todolist
            </div>
          </div>
        </div>
      </button>
    );
  }
  return <></>;
};

export default CreateTodoListButton;
