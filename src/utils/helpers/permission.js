import { FormatAlignJustifyTwoTone } from "@mui/icons-material";
import { getLSItem } from "../../services/storage";
import { StorageConstants } from "../../services/storage/constant";
import Pako from "pako";

export const getUserLoggedState = async () => {
  try {
    const token = (await getLSItem(StorageConstants.token, false)).value;
    return token !== null || false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCurrentUserPermissionList = async () => {
  try {
    const token = (await getLSItem(StorageConstants.token, false)).value;
    if (token === null) {
      return [];
    }
    const authString = window.atob(token.split(".")[1] || "");
    const authorities = (JSON.parse(authString) || {})?.permissions || [];
    return authorities;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUserPermissionStateByAuthority = async (permission) => {
  try {
    const authorities = (await getCurrentUserPermissionList()) || [];
    return (
      authorities.findIndex((a) => a?.authority === permission) > -1 || false
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserPermissionStateByModule = async (module) => {
  try {
    const authorities = (await getCurrentUserPermissionList()) || [];

    return (
      authorities.find((a) => {
        let auth = (a?.authority || "")?.toLowerCase();
        return (
          auth.startsWith(module?.toLowerCase()) ||
          auth.endsWith(module?.toLowerCase())
        );
      }).length > 0 || false
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const decompressJWT = (jwt = "") => {
  try {
    const strData = window.atob(jwt);

    // Convert binary string to character-number array
    const charData = strData.split("").map(function (x) {
      return x.charCodeAt(0);
    });

    // Turn number array into byte-array
    const binData = new Uint8Array(charData);

    // Pako magic
    const data = Pako.inflate(binData);

    // Convert gunzipped byteArray back to ascii string:
    const unzipData = String.fromCharCode.apply(null, new Uint16Array(data));

    return unzipData;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPermissionByComponent = async (module) => {
  try {
    const authorities = (await getCurrentUserPermissionList()) || [];
    console.log(authorities);
    const filteredArray = authorities.filter((item) => {
      return item.authority.includes(module);
    });
    const permission = {
      ADD: filteredArray.some((item) => item.authority.includes("ADD")),
      DELETE: filteredArray.some((item) => item.authority.includes("DELETE")),
      EDIT: filteredArray.some((item) => item.authority.includes("EDIT")),
      VIEW: filteredArray.some((item) => item.authority.includes("VIEW")),
      VIEW_LIST: filteredArray.some((item) => item.authority.includes("VIEW_LIST")),
    };

    if (
      permission.ADD ||
      permission.DELETE ||
      permission.EDIT ||
      permission.VIEW ||
      permission.VIEW_LIST
    ) {
      permission.isEnabled = true;
    } else {
      permission.isEnabled = false;
    }
    return permission

  } catch (error) {
    console.log(error);
    return false;
  }
};
