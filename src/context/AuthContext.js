import React, { createContext, useContext, useEffect, useState } from "react";
import { getLSItem } from "../services/storage";
import { StorageConstants } from "../services/storage/constant";

export const defaultAuthContext = {
  user: {},
  permissionList: [],
  getUserLoggedState: () => {},
  getUserPermissionStateByModule: (_module = "") => {},
  getUserPermissionStateByAuthority: (_permission = "") => {},
  updateAuthContext: (_token = "") => {},
  resetAuthContext: () => {},
};

export const AuthContext = createContext(defaultAuthContext);

export const AuthContextProvider = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [role, setRole] = useState({});
  const [permissionList, setPermissionList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const updateAuthContext = (token = "") => {
    const tokenBody = atob(token?.split(".")[1] || "");
    const data = tokenBody ? JSON.parse(tokenBody) : {};
    extractData(data);
    return role;
  };

  const getData = async () => {
    const token = (await getLSItem(StorageConstants.token))?.value || "";
    const tokenBody = atob(token?.split(".")[1] || "");
    const data = tokenBody ? JSON.parse(tokenBody) : {};
    extractData(data);
  };

  const extractData = (data = {}) => {
    const { roles = [],permissions = [], firstName = "", lastName = "" } = data || {};
    setUserLoggedIn(Object.keys(data || {}).length > 0);
    setPermissionList(permissions.map((perm) => perm?.authority || ""));
    setUser({
      ...(data?.user || {}),
      userName: firstName + " " + lastName || "",

    });
    setRole(roles[0]);

  };
  console.log(role)
  const getUserLoggedState = () => !!userLoggedIn;

  const getUserPermissionStateByModule = (module = "") => {
    const result =
      permissionList.findIndex((permission) =>
        permission?.toLocaleLowerCase().endsWith(module?.toLocaleLowerCase())
      ) > -1
        ? true
        : false;
    return result;
  };

  const getUserPermissionStateByAuthority = (permission = "") => {
    const result =
      permissionList.findIndex(
        (p) => p?.toLocaleLowerCase() === permission?.toLocaleLowerCase()
      ) > -1
        ? true
        : false;
    return result;
  };

  const resetAuthContext = () => {
    setUserLoggedIn(false);
    setUser({});
    setPermissionList([]);
  };

  const values = {
    user,
    permissionList,
    getUserLoggedState,
    getUserPermissionStateByModule,
    getUserPermissionStateByAuthority,
    updateAuthContext,
    resetAuthContext,
  };

  return <AuthContext.Provider value={values} {...props} />;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
