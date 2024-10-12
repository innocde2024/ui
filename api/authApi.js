import Api from "./axios";
import { authURL } from "./constants";

const authApi = new Api(authURL);
export default authApi;
