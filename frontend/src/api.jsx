import axios from "axios"
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

api.interceptors.request.use( // This is the argument that is responsible for intercepting our process of sending requests to check if we have an access token and add it else return an error
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}` // This is how you pass jwt acces_token we create an authorisation header which can be handled by axios. {Bearer 13%a!sd4ad&3afs#}
        }
        return config
    },
    (errors) => {
        return Promise.reject(errors)
    }
)

export default api //We will be using this api object instead of using axios to send out different request so acces_token will be added automatically for us