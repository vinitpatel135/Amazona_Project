import { useState } from "react";
import Input from "../Component/Input";
import Validation from "../Common/Validation";
import apihelper from "../Common/ApiHelper";
import { useNavigate } from "react-router-dom";
import Loader from "../Component/Loader";
import MessageBox from "../Component/MessageBox";

export default function RegisterUser() {
    const [RegisterError, SetRegisterError] = useState([])
    const [error, seterror] = useState("")
    const [isSubmited, SetIsSubmited] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        ConfirmPassword:"",
    })

    const RegisterHandler = async () =>{
        try {
            
            SetIsSubmited(true)

            const ValdationResult = Validation(user, "register")

            if(ValdationResult.length > 0){
                SetRegisterError(ValdationResult)
                return
            }

            setisLoading(true)
            const result = await apihelper.UserRegister(user)

            setisLoading(false)

            localStorage.setItem("UserInfo", JSON.stringify(result.data.user))
            localStorage.setItem("token", JSON.stringify(result.data.user.token))

            navigate("/")

            return
            
        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data.message === "Validation Error") {
                    SetRegisterError(error.response.data.ValdationResult)
                    return
                }
                seterror(error.response.data.message)
                return
            } else {
                seterror(error.message)
                return
            }
        }
    }

    return (
        <section className="vh-50 m-4" >
            <Loader isloading={isLoading} />
            <MessageBox error={error} seterror={seterror} />
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black shadow-lg" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outlinne flex-fill mb-0">
                                                    <Input type="text" value={user.firstName} IsError={RegisterError.find((x) => x.key === "firstName") ? true : false} helperText={RegisterError.find((x) => x.key === "firstName")?.message} onChange={(e) =>{
                                                        setUser({...user , firstName:e.target.value})

                                                        if(isSubmited){
                                                            const ValdationResult = Validation({...user, firstName: e.target.value}, "register")

                                                            SetRegisterError(ValdationResult)
                                                        }
                                                    }} className="form-control" placeholder="firstName" />
                                                    <label >Firstname</label>
                                                </div>
                                            </div>


                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fa-solid fa-user-pen fa-lg me-3 fa-fw"></i>
                                                <div className="  form-outline flex-fill mb-0">
                                                <Input type="text" value={user.lastName} IsError={RegisterError.find((x) => x.key === "lastName") ? true : false} helperText={RegisterError.find((x) => x.key === "lastName")?.message} onChange={(e) =>{
                                                        setUser({...user , lastName:e.target.value})

                                                        if(isSubmited){
                                                            const ValdationResult = Validation({...user, lastName: e.target.value}, "register")

                                                            SetRegisterError(ValdationResult)
                                                        }
                                                    }} className="form-control" placeholder="lastName" />
                                                    <label >Lastname</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fa-solid fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" form-outlinne flex-fill mb-0">
                                                <Input type="email" value={user.email} IsError={RegisterError.find((x) => x.key === "email") ? true : false} helperText={RegisterError.find((x) => x.key === "email")?.message} onChange={(e) =>{
                                                        setUser({...user , email:e.target.value})

                                                        if(isSubmited){
                                                            const ValdationResult = Validation({...user, email: e.target.value}, "register")

                                                            SetRegisterError(ValdationResult)
                                                        }
                                                    }} className="form-control" placeholder="email" />
                                                    <label >Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="  form-outline flex-fill mb-0">
                                                <Input type="password" value={user.password} IsError={RegisterError.find((x) => x.key === "password") ? true : false} helperText={RegisterError.find((x) => x.key === "password")?.message} onChange={(e) =>{
                                                        setUser({...user , password:e.target.value})

                                                        if(isSubmited){
                                                            const ValdationResult = Validation({...user, password: e.target.value}, "register")

                                                            SetRegisterError(ValdationResult)
                                                        }
                                                    }} className="form-control" placeholder="password" />
                                                    <label >Password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fa-solid fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="  form-outline flex-fill mb-0">
                                                <Input type="password" value={user.ConfirmPassword} IsError={RegisterError.find((x) => x.key === "ConfirmPassword") ? true : false} helperText={RegisterError.find((x) => x.key === "ConfirmPassword")?.message} onChange={(e) =>{
                                                        setUser({...user , ConfirmPassword:e.target.value})

                                                        if(isSubmited){
                                                            const ValdationResult = Validation({...user, ConfirmPassword: e.target.value}, "register")

                                                            SetRegisterError(ValdationResult)
                                                        }
                                                    }} className="form-control" placeholder="Confirm-Password" />
                                                    <label >Confirm-Password</label>
                                                </div>
                                            </div>



                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-Input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" >
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" onClick={RegisterHandler} className="btn btn-primary btn-lg">Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}