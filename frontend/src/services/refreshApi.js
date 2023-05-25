import axios from "axios";
import { createRefresh } from "react-auth-kit";

const refreshApi = createRefresh({
  interval: 20, // Refreshes the token every 20 minutes
  refreshApiCallback: async ({ authToken, refreshToken, authUserState }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/token`,
        {
          refreshToken,
          remberMe: authUserState.user.rememberMe,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (response.data.success) {
        return {
          isSuccess: true,
          newAuthToken: response.data.accessToken,
          newRefreshToken: response.data.refreshToken,
        };
      }
      return { isSuccess: false };
    } catch (error) {
      console.error(error);
      return { isSuccess: false };
    }
  },
});

export default refreshApi;
