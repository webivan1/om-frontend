import axios from "axios";

const authHeaders = (userId: string, token: string) => {
  return {
    'X-AUTH-ID': userId,
    Authorization: `Bearer ${token}`
  }
}

export {
  axios as http,
  authHeaders
}