import App from "../pages/App/App";
import PasswordResetPage from "../pages/Password Reset";

export const Routes = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "/password-reset",
        element: <PasswordResetPage />
    }
];