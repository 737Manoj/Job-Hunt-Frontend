
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Jobs from "./components/Jobs";
import AuthContextProvider from "./context/AuthContextProvider";
import Register from "./components/Register";
import Apply from "./components/Apply";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import JobSearch from "./modules/JobSearch";
import ErrorBoundary from "./utils/ErrorBoundary";
import ThemeProvider from "./context/ThemeProvider";



const App = () => {

  return(<>
 <ThemeProvider>
<AuthContextProvider>
 
  <div className={`min-h-screen`}>
<Header />
<ErrorBoundary>
    <Routes>
    <Route path="/" element={<Home />} />
    
    <Route path="/job-search" element={<JobSearch />}/>
     <Route path="/jobs/*" element={<ProtectedRoutes component={Jobs  } />} />
      <Route path="/apply/:jobId" element={<Apply />} />
      <Route path="/profile" element={<ProtectedRoutes component={Profile } />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </ErrorBoundary>
    </div>
   
    </AuthContextProvider>
    </ThemeProvider>
  </>
  ) 
}

export default App;