import Cookies from "js-cookie";

export function getAuthToken() {
  let token = localStorage.getItem("token");

  if (!token) {
    token = Cookies.get("token");
  }

  return token;
}

// this redirects user if they are not logged in to the login page

export function authLoader() {
  const token = getAuthToken();
  if (!token) {
    return;
  }
  return null;
}
