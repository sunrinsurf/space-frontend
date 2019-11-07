import { takeEvery, put, select, call, take, fork } from "redux-saga/effects";
import { RootState } from "../reducer";
import { eventChannel } from "redux-saga";
import io from "socket.io-client";
import { baseURL } from "../../lib/api/client";
// Action Type 정의부
const CONNECT = "Socket/CONNECT" as const;
const CONNECT_SUCCESS = "Socket/CONNECT_SUCCESS" as const;
const DISCONNECT = "Socket/DISCONNECT" as const;
const DISCONNECT_SUCCESS = "Socket/DISCONNECT_SUCCESS" as const;
const SOCKET_ERROR = "Socket/SOCKET_ERROR" as const;
const ROOM_DATA = "Socket/ROOM_DATA" as const;
const EMIT_CHAT = "Socket/EMIT_CHAT" as const;
const CHAT_DATA = "Socket/CHAT_DATA" as const;
const BEFORE_CHAT_DATA = "Socket/BEFORE_CHAT_DATA" as const;
const INIT = "Socket/INIT" as const;

let client: SocketIOClient.Socket | undefined | null;

// Action Dispatch 함수
export function SocketConnect(id: string) {
  return {
    type: CONNECT,
    payload: id
  };
}
export function SocketDisconnect() {
  return {
    type: DISCONNECT
  };
}
export function emitChat(message: string) {
  return {
    type: EMIT_CHAT,
    payload: message
  };
}
export function SocketInit() {
  return {
    type: INIT
  };
}
function SocketConnectSuccess(id: string) {
  return {
    type: CONNECT_SUCCESS,
    payload: id
  };
}

function SocketDisconnectSuccess() {
  return {
    type: DISCONNECT_SUCCESS
  };
}
function SocketError(message: string) {
  return {
    type: SOCKET_ERROR,
    payload: message
  };
}
function RoomData(data: any) {
  return {
    type: ROOM_DATA,
    payload: data
  };
}
function ChatData(data: any) {
  return {
    type: CHAT_DATA,
    payload: data
  };
}
function BeforeChatData(data: any) {
  return {
    type: BEFORE_CHAT_DATA,
    payload: data
  };
}

// ActionType 타입
type ActionType =
  | ReturnType<typeof SocketConnect>
  | ReturnType<typeof SocketConnectSuccess>
  | ReturnType<typeof SocketDisconnect>
  | ReturnType<typeof SocketDisconnectSuccess>
  | ReturnType<typeof SocketError>
  | ReturnType<typeof RoomData>
  | ReturnType<typeof emitChat>
  | ReturnType<typeof ChatData>
  | ReturnType<typeof SocketInit>
  | ReturnType<typeof BeforeChatData>;

// Redux-Saga
function* takeDisconnect(worker: any) {
  yield fork(function() {
    takeEvery(DISCONNECT as any, worker);
  });
}
function ErrorChannel() {
  return eventChannel(emit => {
    client &&
      client.on("error", (message: any) => {
        emit(message);
      });
    return () => {
      client && client.off("error");
    };
  });
}
function RoomDataChannel() {
  return eventChannel(emit => {
    client &&
      client.on("room_data", (data: any) => {
        emit(data);
      });
    return () => {
      client && client.off("room_data");
    };
  });
}
function ChatChannel() {
  return eventChannel(emit => {
    client &&
      client.on("chat", (data: any) => {
        emit(data);
      });
    return () => {
      client && client.off("room_data");
    };
  });
}

function* ConnectSaga({ payload }: { payload: string }) {
  const { token, chatId } = yield select((state: RootState) => ({
    token: state.Auth.token,
    chatId: state.Chat.chatData._id
  }));

  client = io.connect(`${baseURL}`);
  client.emit("connect_to", token, chatId);
  yield fork(ErrorSaga);
  yield fork(RoomDataSaga);
  yield fork(ChatDataSaga);
  yield put(SocketConnectSuccess(payload));
}
function* DisconnectSaga() {
  client && client.disconnect();
  client = null;
  yield put(SocketDisconnectSuccess());
}
function* ErrorSaga() {
  const errorChannel = yield call(ErrorChannel);

  yield takeDisconnect(() => {
    errorChannel.close();
  });
  while (true) {
    const payload = yield take(errorChannel);
    yield put(SocketError(payload));
  }
}
function* RoomDataSaga() {
  const roomDataChannel = yield call(RoomDataChannel);
  const { _id } = yield select((state: RootState) => state.Auth.data);
  yield takeDisconnect(() => {
    roomDataChannel.close();
  });
  while (true) {
    const payload = yield take(roomDataChannel);
    console.log(payload);
    yield put(RoomData(payload.room));
    if (payload.chatLogs) {
      yield put(
        BeforeChatData(
          payload.chatLogs.map(
            (data: any): Message => {
              if (data.by._id === _id) {
                return {
                  type: "MY",
                  message: data.message,
                  time: data.time
                };
              }
              return {
                type: "OTHER",
                message: data.message,
                time: data.time,
                nickname: data.by.nickname
              };
            }
          )
        )
      );
    }
  }
}
function* ChatDataSaga() {
  const chatChannel = yield call(ChatChannel);
  yield takeDisconnect(() => {
    chatChannel.close();
  });
  while (true) {
    const payload = yield take(chatChannel);
    yield put(
      ChatData({
        type: "OTHER",
        ...payload,
        time: new Date(payload.time)
      } as Message)
    );
  }
}
function* EmitChatSaga({ payload }: { payload: string }) {
  if (!payload) return;
  client && client.emit("chat", payload);
  yield put(
    ChatData({
      type: "MY",
      message: payload,
      time: new Date()
    } as Message)
  );
}
export function* SocketSaga() {
  yield takeEvery(CONNECT as any, ConnectSaga);
  yield takeEvery(DISCONNECT as any, DisconnectSaga);
  yield takeEvery(EMIT_CHAT as any, EmitChatSaga);
}

// 리듀서
interface Message {
  type: "MY" | "OTHER";
  nickname?: string;
  message: string;
  time: Date;
}
export interface SocketType {
  connected?: boolean;
  roomId: string | null;
  error: string | null;
  onlineData: any;
  messages: Message[];
}

const initialState: SocketType = {
  connected: false,
  roomId: null,
  error: null,
  onlineData: [],
  messages: []
};

export default function(state = initialState, action: ActionType): SocketType {
  switch (action.type) {
    case CONNECT_SUCCESS:
      return {
        ...state,
        error: null,
        roomId: action.payload,
        connected: true
      };
    case DISCONNECT_SUCCESS:
      return {
        ...state,
        error: null,
        roomId: null,
        connected: false
      };
    case SOCKET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ROOM_DATA:
      return {
        ...state,
        onlineData: action.payload
      };
    case CHAT_DATA:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case INIT:
      return initialState;
    case BEFORE_CHAT_DATA:
      console.log(action.payload);
      return {
        ...state,
        messages: [...action.payload, ...state.messages]
      };
    default:
      return state;
  }
}
