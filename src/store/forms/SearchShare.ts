const CHANGE_SEARCH = "forms/SearchShare/CHAGE_SEARCH" as const;

export function changeSearch(payload: string) {
  return {
    type: CHANGE_SEARCH,
    payload
  };
}

type ActionType = ReturnType<typeof changeSearch>;
export interface SearchShareType {
  search: string;
}
const initialState: SearchShareType = {
  search: ""
};

export default function(
  state = initialState,
  action: ActionType
): SearchShareType {
  switch (action.type) {
    case CHANGE_SEARCH:
      return {
        ...state,
        search: action.payload
      };
    default:
      return state;
  }
}
