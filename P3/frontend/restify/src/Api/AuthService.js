import axios from "axios";
import API from "./Api";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(`${API}/user/login/`, {
        username,
        password,
      });
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
        document.location.reload();
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  logout() {
    console.log("LOGGED OUT");
    localStorage.removeItem("user");
    document.location.reload();
  }

  async register(
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
    try {
      const response = await axios.post(`${API}user/register/`, {
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
      return response;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const authService = new AuthService();
export default authService;
