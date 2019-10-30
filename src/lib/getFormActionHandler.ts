function getFormActionHandler(state: any, action: any) {
    return {
        ...state,
        ...action.payload
    }
}
export function getFormActionDispatcher<T>(action: string) {
    return (payload: T) => {
        return {
            type: action,
            payload
        }
    }
}

export default getFormActionHandler;