import React, { createContext, useState, useCallback } from "react";
import cookie from "react-cookies";
import { GLOABL_CONSTANS } from '../Constant';

const Context = createContext();

const guest = { isGuestUser: true, name: "Guest" };

function getUser() {
    const token = cookie.load(GLOABL_CONSTANS.USER_TOKEN);;
    if (!token) return guest;
    return { token: token };
}

function Provider({ children }) {
    const [user, setUser] = useState(getUser());

    /**
     * Handle login
     */
    const handleLogin = useCallback((accessToken) => {
        cookie.save(GLOABL_CONSTANS.USER_TOKEN, accessToken);
        setUser({ token: accessToken });
    }, []);

    /**
     * Handle logout
     */
    const handleLogout = useCallback(() => {
        cookie.remove(GLOABL_CONSTANS.USER_TOKEN);
        setUser(guest);
    }, []);

    return (
        <Context.Provider
            value={{
                user,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default {
    Context,
    Provider,
    Consumer: Context.Consumer,
};