import axios from "axios";

class Api {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.response.use(
      (response) => response, // Handle success responses
      (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 403) {
          window.location.replace("/");
        }
        if (error.response?.data?.message === "expired_session") {
          localStorage.removeItem("token");
          window.location.replace("/login");
        }
        return Promise.reject(error);
      }
    );
  }

  post(url, body, headers) {
    return this.instance.post(url, body, headers);
  }

  get(url, body, headers) {
    return this.instance.get(url, body, headers);
  }
  put(url, body, headers) {
    return this.instance.put(url, body , headers);
  }

  patch(url, formData, headers) {
    return this.instance.patch(url, formData , headers);
  }

}

export default Api;
