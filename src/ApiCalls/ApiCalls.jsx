import axios from "axios";
import { toast } from "react-toastify";
const mainURL = "http://localhost:5500";

export const RequestRegisterOtpApi = async (
    formData,
    setLoading,
    setOtpSent
) => {
    try {
        setLoading(true);

        const payload = {
            fullName: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone?.trim() || null,
            password: formData.password,
            address: formData.address.trim(),
            DOB: formData.DOB,
        };

        const res = await axios.post(`${mainURL}/register/user/request-otp`, payload, {
            withCredentials: true,
        });

        if (res.data.success) {
            toast.success("OTP sent to your email 📩");
            setOtpSent(true);
        } else {
            toast.error(res.data.message || "Failed to send OTP.");
        }
    } catch (err) {
        console.log("ERr ", err);
        toast.error("Something went wrong.");
    } finally {
        setLoading(false);
    }
};

// 2) Verify OTP + Create User
export const VerifyRegisterOtpApi = async (email, otp, setLoading) => {
    try {
        setLoading(true);

        const payload = {
            email: email.trim().toLowerCase(),
            otp: otp.trim(),
        };

        const res = await axios.post(`${mainURL}/register/user/verify-otp`, payload, {
            withCredentials: true,
        });

        if (res.data.success) {
            toast.success("Account created successfully ✅");
        } else {
            toast.error(res.data.message || "OTP verification failed.");
        }
    } catch (err) {
        toast.error("Something went wrong.");
    } finally {
        setLoading(false);
    }
};

export const LoginUserApi = async (formData, setLoading, navigate) => {
    try {
        setLoading(true);

        const payload = {
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
        };

        const res = await axios.post(`/user/login`, payload);

        if (res.data.success) {
            navigate("/");
            localStorage.setItem("IsLoggedIn", true);
        } else {
            toast.error(res.data.message || "Login failed.");
        }
    } catch (err) {
        toast.error("Something went wrong.");
    } finally {
        setLoading(false);
    }
};

export const GetUserData = (setUserData) => {
    axios.get(`${mainURL}/user/data`, { withCredentials: true })
        .then(res => {
            if (res.data.success) {
                setUserData(res.data.user);
            }
        })
        .catch((error) => {
            console.log(error);
            console.log("User not logged in");
        });
}

export const GetInstCrdsDtaFrmDB = (setInstCrds, coll) => {
    axios.post(`${mainURL}/getInstCrdDta`, { coll })
        .then((res) => {
            if (res.data.success) {
                setInstCrds(res.data.serviceCards);
            } else {
                console.log(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const GetTheInstData = (InstId, setPageData, coll) => {
    axios.post(`${mainURL}/getInstWholeDta`, { InstId, coll })
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

<<<<<<< HEAD
export const ChangeRatingData = async (payload, setRatingSubmitted) => {
    try {
        const res = await axios.post(`${mainURL}/changeRatingData`, payload, { withCredentials: true });
        if (res.data.success) {
            setRatingSubmitted(true);
            toast.success("Your rating is submitted Successfully ✅");
        } else {
            toast.error(res.data.message || "You have already rated");
        }
    } catch (err) {
        toast.error("Something went wrong");
    }
};
=======
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
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089

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

<<<<<<< HEAD
export const NewAdmisnForSchoolReq = (data, cata, setIsSubmitting) => {
    const fd = new FormData();
    fd.append("studentName", data.studentName);
    fd.append("fatherName", data.fatherName);
    fd.append("email", data.email);
    fd.append("phone", data.phone);
    fd.append("WhatsAppNum", data.WhatsAppNum);
    fd.append("targetClass", data.targetClass);
    fd.append("previousSchool", data.previousSchool);
    fd.append("address", data.address);
    fd.append("id", data.id);
    fd.append("Coll", cata)

    // IMPORTANT
    fd.append("paymentScreenshot", data.paymentScreenshot);

    axios
        .post(`${mainURL}/NewInstAdmissionReq`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        })
        .then((res) => {
            if (res.data.success) {
                alert("Your request submitted successfully ✅.");
            } else {
                if (res.data.message == "getaddrinfo ENOTFOUND api.cloudinary.com") {
                    alert("No Internet")
                } else {
                    alert(res.data.message);
                }
            }
        })
        .catch(() => alert("Something went wrong."));
};
=======
export const BusinessRegistrationReq = (data) => {
    axios.post(`${mainURL}/business/auth/register-request`, data)
        .then((res) => {
            if (res.data.success) {
                alert("Business registration request submitted successfully ✅.");
            } else {
                alert(res.data.message);
            }
        }).catch((err) => {
            alert("Something went wrong with business registration.");
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
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
