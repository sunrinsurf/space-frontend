import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
function useLogin() {
    const { token } = useSelector((state: RootState) => state.Auth);
    return token;
}

export default useLogin;