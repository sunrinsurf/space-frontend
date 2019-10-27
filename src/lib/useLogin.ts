import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
function useLogin() {
  const { token, data } = useSelector((state: RootState) => state.Auth);
  if (!token) return null;
  return { token, data };
}

export default useLogin;
