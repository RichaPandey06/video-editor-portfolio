const BACKEND_URL = import.meta.env.VITE_API_URL;

export const startKeepAlive = () => {
  // ping every 10 minutes to prevent sleep
  setInterval(() => {
    fetch(`${BACKEND_URL}/health`).catch(() => {});
  }, 10 * 60 * 1000);
};