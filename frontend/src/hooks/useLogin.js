import { useSignIn } from "react-auth-kit";
import useFetch from "./useFetch";

const useLogin = () => {
  const signIn = useSignIn();
  // useFetch(baseUrl: any, endpoint: string, method: string, autoload?: boolean | undefined, requiresAuth?: boolean | undefined, contentType?: string | undefined): any
  const loginFetch = useFetch("users/login", "POST", false, false);

  const login = async (email, password, rememberMe) => {
    try {
      // Appel à la méthode fetch de useFetch avec le corps de la requête
      const res = await loginFetch.fetch({ email, password, rememberMe });

      if (res.status === 200) {
        signIn({
          token: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          expiresIn: res.data.expiresIn,
          refreshTokenExpireIn: res.data.refreshTokenExpireIn,
          tokenType: "Bearer",
          authState: { user: res.data.authUserState },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { login, error: loginFetch.error, loading: loginFetch.loading };
};

export default useLogin;
