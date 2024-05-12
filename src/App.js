import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Success from './pages/Success';
import Appointment from './pages/Appointment';
import Footer from './components/footer';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';

function App() {
  return (
    <Router>
        <Navbar></Navbar>
      <Routes>
       
        <Route path='/' element={<Login></Login>}  ></Route>
        <Route path='/signup' element={<Signup></Signup>}  ></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}  ></Route>
        <Route path='/success' element={<Success></Success>}  ></Route>
        <Route path='/appointment' element={<Appointment></Appointment>}  ></Route>
        <Route path='/payment-success' element={<PaymentSuccess></PaymentSuccess>}  ></Route>
        <Route path='/payment-cancel' element={<PaymentFailed></PaymentFailed>}  ></Route>
      </Routes>
        <Footer></Footer>
      
    </Router>
  );
}

export default App;
