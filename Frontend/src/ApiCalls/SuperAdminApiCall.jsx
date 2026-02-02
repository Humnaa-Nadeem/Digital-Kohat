import axios from "axios";
const mainURL = "http://localhost:5500";
import { toast } from "react-toastify";


export const CreateEduCataAdmin = (AdminData, setActiveTab) => {
    axios.post(`/CreateEduCataAdmin`, AdminData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setActiveTab("SCHOOL");
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while creating the admin.");
        })
}

export const GetEduNewReqTabData = (dataOf, setRowData) => {
    let route;
    if (dataOf === "NEW_REQUESTS") {
        route = `${mainURL}/GetSADEduTabData`;
    } else if (dataOf === "SCHOOL") {
        route = `${mainURL}/GetSchoolEduTabData`;
    }

    axios.post(route, { dataOf }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setRowData(res.data.ResponseData);
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while fetching the data.");
        })
}

export const GetEduSecSchoolTabDataForSP = (dataOf, setRowData) => { // SP => Super Admin;
    axios.post(`${mainURL}/GetSchoolEduTabData`, { dataOf }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setRowData(res.data.NewRequests);
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while fetching the data.");
        })
}

export const ChangeAdminVerificationState = (adminId, setData) => {
    axios.post(`${mainURL}/ChangeAdminVerificationState`, { adminId }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setData(prevData => prevData.map(admin =>
                    admin.adminId === adminId
                        ? { ...admin, verified: !admin.verified }
                        : admin
                ));
                toast.success("Admin verification state changed successfully.");
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while changing admin verification state.");
        })
}

export const ChangeInstState = (adminId, InstId, setData) => {
    axios.post(`${mainURL}/ChangeTheInstState`, { adminId, InstId }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setData(prevData => prevData.map(admin =>
                    admin.adminId === adminId
                        ? { ...admin, status: !admin.status }
                        : admin
                ));
                toast.success("Institution state changed successfully");
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while changing institution state.");
        })
}

export const DeleteTheInst = (adminId, InstId, setData) => {
    axios.post(`${mainURL}/DeleteTheInst`, { adminId, InstId }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setData(prevData => prevData.filter(admin => admin.adminId !== adminId));
                toast.success(res.data.message);
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while deleting the institution.");
        })
}

export const deleteRequest = (reqId, setRowData) => {
    axios.post(`${mainURL}/DeleteTheReq`, { reqId }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setRowData(prevData => prevData.filter(request => request._id !== reqId));
                toast.success("Request deleted successfully");
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while deleting the request.");
        })
}

export const ChangePaymentPlan = (adminId, InstId, setData, newPlan) => {
    axios.post(`${mainURL}/ChangePaymentData`, { adminId, InstId, newPlan }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setData(prevData => prevData.map(admin =>
                    admin.adminId === adminId
                        ? { ...admin, paymentPlan: res.data.newPlan }
                        : admin
                ));
                toast.success("Payment plan updated successfully");
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while updating the payment plan.");
        }
        );
}

export const VerifyTheSuperAdmin = (setRole, setSuperAdminEmail, setSAManagers) => {
    axios.get(
        `/GetSuperAdminDashboardData`, { withCredentials: true }
    )
        .then((res) => {
            if (!res.data.success) {
                window.location.href = "/superadmin/login";
            } else {
                setRole(res.data.AccessTo);
                if (res.data.SAMail) {
                    setSAManagers(res.data.data.SAManagers)
                    setSuperAdminEmail(res.data.SAMail);
                }
            }
        })
        .catch(() => {
            window.location.href = "/superadmin/login";
        });
};

export const SuperAdminFormSubmitted = (formData, setIsLoading) => {
    axios.post(`/SuperAdminLogin`, formData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                window.location.href = "/superadmin/dashboard";
            }
            else {
                setIsLoading(false);
                toast.error(res.data.message);
            }
        }).catch((err) => {
            toast.error("An error occurred during login.");
        }
        );
}

export const CreateSAManager = (formData, setSAManagers) => {
    axios.post(`/CreateSAManager`, formData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setSAManagers(prev => ([
                    ...prev,
                    {
                        AccessTo: formData.AccessTo
                    }
                ]));

                toast.success(res.data.message);
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            console.log(err);
            toast.error("something went wrong.")
        });
}

export const SAManagerDelete = (catagory, setSAManagers) => {
    axios.post(`/DeleteThSAManager`, { catagory }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setSAManagers(prev =>
                    prev.filter(m => m.AccessTo !== catagory)
                );
                toast.success(res.data.message || "Manager deleted successfully");
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log("err", err);
        })
}