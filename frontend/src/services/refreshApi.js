import axios from "axios";
import { createRefresh } from "react-auth-kit";

const refreshApi = createRefresh({
  interval: 1, // Refreshes the token every minutes
  refreshApiCallback: async ({ authToken, refreshToken }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/token`,
        {
          refreshToken,
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
