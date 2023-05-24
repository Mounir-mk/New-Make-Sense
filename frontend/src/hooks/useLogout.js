import { useSignOut, useAuthUser } from "react-auth-kit";
import useFetch from "./useFetch";

const useLogout = () => {
  const signOut = useSignOut();
  const authUser = useAuthUser();
  const logoutFetch = useFetch("users/logout", "POST", false, true);

  const logout = async () => {
    try {
      const res = await logoutFetch.fetch(authUser());
      if (res.status === 200) {
        signOut();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { logout, error: logoutFetch.error, loading: logoutFetch.loading };
};

export default useLogout;
