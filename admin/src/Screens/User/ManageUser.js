import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import apihelper from '../../Common/ApiHelper';
import Validation from '../../Common/Validation';
import { FormControl, FormHelperText } from '@mui/material';


export default function ManageUser(props) {
    const { open, setopen, GetUsers, userDetails, setuserDetails, UpdateUser } = props
    // console.log(userDetails);
    const [Error, setError] = useState([])
    const [isSubmited, setisSubmited] = useState(false)
    // const Users = {
    //     fullName: "",
    //     email: "",
    //     password: "",
    //     roll: "0",
    // }
    // const [userDetails, setuserDetails] = useState(Users)

    const handleClose = () => {
        setopen(false);
        setuserDetails({
            fullName: "",
            email: "",
            password: "",
            roll: "0",
            otp:""
        })
        setError([])
    };

    const AddUSer = async () => {
        try {

            setisSubmited(true)
            console.log(userDetails);
            const ValidationResult = Validation(userDetails, "adduser")
            console.log(ValidationResult);
            if (ValidationResult.length > 0) {
                setError(ValidationResult)
            }

            const result = await apihelper.InsertUser(userDetails)
            setisSubmited(false)
            GetUsers()
            setopen(false)
            setuserDetails({
                fullName: "",
                email: "",
                password: "",
                roll: "0",
                otp:""
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>

            <Dialog open={open} onClose={handleClose}>
                <center>
                    <DialogTitle>{userDetails._id ? "Update User" : "Add User"}</DialogTitle>
                </center>
                <hr className='mb-0' />
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="FullName"
                        type="text"
                        error={Error?.some(x => x.key === "fullName")}
                        helperText={Error?.find(x => x.key === "fullName")?.message}
                        value={userDetails.fullName}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, fullName: e.target.value })
                            if (isSubmited) {
                                const ValidatioResult = Validation({ ...userDetails, fullName: e.target.value }, "adduser")
                                setError(ValidatioResult)
                            }
                        }}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        error={Error?.some(x => x.key === "email")}
                        helperText={Error?.find(x => x.key === "email")?.message}
                        value={userDetails.email}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, email: e.target.value })
                            if (isSubmited) {
                                const ValidatioResult = Validation({ ...userDetails, email: e.target.value }, "adduser")
                                setError(ValidatioResult)
                            }
                        }}
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl sx={{ mt: 1, minWidth: 120 }} fullWidth >
                        <Select helperText={Error?.find(x => x.key === "roll")?.message} onChange={(e) => {
                            setuserDetails({ ...userDetails, roll: e.target.value })

                            if (isSubmited) {
                                const ValidationResult = Validation({ ...userDetails, roll: e.target.value }, "Admin-user")
                                setError(ValidationResult)
                            }


                        }} value={userDetails.roll} error={Error?.some(x => x.key === "roll")} className='mt-1' fullWidth>
                            <MenuItem value={"0"}><i>---Select Roll---</i></MenuItem>
                            <MenuItem value={"Editor"}>Editor</MenuItem>
                            <MenuItem value={"Admin"}>Admin</MenuItem>
                            <MenuItem value={"sco"}>Sco</MenuItem>
                        </Select>
                        <FormHelperText error={Error?.some(x => x.key === "roll")} >{Error.find(x => x.key === "roll")?.message}</FormHelperText>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        disabled={userDetails._id}
                        error={Error?.some(x => x.key === "password")}
                        helperText={Error?.find(x => x.key === "password")?.message}
                        value={userDetails.password}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, password: e.target.value })
                            if (isSubmited) {
                                const ValidatioResult = Validation({ ...userDetails, password: e.target.value }, "adduser")
                                setError(ValidatioResult)
                            }
                        }}
                        fullWidth
                        variant="outlined"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={userDetails._id ? UpdateUser : AddUSer}>{userDetails._id ? "Upadte" : "Add "}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}