import { combineReducers } from "redux";

import GetPosts from "./posts";

export default combineReducers({
  postState: GetPosts,
});
