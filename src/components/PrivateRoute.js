import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import GlobalState from "../contaxt/GlobalState";

export default function PrivateRoute({ component: Component, ...props }) {
    const { user } = useContext(GlobalState.Context);

    return (
        <Route
            {...props}
            render={(renderProps) =>
                user.isGuestUser ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: renderProps.location },
                        }}
                    />
                ) : (
                    <Component {...renderProps} />
                )
            }
        />
    );
}