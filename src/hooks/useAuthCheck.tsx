import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { userLoggedIn } from "../redux/features/user/userSlice";

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage.getItem("user");
    if (localAuth) {
      const user = JSON.parse(localAuth);
      if (user?.accessToken) {
        dispatch(userLoggedIn(user.accessToken));
      }
    }
    setAuthChecked(true);
  }, [dispatch]);
  return authChecked;
};

export default useAuthCheck;
