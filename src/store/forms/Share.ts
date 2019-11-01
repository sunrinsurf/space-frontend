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

const CHANGE_ACTION = "Share/CHANGE_ACTION" as const;
const CATEGORY_HANDLE = "Share/CATEGORY_HANDLE" as const;
const CATEGORY_HANDLE_DONE = "Share/CATEGORY_HANDLE_DONE" as const;
const ROYALTY_SELECT = "Share/ROYALTY_SELECT" as const;
const TIME_SELECT = "Share/TIME_SELECT" as const;
const PERIOD_SELECT = "Share/PERIOD_SELECT" as const;
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
export const sharePeriodSelect = getFormSelectorDispatcher(PERIOD_SELECT);

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

function shareCategoryHandleDone(payload: boolean[]) {
  return {
    type: CATEGORY_HANDLE_DONE,
    payload
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
  }
}
function shareSubmitSuccess() {
  return {
    type: SUBMIT_SUCCESS
  }
}
function shareSubmitFail() {
  return {
    type: SUBMIT_FAIL
  }
}
type ActionType =
  | ReturnType<typeof shareChange>
  | ReturnType<typeof shareCategoryHandleDone>
  | ReturnType<typeof shareCategoryHandle>
  | ReturnType<typeof shareAddImage>
  | ReturnType<typeof shareAddImageDone>
  | ReturnType<typeof shareRemoveImage>;

function* CategoryHandleSaga({ payload }: { payload: number }) {
  const { formCategorys, category } = yield select((state: RootState) => ({
    formCategorys: state.Forms.Share.categorys,
    category: state.Categorys.categorys
  }));
  if (formCategorys && formCategorys.length > 0) {
    const _category = [...formCategorys];
    _category[payload] = !_category[payload];
    yield put(shareCategoryHandleDone(_category));
  } else {
    const _category = category.map((_: any, i: number) => i === payload);
    yield put(shareCategoryHandleDone(_category));
  }
}
function* AddImageSaga({ payload }: { payload: File[] }) {
  let previews = [];
  for (const file of payload) {
    previews.push(yield call(loadImageBase64, file));
  }
  yield put(shareAddImageDone({ previews, images: payload }));
}
function* SubmitSaga() {
  const {title, contents, condition } = yield select((state: RootState) => state.Forms.Share);

}
export function* ShareSaga() {
  yield takeEvery(CATEGORY_HANDLE as any, CategoryHandleSaga);
  yield takeEvery(ADD_IMAGE as any, AddImageSaga);
}

const initialState = {
  progress: false,
  categorys: [] as boolean[],
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
  period: getFormSelector({
    selectPeriod: "기간 선택하기",
    noLimit: "제한 없음"
  }),
  periodDate: new Date(),
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
    case CATEGORY_HANDLE_DONE:
      return {
        ...state,
        categorys: action.payload as boolean[]
      };
    case ROYALTY_SELECT:
      return handleFromSelector(state, action, "royalty");
    case TIME_SELECT:
      return handleFromSelector(state, action, "timeToUse");
    case PERIOD_SELECT:
      return handleFromSelector(state, action, "period");
    case CLEAR_FORM:
      return initialState;
    case ADD_IMAGE_DONE:
      return {
        ...state,
        previews: [...state.previews, ...(action.payload as any).previews],
        images: [...state.images, ...(action.payload as any).images]
      };
    case REMOVE_IMAGE:
      const { previews, images } = state;
      previews.splice(action.payload as number, 1);
      images.splice(action.payload as number, 1);

      return {
        ...state,
        previews,
        images
      };
    case SUBMIT:
      return {
        ...state,
        progress: true
      }
    default:
      return state;
  }
}
