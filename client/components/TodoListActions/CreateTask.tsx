import React, { FC, useRef, useState } from "react";
import TodoListActionOverlay from "./TodoListActionOverlay";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { handleAlerts } from '../../utils/handeAlerts';

interface CreateTaskProps {
  onClick: () => void;
  show: boolean;
}

const CreateTask: FC<CreateTaskProps> = ({ onClick, show }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [taskName, setTaskName] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(true);
  const taskNameInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  
  if (show) {
    return (
      <TodoListActionOverlay>
        <form
          className="container bg-white pd-2 w-11/12 md:w-2/3 max-w-lg rounded-2xl p-5 shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col text-black">
            <div className=" font-semibold text-3xl w-full text-center my-4">
              Create Task
            </div>
            <div className=" font-semibold text-xl w-full mt-4 ml-3">name:</div>
            <input
              type="text"
              required
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
                handleAlerts(e.target.value, taskNameInput, "Task name")
              }}
              id="username"
              ref={taskNameInput}
              className={`m-1 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 h-10  w-full border border-transparent px-2 text-md  font-normal`}
            />
            <div className="flex flex-row font-semibold text-xl w-full mt-4 ml-3">
              completion date:
              <input
                className="form-checkbox w-4 h-4 my-auto rounded-3xl text-blue-300 ml-3"
                type="checkbox"
                onClick={() => {
                  setShowDatePicker(!showDatePicker);
                }}
              />
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="m-1 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 h-10  w-full border border-transparent px-2 text-md  font-normal"
            />
            <div className="w-full flex flex-row gap-7">
              <button
                className="focus:outline-none focus:ring-3 focus:ring-red-300 focus:ring-opacity-50 w-11/12 mx-auto bg-red-400 transition duration-150 ease-in-out hover:bg-red-500 rounded-md text-white px-8 h-14 text-sm mt-6"
                type="button"
                onClick={onClick}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50 w-11/12 mx-auto bg-blue-500 transition duration-150 ease-in-out hover:bg-blue-600 rounded-md text-white px-8 h-14 text-sm mt-6 "
              >Create</button>
            </div>
          </div>
        </form>
      </TodoListActionOverlay>
    );
  } else {
    return <></>;
  }
};

export default CreateTask;
