
interface getFormSelectorReturns {
    options: { [key: string]: string },
    selected: string
}
export function getFormSelector(options: { [key: string]: string }, defaultOption?: string): getFormSelectorReturns {
    return {
        options,
        selected: defaultOption ? defaultOption : Object.keys(options)[0]
    }
}

export function handleFromSelector(state: any, action: any, field: string) {
    return {
        ...state,
        [field]: {
            options: state[field].options,
            selected: action.payload
        }
    }
}

export function getFormSelectorDispatcher(type: string) {
    return (id: string) => {
        return {
            type,
            payload: id
        }
    }
}