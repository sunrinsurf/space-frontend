interface category {
    name: string;
};
const categorys: string[] = [
    "자전거",
    "교통수단",
    "장소/공간",
    "구독 서비스",
    "가전제품",
    "모바일/컴퓨터",
    "기타"
];

const initialState = {
    categorys
};

export type CategorysType = typeof initialState;
function Categorys(state = initialState): CategorysType {
    return state;
}

export default Categorys;