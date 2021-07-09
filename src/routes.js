
import React, { useState, useEffect, Suspense, } from "react";

import {
    BrowserRouter as Router, Route, Switch, BrowserRouter
} from "react-router-dom";
import history from "utils/history";

// pages
//import Explore from 'layouts/Explore'
import SignIn from "pages/SingIn";
import Home from "pages/Home";
import RoutesPrivate from 'utils/Private/RoutesPrivate'

const Routes = () => {
    return (
        <Suspense fallback="loading">
            <Router history={history}
            >
                <Switch>
                    {/*<RoutesPrivate path={`/home`}  >
                                <Home/>
                            </RoutesPrivate> */}
                    <Route path={"/home"} component={Home} />
                    <Route path="/" component={SignIn} />
                    {/*<Route path={`${baseRouter}/*`}>
                                <NotFound />
                            </Route>*/}
                    {/*<Redirect from="*" tyo="/" />*/}
                </Switch>
            </Router>
        </Suspense>
    )
}

export default Routes