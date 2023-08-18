import { useState } from "react";
import Input from "../Component/Input";
import { useLocation, useNavigate } from "react-router-dom";
import Validation from "../Common/Validation";
import apihelper from "../Common/ApiHelper";
import CheckoutSteps from "../Component/CheckoutSteps";
import Loader from "../Component/Loader";
import MessageBox from "../Component/MessageBox";

export default function LoginScreen(props) {

    const [isSubmited, SetIsSubmited] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [error, SetError] = useState("")
    const [loginError, SetLoginError] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [user, SetUser] = useState({
        email: "",
        password: ""
    })
    const  redirect = location.search.split("?redirect=")[1]


    const LoginHandler = async () => {
        try {
            SetIsSubmited(true)

            const ValidationREsult = Validation(user , "login")

            if(ValidationREsult.length > 0){
                SetLoginError(ValidationREsult)
                return
            }

            setisLoading(true)
            const result = await apihelper.UserLogin(user)
            
            localStorage.setItem("userInfo", JSON.stringify(result.data.user))

            localStorage.setItem("token", JSON.stringify(result.data.user.token))
            
            setisLoading(false)

            navigate("/")
            return

        } catch (error) {
            setisLoading(false)

            if(error.response && error.response.data){
                if(error.response.status === 400 && error.response.data.message === "Validation Error"){
                    SetLoginError(error.response.data.ValidationResult)
                    return
                }
            }
        }
    }

    return (
        <div className="container">
            {
                redirect && <CheckoutSteps signin = {true} />
            }
            <div style={{ position: "relative" }}>
            <Loader isLoading={isLoading} />
            <MessageBox error={error} seterror={SetError} />
                <div className="container-fluid">
                    <div className="row justify-content-center bg">
                        <div className="card m-5" style={{ width: "28rem" }}>
                            <form>

                                <h3 className="m-5 text-center">Login </h3>
                                <div className="form-outline mb-4 mt-5">
                                    <Input type="email" value={user.email} IsError={loginError.find((x) => x.key === "email") ? true : false} helperText={loginError.find((x) => x.key === "email")?.message} onChange={(e) => {

                                        SetUser({ ...user, email: e.target.value })
                                        if (isSubmited) {
                                            const ValidationREsult = Validation(user, "login")
                                            SetLoginError(ValidationREsult)
                                        }

                                    }}
                                        id="form2Example1" className="form-control" />
                                    <label className="form-label" >Email address</label>

                                </div>

                                <div className="form-outline mb-4">
                                    <Input type="password" value={user.password} IsError={loginError.find((x) => x.key === "password") ? true : false} helperText={loginError.find((x) => x.key === "password")?.message} onChange={(e) => {

                                        SetUser({ ...user, password: e.target.value })
                                        if (isSubmited) {
                                            const ValidationREsult = Validation(user, "login")
                                            SetLoginError(ValidationREsult)
                                        }

                                    }}
                                        id="form2Example1" className="form-control" />
                                    <label className="form-label" >Password</label>

                                </div>

                                <div className="row mb-4">
                                    <div className="col d-flex justify-content-between">
                                        <div className="form-check d-flex">
                                            <input className="form-check-Input" type="checkbox" value="" />
                                            <label className="form-check-label" >Rememberme</label>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <a href="#!">Forgot password?</a>
                                    </div>
                                </div>
                                {/* <Link to={!redirect ? "/register" : `/register${location.search}`}> <p className="text-center">Create Account ?</p></Link> */}
                                <center><button type="button" onClick={LoginHandler} className="btn btn-primary btn-block mb-4 w-50">Log in</button></center>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}