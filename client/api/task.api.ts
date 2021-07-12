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

type overDueTaskQueryKey = [string, { currentDate: string; ctx: any }];

export const fetchOverdueTasks = async ({
  queryKey,
}: {
  queryKey: overDueTaskQueryKey;
}) => {
  const [_key, { currentDate, ctx }] = queryKey;

  const res = await fetch(API_URL + "/task/fetchoverdue", {
    headers: {
      cookie: ctx?.req ? ctx.req.headers.cookie : null,
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    method: "POST",
    credentials: "include",
    body: JSON.stringify({ currentDate: "2021-00-00T00:00:00.000Z" }),
  })
    .then((response) => response.text())
    .then((res) => JSON.parse(res));

  return res;
};
