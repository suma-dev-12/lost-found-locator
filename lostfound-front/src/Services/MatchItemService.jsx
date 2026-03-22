import axios from "axios";

const MATCH_URL = "http://localhost:9595/lostfound/match";
const LOST_USER_URL = "http://localhost:9595/lostfound/match-lost-user";
const FOUND_USER_URL = "http://localhost:9595/lostfound/match-found-user";

export const saveMatchItem = (matchItem) => {
  return axios.post(MATCH_URL, matchItem, {
    withCredentials: true,
  });
};

export const getAllMatchItems = () => {
  return axios.get(MATCH_URL, {
    withCredentials: true,
  });
};

export const deleteMatchItemById = (lostItemId, foundItemId) => {
  return axios.delete(`${MATCH_URL}/${lostItemId}/${foundItemId}`, {
    withCredentials: true,
  });
};

export const getMatchItemsByLostUsername = () => {
  return axios.get(LOST_USER_URL, {
    withCredentials: true,
  });
};

export const getMatchItemsByFoundUsername = () => {
  return axios.get(FOUND_USER_URL, {
    withCredentials: true,
  });
};

