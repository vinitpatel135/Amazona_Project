export default function CheckoutSteps(props){
    const {signin, shipping, payment, placeOrder} = props

    return(
        <>
            <div className="row">
                <div className="col-3" style={{paddingTop:"5px", borderTop: signin ? "3px solid #ff0000" : "3px solid gray"}}>
                    <h5 style={{color: signin ? "#ff0000" : "gray"}}>Signin</h5>
                </div>
                <div className="col-3" style={{paddingTop:"5px", borderTop: shipping ? "3px solid #ff0000" : "3px solid gray"}}>
                    <h5 style={{color: shipping ? "#ff0000" : "gray"}}>Shipping</h5>
                </div>
                <div className="col-3" style={{paddingTop:"5px", borderTop: payment ? "3px solid #ff0000" : "3px solid gray"}}>
                    <h5 style={{color: payment ? "#ff0000" : "gray"}}>Payment</h5>
                </div>
                <div className="col-3" style={{paddingTop:"5px", borderTop: placeOrder ? "3px solid #ff0000" : "3px solid gray"}}>
                    <h5 style={{color: placeOrder ? "#ff0000" : "gray"}}>Place Order</h5>
                </div>
            </div>
        </>
    )
}