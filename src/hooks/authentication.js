import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router";
import { getUserLoggedState } from "../utils/helpers/permission";

export const useUserAccessValidation = () => {
    const [initilizing, setInitializing] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const validateUserLoggedState = async () => {
        setInitializing(true);
        try {
            const isloggedIn = await getUserLoggedState();
            if (isloggedIn !== true && !['/', '/login'].includes(location.pathname)) {
                navigate('/login', { state: { toPath: location.pathname } });
            } else if (isloggedIn && ['/', '/login'].includes(location.pathname)) {
                navigate('/main-dashboard');
            }
            setInitializing(false);
        } catch (error) {
            setInitializing(false);
            navigate('/login', !['/', '/login'].includes(location.pathname) ? { state: { toPath: location.pathname } } : {});
        }
    }

    useEffect(() => {
        validateUserLoggedState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return initilizing;
}