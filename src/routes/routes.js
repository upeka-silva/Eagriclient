import App from "../pages/App/App";
import PasswordResetPage from "../pages/Password Reset";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

export const Routes = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "/password-reset",
        element: <PasswordResetPage />
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