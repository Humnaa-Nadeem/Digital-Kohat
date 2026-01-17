import axios from "axios";
import { toast } from "react-toastify";
export const maniURL = "http://localhost:5500";

export const verfiyTheAdmin = (email, password) => {
    axios.post(`/AdminLogin`, { email, password })
        .then((res) => {
            if (res.data.success && res.data.token) {
                window.location.href = "/dashboard";
            } else {
                toast.error(res.data.message);
            }
        })
        .catch((err) => {
            window.location.href = "/admin/login";
        })
}

export const GetTheDashboardDta = (setDashboardData, setLoading) => {
    axios.get(`/getDashBoardDta`, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setDashboardData(res.data.instDta);
                setLoading(false);
            } else {
                window.location.href = "/admin/login";
            }
        })
        .catch((err) => {
            window.location.href = "/admin/login";
        })
}

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
        })
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
            setBasicInfoChanged(false);
        } else {
            toast.error(res.data.message);
        }
    }).catch((err) => {
        console.log(err);
        toast.error("Something went wrong while updating administration");
    });
};

export const saveStaffInfo = (staff, setstaffSecChanged) => {
    axios.post(`${maniURL}/UpdateStaff`, staff, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setstaffSecChanged(false);
            } else {
                toast.error(res.data.message);
            }
        })
        .catch((err) => {
            console.error(err);
            toast.error("Something went wrong while updating staff");
        });
};



export const SaveGalleryImgs = (ImagesArr, setGalleryChanged) => {
    axios.post(`${maniURL}/UpdateGallery`, ImagesArr, {
        withCredentials: true,
    })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setGalleryChanged(false);
            } else {
                toast.error(res.data.message);
            }
        })
        .catch((err) => {
            console.error(err);
            toast.error("Something went wrong while updating staff");
        });
};
