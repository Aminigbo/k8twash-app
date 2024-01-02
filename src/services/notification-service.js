import { API_URL } from "../utilities";
import { Alert } from "react-native"
export function GetNotificationsService({
    user, state, setLoading
}) {
    setLoading(true)
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`${API_URL}notification/all/${user}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const Data = JSON.parse(result)
            console.log(result)
            state(Data.data)
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            Alert.alert("Network Error", "There was an error connecting to the server, make sure you are connected to the internet.")
        });
}