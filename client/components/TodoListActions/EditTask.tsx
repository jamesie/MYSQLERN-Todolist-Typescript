import React, { FC, useRef, useState } from "react";
import TodoListActionOverlay from "./TodoListActionOverlay";
import "react-datepicker/dist/react-datepicker.css";
import { ImCross } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { BiCalendarEdit } from "react-icons/bi";
import { Transition } from "@headlessui/react";

interface EditTaskProps {
  onClick: () => void;
  show: boolean;
  name: string;
}

const EditTask: FC<EditTaskProps> = ({ onClick, show, name }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [taskName, setTaskName] = useState<string>("");
  const [dropDownRename, setDropDownRename] = useState<boolean>(false);
  const [dropDownDelete, setDropDownDelete] = useState<boolean>(false);
  const taskNameInput = useRef();

  if (show) {
    return (
      <TodoListActionOverlay>
        <div className="w-10/12 md:w-6/12 max-w-lg">
          <div className="container bg-white pd-2 w-full max-w-lg rounded-2xl p-5 shadow-lg">
            <div className="flex flex-col text-black">
              <div className="flex flex-row">
                <div className=" font-semibold text-3xl w-full text-center my-5 mb-7">
                  {`Editing ${name}....`}
                </div>
                <button
                  onClick={onClick}
                  className="mb-auto h-5 w-5 text-gray-500 focus:outline-none"
                >
                  <ImCross className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-row gap-7 text-2xl text-gray-500 w-10/12 mx-auto mb-8">
                <div className="flex flex-col rounded-md bg-gray-200 w-6/12 border-gray-400 border-1 p-2">
                  <div className="text-md font-semibold text-center mb-2">
                    Rename
                  </div>
                  <button
                    className="border-gray-400 border-2 rounded-lg w-10/12 mx-auto focus:outline-none"
                    onClick={() => setDropDownRename(!dropDownRename)}
                  >
                    <BiRename className="w-10/12 h-full mx-auto" />
                  </button>
                </div>
                <div className="flex flex-col rounded-md bg-gray-200 w-6/12 border-gray-400 border-1 p-2">
                  <div className="text-md font-semibold text-center mb-2">
                    Delete
                  </div>
                  <button className="border-gray-400 border-2 rounded-lg w-10/12 mx-auto">
                    <AiFillDelete className="w-10/12 h-full mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Transition
            show={dropDownRename}
            enter="transition ease-out duration-500"
            enterFrom={"transform opacity-0 scale-y-0"}
            enterTo="transform opacity-100 scale-y-100"
            leave="transition ease-out duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-70"
            className=""
          >
            <div className="container bg-white w-full max-w-lg rounded-2xl p-5 shadow-lg mt-1 border-2 border-black">
              
              helfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsfsdfbkbhkjhkjhsdfsdfsdlo
            </div>
          </Transition>
        </div>
      </TodoListActionOverlay>
    );
  } else {
    return <></>;
  }
};

export default EditTask;
