import { create } from "zustand";
import axios from "axios";
axios.defaults.withCredentials = true;

const authStore = create((set) => ({
  loggedIn: null,
  activePage: "login",
  signupError: "",
  loginError: "",
  updateUserError: "",
  user: null,
  username: null,
  loginForm: {
    email: "",
    password: "",
  },
  signupForm: {
    name: "",
    email: "",
    password: "",
    role: "user",
  },
  userForm: {
    name: "auth init",
    foodAndDrink: 0,
    shopping: 0,
    entertainment: 0,
    rent: 0,
    misc: 0,
  },

  updateSignupForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        signupForm: {
          ...state.signupForm,
          [name]: value,
        },
      };
    });
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },

  initUpdateUserForm: (user) => {
    const { userForm } = authStore.getState();
    set({
      userForm: {
        name: user.name,
        foodAndDrink: user.foodAndDrink,
        shopping: user.shopping,
        entertainment: user.entertainment,
        rent: user.rent,
        misc: user.misc,
      },
    });

    console.log(userForm);
  },

  updateUserForm: (e) => {
    const { userForm } = authStore.getState();
    const { name, value } = e.target;

    console.log(name, value);

    set((state) => {
      return {
        userForm: {
          ...state.userForm,
          [name]: value,
        },
      };
    });

    console.log(userForm);
  },

  updateUser: async (e) => {
    const { userForm } = authStore.getState();
    try {
      const res = await axios.put("api/v1/auth/updateDetails", userForm, {
        withCredentials: true,
      });
      set((state) => {
        return {
          user: { ...state.user, userForm },
        };
      });
    } catch (err) {
      set({ updateUserError: err.response.data.error });
    }
  },

  login: async (e) => {
    const { loginForm } = authStore.getState();

    try {
      const res = await axios.post("api/v1/auth/login", loginForm, {
        withCredentials: true,
      });
      set({ loggedIn: true });
      set({ token: res.data.token });
      set({ activePage: "expenses" });

      console.log("logged in user", res.data.name);
    } catch (err) {
      set({ loggedIn: false });
      set({ loginError: err.response.data.error });
      console.log("failed to log in");
    }
  },

  logout: async (e) => {
    try {
      const res = await axios.get("/api/v1/auth/logout", {
        withCredentials: true,
      });
      set({ loggedIn: false });
      set({ activePage: "login" });
    } catch (err) {
      console.log(err);
    }
  },

  signup: async (e) => {
    e.preventDefault();
    const { signupForm } = authStore.getState();
    try {
      const res = await axios.post("api/v1/auth/register", signupForm, {
        withCredentials: true,
      });
      console.log("signed up new user", res.data.name);
      set({ signupError: "" });
      set({ loggedIn: true });
    } catch (err) {
      set({
        signupError: err.response.data.error,
      });
    }
  },

  checkAuth: async (e) => {
    const { user } = authStore.getState();
    try {
      console.log("trying to auth");
      const res = await axios.get("api/v1/auth/me", {
        withCredentials: true,
      });
      set({ loggedIn: true, user: { ...res.data.data } });
      console.log("current user", user);
    } catch (err) {
      console.log("could not find user");
      set({ loggedIn: false });
    }
  },
}));
export default authStore;
