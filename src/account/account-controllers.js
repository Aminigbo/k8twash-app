import { CreateScheduleModel } from "../services/schedule-services"

export function CreateScheduleController(payload) {
    let { VehicleType, color, plateNumber, subscriptionPlans, setLoading, Alert, uuid, navigation, address } = payload

    if (!VehicleType || !color || !plateNumber || !subscriptionPlans || !address) {
        Alert.alert("Error", "Provide all details")
    } else {
        CreateScheduleModel(payload)
            .then(response => {
                if (response.success == false) {
                    Alert.alert("Error", response.message)
                } else {
                    let { VehicleType, color, plateNumber, subscriptionPlans, setLoading, Alert, uuid } = payload
                    Alert.alert("Success", `${subscriptionPlans.duration} wash schedule for your ${color} ${VehicleType} have been created successfully`, [
                        { text: "OK", onPress: () => { navigation.pop() } }
                    ])
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
            })
    }
}