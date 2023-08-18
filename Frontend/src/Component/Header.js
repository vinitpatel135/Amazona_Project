import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
    let {cartItems , SetCartItmes, SetSearch, Search} = props
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [INPUT , SetInput] = useState({
        value:""
    })

    const LogOutHandler = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userInfo")
        navigate("/")
    }

    const SearchHandler = () => {
        SetSearch(INPUT)
    }

    const NaviGateToLogin = () => {
        navigate("/login")
    }

    useEffect(() => {
        SetCartItmes( JSON.parse(localStorage.getItem("cartItems") || "[]" ))
    }, [])


    return (
        <header>
            <div className="py-2 bg-dark d-flex justify-content-between px-3">
                <Link to={"/"} style={{textDecoration:"none"}}>
                    <div className="logo">
                        <h3 className="fw-bold text-white">Amazon</h3>
                    </div>
                </Link>

                <span>
                    <div className="input-group rounded-start">
                        <div className="form-outline rounded-start">
                            <input type="search" id="form1" onChange={(e) => {
                                SetInput({ ...INPUT, value: e.target.value })
                            }} placeholder="Search . . . " className="form-control rounded-start" />
                        </div>
                        <button type="button" onClick={SearchHandler} className="btn btn-warning">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </span>

                <div className="icons d-flex align-items-center gap-3">
                    <Link to={"/cart"} >
                        <i style={{ fontSize: "1.2rem" }} className="fa-brands position-relative fa-opencart text-white">
                            <span style={{fontSize: ".7rem"}} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartItems?.length}</span>
                        </i>
                    </Link>
                    <button className="btn btn-warning" onClick={token ? LogOutHandler : NaviGateToLogin}>{token ? "Sign Out" : "Sign In"}</button>
                </div>
            </div>
        </header>
    )
}