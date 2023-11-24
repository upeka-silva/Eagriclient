import {getLSItem} from "../../services/storage";
import {StorageConstants} from "../../services/storage/constant";

export const isEmpty = (value) => {
    if (value === undefined || value == null) {
        return true;
    }

    if (value.length === 0) {
        return true;
    }

    return false;

}

export const stringAvatar = (name,imageSize) => {

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    return {
        sx: {
            bgcolor: stringToColor(name),
            width: imageSize === "ProfileImgBig" ? 98 : 30,
            height: imageSize === "ProfileImgBig" ? 98 : 30
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}