import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from './pages/Welcome';
import Login from './pages/registration/Login';
import Register from './pages/registration/Register';
import VerifyPinPage from './pages/registration/VerifyPinPage';
import BiodataForm from './pages/registration/BiodataForm';
import PhoneNumberForm from './pages/registration/PhoneNumberForm';
import NumberVerificationPage from './pages/registration/NumberVerificationPage';
import ProfilePicturePage from './pages/registration/ProfilePicturePage';
import AddressPage from './pages/registration/AddressPage';
import SuccessRegistrationPage from './pages/registration/SuccessRegistrationPage';
import Home from './pages/home/Home';
import OrderPage from './pages/order/OrderPage'
import TransactionPage from './pages/transaction/TransactionPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />

        {/* Login and Registration */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyPinPage />} />
        <Route path="/biodata" element={<BiodataForm />} />
        <Route path="/phonenumber" element={<PhoneNumberForm />} />
        <Route
          path="/numberverification"
          element={<NumberVerificationPage />}
        />
        <Route path="/profilepicture" element={<ProfilePicturePage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/registrationdone" element={<SuccessRegistrationPage />} />

        {/* Home - Order - Transaction Page */}
        <Route path="/home" element={<Home />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Routes>
    </Router>
  );
}

export default App;

