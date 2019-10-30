import getFormActionHandler, { getFormActionDispatcher } from "../../lib/getFormActionHandler";
import { takeEvery, select, put } from 'redux-saga/effects';
import { RootState } from "../reducer";
import { getFormSelectorDispatcher, getFormSelector, handleFromSelector } from "../../lib/getFormSelector";

const CHANGE_ACTION = 'Share/CHANGE_ACTION' as const;
const CATEGORY_HANDLE = 'Share/CATEGORY_HANDLE' as const;
const CATEGORY_HANDLE_DONE = 'Share/CATEGORY_HANDLE_DONE' as const;
const ROYALTY_SELECT = 'Share/ROYALTY_SELECT' as const;
const TIME_SELECT = 'Share/TIME_SELECT' as const;
const PERIOD_SELECT = 'Share/PERIOD_SELECT' as const;
const CLEAR_FORM = 'Share/CLEAR_FORM' as const;

interface ShareChangeInterface {
    title?: string,
    contens?: string,
    timeToUseDate?: Date
};
export const shareChange = getFormActionDispatcher<ShareChangeInterface>(CHANGE_ACTION);
export const shareRoyaltySelect = getFormSelectorDispatcher(ROYALTY_SELECT);
export const shareTimeSelect = getFormSelectorDispatcher(TIME_SELECT);
export const sharePeriodSelect = getFormSelectorDispatcher(PERIOD_SELECT);

export function shareCategoryHandle(payload: number) {
    return {
        type: CATEGORY_HANDLE,
        payload
    }
};
export function shareClearForm() {
    return {
        type: CLEAR_FORM
    }
}

function shareCategoryHandleDone(payload: boolean[]) {
    return {
        type: CATEGORY_HANDLE_DONE,
        payload
    }
}
type ActionType = ReturnType<typeof shareChange> | ReturnType<typeof shareCategoryHandleDone> | ReturnType<typeof shareCategoryHandle>;

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
        const _category = category.map((_: any, i: number) => (i === payload));
        yield put(shareCategoryHandleDone(_category));
    }
}
export function* ShareSaga() {
    yield takeEvery((CATEGORY_HANDLE as any), CategoryHandleSaga);
}

const initialState: { [key: string]: any } = {
    categorys: ([] as boolean[]),
    title: "",
    contents: "",
    royalty: getFormSelector({
        afterContact: "협의 후 결정",
        monthly: "월별 지급",
        weekly: "주별 지급"
    }),
    royaltyPrice: '',
    timeToUseDate: new Date(),
    person: 2,
    timeToUse: getFormSelector({
        afterContact: "협의 후 결정",
        selectTime: "날짜/시간 설정",
        noLimit: "제한 없음"
    }),
    period: getFormSelector({
        selectPeriod: '기간 선택하기',
        noLimit: '제한 없음'
    }),
    periodDate: new Date()
};
export type ShareType = typeof initialState;

export default function Share(state = initialState, action: ActionType): ShareType {
    switch (action.type) {
        case CHANGE_ACTION:
            return getFormActionHandler(state, action);
        case CATEGORY_HANDLE_DONE:
            return {
                ...state,
                categorys: (action.payload as boolean[])
            }
        case ROYALTY_SELECT:
            return handleFromSelector(state, action, "royalty")
        case TIME_SELECT:
            return handleFromSelector(state, action, "timeToUse")
        case PERIOD_SELECT:
            return handleFromSelector(state, action, "period");
        case CLEAR_FORM:
            return initialState;
        default:
            return state;
    }
}