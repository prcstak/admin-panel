import React from 'react';
import  { Route, Routes } from "react-router-dom";
import Home from "./pages/Users";
import Contents from "./pages/Content";
import { Login } from './pages/login/Login'
import ProtectedRoutes from "./components/ProtectedRoutes";
import {createTheme, ThemeProvider} from "@mui/material";
import {grey, red} from "@mui/material/colors";
import User from "./components/User/User";
import Playlist from "./components/Playlist/Playlist";

const appTheme = createTheme({
    palette: {
        secondary: {
            main: grey[700]
        },
        error: {
            main: red[500]
        }
    }
})

function App() {
  return (
      <ThemeProvider theme={appTheme}>
        <div className="App">
{/*            <Routes>
                <Route path="/Login" element={<Login/>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/Users" element={<Home/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Contents" element={<Contents/>}/>
                    <Route path="/User/:id" element={<User/>}/>
                </Route>
            </Routes>*/}
            <Playlist/>
        </div>
      </ThemeProvider>
  );
}

export default App;
