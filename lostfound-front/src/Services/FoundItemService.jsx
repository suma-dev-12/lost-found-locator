import axios from 'axios';

const FOUND_URL = 'http://localhost:9595/lostfound/found';

const ID_URL = 'http://localhost:9595/lostfound/found-id';
const USER_URL = 'http://localhost:9595/lostfound/found-user';
const LOGIN_URL = 'http://localhost:9595/lostfound/login';



    export const saveFoundItem = (foundItem) => {
    return axios.post(FOUND_URL, foundItem, {
        withCredentials: true
    });
}

export const getAllFoundItems = () => {
    return axios.get(FOUND_URL, {
        withCredentials: true
    });
}

export const getFoundItemById = (id) => {
    return axios.get(`${FOUND_URL}/${id}`, {
        withCredentials: true
    });
}

export const deleteFoundItemById = (id) => {
    return axios.delete(`${FOUND_URL}/${id}`, {
        withCredentials: true
    });
}

export const updateFoundItem = (foundItem) => {
    return axios.put(FOUND_URL, foundItem, {
        withCredentials: true
    });
}

export const generateId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
}

export const getFoundItemsByUsername = () => {
    return axios.get(USER_URL, {
        withCredentials: true
    });
}

/** Probable matching found items for a lost item id (backend: same category + similarity). */
export const getFoundItemsByLostItem = (lostItemId) => {
    return axios.get(`http://localhost:9595/lostfound/found-by-lost/${lostItemId}`, {
        withCredentials: true
    });
}

export const validateUser = (userId, password) => {
    return axios.get(`${LOGIN_URL}/${userId}/${password}`, {
        withCredentials: true
    });
}