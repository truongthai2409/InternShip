import api from "./apiConfig";

const registerApi = {
    checkUser: (data) => {
        return api.post("/user", data)
    },

    registerUser: (data, role) => {
        return api.post(`/${role}`, data)
    }
}

export default registerApi