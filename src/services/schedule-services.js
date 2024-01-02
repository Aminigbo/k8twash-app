import { API_URL, CurrentDate } from "../utilities";

export async function CreateScheduleModel(payload) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "vehicleType": payload.VehicleType,
        "vehicleColor": payload.color,
        "plateNumber": payload.plateNumber,
        "subscription": payload.subscriptionPlans,
        "starting": CurrentDate(),
        "uuid": payload.uuid
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_URL}/schedules/create-schedule`, requestOptions);
        const result_1 = await response.text();
        const Data = JSON.parse(result_1)
        return Data;

    } catch (error) {
        return error;
    }
}


export async function GetAllSchedules(uuid) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_URL}/schedules/all/${uuid}`, requestOptions);
        const result_1 = await response.text();
        const Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        return console.log('error', error);
    }

}


export async function GetingleSchedules(payload) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_URL}/schedules/single/${payload.uuid}/${payload.id}`, requestOptions);
        const result_1 = await response.text();
        const Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        return console.log('error', error);
    }

}