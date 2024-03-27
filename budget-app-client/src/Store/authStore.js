import { create } from "zustand";
import axios from "axios";
import SignUpForm from "../Components/SignUpForm";
axios.defaults.withCredentials = true;

const authStore = create((set) => ({
  loggedIn: null,
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

  login: async (e) => {
    console.log(axios.defaults.headers);

    const { loginForm } = authStore.getState();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/auth/login",
        loginForm,
        {
          withCredentials: true,
        }
      );

      set({ loggedIn: true });
      set({ token: res.data.token });

      console.log("logged in user");
    } catch (err) {
      set({ loggedIn: false });
      console.log("failed to log in");
    }
  },

  logout: async (e) => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/auth/logout", {
        withCredentials: true,
      });
      set({ loggedIn: false });
    } catch (err) {
      console.log(err);
    }
  },

  signup: async (e) => {
    const { signupForm } = authStore.getState();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        signupForm,
        {
          withCredentials: true,
        }
      );
      set({ loggedIn: true });
    } catch (err) {
      console.log("failed to sign up");
      set({ loggedIn: false });
    }
  },

  checkAuth: async (e) => {
    const { token } = authStore.getState();
    try {
      console.log("trying to auth");
      await axios.get("http://localhost:3001/api/v1/auth/me", {
        withCredentials: true,
        // Authorization: `Bearer ${token}`,
      });
      set({ loggedIn: true });
      console.log("logged in!");
    } catch (err) {
      console.log("could not find user");
      set({ loggedIn: false });
    }
  },
}));
export default authStore;
