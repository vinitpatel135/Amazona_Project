import axios from "axios";

class ApiHelper{

    constructor(){
        this.baseURL = "http://localhost:5100"
    }

    async GetUser(){
        return axios.get(`${this.baseURL}/admin/getuser`)
    }

    async UserLogin(data){
        return axios.post(`${this.baseURL}/admin/login`, data)
    }

    async InsertUser(userDetails){
        return axios.post(`${this.baseURL}/admin/adduser`, userDetails )        
    }

    async DeleteUser(id){
        return axios.delete(`${this.baseURL}/admin/deluser/${id}` )        
    }

    async UpdateUser(id, data){
        return axios.put(`${this.baseURL}/admin/update/${id}`, data )        
    }

    async OTPVerify( data){
        return axios.post(`${this.baseURL}/admin/verify`, data )        
    }

    async fetchMedia(){
        return axios.get(`${this.baseURL}/admin/getmeida`)
    }

    async UploadMedia(data){
        return axios.post(`${this.baseURL}/admin/upload`, data)
    }

    async AddProduct(data){
        return axios.post(`${this.baseURL}/admin/insertproduct`, data)
    }

}

const apihelper = new ApiHelper()
export default apihelper