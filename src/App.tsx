import React from 'react';
import {Routes, Route} from "react-router-dom"
import {Login, Register} from "./pages/auth";
import {AuthContextProvider, UiContextProvider} from "./context";
import {DashboardRoute, ProtectedRoute} from "./routes";
import {CookiesProvider} from "react-cookie";

function App() {

  return (
      <CookiesProvider>
          <AuthContextProvider>
              <UiContextProvider>
                  <Routes>
                      <Route path="*" element={<ProtectedRoute/>}>
                          <Route path="/*" element={<DashboardRoute/>}/>
                      </Route>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/register" element={<Register/>}/>
                  </Routes>
              </UiContextProvider>
          </AuthContextProvider>
      </CookiesProvider>
  );
}

export default App;
