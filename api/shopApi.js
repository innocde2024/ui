import Api from "./axios";
import { shopURL } from "./constants";

const shopApi = new Api(shopURL);
export default shopApi;
