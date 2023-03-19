
import { combineReducers } from "redux";
import sampleReducer from "./sample";

export const rootReducer = combineReducers({
    sample: sampleReducer,
})