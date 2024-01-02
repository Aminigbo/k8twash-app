
export const ImgBaseUrl = "https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/images";
export const API_URL = "https://katewash-server.vercel.app/api/v1/"

export const base_URL = "https://upendo-server.vercel.app//api/v1/"

export const NumberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}


export function PasswordValidate(password) {
    const numberPattern = /\d/;
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    return numberPattern.test(password) && specialCharPattern.test(password);
}
export function CurrentTime() {
    const currentDate = new Date();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    const amPm = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;
    return hour + ":" + (minute < 10 ? "0" : "") + minute + amPm;
}

export function CurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

