import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import apihelper from '../../Common/ApiHelper';
import ManageUser from './ManageUser';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserData() {
    
    const [user, setUser] = useState([])
    const Users = {
        fullName: "",
        email: "",
        password: "",
        roll: "0",
        otp:""
    }
    const [userDetails, setuserDetails] = useState(Users)
    const [open, setopen] = useState(false) 
    
    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'fullName', headerName: 'Full name', width: 130 },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'roll', headerName: 'Roll', width: 200 },
        { field: 'action', headerName: 'Actions', flex: 1, renderCell:(cell) => {
           return <>
           <IconButton color='primary' onClick={() => {setuserDetails(cell.row) ; setopen(true)} }>
            <EditIcon />
           </IconButton>
           <IconButton color='error' onClick={() => RemoveHandller(cell.row._id)} >
            <DeleteIcon />
           </IconButton>
           </> 
        }},
    ];

    const GetUserData = async () => {
        try {
            const result = await apihelper.GetUser({})
            // console.log(result);
            if (result.status === 200) {
                setUser(result.data.user)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetUserData()
        return () => {
        }
    }, [])

    const RemoveHandller = async (id) => {
        try {
            const result = await apihelper.DeleteUser(id)

            if(result.status === 200){
                GetUserData()
            }

        } catch (error) {
            console.log(error);
            return 
        }
    }

    const UpadteHandller = async () => {
        try {
            const result = await apihelper.UpdateUser(userDetails._id, userDetails)
            console.log(result);

            setopen(false)
            setuserDetails({
                fullName: "",
                email: "",
                password: "",
                roll: "0",
            })
            GetUserData()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ManageUser UpdateUser={UpadteHandller} GetUsers={GetUserData} open={open} setopen={setopen} userDetails={userDetails} setuserDetails={setuserDetails} />
            <div className="row">
                <div className="col-12 mb-3 d-flex justify-content-between">
                    <h3>Show And Manage Users</h3>
                    <Button variant='outlined' onClick={() => {
                        // setuserDetails(user)
                        setopen(true)
                    }}>{ userDetails._id ? "Update User" : "Add User" }</Button>
                </div>
                <div className="col-12">
                    <DataGrid rows={user} autoHeight={true} columns={columns} pageSizeOptions={[5, 10]} getRowId={(e) => e._id} />
                </div>
            </div>

        </>
    );
}