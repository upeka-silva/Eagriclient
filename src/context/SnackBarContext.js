import React, { createContext, useContext, useState } from "react"

export const SnackBarContextDefault = {
    snackBars: [],
    addSnackBar: (_val) => { },
    removeSnackBar: (_val) => { },
    resetSnackBar: () => { }
}

export const SnackBarContext = createContext(SnackBarContextDefault);

export const SnackBarProvider = (props) => {
    const [snackBars, setSnackBars] = useState([]);

    const addSnackBar = (snackbar) => {
        let newSnackBars = [...snackBars];
        newSnackBars.push(snackbar);
        setSnackBars(newSnackBars);
    }

    const removeSnackBar = (index) => {
        let newSnackBars = [...snackBars];
        newSnackBars[index] = null;
        setSnackBars(newSnackBars);
    };

    const resetSnackBar = () => {
        setSnackBars([]);
    }

    const value = {
        snackBars,
        addSnackBar,
        removeSnackBar,
        resetSnackBar
    }

    return <SnackBarContext.Provider value={value} {...props} />
}

export const useSnackBars = () => {
    const context = useContext(SnackBarContext);
    return context;
}