import { create } from "zustand";
import axios from "axios";
import SignUpForm from "../Components/SignUpForm";
axios.defaults.withCredentials = true;

const authStore = create((set) => ({
  loggedIn: null,
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

      console.log("getting name");
      try {
        const user = await axios.get("http://localhost:3001/api/v1/auth/me");
        set({ username: user.data.data.name });
      } catch (err) {
        console.log("failed to get name");
      }

      set({ loggedIn: true });
      set({ token: res.data.token });

      console.log("logged in user", res.data.name);
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
    e.preventDefault();
    const { signupForm } = authStore.getState();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/auth/register",
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
      const res = await axios.get("http://localhost:3001/api/v1/auth/me", {
        withCredentials: true,
        // Authorization: `Bearer ${token}`,
      });
      set({ loggedIn: true });

      set({ username: res.data.data.name });
      console.log("logged in!", res.data.data.name);
    } catch (err) {
      console.log("could not find user");
      set({ loggedIn: false });
    }
  },
}));
export default authStore;
