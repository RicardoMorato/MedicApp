import axios from "axios";
import  API_URL, {API_URL_CIN}  from "../config/config";

const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export default  api 