import React, { FC, useRef, useState, useEffect } from "react";
import { handleAlerts } from "../utils/handeAlerts";
import CreateTodoListButton from "./home/CreateTodoListButton";
import Spinner from "./Spinner";
import { useMutation } from "react-query";
import { createTodoList } from "../api/todolist.api";
import { sleep } from "../utils/sleep";
import { queryClient } from "../pages/_app";

interface createTodoListProps {}

const CreateTodoList: FC<createTodoListProps> = () => {
  const [name, setName] = useState<string>("");
  const nameInput = useRef();
  const [showCreateButton, setShowCreateButton] = useState<boolean>(true);
  const [mutating, setMutating] = useState<boolean>(false);
  const createMutation = useMutation(createTodoList, {
    onMutate: async () => {
      setMutating(true);
      await sleep(500);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries("fetchTodoListsAndTasks");
      await sleep(500);
      setShowCreateButton(true);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createMutation.mutateAsync(name);
  };

  if (!showCreateButton) {
    return (
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-40">
        <div className="grid w-full h-full place-items-center">
          <form
            className="container bg-white pd-2 w-11/12 md:w-2/3 max-w-lg rounded-2xl p-5 shadow-lg"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col text-black">
              <div className=" font-semibold text-3xl w-full text-center my-4">
                Create a Todolist
              </div>
              <div className=" font-semibold text-xl w-full mt-4 ml-3">
                name:
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  handleAlerts(e.target.value, nameInput, "Username");
                  setName(e.target.value);
                }}
                ref={nameInput}
                id="username"
                className={`m-1 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 h-10  w-full border border-transparent px-2 text-md  font-normal`}
              />
              <div className="w-full flex flex-row gap-7">
                <button
                  className="focus:outline-none focus:ring-3 focus:ring-red-300 focus:ring-opacity-50 w-11/12 mx-auto bg-red-400 transition duration-150 ease-in-out hover:bg-red-500 rounded-md text-white px-8 h-14 text-sm mt-6"
                  type="button"
                  onClick={() => {
                    setShowCreateButton(!showCreateButton);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50 w-11/12 mx-auto bg-blue-500 transition duration-150 ease-in-out hover:bg-blue-600 rounded-md text-white px-8 h-14 text-sm mt-6 "
                >
                  {mutating ? (
                    <Spinner className="w-7 h-7 mx-auto" show={true} />
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <CreateTodoListButton
      show={true}
      onClick={() => {
        setShowCreateButton(!showCreateButton);
      }}
    />
  );
};

export default CreateTodoList;
