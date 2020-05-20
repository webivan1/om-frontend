import config from "./config";
import { http, authHeaders } from "../services/http";

// Types
import { RegionType } from "../store/regions/types";
import { TokenType, UserModelType, UserResponseType } from "../store/user/types";
import { LoginFormType } from "../store/login/types";
import { EventFilterParamsType, EventListType } from "../store/events/profile/list/types";
import { EventPublicListFilterType, EventPublicListType } from "../store/events/public/list/types";
import { EventDetailResponseType } from "../store/events/public/detail/types";
import { EventStatisticType } from "../store/eventStatistic/types";

export type ApiConfigType = {
  region: {
    list: () => Promise<RegionType[]>
  },
  auth: {
    login: (credentials: LoginFormType) => Promise<UserResponseType>,
    checkToken: (token: TokenType) => Promise<UserModelType>
  },
  profile: {
    events: {
      list: (token: TokenType, page: number, form: EventFilterParamsType) => Promise<EventListType>
    }
  },
  public: {
    events: {
      list: (page: number, form: EventPublicListFilterType) => Promise<EventPublicListType>,
      detail: (id: number) => Promise<EventDetailResponseType>,
      stat: (eventId: number) => Promise<EventStatisticType[]>
    }
  }
}

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
      }).then(response => response.data)
    }
  },
  public: {
    events: {
      list: (page, form) => http.post(`${config.root}/event/list`, { page, ...form })
        .then(response => response.data),

      detail: (id: number) => http.get(`${config.root}/event/view/${id}`)
        .then(response => response.data),

      stat: (eventId: number) => http.get(`${config.root}/event/view/${eventId}/stat`)
        .then(response => response.data)
    }
  }
};

export default api;