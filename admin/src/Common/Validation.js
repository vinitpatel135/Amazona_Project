const Validation = (data, type) => {

    const err = []

    const { firstName, lastName, email, password, ConfirmPassword, fullName, roll, otp, title, Brand, alias, price, countInStock } = data


    if (type === "register") {

        // For FirstName 
        if (!firstName) {
            err.push({ key: "firstName", message: "Please Enter FirstName" })
        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(firstName))) {
            err.push({ key: "firstName", message: "Invalid firstName" })
        }


        // For LastName 
        if (!lastName) {
            err.push({ key: "lastName", message: "Please Enter lastName " })

        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(lastName))) {

            err.push({ key: "lastName", message: "Invalid lastName" })
        }

        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }

        //For ConfromPassword
        if (!ConfirmPassword) {
            err.push({ key: "ConfirmPassword", message: "Requird To feild Confirm-Password" })
        }
        if (!(ConfirmPassword === password)) {
            err.push({ key: "ConfirmPassword", message: "Password Not Match" })
        }
    } else if (type === "adduser") {

        //For FullName Error
        if (!fullName) {
            err.push({ key: "fullName", message: "Please Enter fullName" })
        } else if (!(/^[a-zA-Z '.-]{2,30}$/.test(fullName))) {
            err.push({ key: "fullName", message: "Invalid fullName" })
        }

        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        if (roll === "0") {
            err.push({ key: "roll", message: "Required Your Roll Is Not Select" })
        } // eslint-disable-next-line

        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }

    } else if( type === "login") {
        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }

    }else if (type === "adminproduct") {

        if (!title) {
            err.push({ key: "title", message: "Please Enter Title" })
        }

        if (!Brand) {
            err.push({ key: "title", message: "Please Enter Brand" })
        }

        if (!alias) {
            err.push({ key: "title", message: "Please Enter Alias" })
        }

        if (price === 0) {
            err.push({ key: "title", message: "Please Enter Price" })
        }

        if (!countInStock) {
            err.push({ key: "title", message: "Please Enter CountInStock" })
        }
    }else {
        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }

        if(!otp){
            err.push({ key: "otp", message: "Please Enter otp" })
        }
        else if(otp.length !== 6 ){
            err.push({key:"otp", message:"Enter 6 digits code"})
        }
    }

    return err
}

export default Validation