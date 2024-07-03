import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Loginpage from './pages/login/Loginpage';
import Registerpage from './pages/register/Registerpage';
import Navbar from './components/Navbar';

//Toast config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/admin/admin_dashboard/AdminDashboard';
import UpdateProduct from './pages/admin/update_product/UpdateProduct';
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';
import Profile from './pages/profile/Profile';
import ForgotPassword from './pages/forgot_password/ForgotPassword';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Registerpage/>} />
        <Route path='/login' element={<Loginpage/>} />

        {/* Admin routes */}
        <Route element={<AdminRoutes />}>
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/update/:id' element={<UpdateProduct/>} />
        </Route>

        {/* User routes */}
        <Route element={<UserRoutes/>}>
          <Route path='profile' element={<Profile/>}/>
        </Route>

        <Route path='/forgot_password' element={<ForgotPassword/>} />

      </Routes>
    </Router>
  );
}

//Task: create for login and register

export default App;
