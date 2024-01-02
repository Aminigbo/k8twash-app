import { API_URL } from "../utilities";

export async function SignupService(payload) {
    let { name, email, country, city, password, setLoading } = payload
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": name,
        "city": city,
        "country": country,
        "email": email,
        "password": password,
        "FcnToken": "FcnTokenFcnTokenFcnTokenFcnTokenFcnToken"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_URL}/auth/signup`, requestOptions);
        const result_1 = await response.text();
        console.log(result_1)
        const Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        return error;
    }
}


export async function SigninService(payload) {
    let { name, email, country, city, password, setLoading } = payload
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "password": password,
        "FcnToken": "FcnTokenFcnTokenFcnTokenFcnTokenFcnToken"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_URL}/auth/signin`, requestOptions);
        const result_1 = await response.text();
        const Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        return error;
    }
}

export async function RequestOTPModel(email) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_URL}/auth/requet-otp`, requestOptions);
        const result_1 = await response.text();
        let Data = JSON.parse(result_1)
        if (Data.success == true) {
            return {
                success: true,
                data: Data.data,
                message: "OTP sent",
            };
        } else {
            return {
                success: false,
                message: "Account not found",
                data: null
            };
        }

    } catch (error) {
        return {
            success: false,
            message: "Network error occured",
            data: null
        };
    }
}


export async function ResetPWDModel(payload) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "password": payload.pwd,
        "uuid": payload.uuid
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_URL}/auth/ResetPWD`, requestOptions);
        const result_1 = await response.text();
        let Data = JSON.parse(result_1)
        console.log(Data)
        if (Data.success == true) {
            return {
                success: true,
                data: Data.data,
                message: "OTP sent",
            };
        } else {
            return {
                success: false,
                message: "Account not found",
                data: null
            };
        }
    } catch (error) {
        return console.log('error', error);
    }
}