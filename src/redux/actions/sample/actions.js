import { ReduxConstants } from "../../constants";

const { sample } = ReduxConstants;

export const updateSample = (text = "") => dispatch => {
    dispatch({
        type: sample.updateSample,
        payload: text
    })
}