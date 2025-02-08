import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddData from './addDataMongoDB/AddData';
import ShowData from './showDataMongoDB/ShowData';
import Registration from './registrationMongoDB/Registration';
import Login from './loginMongoDB/Login';
import ForgotPassword from './forgotpassword/ForgotPassword';
import ProfilePage from './profilePage/ProfilePage';
import { Link } from 'react-router-dom';
import ResetPassword from './forgotpassword/ResetPassword';
import ProtectionLogin from './Protection_IF_LogOut/ProtectionLogin';

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/" element={<Registration></Registration>}></Route>
          <Route path="/addData" element={
            <ProtectionLogin>
              <AddData></AddData>
            </ProtectionLogin>}>
          </Route>
          <Route path="/showtasks" element={
            <ProtectionLogin>
              <ShowData></ShowData>
            </ProtectionLogin>}>
          </Route>
          <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>
          <Route path="/reset-password/:token" element={<ResetPassword></ResetPassword>}></Route>
          <Route path="/profile" element={
            <ProtectionLogin>
              <ProfilePage></ProfilePage>
            </ProtectionLogin>}>
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
