import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {LinksPage} from "./pages/links_page";
import {DetailPage} from "./pages/detail_page";
import {CreatePage} from "./pages/create_page";
import {AuthPage} from "./pages/auth_page";


export const UseRoutes = isAuthenticated => {

    if (isAuthenticated) {
        return(
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        );
    }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    );

}
