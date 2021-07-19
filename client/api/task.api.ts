import { NextPageContext } from "next";
import { getTodayDateTime } from "../utils/dateParser";
import { API_URL } from "./user.api";

export const fetchIncompletedTasks = async (ctx) => {
  const res = await fetch(API_URL + "/task/inctasks", {
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.text())
    .then((res1) => JSON.parse(res1));

  return res;
};

type overDueTaskQueryKey = [string | null, { currentDate: string}];

export const fetchOverdueTasks = async ({
  queryKey,
}: {
  queryKey: overDueTaskQueryKey;
}) => {
  const [_key, { currentDate }] = queryKey;
  console.log(currentDate)

  const res = await fetch(API_URL + "/task/fetchoverdue", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    method: "POST",
    credentials: "include",
    body: JSON.stringify({ currentDate: currentDate }),
  })
    .then((response) => response.text())
    .then((res) => JSON.parse(res));

  return res;
};

export const changeStatus = async (status: boolean, id: number) => {
  const res = await fetch(API_URL + "/task/edit", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({status, id}),
  })
    .then((response) => response.text())
    .then((res) => JSON.parse(res));
  return res;
};
