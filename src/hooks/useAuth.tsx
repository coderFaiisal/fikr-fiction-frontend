import { useAppSelector } from "../redux/hook";

const useAuth = () => {
  const user = useAppSelector((state) => state.user);
  if (user?.accessToken && user?.user) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
