import axios from "axios";
import { baseUrl } from "./Constants/Constance";

const instance = axios.create({
  baseURL: baseUrl,
});
export default instance;
