import { NextPageContext } from "next";
import { API_URL } from "./user.api";

export const fetchTodoListsAndTasks = async (ctx) => {
  const res = await fetch(API_URL + "/todolist/fetchuserstodolists", {
    headers: {
      cookie: ctx?.req ? ctx.req.headers.cookie : null,
    },
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.text())
    .then((res) => JSON.parse(res));

  return res;

  // fetches object with all of users todolists and tasks:
  // example: {
  //   0: {
  //     name: "todolist1"
  //     tasks: [{
  //       taskName: "task"
  //       status: false
  //       toBeCompletedBy: null
  //     }]
  //   }
  //   1: {
  //     name: "todolist2"
  //     tasks: null
  //   }
  // }
};

type createTodoListQueryKey = [
  string | null,
  { name: string; ctx: NextPageContext }
];

export const createTodoList = async (name: string) => {
  const res = await fetch(API_URL + "/todolist/create", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ name }),
  })
    .then((response) => response.text())
    .then((res) => JSON.parse(res));

  return res;
};
