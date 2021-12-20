import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./header.css";
import { useAlert } from "react-alert";
import { logoutUser } from "../actions/userActions";
import { getAllProfs } from "../actions/userActions";
import { useNavigate } from "react-router";
function Header() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const handleClick = (e) => {
    dispatch(getAllProfs());
    navigate('/allusers');
  }
  const { user, isAuthenticated } = useSelector((state) => state.user);
  

 
  const handleLogout = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  const userLink = () => {
    return (
      <ul id="tranform-ul">
        
        <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
               
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
               <img className="user-avatar" src={user.avatar.url} alt="" />  {user.name}
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
                {user.role==="admin"?(
                <div>
                <Link className="dropdown-item" to="/addservice">
                  Add Service
                </Link>
                <Link className="dropdown-item" to="/addcategory">
                 Add Category
               </Link>
               <Link className="dropdown-item" to="/allusers" onClick={handleClick}>All Professional</Link>
                </div>
                
                ):(
                  <></>
                 )
  }
                
                <Link className="dropdown-item" to="/orders">
                  My Orders
                </Link>
                {
                  user.role==="professional" &&<Link className="dropdown-item" to="/professionalorder">Professional Orders</Link>
                }
                <Link to="/" onClick={handleLogout}>
              
              <img
                alt="..."
                className="login"
                src="https://img.icons8.com/fluency/64/000000/login-rounded-right.png"
              />
              Logout
            </Link>
               
               
              </div>
            </li>
      </ul>
    );
  };

  const transForm = {
    transform: isAuthenticated ? "translateY(-1px)" : 0,
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img className="navbar-logo" src="https://img.icons8.com/bubbles/50/000000/react.png" alt="" />
          ServiceFare
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item ">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            
           
          </ul>
            {isAuthenticated &&
              <Link className="nav-link" to="/cart">
            <img
              alt="..."
              className="cart"
              src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/000000/external-cart-grocery-flatart-icons-solid-flatarticons.png"
            />
            Cart
          </Link>}
          <div id="ul-div">
            <ul id="tranform-ul" style={transForm}>
              {isAuthenticated ? (
                userLink()
              ) : (
                <li>
                <button  id="order-btn" className="btn btn-outline-success my-2 my-sm-0"
                >
                <Link className="dropdown-item" to="/proregister">
                  Register as Professional
                </Link>
                </button>
                  <button id="order-btn" 
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    <Link to="/login">
                      <i className="fas fa-user"></i>
                      <img
                        className="login"
                        alt="..."
                        src="https://img.icons8.com/external-bearicons-outline-color-bearicons/64/000000/external-sign-up-call-to-action-bearicons-outline-color-bearicons-1.png"
                      />
                      Sign in
                    </Link>
                  </button>
                </li>
              )}
            </ul>
          </div>
        
        </div>
      </nav>
    </header>
  );
}

export default Header;
