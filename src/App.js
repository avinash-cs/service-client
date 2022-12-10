import React, { useEffect } from "react";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./users/login";
import Profile from "./users/profile";
import EditProfile from "./users/editprofile";
import UpdatePassword from "./users/updatepassword";
import Forgotpassword from "./components/Forgotpassword";
import Setupprofile from "./users/setupprofile";
import Orders from "./product/orders";
import Orderdetails from "./product/orderdetails";
import Detailedservice from "./product/detailedservice";
import Cart from "./product/cart";
import ProfRegister from "./professional/ProfRegister";
import ProfessionalProfile from "./professional/ProfessionalProfile";
import Signup from "./users/Signup";
import ResetPassword from "./users/ResetPassword";
import AllUsers from "./components/allusers";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ProfessionalRoute from "./components/Route/ProfessionalRoute";
import ViewProfile from "./components/viewprofile";
import AddService from "./admin/addservice";
import store from "./store";
import { loadUser } from "./actions/userActions";
import AddCategory from "./admin/addcategory";
import AdminRoute from "./components/Route/AdminRoute";
import checout1  from "./product/checkout1";
import OrderPlaced from "./product/orderplaced";
import ConfirmOrder from "./product/confirmorder";
import UpdateOrder from "./product/updateorder";
import ProfessionalOrders from "./professional/professionalorder";
import Review from "./professional/review";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
       
      <Routes>
      <Route exact path="/review/:id" element={<ProtectedRoute component={Review}/>}/>

      <Route exact path="/professionalorder" element={<ProfessionalRoute component={ProfessionalOrders}/>}/>
      
      <Route exact path="/updateorder/:id" element={<ProfessionalRoute component={UpdateOrder}/>}/>
      
      <Route exact path="/confirmorder" element={<ProtectedRoute component={ConfirmOrder}/>}/>

      <Route exact path="/orderplaced" element={<ProtectedRoute component={OrderPlaced}/>}/>
 
      <Route exact path="/selectprofessional" element={<ProtectedRoute component={checout1}/>}/>

      <Route exact path="/addcategory" element={<AdminRoute component={AddCategory}/>}/>

        <Route exact path="/addservice" element={<AdminRoute component={AddService}/>}/>
        <Route
          exact
          path="/viewprofile/:id"
          element={<ProtectedRoute component={ViewProfile} />}
        />
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/allusers"
          element={<AdminRoute component={AllUsers} />}
        />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/proregister" element={<ProfRegister />} />
        <Route
          exact
          path="/professionalprofile"
          element={<ProfessionalRoute component={ProfessionalProfile} />}
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgotpassword" element={<Forgotpassword />} />
        <Route exact path="/resetpassword/:token" element={<ResetPassword />} />
        <Route
          exact
          path="/setupprofile"
          element={<ProtectedRoute component={Setupprofile} />}
        />
        <Route
          exact
          path="/profile"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          exact
          path="/editprofile"
          element={<ProtectedRoute component={EditProfile} />}
        />
        <Route
          exact
          path="/updatepassword"
          element={<ProtectedRoute component={UpdatePassword} />}
        />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route
          exact
          path="/orders"
          element={<ProtectedRoute component={Orders} />}
        />
        <Route
          exact
          path="/orderdetails/:id"
          element={<ProtectedRoute component={Orderdetails} />}
        />
        <Route
          exact
          path="/service/:name"
          element={<ProtectedRoute component={Detailedservice} />}
        />
        <Route exact path="/cart" element={<ProtectedRoute component={Cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
