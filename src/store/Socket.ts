import { takeEvery, put, select, call, take, fork } from "redux-saga/effects";
import { RootState } from "./reducer";
import { eventChannel } from "redux-saga";
import io from "socket.io-client";
import { baseURL } from "../lib/api/client";
// Action Type 정의부
const CONNECT = "Socket/CONNECT" as const;
const CONNECT_SUCCESS = "Socket/CONNECT_SUCCESS" as const;
const DISCONNECT = "Socket/DISCONNECT" as const;
const DISCONNECT_SUCCESS = "Socket/DISCONNECT_SUCCESS" as const;
const SOCKET_ERROR = "Socket/SOCKET_ERROR" as const;
const ROOM_DATA = "Socket/ROOM_DATA" as const;

let client: SocketIOClient.Socket | undefined;

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

// ActionType 타입
type ActionType =
  | ReturnType<typeof SocketConnect>
  | ReturnType<typeof SocketConnectSuccess>
  | ReturnType<typeof SocketDisconnect>
  | ReturnType<typeof SocketDisconnectSuccess>
  | ReturnType<typeof SocketError>
  | ReturnType<typeof RoomData>;

// Redux-Saga
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
function* ConnectSaga({ payload }: { payload: string }) {
  const token = yield select((state: RootState) => state.Auth.token);

  client = io.connect(`${baseURL}/${payload}`);
  client.emit("connect_to", token);
  yield fork(ErrorSaga);
  yield fork(RoomDataSaga);
  yield put(SocketConnectSuccess(payload));
}
function* DisconnectSaga() {
  client && client.disconnect();
  yield put(SocketDisconnectSuccess());
}
function* ErrorSaga() {
  const errorChannel = yield call(ErrorChannel);

  while (true) {
    const payload = yield take(errorChannel);
    yield put(SocketError(payload));
  }
}
function* RoomDataSaga() {
  const roomDataChannel = yield call(RoomDataChannel);

  while (true) {
    const payload = yield take(roomDataChannel);
    yield put(RoomData(payload));
  }
}
export function* SocketSaga() {
  yield takeEvery(CONNECT as any, ConnectSaga);
  yield takeEvery(DISCONNECT as any, DisconnectSaga);
}

// 리듀서
export interface SocketType {
  connected?: boolean;
  roomId: string | null;
  error: string | null;
  onlineData: any;
}

const initialState: SocketType = {
  connected: false,
  roomId: null,
  error: null,
  onlineData: null
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
    default:
      return state;
  }
}
