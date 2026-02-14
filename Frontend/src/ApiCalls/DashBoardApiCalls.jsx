import axios from "axios";
import { toast } from "react-toastify";
export const maniURL = "http://localhost:5500";

export const verfiyTheAdmin = (email, password) => {
    axios.post(`/AdminLogin`, { email, password })
        .then((res) => {
            if (res.data.success) {
                window.location.href = "/edu/dashboard";
            } else {
                toast.error(res.data.message);
            }
        })
        .catch((err) => {
            window.location.href = "/edu/admin";
        })
}

// Added verifyFoodAdmin
export const verifyFoodAdmin = (email, password) => {
    axios.post(`/AdminLogin`, { email, password })
        .then((res) => {
            if (res.data.success) {
                window.location.href = "/food/fooddashboard";
            } else {
                toast.error(res.data.message);
            }
        })
        .catch((err) => {
            window.location.href = "/food/admin";
        })
}

export const GetTheDashboardDta = (setDashboardData, setLoading, setAdminOtherServices) => {
    axios.get(`/getDashBoardDta`, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setDashboardData(res.data.ServiceDta);
                setAdminOtherServices(res.data.OtherServices);
                setLoading(false);
            } else {
                // console.log("Error:", res.data);
                window.location.href = "/edu/admin";
            }
        })
        .catch((err) => {
            console.log("Error:", err.response?.data || err.message);
            window.location.href = "/edu/admin";
        })
}

export const SwitchDashBoard = async (ServiceName, ServiceId, ServiceType, setDashboardData, setAdminOtherServices) => {
    try {
        const res = await axios.post(
            `${maniURL}/switchDashBoard`,
            { ServiceName, ServiceId, ServiceType },
            { withCredentials: true }
        );
        if (res.data.success) {
            setDashboardData(res.data.ServiceDta);
            if (res.data.role === "admin") {
                setAdminOtherServices(res.data.OtherServices || []);
            }
            window.location.reload();
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        console.error(err);
        toast.error("Failed to switch dashboard");
    }
};

export const SendResAndPrfumncDataToDb = (ResAndPrfrmnc, setResAndPrfSecChanged) => {
    axios.post(`${maniURL}/AddResAndPrfumncData`, { ResAndPrfrmnc }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setResAndPrfSecChanged(false);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        });
}

export const SendStaffAndStudentDataToDb = (staffAndStudnt, setStaffAndStudSecChanged) => {
    axios.post(`${maniURL}/AddStaffAndStudntData`, { staffAndStudnt }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                console.log(res.data);
                toast.success(res.data.message);
                setStaffAndStudSecChanged(false);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const deleteTheEvent = (title) => {
    axios.post("/deleteTheEvent", { title }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error("Something went wrong.")
            }
        })
        .catch((err) => {
            toast.error("something went wrong");
        })
}

export const SendFeeTabDataToDb = (feeData, setCanSubmitForm) => {
    axios.post(`${maniURL}/AddFeeTabData`, { feeData }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success("Fee Tab Data Added ✅.");
                setCanSubmitForm(false)
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}
//
export const SendReviewTabDataToDb = (Reviews, setReviewSecChanged) => {
    axios.post(`${maniURL}/AddReviewTabData`, { Reviews }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setReviewSecChanged(false)
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const AddNewEvent = (eventData, setCanSubmitForm) => {
    setCanSubmitForm(false);
    axios.post(`${maniURL}/AddNewEvent`, { eventData }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setCanSubmitForm(true);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const UpdateExtraActivities = (extraActivities, setAcitivtiesSecChanged) => {
    axios.post(`${maniURL}/UpdateExtraActivities`, { extraActivities }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setAcitivtiesSecChanged(false)
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong while updating activities");
        });
};

export const UpdateTimings = (timings, setTimingSecChanged) => {
    axios.post(`${maniURL}/UpdateTimings`, { timings }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setTimingSecChanged(false);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong while updating timings");
        });
};

export const UpdateFacilities = (facilities, setFacilitiesSecChanged) => {
    axios.post(`${maniURL}/UpdateFacilities`, { facilities }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setFacilitiesSecChanged(false);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong while updating facilities");
        });
};

export const UpdateAdministration = (administration, setAdminSecChanged) => {
    axios.post(`${maniURL}/UpdateAdministration`, { administration }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setAdminSecChanged(false);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong while updating administration");
        });
};

export const saveBasicInfoApi = (formData, setBasicInfoChanged) => {
    setBasicInfoChanged(false);
    axios.post(
        `${maniURL}/UpdateBasicInfo`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
    ).then((res) => {
        if (res.data.success) {
            toast.success(res.data.message);
        } else {
            setBasicInfoChanged(true);
            toast.error(res.data.message);
        }
    }).catch((err) => {
        setBasicInfoChanged(true);
        toast.error("Something went wrong.");
    });
};

export const saveStaffInfo = (staff, setstaffSecChanged) => {
    setstaffSecChanged(false);
    axios.post(`${maniURL}/UpdateStaff`, staff, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                setstaffSecChanged(true);
                toast.error(res.data.message);
            }
        })
        .catch((err) => {
            console.error(err);
            toast.error("Something went wrong while updating staff");
        });
};

export const SaveGalleryImgs = (ImagesArr, setGalleryChanged) => {
    setGalleryChanged(false);
    axios.post(`${maniURL}/UpdateGallery`, ImagesArr, {
        withCredentials: true,
    })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                setGalleryChanged(true);
                toast.error(res.data.message);
            }
        })
        .catch((err) => {
            console.error(err);
            toast.error("Something went wrong while updating staff");
        });
};

export const AddManagerApi = (formData) => {
    axios.post(`${maniURL}/AddManager`, formData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong.");
        });
}

export const UpdateFoodProfileApi = (formData, setProfileData) => {
    axios.post(`${maniURL}/UpdateBasicInfo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
    })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.error(err);
            toast.error("Failed to update profile.");
        });
}

export const UpdateFoodMenuApi = (menuItems, setMenuItems) => {
    axios.post(`${maniURL}/UpdateFoodMenu`, { menuItems }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setMenuItems(menuItems);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.error(err);
            toast.error("Failed to update menu.");
        });
}

export const UpdateReviewReplyApi = (reviewId, response) => {
    axios.post(`${maniURL}/ReplyToReview`, { reviewId, response }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success("Reply saved successfully.");
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.error(err);
            toast.error("Failed to save reply.");
        });
}

export const LogoutApi = () => {
    axios.post(`${maniURL}/Logout`, {}, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                window.location.href = "/food/admin";
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.error(err);
            toast.error("Failed to logout.");
        });
}

export const SubmitSupportTicketApi = (ticketData, callback) => {
    axios.post(`${maniURL}/SubmitSupportTicket`, ticketData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                if (callback) callback(res.data.ticket);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.error(err);
            toast.error("Failed to submit support ticket.");
        });
}
