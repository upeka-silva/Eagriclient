import {getLSItem} from "../../services/storage";
import {StorageConstants} from "../../services/storage/constant";

export const isEmpty = (value) => {
    console.log('isEmpty ', value);
    if (value === undefined || value == null) {
        return true;
    }

    if (value.length === 0) {
        console.log('jjjj');
        return true;
    }

    return false;

}