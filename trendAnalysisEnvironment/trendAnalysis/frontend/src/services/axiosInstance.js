// src/services/axiosInstance.js
import axios from 'axios';

// Function to read the CSRF token from the cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Change this to your API base URL if different
  withCredentials: true,
});

// Add a request interceptor to include the CSRF token
axiosInstance.interceptors.request.use(
  config => {
    const csrfToken = getCookie('csrftoken');
    console.log(csrfToken)
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  error => Promise.reject(error)
);



export default axiosInstance;
