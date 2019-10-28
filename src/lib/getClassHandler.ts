function getClassHandler(componentName: string): (className: string) => string {
    return (className: string) => {
        return componentName + '__' + className;
    }
}

export default getClassHandler;