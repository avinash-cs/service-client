import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "./addservice.css";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createService, clearErrors, getAllCategories } from "../actions/serviceActions";
import { useAlert } from "react-alert";
import Profile from "../images/Profile.png";
import { useNavigate } from 'react-router-dom';
import { NEW_SERVICE_RESET } from "../constants/serviceConstants";

function AddService() {
      const alert = useAlert();
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const {error, loading, success} = useSelector(state => state.newService);
      const {error : CategoryError, loading : CategoryLoading, categories} = useSelector(state => state.newCategory);
      const [name, setName] = useState('');
      const [price, setPrice] = useState('');
      const [description, setDescription] = useState('');
      const [category, setCategory] = useState('');
      const [avatar, setAvatar] = useState();
      const [avatarPreview, setAvatarPreview] = useState(Profile);
    

    const handleSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();
      myForm.set('name', name);
      myForm.set('categoryName', category);
      myForm.set('description', description);
      myForm.set('price', price);
      myForm.set('avatar', avatar);

      dispatch(createService(myForm));
    }

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

    useEffect(() => {
      dispatch(getAllCategories());
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      
      if (CategoryError) {
        alert.error(CategoryError);
        dispatch(clearErrors());
      }
      
      if (success) {
        dispatch({ type: NEW_SERVICE_RESET });
        alert.success('Service created successfully');
        navigate('/dashboard');
      }
    }, [error, alert, dispatch, success, CategoryError, navigate]);

  return (
    <>
      {loading || CategoryLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Add Service" />
          <Header />
          <div className="reg-body" id="cont-addservice"> 
            <div className="container-setup">
              <div className="logo">
                <h3>Service Fare</h3>
              </div>
              <div className="setup">
                <h2 className="setup-head2">Add Service</h2>
                <form onSubmit={handleSubmit}>
                  <div className="name">
                    <input
                      type="text"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter Product Name"
                    />
                  </div>
                  <div className="price">
                    <input
                      type="number"
                      value={price}
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      placeholder="Enter Price"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="description"
                      value={description}
                      required
                      placeholder="Enter product description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div>
                          <select
                            className="selectStyle"
                            id="domain"
                            name="categoryName"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="select" >
                              - select product category -
                            </option>
                            {
                              categories && categories.map((category, idx) => (
                                <option value={category.name} key={idx}>
                                  { category.name }
                                </option>
                              ))
                            }
                          </select>
                        </div>
                  <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <label>Upload a photo of service</label>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={imgDataChange}
                    />
                  </div>
                 
                  
                  <div className="btn-sub-can">
                    <button type="submit" style={{ margin: "0 3px 0 0" }}>
                      Submit
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

export default AddService;
