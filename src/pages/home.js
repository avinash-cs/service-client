
import skillsimg from "./skills.png";
import Header from "../components/header"
import './home.css';
import userimg from './user-img.png';
import chetan from './chetan.jpeg';
import { useSelector} from "react-redux";
import avinash from './avinash-1.png';
import { Link } from "react-router-dom";

export default function Home() {

  const {  isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <div id="App">
      <Header />

        
        <div id="row">
          <div id="column">
            <div id="col-1">
            <h1 id="App-title">
            <span id="main-logo">ServiceFare </span> <br />
            </h1>
            <br/>
            <h5>
            Website for providing daily need services.<br/>We offer <span id="service-word">Development</span> <br/>SignUp now to get all service from your home</h5>
            <br/>
            { isAuthenticated?            <Link to="/dashboard"><button id="signup-btn"  className="btn btn-outline-success my-2 my-sm-0">Dashboard</button></Link>
:
            <Link to="/signup"><button id="signup-btn"  className="btn btn-outline-success my-2 my-sm-0">Sign Up</button></Link>}
            </div>
          </div>
          <div id="column">
          <img src={skillsimg} id="service-img" alt="login to take service" />
            
          </div>
        </div>
        <h3 id="center-it" className="margin-dedo"> How to use </h3>
        <hr />
        <div id="row2">
          <div id="row33">
            <div id="column3" >
              <h2>Step 1</h2>
              <p>Create an account by <Link to="/signup">signup</Link> and <br/><Link to="/login">login</Link> into your account.</p>
            </div>
            <div id="column3" >
              <h2>Step 2</h2>
              <p>Go to <Link to="/dashboard">Dashboard</Link> page &<br/> select a category.</p>
            </div>
            <div id="column3" >
              <h2>Step 3</h2>
              <p>Now after adding your service to cart .<br/>Visit <Link to="/cart">Add to Cart</Link> page for checkout</p>
            </div>
            <div id="column3" >
              <h2>Step 4</h2>
              <p>Select a professional from which you <br/>want service and click on submit.<br/>🎉Hurray order placed</p>
            </div>
            </div>
        </div>
        <div id="about-us">
        <div>
          <h3 id="center-it">About Us</h3>
          <hr/>
          <p>ServiceFare is a webapp for providing various day to day service to people from people. <br/>It helps one person to take a service and one person to provide a service.<br/>This website is built using MERN Stack.</p>

        </div>
        </div>
        <div id="our-services">
          <h3 id="center-it">Our Services</h3>
          <hr/>
          <div id="service-cont">
                <div id="service">
                    <a href="#">
                        <img alt="..." id="service-icon" src="https://img.icons8.com/external-inipagistudio-mixed-inipagistudio/50/000000/external-ac-domotics-home-inipagistudio-mixed-inipagistudio.png"/>
                        <h4> AC Service & Repair</h4>
                    </a>
                </div>
                <div id="service">
                    <a href="#">
                    <img alt="..." id="service-icon" src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-paint-roller-creative-kiranshastry-lineal-color-kiranshastry.png"/>
                    <h4>    Painters </h4>
                    </a>
                </div>
                <div id="service"><a href="#">
                <img  alt="..." id="service-icon" src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/000000/external-electrician-male-occupation-avatar-itim2101-lineal-color-itim2101.png"/>
                  <h4>  Electricians </h4>
                    </a></div>
                <div id="service"><a href="#">
                <img alt="..." id="service-icon"  src="https://img.icons8.com/external-ddara-lineal-color-ddara/64/000000/external-plumber-professions-ddara-lineal-color-ddara.png"/>
                    <h4>Plumber</h4></a></div>
                
                <div id="service"><a href="#">
                <img alt="..." id="service-icon" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-carpenter-labour-day-wanicon-lineal-color-wanicon.png"/>
                    <h4>Carpenter</h4></a></div>
                <div id="service"><a href="#">
                <img alt="..." id="service-icon" src="https://img.icons8.com/external-inipagistudio-lineal-color-inipagistudio/64/000000/external-bug-spray-agricultural-pest-control-inipagistudio-lineal-color-inipagistudio.png"/>
                    <h4>Pest Control</h4></a></div>
                <div id="service"><a href="#">
                <img alt="..." id="service-icon" src="https://img.icons8.com/material-outlined/24/000000/domain.png"/>
                    <h4>Website Developer</h4></a></div>
                <div id="service"><a href="#">
                <img alt="..."  id="service-icon" src="https://img.icons8.com/ios-filled/50/000000/developer-mode.png"/>
                    <h4>App Developer</h4></a></div>

            </div>
        </div>
        <div id="our-services">
          <h3 id="center-it">Website Developers</h3>
          <hr/>
          <div className="service-product">
          <div className="card" id="product-card" >
            <img
              src={avinash}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">
              <hr/>
                <h3 id="center-it">Avinash</h3>
              </h5>
              <p className="card-text">Website Developer</p>
            </div>
            
          </div>
          <div className="card" id="product-card" >
            <img
              src={chetan}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">
              <hr/>
                <h3 id="center-it">Chetan</h3>
              </h5>
              <p className="card-text">Website Developer</p>
            </div>
            
          </div>
          <div className="card" id="product-card" >
            <img
              src={userimg}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <hr/>
              <h5 className="card-title">
                <h3 id="center-it">Mrs Aayushi Bansal</h3>
              </h5>
              <p className="card-text">Mentor</p>
            </div>
          </div>
          </div>
        </div>
        <footer>
          <hr/>
          <p>All Right Reserved || &copy; ServiceFare</p>
        </footer>
      </div>
      
    </>
  );
}
