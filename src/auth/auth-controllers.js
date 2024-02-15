import { RequestOTPModel, ResetPWDModel, SigninService, SignupService } from "../services/auth-service"
import { PasswordValidate, isValidEmail } from "../utilities"
import { Alert } from "react-native"


export function SignupController(payload) {
    let { name, email, country, city, password, setLoading, disp_user, navigation, phone } = payload
    if (!name || !email || !country || !city || !password || !phone) {
        Alert.alert("Field error", "Fill all forms to proceed")
    } else if (!isValidEmail(email)) { // chech for valid email
        Alert.alert("Email error", "Enter a valid email")
    }
    else if (!PasswordValidate(password) || password.length < 6) { // chech for valid email
        Alert.alert("Pawword error", "Password length must be greater 6 characters including at least a number and a special character")
    } else {
        setLoading(true)

        SignupService(payload)
            .then(response => {
                setLoading(false)
                if (response.success != true) {
                    Alert.alert("Error", response.message)
                    console.log(response)
                } else {
                    // disp_user(response.data)
                    Alert.alert("Success", "Account created successfully, proceed to verify your email", [
                        {
                            text: "Proceed", onPress: () => {

                                // navigation.navigate("Home")
                                navigation.replace("VerifyOTP", { data: response.data, Reg:true, })
                            }
                        }
                    ])
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }
}


export function SigninController(payload) {
    let { email, password, setLoading, disp_user, navigation } = payload
    if (!email || !password) {
        Alert.alert("Field error", "Fill all forms to proceed")
    } else if (!isValidEmail(email)) { // chech for valid email
        Alert.alert("Email error", "Enter a valid email")
    } else {
        setLoading(true)

        SigninService(payload)
            .then(response => {
                setLoading(false)
                if (response.success != true) {
                    Alert.alert("Error", response.message)
                    console.log(response)
                } else {
                    disp_user(response.data)
                    navigation.replace("Home")
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }
}

export function RequestOTPController({
    email,
    Alert,
    navigation,
    setLoading

}) {
    RequestOTPModel(email)
        .then(response => {
            if (response.success == true) {
                Alert.alert("Success", `An OTP has been sent to ${email}`,
                    [{
                        text: "Verify OTP",
                        onPress: () => {
                            navigation.navigate("VerifyOTP", { data: response.data })
                        }
                    }])
            } else {
                Alert.alert("Error", response.message)
            }
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            Alert.alert("Error", error.message)
        })
}


export function ResetPwdController({
    pwd, uuid, Alert, navigation, setLoading
}) {
    ResetPWDModel({ pwd, uuid })
        .then(response => {
            if (response.success == true) {
                Alert.alert("Success", `Your password reset was successful`,
                    [{
                        text: "Login",
                        onPress: () => {
                            navigation.navigate("signin")
                        }
                    }])
            } else {
                Alert.alert("Error", response.message)
            }
            setLoading(false)
        })
        .catch(error => {

        })
}