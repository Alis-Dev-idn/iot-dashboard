import React from 'react';
import {Routes, Route} from "react-router-dom"
import {Login, Register} from "./pages/auth";
import {AuthContextProvider} from "./context";
import {DashboardRoute, ProtectedRoute} from "./routes";
import {CookiesProvider} from "react-cookie";

function App() {

  return (
      <CookiesProvider>
          <AuthContextProvider>
              <Routes>
                  <Route path="*" element={<ProtectedRoute/>}>
                      <Route path="/*" element={<DashboardRoute/>}/>
                  </Route>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
              </Routes>
          </AuthContextProvider>
      </CookiesProvider>
  );
}

export default App;
