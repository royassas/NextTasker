import api from "./api";
import TokenService from "./token.service";

const register = (nickname, lastname, firstname, description, email, password) => {
  return api.post("/auth/signup", {
    nickname,
    lastname, 
    firstname,
    description,
    email,
    password
  });
};

const login = (nickname, password) => {
  return api
    .post("/auth/signin", {
      nickname,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;