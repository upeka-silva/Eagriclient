import { Route } from "react-router-dom";
import { Routes } from "./routes";

const Router = Routes.map(r => (
    <Route
        path={r.path}
        element={r.element}
        key={r.path}
    />
)
);

export default Router;