import { useEffect, useState } from "react"
import apihelper from "../Common/ApiHelper";
import Loader from "../Component/Loader";
import MessageBox from "../Component/MessageBox";
import CheckoutSteps from "../Component/CheckoutSteps";
import { useLocation, useNavigate } from "react-router-dom";
import handlePayment from "../Common/LoadRazorpay";

export default function PlaceOrderScreen(props) {

    let { cartItems, SetCartItmes } = props
    const [cart, setCart] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [SummaryDetails, setSummaryDetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0
    })
    // const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    const navigate = useNavigate()
    const location = useLocation()
    const redirect = location.search.split("redirect=")[1]
    const paymentMethod = location.search.split("paymentMethod=")[1]


    let shippingInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    shippingInfo = shippingInfo.shippingAddress

    useEffect(() => {
        // eslint-disable-next-line 
        cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
        // console.log(cartItems);
        SetCartItmes(cartItems)
    }, [])


    const getCart = async () => {

        try {
            setisLoading(true)

            const products = cartItems.map((x) => x.product)
            const result = await apihelper.FetchCart(products)
            const inStockItems = result.data?.cart

            for (let i in inStockItems) {
                for (let j in cartItems) {
                    if (cartItems[j].product === inStockItems[i]._id) {
                        inStockItems[i].qty = cartItems[j].qty
                    }
                }
            }

            setCart(inStockItems)
            setisLoading(false)
        } catch (error) {
            setCart([])
            setisLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
            setError(error.message)
            return
        }
    }

    useEffect(() => {
        getCart()
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        let i = 0
        let totalPrice = 0
        let totalItems = 0
        let totalProducts = 0

        while (i < cart.length) {
            if (cart[i].countInStock > 0) {
                totalItems += cart[i].qty
                totalPrice += (cart[i].qty * cart[i].price)
                totalProducts++
            }
            i++
        }

        setSummaryDetails({ ...SummaryDetails, totalItems: totalItems, totalAmount: totalPrice, totalProducts: totalProducts })
        // eslint-disable-next-line 
    }, [cart])

    const PlaceOrderHandler = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    
            const paymentMethod = (redirect && redirect === "online" ? "online" : "cod")
            
            const products = cart.map(({ _id, qty, price }) => ({ _id, qty, price }));
    
            const totalPrice = SummaryDetails.totalAmount
    
            const OrderDetails = {
                userInfo : userInfo.shippingAddress,
                paymentMethod : paymentMethod,
                products : products,
                shippingAddress : userInfo.shippingAddress,
                totalPrice : totalPrice
            }
    
            const result = await apihelper.PlaceOrder(OrderDetails)
            console.log(result);
            // localStorage.removeItem("cartItems")
            // SetCartItmes([])

            if(!result.data.order.RazorpayDetails){
                return navigate("/order" + result.data.order._id)
            }else{
                const data = result.data.order
                const Options = {
                    name : data.shippingAddress.fullName,
                    phone : data.shippingAddress.mobile,
                    email : data.shippingAddress.email,
                    address : data.shippingAddress.Address,
                    apikey : data.RazorpayDetails.apikey,
                    amount : data.RazorpayDetails.amount,
                    currency : data.RazorpayDetails.currency,
                    razorpayOrderId : data.RazorpayDetails.id,
                    orderId : data._id,
                    showError : setError,
                    navigate : navigate
                }
                handlePayment(Options)
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
                return
            }
            setError(error.message)
            return  
        }

    }


    return (
        <>
            <section className="h-100 gradient-custom">
                <div className="container py-4">
                    <Loader isLoading={isLoading} />
                    <MessageBox error={error} seterror={setError} />
                    <CheckoutSteps signin={true} shipping={true} payment={true} placeOrder={true} />
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4 shadow">
                                <div className="card-header py-3 ">
                                    <h5 className="mb-0">Review Your Order</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col  mb-lg-0">
                                            <h5>Shipping Imformation</h5>
                                            <div className="address d-flex mb-0 mt-4 mb-0">
                                                <h6>FullName :</h6>
                                                <p className="ms-3">{shippingInfo.fullName}</p>
                                            </div>
                                            <div className="address d-flex " style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Address :</h6>
                                                <p className="ms-3">{shippingInfo.Address}</p>
                                            </div>
                                            <div className="address d-flex  mb-0 mt-2 mb-0" style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Phone No :</h6>
                                                <p className="ms-3">{shippingInfo.mobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <div className="col  mb-lg-0">
                                            <h5>Payment Imformation</h5>
                                            <div className="address d-flex mb-0 mt-4 mb-0">
                                                <h6>Payment Method:</h6>
                                                <p className="ms-3 text-primary fw-bold">{redirect && redirect === "online" ? "online" : "cod"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4 " />
                                    <h5 className="mb-4">Order Imformation</h5>

                                    {
                                        cart.filter((x) => x.countInStock > 0).map((x) => { 
                                            return (
                                                <>
                                                    <section className="h-100" style={{ backgroundColor: "#eee" }}>
                                                        <div className="container py-3 h-100">
                                                            <div className="row d-flex justify-content-center align-items-center h-100">
                                                                <div className="col">
                                                                    <div className="card shadow">
                                                                        <div className="card-body p-4">

                                                                            <div className="row">

                                                                                <div className="d-flex flex-row align-items-center text-center  justify-content-between row">
                                                                                    <div className="col-2">
                                                                                        <img
                                                                                            src={x.image}
                                                                                            className="img-fluid rounded-3" alt="Shopping item" style={{ height: "5rem" }} />
                                                                                    </div>
                                                                                    <div className="col-2 p-0">
                                                                                        <h5 className="">Name</h5>
                                                                                        <h6>{x.name}</h6>
                                                                                    </div>
                                                                                    <div className="col-2 p-0">
                                                                                        <h5 className="">Quantity</h5>
                                                                                        <h6>{x.qty}</h6>
                                                                                    </div>
                                                                                    <div className="col-2 p-0">
                                                                                        <h5 className="">Price </h5>
                                                                                        <h6>₹ {x.price}</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                </>
                                            )
                                        })
                                    }

                                    <hr className="my-4" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4 shadow">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Order Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Items
                                            <span>{SummaryDetails.totalItems}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0  px-0">
                                            Delivery
                                            <span>{SummaryDetails.delivery}</span>
                                        </li>

                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                                            Total
                                            <span>₹ {SummaryDetails.totalAmount}</span>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                                            Discount
                                            <span>₹ {0}</span>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Order Total </strong>

                                            </div>
                                            <span><strong>₹ {SummaryDetails.totalAmount}</strong></span>
                                        </li>
                                    </ul>

                                    <div className="button justify-content-center ">

                                        <button type="button" onClick={PlaceOrderHandler} className="btn btn-warning btn-lg w-100" >Place your order</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}