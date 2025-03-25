import { useState , useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authslice";
import { useNavigate } from "react-router-dom";
import "./Edit.css";
const Edit = () => {
const { user } = useSelector((state)=>state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();

const [ formData ,setFormData ] = useState({
    name:"",
    email:"",
    password:"",
});

useEffect (() => {
    if ( user ) {
        setFormData({
            name : user.name,
            email : user.email,
            password : ""
        });
        
    }
},[user]);

const handleChange = (e) => {
    setFormData({ ...formData , [e.target.name] :e.target.value });
}

const handleSubmit = async (e) => {
e.preventDefault();
try {
    const response = await fetch("http://localhost:5006/api/users/profile" , {
        method : "PUT",
        headers : {
            "Content-Type": "application/json",
        },
        credentials:"include",
        body : JSON.stringify(formData)
    });
    const data = await response.json();
    if ( response.ok ) {
        dispatch(setUser({...data.user, profileImage: user.profileImage}));
        alert("profile updated successfully!");
        navigate("/profile");
    }else {
        alert(data.message);
    }
} catch ( error ) {
    console.error("Error updating profile:" ,error);
}
}
    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                </div>
                <div>
                    <label > New Password (optional) : </label>
                    <input type="text" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit">update profile</button>
            </form>
        </div>
    )
}

export default Edit;