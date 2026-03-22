import axios from "axios";

const USERS_URL = "http://localhost:9595/lostfound/users";

export const getOnlineUsers = () => {
  return axios.get(USERS_URL, { withCredentials: true });
};
