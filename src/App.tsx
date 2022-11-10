import React from 'react';
import {Routes, Route} from "react-router-dom"
import {Active, Login, Register} from "./pages/auth";
import {AuthContextProvider, SidebarContextProvider, UiContextProvider} from "./context";
import {DashboardRoute, ProtectedRoute} from "./routes";
import {CookiesProvider} from "react-cookie";

function App() {

  return (
      <CookiesProvider>
          <AuthContextProvider>
              <UiContextProvider>
                  <SidebarContextProvider>
                      <Routes>
                          <Route path="/*" element={<ProtectedRoute/>}>
                              <Route path="*" element={<DashboardRoute/>}/>
                          </Route>
                          <Route path="/login" element={<Login/>}/>
                          <Route path="/register" element={<Register/>}/>
                          <Route path="/active" element={<Active/>}/>
                      </Routes>
                  </SidebarContextProvider>
              </UiContextProvider>
          </AuthContextProvider>
      </CookiesProvider>
  );
}

export default App;
