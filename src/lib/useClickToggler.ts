import React from "react";

function useClickToggler(setter: any, data: boolean) {
  const toggler = React.useCallback(() => {
    setter(!data);
  }, [setter, data]);

  return toggler;
}

export default useClickToggler;
