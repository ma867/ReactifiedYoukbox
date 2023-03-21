import * as usersAPI from './users-api'
import { Buffer } from 'buffer'

export async function signUp(userData) {
  // Delete the network request code to the
  // users-api.js module which will ultimately
  // return the JWT
  const token = await usersAPI.signUp(userData)
  // Persist the token to localStorage
  window.localStorage.setItem('token', token)
  return getUser()
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials)
  // Persist the token to window.localStorage
  window.localStorage.setItem('token', token)
  return getUser()
}

export function getToken() {
  const token = window.localStorage.getItem('token')
  // getItem will return null if no key
  if (!token) return null
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64'))
  // A JWT's expiration is expressed in seconds, not miliseconds
  if (payload.exp < Date.now() / 1000) {
    // Token has expired
    window.localStorage.removeItem('token')
    return null
  }
  return token
}

export function getUser() {
  const token = getToken()
  return token ? JSON.parse(Buffer.from(token.split('.')[1], 'base64')).user : null
}

export function logOut() {
  window.localStorage.removeItem('token')
}