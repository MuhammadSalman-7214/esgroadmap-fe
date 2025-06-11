import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/`,
  withCredentials: true,
});
let isRefreshing = false;
let failedRequestsQueue: any[] = [];
function handleLogout() {
  window.location.href = '/auth/login';
}
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isExpired = error.response?.status === 403;

    if (isExpired && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await axios.post(
            `${API_BASE_URL}/api/v1/auth/regenerateToken`,
            {},
            {
              withCredentials: true,
            }
          );
          isRefreshing = false;
          failedRequestsQueue.forEach((cb) => cb.resolve());
          failedRequestsQueue = [];
          originalRequest._retry = true;
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          failedRequestsQueue.forEach((cb) => cb.reject(refreshError));
          failedRequestsQueue = [];
          handleLogout();
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          resolve: () => {
            originalRequest._retry = true;
            resolve(api(originalRequest));
          },
          reject: (err: any) => {
            reject(err);
          },
        });
      });
    }

    if (error.response?.status === 401) {
      handleLogout();
    }

    return Promise.reject(error);
  }
);

export default api;
