import { ReduxConstants } from "../../constants";
import { initialState } from "./initialState";

const { sample } = ReduxConstants;

export default function sampleReducer(state = initialState, action) {
    switch (action.type) {
        case sample.updateSample:
            return { ...state, sample: action.payload };
        default:
            return state;
    }
};