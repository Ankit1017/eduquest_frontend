import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import MakeAdmin from '../components/MakeAdmin';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    // State to store the fetched data
    const [data, setData] = useState([]);

    //fucntion to fetch data using axios
    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://eduquest-backend-two.vercel.app/api/admin/get-allusers');
            const arr = Object.values(response.data.data);
            // console.log(typeof (arr));
            // console.log(arr);
            setData(arr);

            if (arr.length === 0) {
                setData([{ _id: null, username: "no user to make admin" }])
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    //to run somethings a single time
    useEffect(() => {
        // console.log(authTokens);

        if (user === null) {
            navigate("/");
        }
        if (user.isAdmin === false) {
            navigate("/");
        }

        fetchUsers();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Admin-{user.username}</h1>
            <MakeAdmin data={data} fetchUsers={fetchUsers} />
        </div>
    )
}

export default AdminPanel