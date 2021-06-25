import { Transition } from "@headlessui/react";
import React, { FC, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { RiEdit2Fill } from "react-icons/ri";
import { BsPlusSquare } from "react-icons/bs";

interface TodoListProps {
  todoListName: string;
}

const TodoList: FC<TodoListProps> = ({ todoListName: name, children }) => {
  const [dropDownTasks, setDropDownTasks] = useState(false);
  const [chevron, setChevron] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-y-4 gap-x-3 w-full bg-gray-100 p-3 rounded-sm border-gray-300 border-2 my-2">
      <h2 className="grid-col-1 font-semibold">{name}</h2>
      <div className="grid-col-2 flex flex-row">
        <BsPlusSquare className="ml-auto w-6 h-6 mr-2" />
        <RiEdit2Fill className="w-6 h-6 mx-2" />

        <GoChevronDown
          className={`${
            chevron ? "transform rotate-180" : "transform rotate-0"
          } outline-none transition-transform duration-500 ease-out w-6 h-6`}
          onClick={() => {
            chevron === true ? setChevron(false) : setChevron(true);
            dropDownTasks === true
              ? setDropDownTasks(false)
              : setDropDownTasks(true);
          }}
        />
      </div>
      <Transition
        show={dropDownTasks}
        enter={`transition ease-out ${
          !children ? "duration-75" : "duration-500"
        }`}
        enterFrom={`transform ${
          !children ? "opacity-100" : "opacity-0"
        } scale-y-0`}
        enterTo="transform opacity-100 scale-y-100"
        leave="transition ease-out duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-70"
        className="grid-col-1 grid-row-1 col-span-2"
      >
        {!children ? (
          <div className="flex flex-row w-full bg-white p-2 rounded-sm border-gray-300 border-2 my-1">
            <div className="text-center text-red-400 font-semibold text-lg mx-auto">
              No tasks created for this todolist
            </div>
          </div>
        ) : (
          children
        )}
      </Transition>
    </div>
  );
};

export default TodoList;
