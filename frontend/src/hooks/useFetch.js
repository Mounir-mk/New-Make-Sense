import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";

/**
 * Custom Hook for making HTTP requests.
 *
 * @param {string} endpoint - The endpoint of the request after the slash.
 *                             E.g., if the full URL is 'https://api.example.com/data',
 *                             the endpoint should be 'data'.
 * @param {string} method - The HTTP method of the request. E.g., 'GET', 'POST', etc.
 * @param {boolean} [autoload=true] - Whether the request should be made immediately when the component mounts.
 * @param {boolean} [requiresAuth=false] - Whether the request requires authentication.
 * @param {string} [contentType='application/json'] - The content type of the request. Only necessary for 'POST', 'PUT', etc. requests.
 *
 * @returns {Object} - An object with the following properties:
 *   res - The response from the request.
 *   data - The data returned from the request.
 *   loading - Whether the request is currently loading.
 *   error - Any error that occurred during the request.
 *   fetch - A function to manually make the request.
 *   invalidate - A function to invalidate the current data and make the request again.
 */
const useFetch = (
  endpoint,
  method,
  autoload = true,
  requiresAuth = false,
  contentType = "application/json"
) => {
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invalidateCounter, setInvalidateCounter] = useState(0);
  const { auth } = useContext(AuthContext);
  const authHeader = `Bearer ${auth.token}`;

  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const url = `${baseUrl}/${endpoint}`;

  /**
   * Makes a request to the API.
   * @param {Object} [body=null] - The body of the request. Only necessary for 'POST', 'PUT', etc. requests.
   * @param {string} [customEndpoint=null] - A custom endpoint to use instead of the default.
   * @returns {Promise<AxiosResponse<any>>} - The response from the request.
   *
   */

  const fetchData = useCallback(
    async (body = null, customEndpoint = null) => {
      setError(null); // Reset error state
      try {
        const config = {
          // url: `${baseUrl}/${customEndpoint}` || url, // If a custom endpoint is passed, use that instead of the default
          url: customEndpoint ? `${baseUrl}/${customEndpoint}` : url,
          method,
          headers: {
            "Content-Type": contentType,
          },
        };

        if (method !== "DELETE") {
          config.data = body;
        }

        // Si l'autorisation est nécessaire, ajoutez l'en-tête d'autorisation
        if (requiresAuth) {
          config.headers.Authorization = authHeader;
        }

        const res = await axios(config);
        setResponse(res);
        setData(res.data);

        console.warn(res);

        return res;
      } catch (err) {
        setError(err.message);
        return err.message;
      } finally {
        setLoading(false);
      }
    },
    [url, method, requiresAuth, authHeader, contentType]
  );

  useEffect(() => {
    if (autoload || invalidateCounter > 0) {
      fetchData();
    }
  }, [fetchData, autoload, invalidateCounter]);

  return {
    response,
    data,
    loading,
    error,
    fetch: fetchData,
    invalidate: () => setInvalidateCounter((count) => count + 1),
  };
};

export default useFetch;
