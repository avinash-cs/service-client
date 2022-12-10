import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "./editprofile.css";
import MetaData from "../components/layout/MetaData";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { clearErrors, loadUser, updateProfile } from "../actions/userActions";
import Loader from "../components/layout/Loader/Loader";
import {  getAllCategories } from "../actions/serviceActions";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";


function EditProfile() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    error: LoadingError,
    isAuthenticated,
  } = useSelector((state) => state.user);

  const address = user.address;
  const professional = user.professional;
  const {error : CategoryError, loading : CategoryLoading, categories} = useSelector(state => state.newCategory);

  const { error, isUpdated, loading } = useSelector(
    (state) => state.updateProfile
  );

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [country, setCountry] = useState(address.country);
  const [state, setState] = useState(address.state);
  const [city, setCity] = useState(address.city);
  const [district, setDistrict] = useState(address.district);
  const [pincode, setPincode] = useState(address.pincode);
  const [gender, setGender] = useState(user.gender);
  const [phoneno, setPhoneno] = useState(user.phoneno);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
  const [spec, setSpec] = useState(professional ? professional.specialization:"");
  const [bio, setBio] = useState(professional ? professional.about:"");
  const [exp, setExp] = useState(professional ? professional.experience:"");
  const [rating, setRating] = useState(professional ? professional.rating : 0);


  const imgDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const setupProfileHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("gender", gender);
    myForm.set("city", city);
    myForm.set("district", district);
    myForm.set("state", state);
    myForm.set("country", country);
    myForm.set("pincode", pincode);
    myForm.set("phoneno", phoneno);
    myForm.set("avatar", avatar);
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("exp", exp);
    myForm.set("bio", bio);
    myForm.set("spec", spec);
    myForm.set("rating", rating);
    dispatch(updateProfile(myForm));
  };

  const handleCancel = (e) => {
    navigate("/profile");
  };

  useEffect(() => {
    dispatch(getAllCategories());
    
    if (CategoryError) {
      alert.error(CategoryError);
      dispatch(clearErrors());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (LoadingError) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch({ type: UPDATE_PROFILE_RESET })
      dispatch(loadUser());
      navigate("/profile");
    }
  }, [error, alert, dispatch, navigate, isUpdated, LoadingError,CategoryError]);
  const transForm = {
    transform: isAuthenticated ? "translateY(-1px)" : 0,
  };
  const userLink = () => {
    return <div></div>;
  };

  return (
    <>
      {loading|| CategoryLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Edit Profile" />
          <Header />
          <div className="reg-body">
            <div className="container-setup">
              <div className="logo">
                <h3>Service Fare</h3>
              </div>
              <div className="setup">
                <h2 className="setup-head2">Edit your Profile</h2>
                <form onSubmit={setupProfileHandler}>
                  <div className="edit-name">
                    <input
                      type="text"
                      value={name}
                      name="username"
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="edit-email">
                    <input
                      type="email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={phoneno}
                      name="phoneno"
                      required
                      placeholder="Enter phoneno"
                      onChange={(e) => setPhoneno(e.target.value)}
                    />
                  </div>
                  <div className="select-style">
                    <select
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={imgDataChange}
                    />
                  </div>
                  <div className="select-style">
                    <select
                      required
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Country</option>
                      {Country &&
                        Country.getAllCountries().map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {country && (
                    <div className="select-style">
                      <select
                        required
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="">State</option>
                        {State &&
                          State.getStatesOfCountry(country).map((state) => (
                            <option key={state.isoCode} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <input
                      type="text"
                      value={district}
                      name="district"
                      required
                      placeholder="Enter district name"
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={city}
                      name="city"
                      required
                      placeholder="Enter city name"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={pincode}
                      name="pincode"
                      required
                      placeholder="Enter pincode"
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                  <div className="transform-div" style={transForm}>
                    {user.role === "user" ? (
                      userLink()
                    ) : (
                      <div className="tranform-ul">
                        <div>
                    <input
                      type="text"
                      value={bio}
                      name="bio"
                      required
                      placeholder="Enter your bio"
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                  <select
                            className="selectStyle"
                            id="domain"
                            name="spec"
                            value={spec}
                            onChange={(e) => setSpec(e.target.value)}
                          >
                            <option value="select" selected="selected">
                              ----------- select product category ------------
                            </option>
                            {
                              categories && categories.map((category, idx) => (
                                <option value={category.name} key={idx}>
                                  { category.name }
                                </option>
                              ))
                            }
                          </select>
                        <div>
                          <input
                            type="number"
                            name="exp"
                            id="exp"
                            value={exp}
                            onChange={(e) => setExp(e.target.value)}
                            required
                            placeholder="Enter your experience(in years)"
                          />
                        </div>
                        <div>
                          <select
                            className="selectStyle"
                            id="domain"
                            name="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="select" selected="selected">
                              Rate your work out of 5
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="btn-sub-can">
                    <button type="submit" style={{ margin: "0 3px 0 0" }}>
                      Submit
                    </button>

                    <button
                      type="submit"
                      style={{ margin: "0 0 0 3px" }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EditProfile;
