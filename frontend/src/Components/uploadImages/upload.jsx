import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authslice";
import { useNavigate } from "react-router-dom";
import "./upload.css"
const API = import.meta.env.VITE_API_BASE_URL;
const Upload = () => {
    const [ selectedFile , setSelectedFile ] = useState(null);
    const [ loading , setLoading ] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if ( !selectedFile ) {
            alert(" please select file !");
            return
        }
        const formData = new FormData();
        formData.append("profileImage",selectedFile);
        try {
            setLoading(true);
            const response = await fetch(`${API}/users/profile/upload` ,{
                method :"Post" ,
                body:formData,
                credentials :"include",
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Updated User Data:++++++++++", data);
                dispatch(setUser(data.user));
                alert("image added successfully!");
                navigate("/profile");
            }else {
                alert(data.message);
            }
        }catch ( error ) {
            console.log("Upload error:" , error);
            alert("something went wrong!");
        }finally{
            setLoading(false);
        }
    };


  return (
    <div className="upload-container">
    <h2 className="upload-title">Upload Your Profile Image</h2>
    <input type="file" accept="image/*" onChange={handleFileChange} className="upload-input" />
    <button onClick={handleUpload} disabled={loading} className="upload-button">
      {loading ? "Uploading..." : "Upload"}
    </button>
  </div>
  
  );
};

export default Upload;
