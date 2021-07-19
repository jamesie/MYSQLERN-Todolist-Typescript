import { Switch } from "@headlessui/react";
import React, { FC, useState, useEffect } from "react";
import useSound from "use-sound";
import OverdueIcon from "./OverdueIcon";
import task_uncomplete from "../../../sounds/1.mp3";
import task_complete from "../../../sounds/2.mp3";
import { queryClient } from "../../../pages/_app";
import { useMutation } from "react-query";
import { changeStatus } from "../../../api/task.api";
import { getTodayDateTime } from "../../../utils/dateParser";
import { sleep } from "../../../utils/sleep";

export type TaskDate = {
  year: number;
  month: number;
  day: number;
};
interface TaskProps {
  status: boolean;
  toBeCompletedBy?: string | null;
  taskName: string;
  clientsDate: string;
  id: number;
  parentName?: string;
}

const Task: FC<TaskProps> = ({
  id,
  status,
  toBeCompletedBy,
  taskName,
  clientsDate,
  parentName,
}) => {
  const [enabled, setEnabled] = useState<boolean>(status);

  useEffect(() => {
    setEnabled(status);
  }, [status]);
  const [complete] = useState(
    typeof Audio !== "undefined" && new Audio(task_complete)
  );

  const statusUpdate = useMutation((payload: any) =>
    changeStatus(payload.status, payload.id)
  );

  const [uncomplete] = useState(
    typeof Audio !== "undefined" && new Audio(task_uncomplete)
  );

  const handleChange = async () => {
    setEnabled(!enabled)
    if (status) {
      uncomplete.volume = 0.2;
      await uncomplete.play();
    } else {
      complete.volume = 0.2;
      await complete.play();
    }
    await sleep(200)
    statusUpdate.mutateAsync({ status: !status, id });
    updateCache();
  };

  useEffect(() => {
    setEnabled(status);
  }, [status]);

  const updateCache = () => {
    queryClient.setQueryData("fetchTodoListsAndTasks", (data: any) => {
      return data?.map((element) => {
        element.tasks = element?.tasks?.map((task) => {
          if (task.id === id) {
            task.status = !status;
            return task;
          }
          return task;
        });
        return element;
      });
    });
  };

  return (
    <div className="flex flex-col sm:flex-row w-full bg-white p-2 rounded-sm border-gray-300 border-2 my-1 text-gray-400">
      <div className="w-11 mx-auto sm:mx-1">
        <Switch
          checked={enabled}
          onChange={handleChange}
          className={`${
            enabled ? "bg-blue-600" : "bg-gray-200"
          } inline-flex items-center h-6 rounded-full min-w-full focus:outline-none mx-1`}
        >
          <div
            className={`${
              enabled ? " transform translate-x-6" : " transform translate-x-1"
            } duration-300 ease-out inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
      </div>
      <div className="flex flex-row mx-auto sm:mx-1">
        <div className="font-semibold mr-2 ml-1">
          {!parentName ? null : `${parentName}:`}
        </div>
        {taskName}
      </div>
      {toBeCompletedBy ? (
        <OverdueIcon
          currentDate={clientsDate}
          toBeCompletedBy={toBeCompletedBy}
          className="mx-auto sm:ml-auto sm:mr-0 "
        />
      ) : null}
    </div>
  );
};

export default Task;
