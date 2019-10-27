import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkToken } from "../../store/Auth";

let prevLocation: any;
function CheckCookie() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (prevLocation && location.pathname !== prevLocation.pathname) {
      dispatch(checkToken());
    }
    prevLocation = location;
  }, [dispatch, location]);
  return null;
}

export default CheckCookie;
