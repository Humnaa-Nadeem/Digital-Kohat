import axios from "axios";
import { toast } from "react-toastify";
const mainURL = "http://localhost:5500";

export const GetSchoolCrdsDtaFrmDB = (setSchoolCrds) => {
    axios.get(`${mainURL}/getSchlCrdDta`)
        .then((res) => {
            if (res.data.success) {
                setSchoolCrds(res.data.serviceCards);
            } else {
                console.log(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const GetTheSchlData = (SchoolId, setPageData) => {
    axios.post(`${mainURL}/getSchlWholeDta`, { SchoolId })
        .then((res) => {
            if (res.data.success) {
                setPageData(res.data.serviceData)
            } else {
                toast.warn(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const GetFoodCrdsDtaFrmDB = (setFoodCrds) => {
    axios.get(`${mainURL}/getFoodCrdDta`)
        .then((res) => {
            if (res.data.success) {
                setFoodCrds(res.data.serviceCards);
            } else {
                console.log(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const GetTheFoodData = (FoodId, setPageData) => {
    axios.post(`${mainURL}/getFoodWholeDta`, { FoodId })
        .then((res) => {
            if (res.data.success) {
                setPageData(res.data.serviceData)
            } else {
                toast.warn(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const ChangeRatingData = (ratingData, id, setRatingSubmitted) => {
    axios.post(`${mainURL}/changeRatingData`, { ratingData, id })
        .then((res) => {
            if (res.data.success) {
                setRatingSubmitted(true);
                toast.success("Your rating is submitted Successfully ✅");
            } else {
                window.scrollTo(0, 0);
                toast.error(res.data.message);
            }
        }).catch((err) => {
            toast.error("Something went wrong");
        })
}

export const NewEduCataServiceReq = (data) => {
    axios.post(`${mainURL}/NewEduCataServiceReq`, data)
        .then((res) => {
            if (res.data.success) {
                alert("Your request submitted successfully ✅.");
            } else {
                alert(res.data.message);
            }
        }).catch((err) => {
            alert("Something went wrong.");
        })
}

export const PlaceOrderApi = (orderData) => {
    return axios.post(`${mainURL}/placeOrder`, orderData);
}

export const GetOrdersApi = (serviceId) => {
    return axios.post(`${mainURL}/getOrders`, { serviceId });
}

export const UpdateOrderStatusApi = (orderId, status) => {
    return axios.post(`${mainURL}/updateOrderStatus`, { orderId, status });
}

export const BookTableApi = (bookingData) => {
    return axios.post(`${mainURL}/bookTable`, bookingData);
}

export const ReportServiceLandingApi = (reportData) => {
    return axios.post(`${mainURL}/reportServiceLanding`, reportData);
}