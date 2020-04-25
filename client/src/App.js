import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {UseRoutes} from "./routes";
import {useAuth} from "./hooks/auth_hooks";
import {AuthContext} from "./context/AuthContext";
import {NavBar} from "./components/NavBar";
import {Loader} from "./components/Loader"
import 'materialize-css';


function App() {
    const {token, userId, login, logout, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = UseRoutes(isAuthenticated)

    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
          <BrowserRouter>
              { isAuthenticated && <NavBar/>}
              <div className="container">
                  {routes}
              </div>
          </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
