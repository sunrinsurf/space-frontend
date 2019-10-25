function sagaType(action: string) {
  return [action, action + "_SUCCESS", action + "_FAIL"];
}

export default sagaType;
