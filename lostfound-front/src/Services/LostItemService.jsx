import axios from 'axios';

const LOST_URL='http://localhost:9595/lostfound/lost';

const ID_URL='http://localhost:9595/lostfound/lost-id';
const USER_URL='http://localhost:9595/lostfound/lost-user';
const LOGIN_URL='http://localhost:9595/lostfound/login';



    export const saveLostItem = (lostItem) => {
    return axios.post(LOST_URL, lostItem, {
        withCredentials: true
    });
}

export const getAllLostItems = () => {
    return axios.get(LOST_URL, {
        withCredentials: true
    });
}

export const getLostItemById = (id) => {
    return axios.get(`${LOST_URL}/${id}`, {
        withCredentials: true
    });
}

export const deleteLostItemById = (id) => {
    return axios.delete(`${LOST_URL}/${id}`, {
        withCredentials: true
    });
}

export const updateLostItem = (lostItem) => {
    return axios.put(LOST_URL, lostItem, {
        withCredentials: true
    });
}

export const generateId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
}

export const getLostItemsByUsername = () => {
    return axios.get(USER_URL, {
        withCredentials: true
    });
}

export const validateUser = (userId, password) => {
    return axios.get(`${LOGIN_URL}/${userId}/${password}`, {
        withCredentials: true
    });
}