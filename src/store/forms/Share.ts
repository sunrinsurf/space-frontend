import getFormActionHandler, {
  getFormActionDispatcher
} from "../../lib/getFormActionHandler";
import { takeEvery, select, put, call } from "redux-saga/effects";
import { RootState } from "../reducer";
import {
  getFormSelectorDispatcher,
  getFormSelector,
  handleFromSelector
} from "../../lib/getFormSelector";
import loadImageBase64 from "../../lib/store/Share/loadImageBase64";
import { PostProduct } from "../../lib/api/PostProduct";

const CHANGE_ACTION = "Share/CHANGE_ACTION" as const;
const CATEGORY_HANDLE = "Share/CATEGORY_HANDLE" as const;
const ROYALTY_SELECT = "Share/ROYALTY_SELECT" as const;
const TIME_SELECT = "Share/TIME_SELECT" as const;
const CLEAR_FORM = "Share/CLEAR_FORM" as const;
const ADD_IMAGE = "Share/ADD_IMAGE" as const;
const ADD_IMAGE_DONE = "Share/ADD_IMAGE_DONE" as const;
const REMOVE_IMAGE = "Share/REMOVE_IMAGE" as const;
const SUBMIT = "Share/SUBMIT" as const;
const SUBMIT_SUCCESS = "Share/SUBMIT_SUCCESS" as const;
const SUBMIT_FAIL = "Share/SUBMIT_FAIL" as const;

interface ShareChangeInterface {
  title?: string;
  contens?: string;
  timeToUseDate?: Date;
  images?: File[];
}
export const shareChange = getFormActionDispatcher<ShareChangeInterface>(
  CHANGE_ACTION
);
export const shareRoyaltySelect = getFormSelectorDispatcher(ROYALTY_SELECT);
export const shareTimeSelect = getFormSelectorDispatcher(TIME_SELECT);

export function shareCategoryHandle(payload: number) {
  return {
    type: CATEGORY_HANDLE,
    payload
  };
}
export function shareClearForm() {
  return {
    type: CLEAR_FORM
  };
}

export function shareAddImage(images: File[]) {
  return {
    type: ADD_IMAGE,
    payload: images
  };
}
function shareAddImageDone({
  previews,
  images
}: {
  previews: string[];
  images: File[];
}) {
  return {
    type: ADD_IMAGE_DONE,
    payload: { previews, images }
  };
}
export function shareRemoveImage(idx: number) {
  return {
    type: REMOVE_IMAGE,
    payload: idx
  };
}
export function shareSubmit() {
  return {
    type: SUBMIT
  };
}
function shareSubmitSuccess(productId: number) {
  return {
    type: SUBMIT_SUCCESS,
    payload: productId
  };
}
function shareSubmitFail(e: any) {
  return {
    type: SUBMIT_FAIL,
    payload: e
  };
}
type ActionType =
  | ReturnType<typeof shareChange>
  | ReturnType<typeof shareCategoryHandle>
  | ReturnType<typeof shareAddImage>
  | ReturnType<typeof shareAddImageDone>
  | ReturnType<typeof shareRemoveImage>
  | ReturnType<typeof shareSubmit>
  | ReturnType<typeof shareSubmitSuccess>
  | ReturnType<typeof shareSubmitFail>;

function* AddImageSaga({ payload }: { payload: File[] }) {
  let previews = [];
  for (const file of payload) {
    previews.push(yield call(loadImageBase64, file));
  }
  yield put(shareAddImageDone({ previews, images: payload }));
}
function* SubmitSaga() {
  try {
    const {
      share,
      categoryString,
      token
    }: {
      share: ShareType;
      categoryString: string[];
      token: string | null;
    } = yield select((state: RootState) => ({
      share: state.Forms.Share,
      categoryString: state.Categorys.categorys,
      token: state.Auth.token
    }));

    if (!token) {
      throw new Error("로그인 된 상태가 아닙니다.");
    }
    const {
      title,
      contents,
      previews,
      person,
      timeToUse,
      timeToUseDate,
      royaltyPrice,
      royalty,
      category
    } = share;
    if (!category) {
      throw new Error("카테고리를 선택해야 합니다.");
    }
    const req = yield call(
      PostProduct as any,
      {
        title,
        contents,
        images: previews.map(data => ({ data, type: "image/png" })),
        person,
        timeToUse: timeToUse.selected,
        timeToUseDate:
          timeToUse.selected === "selectTime" ? timeToUseDate : undefined,
        royalty: royalty.selected,
        royaltyPrice:
          royalty.selected !== "afterContact" ? royaltyPrice : undefined,
        category: categoryString[category]
      },
      token
    );

    yield put(shareSubmitSuccess(req.data.productId));
  } catch (e) {
    yield put(shareSubmitFail(e));
  }
}
export function* ShareSaga() {
  yield takeEvery(ADD_IMAGE as any, AddImageSaga);
  yield takeEvery(SUBMIT as any, SubmitSaga);
}

const initialState = {
  progress: false,
  success: false,
  productId: null as number | null,
  error: null as string | null,
  category: null as number | null,
  title: "",
  contents: "",
  royalty: getFormSelector({
    afterContact: "협의 후 결정",
    monthly: "월별 지급",
    weekly: "주별 지급"
  }),
  royaltyPrice: "",
  timeToUseDate: new Date(),
  person: 2,
  timeToUse: getFormSelector({
    afterContact: "협의 후 결정",
    selectTime: "날짜/시간 설정",
    noLimit: "제한 없음"
  }),
  images: [] as File[],
  previews: [] as string[]
};
export type ShareType = typeof initialState;

export default function Share(
  state = initialState,
  action: ActionType
): ShareType {
  switch (action.type) {
    case CHANGE_ACTION:
      return getFormActionHandler(state, action);
    case CATEGORY_HANDLE:
      return {
        ...state,
        category: (action as any).payload
      };
    case ROYALTY_SELECT:
      return handleFromSelector(state, action, "royalty");
    case TIME_SELECT:
      return handleFromSelector(state, action, "timeToUse");
    case CLEAR_FORM:
      return initialState;
    case ADD_IMAGE_DONE:
      return {
        ...state,
        previews: [
          ...state.previews,
          ...((action as any).payload as any).previews
        ],
        images: [...state.images, ...(action as any).payload.images]
      };
    case REMOVE_IMAGE:
      const { previews, images } = state;
      previews.splice((action as any).payload as number, 1);
      images.splice((action as any).payload as number, 1);

      return {
        ...state,
        previews,
        images
      };
    case SUBMIT:
      return {
        ...state,
        progress: true
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        success: true,
        productId: (action as any).payload
      };
    case SUBMIT_FAIL:
      return {
        ...state,
        progress: false,
        error: (action as any).payload.message
      };
    default:
      return state;
  }
}
