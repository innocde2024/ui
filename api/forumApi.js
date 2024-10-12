import Api from "./axios";
import { forumURL } from "./constants";

const forumApi = new Api(forumURL);
export default forumApi;
