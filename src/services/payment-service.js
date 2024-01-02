import { API_URL } from "../utilities";

export async function AddWalletService(payload) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "payref": payload.payref,
        "user": payload.uuid,
        "amount": payload.amount
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_URL}payment/add-wallet`, requestOptions);
        const result_1 = await response.text();
        let Data = JSON.parse(result_1)
        return {
            success: true,
            data: Data
        };
    } catch (error) {
        return {
            success: false,
            data: []
        };
    }
}


export async function GetTransactionHistoryService(uuid) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_URL}payment/transaction-history/${uuid}`, requestOptions);
        const result_1 = await response.text();
        let Data = JSON.parse(result_1)
        return {
            sucess: true,
            data: Data
        }
    } catch (error) {
        return {
            sucess: false,
            data: []
        };
    }
}