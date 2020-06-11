import config from "./config";
import { http, authHeaders } from "../services/http";

// Types
import { ApiConfigType } from "./types";
import { RegionType } from "../store/regions/types";
import { UserModelType, UserResponseType } from "../store/user/types";
import { EventListType } from "../store/events/profile/list/types";
import { ProfileEventCreateResponse } from "../store/events/profile/create/types";

const api: ApiConfigType = {
  region: {
    list: () => http.get<RegionType[]>(`${config.root}/region/list`)
      .then(response => response.data),
  },
  auth: {
    login: (credentials) => http.post<UserResponseType>(`${config.root}/login`, credentials)
      .then(response => response.data),

    checkToken: (token) => http.get<UserModelType>(`${config.root}/user`, {
      headers: authHeaders(token.userId, token.token)
    }).then(response => response.data),
  },
  profile: {
    events: {
      list: (token, page, form) => http.post<EventListType>(`${config.root}/profile/event/list`, { page, ...form }, {
        headers: authHeaders(token.userId, token.token)
      }).then(response => response.data),

      create: (token, form) => http.post<ProfileEventCreateResponse>(`${config.root}/profile/event/create`, form, {
        headers: authHeaders(token.userId, token.token)
      }).then(response => response.data),

      detail: (token, id) => http.get(`${config.root}/profile/event/edit/${id}`, {
        headers: authHeaders(token.userId, token.token)
      }).then(response => response.data),

      update: (token, id, form) => http.post(`${config.root}/profile/event/edit/${id}`, form, {
        headers: authHeaders(token.userId, token.token)
      }).then(response => response.data),

      remove: (token, id) => http.delete(`${config.root}/profile/event/remove/${id}`, {
        headers: authHeaders(token.userId, token.token)
      }),
    }
  },
  public: {
    events: {
      list: (page, form) => http.post(`${config.root}/event/list`, { page, ...form })
        .then(response => response.data),

      detail: (id: number) => http.get(`${config.root}/event/view/${id}`)
        .then(response => response.data),

      stat: (eventId: number) => http.get(`${config.root}/event/view/${eventId}/stat`)
        .then(response => response.data),
    },
    chat: {
      message: (eventId: number, page: number) => http.get(`${config.root}/chat/messages/${eventId}?page=${page}`)
        .then(response => response.data),

      create: (token, eventId, message) => http.put(`${config.root}/chat/message/${eventId}/create`, { message }, {
        headers: authHeaders(token.userId, token.token)
      })
    },
    donation: {
      create: (form) => http.post(`${config.root}/donation/create`, form)
        .then(response => response.data)
    }
  }
};

export default api;