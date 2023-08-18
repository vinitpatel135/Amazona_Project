import axios from "axios"

class ApiHelper{

    constructor(){
        this.baseURL = "http://localhost:5100"

        this.token = JSON.parse(localStorage.getItem("token"))
        console.log(this.token);
    }

    FatchProducts() {
        return axios.get(this.baseURL + "/product")
    }

    FatchProductById(id){
        return axios.get(this.baseURL + "/product/" + id)
    }

    UserLogin(data){
        return axios.post(this.baseURL + "/login" , data)
    }

    UserRegister(data){
        return axios.post(this.baseURL + "/register", data)
    }

    FetchCart(products){
        return axios.post(this.baseURL + "/cart", {products : products})
    }

    PlaceOrder(OrderDetails){
        return axios.post(this.baseURL + "/neworder", OrderDetails , {headers : {token : this.token}})
    }

    PaymentVerfy(details){
        return axios.post(this.baseURL + "/payment/verify", details, {headers : { token : this.token }})
    }

}

const apihelper = new ApiHelper()
export default apihelper