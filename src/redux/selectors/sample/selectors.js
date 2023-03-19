import { createSelector } from "reselect";
import { initialState } from "../../reducers/sample/initialState";

export const initialSampleState = (state) => state.sample || initialState;

export const selectSample = createSelector(initialSampleState, (initialState) => {
    return initialState.sample || "Not found";
});