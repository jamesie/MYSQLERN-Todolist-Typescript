// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_URL = process.env.API_URL

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
  })
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
  })
  return res
}


export const deleteAccount = async () => {
  const res = await fetch(API_URL + '/users/delete', {
    method: 'DELETE',
    credentials: 'same-origin'
  })
  return res
}

export const meQuery = async () => {
  const res = await fetch(API_URL + '/users/me', {
    method: 'GET',
    credentials: 'same-origin'
  })
  return res
}

