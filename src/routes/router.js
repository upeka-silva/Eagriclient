import { Route } from "react-router-dom";
import { Routes } from "./routes";

const Router = Routes.map(r => {
    if (r.children) {
        return (
            <Route
                path={r.path}
                element={r.element}
                key={r.path}
            >
                {
                    r.children.map(cr => (
                        <Route
                            path={r.path + cr.path}
                            element={cr.element}
                            key={cr.path}
                        />
                    ))
                }
            </Route>
        )
    } else {
        return (
            <Route
                path={r.path}
                element={r.element}
                key={r.path}
            />
        )
    }
}
);

export default Router;