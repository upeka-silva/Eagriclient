import App from "../pages/App/App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

export const Routes = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
];