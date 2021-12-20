import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "./addcategory.css";
import MetaData from "../components/layout/MetaData";
import { useSelector} from "react-redux";
import { createCategory, clearErrors } from "../actions/serviceActions";
import Loader from "../components/layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useDispatch} from "react-redux";

function AddCategory() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {error, loading, success} = useSelector(state => state.newCategory);

  const [name, setName] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    
    const myForm = new FormData();
    myForm.set('name',name);
    myForm.set('imageUrl',imageUrl);

    dispatch(createCategory(myForm));
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Category Added Successfully');
    }
  }, [error, alert, dispatch, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Add Category" />
          <Header />
          <div className="reg-body">
            <div className="container-setup">
              <div className="logo">
                <h3>Service Fare</h3>
              </div>
              <div className="setup">
                <h2 className="setup-head2">Add Category</h2>
                <form onSubmit={handleSubmit}>
                  <div className="name">
                    <input
                      type="text"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter New Category Name"
                    />
                  </div>
                  <div className="url">
                    <input
                      type="text"
                      value={imageUrl}
                      name="imageUrl"
                      onChange={(e)=>setimageUrl(e.target.value)}
                      required
                      placeholder="Enter Icon Url"
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

export default AddCategory;
