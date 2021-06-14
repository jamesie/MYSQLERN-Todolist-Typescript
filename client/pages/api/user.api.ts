// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const API_URL = process.env.API_URL

export type UserForm = {
  username: string
  password: string
}

export const login = async (loginForm: UserForm) => {
  const res = await fetch(API_URL + '/users/login', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(loginForm)
  }).then(response => response.text()).then(res => JSON.parse(res))
  return res
}


export const register = async (registerForm: UserForm) => {
  const res = await fetch(API_URL + '/users/register', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(registerForm)
  }).then(response => response.text()).then(res => JSON.parse(res))
  return res
}


export const deleteAccount = async (ctx) => {
  const res = await fetch(API_URL + '/users/delete', {
    method: 'DELETE',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
    credentials: 'include'
  })
  return res
}

export const meQuery = async (ctx) => {
  const res = await fetch(API_URL + '/users/me', {
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
    method: 'GET',
    credentials: 'include'
  }).then(response => response.text()).then(res => JSON.parse(res))
  return res
}

