import { createSlice , createAsyncThunk,  } from "@reduxjs/toolkit";
const API = import.meta.env.VITE_API_BASE_URL;

//fetching all users with asyncThunk
export const fetchUsers = createAsyncThunk( "admin/fetchUsers" , async ( { currentPage , usersPerPage }, { rejectWithValue}) => {
    try {
        const response = await fetch(`${API}/admin/dashboard?page=${currentPage}&limit=${usersPerPage}` , {
            method : "GET" ,
            credentials : "include",
        });

        const data = await response.json();
        if ( !response.ok ){
            throw new Error( data.message || "failed to fetch users!");
        }
        return {
            users : data.users,
            totalPages : data.totalPages
        } 
    } catch ( error ) {
        return rejectWithValue( error.message );
    }
});

export const addUser = createAsyncThunk("admin/addUser" , async ( userData , { rejectWithValue }) => {
    try {
        const response = await fetch(`${API}/admin/create-user` , {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to create user!");
        }
        return data.user; 
    }catch (error) {
        return rejectWithValue(error.message);
    }
});

const adminSlice = createSlice({
    name:"admin",
    initialState: {
        users : [],
        totalPages : 1,
        loading : false ,
        error : null,
    },
    reducers : {} ,
    extraReducers : ( builder) => {
        builder
        .addCase( fetchUsers.pending , (state) =>{
            state.loading = true ;
            state.error = null ;
        })
        .addCase( fetchUsers.fulfilled ,(state , action ) =>{
         state.loading = false;
         state.users = action.payload.users;
         state.totalPages = action.payload.totalPages;
        })
        .addCase( fetchUsers.rejected , ( state , action ) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload); 
        })
        .addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default adminSlice.reducer;