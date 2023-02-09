import axios from "axios";

class AuthAPI {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:5555/",
      headers: {'Authorization': window.localStorage.getItem('token')}
    });

    //   this.requestUrl = `${AppConfig.apiURL}/users`;
  }

  loginApi = (data) => {
    return this.instance.post("auth/login", data);
  };

  getMe = (data) => {
    return this.instance.get("auth/me");
  };
}

export default new AuthAPI();
