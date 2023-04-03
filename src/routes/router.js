import { Route } from "react-router-dom";
import { Routes } from "./routes";

const Router = Routes.map(r => {
    if (r.children) {
        return (
            <>
                {
                    (r.children.map(cr => (
                        <Route
                            key={r.path + cr.path}
                            path={r.path + cr.path}
                            element={cr.element}
                        />
                    )))
                }
            </>
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