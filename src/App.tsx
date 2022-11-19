import React from 'react';
import {Routes, Route} from "react-router-dom"
import {Active, Login, Register} from "./pages/auth";
import {AuthContextProvider, FormulirContextProvider, SidebarContextProvider, UiContextProvider} from "./context";
import {DashboardRoute, ProtectedRoute} from "./routes";
import {CookiesProvider} from "react-cookie";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
      <CookiesProvider>
          <AuthContextProvider>
              <UiContextProvider>
                  <SidebarContextProvider>
                      <FormulirContextProvider>
                          <ToastContainer/>
                              <Routes>
                                  <Route path="/*" element={<ProtectedRoute/>}>
                                      <Route path="*" element={<DashboardRoute/>}/>
                                  </Route>
                                  <Route path="/login" element={<Login/>}/>
                                  <Route path="/register" element={<Register/>}/>
                                  <Route path="/active" element={<Active/>}/>
                              </Routes>
                      </FormulirContextProvider>
                  </SidebarContextProvider>
              </UiContextProvider>
          </AuthContextProvider>
      </CookiesProvider>
  );
}

export default App;
