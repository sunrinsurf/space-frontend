import { takeEvery, select, call, put } from "redux-saga/effects";
import { InviteChatAPI, JoinChatAPI } from "../lib/api/Chat";
import { RootState } from "./reducer";

const JOIN_CHAT = "Chat/JOIN_CHAT" as const;
const JOIN_CHAT_SUCCESS = "Chat/JOIN_CHAT_SUCCESS" as const;
const JOIN_CHAT_FAIL = "Chat/JOIN_CHAT_FAIL" as const;

const INVITE_CHAT = "Chat/INVITE_CHAT" as const;
const INVITE_CHAT_SUCCESS = "Chat/INVITE_CHAT_SUCCESS" as const;
const INVITE_CHAT_FAIL = "Chat/INVITE_CHAT_FAIL" as const;

const CLEAN = "Chat/CLEAN" as const;

export function CleanChat() {
  console.log("cleanchat");
  return {
    type: CLEAN
  };
}
export function JoinChat(id: string) {
  return {
    type: JOIN_CHAT,
    payload: id
  };
}
function JoinChatSuccess(data: any) {
  return {
    type: JOIN_CHAT_SUCCESS,
    payload: data
  };
}
function JoinChatFail(e: any) {
  return {
    type: JOIN_CHAT_FAIL,
    payload: e
  };
}

export function InviteChat(id: string) {
  return {
    type: INVITE_CHAT,
    payload: id
  };
}
function InviteChatSuccess() {
  return {
    type: INVITE_CHAT_SUCCESS
  };
}
function InviteChatFail(e: any) {
  return {
    type: INVITE_CHAT_FAIL,
    payload: e
  };
}

type ActionType =
  | ReturnType<typeof JoinChat>
  | ReturnType<typeof JoinChatSuccess>
  | ReturnType<typeof JoinChatFail>
  | ReturnType<typeof InviteChat>
  | ReturnType<typeof InviteChatSuccess>
  | ReturnType<typeof InviteChatFail>
  | ReturnType<typeof CleanChat>;

interface InviteSagaInterface {
  payload: string;
}
function* InviteSaga({ payload }: InviteSagaInterface) {
  try {
    const token = yield select((state: RootState) => state.Auth.token);
    if (!token) throw new Error("로그인이 필요합니다.");
    yield call(InviteChatAPI, payload, token);
    yield put(InviteChatSuccess());
  } catch (e) {
    yield put(InviteChatFail(e));
  }
}
function* JoinSaga({ payload }: InviteSagaInterface) {
  try {
    const token = yield select((state: RootState) => state.Auth.token);
    if (!token) throw new Error("로그인이 필요합니다.");
    const data = yield call(JoinChatAPI, payload, token);
    yield put(JoinChatSuccess(data));
  } catch (e) {
    yield put(JoinChatFail(e));
  }
}
export function* ChatSaga() {
  yield takeEvery(INVITE_CHAT as any, InviteSaga);
  yield takeEvery(JOIN_CHAT as any, JoinSaga);
}
export interface ChatType {
  chatJoined: boolean;
  invited: boolean;
  error: any;
  chatData: any;
}

const initialState: ChatType = {
  chatJoined: false,
  chatData: null,
  invited: false,
  error: null
};

export default function(state = initialState, action: ActionType): ChatType {
  switch (action.type) {
    case CLEAN:
      return initialState;
    case INVITE_CHAT_SUCCESS:
      return {
        ...state,
        invited: true
      };
    case JOIN_CHAT_SUCCESS:
      return {
        ...state,
        chatJoined: true,
        chatData: action.payload
      };
    case INVITE_CHAT_FAIL:
    case JOIN_CHAT_FAIL:
      return {
        ...state,
        chatJoined: false,
        error: action.payload.message
      };
    default:
      return state;
  }
}
