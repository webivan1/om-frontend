import { ListParamsType } from "../common/types";
import { EventType } from "../events/types";
import { UserModelType } from "../user/types";

export type MessageType = {
  id?: number;
  message: string;
  organizer: boolean;
  event: EventType;
  user: UserModelType | null;
  donation: {
    name: string;
  } | null;
  createdAt: number;
};

export type MessagesType = ListParamsType<MessageType>;

export type ChatType = {
  isOpen: boolean;
  newMessages: number;
};

export type ChatStateType = {
  settings: ChatType;
  list: MessagesType & {
    loader: boolean;
    error: string|null;
  }
}