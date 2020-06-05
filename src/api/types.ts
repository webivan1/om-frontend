import { RegionType } from "../store/regions/types";
import { LoginFormType } from "../store/login/types";
import { TokenType, UserModelType, UserResponseType } from "../store/user/types";
import { EventFilterParamsType, EventListType } from "../store/events/profile/list/types";
import { EventFormType } from "../store/events/profile/types";
import { ProfileEventCreateResponse } from "../store/events/profile/create/types";
import { EventPublicListFilterType, EventPublicListType } from "../store/events/public/list/types";
import { EventDetailResponseType } from "../store/events/public/detail/types";
import { EventStatisticType } from "../store/eventStatistic/types";
import { ProfileEventUpdateResponse } from "../store/events/profile/update/types";
import { EventType } from "../store/events/types";

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
      list: (token: TokenType, page: number, form: EventFilterParamsType) => Promise<EventListType>,
      create: (token: TokenType, form: EventFormType) => Promise<ProfileEventCreateResponse>,
      update: (token: TokenType, id: number, form: EventFormType) => Promise<ProfileEventUpdateResponse>,
      detail: (token: TokenType, id: number) => Promise<EventType>,
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