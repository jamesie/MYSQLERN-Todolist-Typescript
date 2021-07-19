import { Transition } from "@headlessui/react";
import React, { FC, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { RiEdit2Fill } from "react-icons/ri";
import { BsPlusSquare } from "react-icons/bs";
import CreateTask from "../TodoListActions/CreateTask";
import EditTask from "../TodoListActions/EditTask";

interface TodoListProps {
  todoListName: string;
}

const TodoList: FC<TodoListProps> = ({ todoListName: name, children }) => {
  const [dropDownTasks, setDropDownTasks] = useState(false);
  const [chevron, setChevron] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);

  const childrenArray = React.Children.toArray(children).filter(
    (element) => {
      if (!React.isValidElement(element)) return;
      return element;
    }
  );

  return (
    <div className="grid grid-rows-1 w-full bg-gray-100 px-3 py-1 rounded-sm border-gray-300 border-2 my-2 gap-y-4 gap-x-3">
      <div className="grid-row-1 flex flex-row my-1">
        <h2 className="grid-col-1 font-semibold w-full">{name}</h2>
        <div className="flex flex-row my-auto ml-4">
          <button className="focus:outline-none">
            <BsPlusSquare
              className="w-6 h-6 mr-2"
              onClick={() => {
                setShowAddTask(true);
              }}
            />
          </button>
          <button className="focus:outline-none">
            <RiEdit2Fill
              className="w-6 h-6 mx-2"
              onClick={() => {
                setShowEditTask(true);
              }}
            />
          </button>
          <button className="focus:outline-none"></button>
          <button className="focus:outline-none">
            <GoChevronDown
              className={`${
                chevron ? "transform rotate-180" : " tranform rotate-0"
              } duration-500 w-6 h-6`}
              onClick={() => {
                chevron === true ? setChevron(false) : setChevron(true);
                dropDownTasks === true
                  ? setDropDownTasks(false)
                  : setDropDownTasks(true);
              }}
            />
          </button>
        </div>
      </div>
      <Transition
        show={dropDownTasks}
        enter={`transition ease-out ${
          !childrenArray ? "duration-75" : "duration-500"
        }`}
        enterFrom={`transform ${
          !childrenArray ? "opacity-100" : "opacity-0"
        } scale-y-0`}
        enterTo="transform opacity-100 scale-y-100"
        leave="transition ease-out duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-70"
        className="grid-row-2"
      >
        {childrenArray.length < 1 ? (
          <div className="flex flex-row w-full bg-white p-2 rounded-sm border-gray-300 border-2 my-1">
            <div className="text-center text-red-400 font-semibold text-lg mx-auto">
              No tasks created for this todolist
            </div>
          </div>
        ) : (
          childrenArray
        )}
      </Transition>
      <CreateTask
        show={showAddTask}
        onClick={() => {
          setShowAddTask(false);
        }}
      />
      <EditTask
        name={name}
        show={showEditTask}
        onClick={() => setShowEditTask(!showEditTask)}
      />
    </div>
  );
};

export default TodoList;
