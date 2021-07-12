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
};
