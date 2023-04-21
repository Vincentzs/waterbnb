import axios from "axios";
import API from "./Api";

class AuthService {
  login(username, password) {
    return axios
      .post(API + "user/login/", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.access) {
          console.log("HERE");
          localStorage.setItem("user", JSON.stringify(response.data));
          document.location.reload();
        }
        return response.data;
      });
  }
  logout() {
    console.log("LOGGED OUT");
    localStorage.removeItem("user");
    document.location.reload();
  }
  register(
    username,
    password1,
    password2,
    first_name,
    last_name,
    email,
    phone,
    contact_method,
    profile_image
  ) {
    return axios.post(API + "user/register/", {
      username,
      password1,
      password2,
      first_name,
      last_name,
      email,
      phone,
      contact_method,
      profile_image,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
