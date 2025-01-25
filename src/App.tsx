import { BrowserRouter,Routes,Route } from "react-router-dom"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from './components/navbar/navbar';
import ProtectedRoute from "./components/routes/protectedroute";
import OnlyAdmin from "./components/routes/onlyAdmin";
import HomeScreen from './pages/homePage';
import LoginComponent from "./components/authComponents/login";
import RegisterComponent from "./components/authComponents/register";
import AllUsers from "./pages/alluserspage";
import AllReservations from "./pages/allreservationspage";
import UserProfile from "./pages/userprofilepage";
import EditUserPage from "./pages/adminedituserpage";
import PageNotFound from "./pages/pagenotfound";
import ReservationPage from "./pages/addreservationpage";
import './App.scss';








function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#593196"
      }
    }
  })

  const isToggle = useMediaQuery('(max-width:500px)');

  return (
    <div className="App">
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
                <Navbar />
                <Stack sx={{flexBasis:"100%"}}  px={isToggle?5:10} py={4}>
                  <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/register" element={<RegisterComponent />} />

                    <Route path="/profile" element={<ProtectedRoute />}>
                      <Route path="/profile" element={<UserProfile />}/>
                    </Route>

                    <Route path="/addreservation" element={<ProtectedRoute />}>
                      <Route path="/addreservation" element={<ReservationPage />}/>
                    </Route>

                    <Route path="/allusers" element={<OnlyAdmin />}>
                      <Route path="/allusers" element={<AllUsers />}/>
                    </Route>

                    <Route path="/edituser/:userId" element={<OnlyAdmin />}>
                      <Route path="/edituser/:userId" element={<EditUserPage />}/>
                    </Route>

                    
                    <Route path="/myreservations" element={<ProtectedRoute />}>
                      <Route path="/myreservations" element={<AllReservations />}/>
                    </Route>

                    
                    <Route path="/allreservations" element={<OnlyAdmin />}>
                      <Route path="/allreservations" element={<AllReservations />}/>
                    </Route>

                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Stack>
            </ThemeProvider>
        </LocalizationProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
