import axios from "axios";
const mainURL = "http://localhost:5500";
import { toast } from "react-toastify";

export const CreateEduCataAdmin = (AdminData, setActiveTab, ServiceType) => {
    axios.post(`/CreateEduCataAdmin`, AdminData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setActiveTab(ServiceType);
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
            setIsLoading(false);
            toast.error(err.message);
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

export const GetTheTabData = (dataOf, setRowData) => {
    let route;
    if (dataOf === "NEW_REQUESTS") {
        route = `${mainURL}/GetEduTabNewReqtsData`;
    } else if (dataOf === "NEW_ADMISSIONS") {
        route = `${mainURL}/GetEduTabNewAdnissionsData`;
    } else {
        route = `${mainURL}/GetSADEduTabData`;
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
            window.location.href = "/superadmin/login";
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

export const ChangeInstState = async (
    adminId,
    InstId,
    ServiceType,
    setData
) => {
    try {

        const res = await axios.post(
            `${mainURL}/ChangeTheInstState`,
            { adminId, InstId, ServiceType },
            { withCredentials: true }
        );

        if (!res.data.success) {
            if (res.data.message === "Not authorized.") {
                window.location.href = "/superadmin/login";
                return;
            }
            toast.error(res.data.message);
            return;
        }

        const updatedStatus = res.data.instituteStatus;

        setData((prevData) =>
            prevData.map((v) =>
                v.institutionId === InstId
                    ? { ...v, instituteStatus: updatedStatus }
                    : v
            )
        );

        toast.success("Institution state changed successfully");

    } catch (err) {
        window.location.href = "/superadmin/login";
    }
};

export const DeleteTheInst = (adminId, InstId, setData) => {
    axios.post(`${mainURL}/DeleteTheInst`, { adminId, InstId }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setData(prevData => prevData.filter(admin => admin.institutionId !== InstId));
                toast.success(res.data.message);
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            window.location.href = "/superadmin/login";
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

export const ChangePaymentPlan = (adminId, InstId, setData, newPlan, ServiceType) => {

    axios.post(
        `${mainURL}/ChangePaymentData`,
        { adminId, InstId, newPlan, ServiceType },
        { withCredentials: true }
    )
        .then((res) => {
            if (!res.data.success) {


                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                    return;
                }

                toast.error(res.data.message);
                return;
            }

            const updatedPlan = res.data.newPlan;

            /* ⭐ Correct State Update */

            setData(prevData =>
                prevData.map(row =>
                    row.institutionId === InstId
                        ? {
                            ...row,
                            paymentPlan: updatedPlan  // Sync paymentPlan
                        }
                        : row
                )
            );

            toast.success("Payment plan updated successfully");

        })
        .catch(() => {
            window.location.href = "/superadmin/login";
        });
};

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
                    // window.location.href = "/superadmin/login";
                    toast.error(res.data.message);
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

export const ApproveAdmissionAndForward = (admissionId) => {
    axios.post(`${mainURL}/ApproveAdmissionAndForward`, {
        admissionId,
    }, { withCredentials: true }).then((res) => {
        if (res.data.success) {
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }
    }).catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
    })
}

export const handleGetRecords = async (adminId, institutionId, setData, setActiveTab) => {
    try {
        const res = await axios.post(`${mainURL}/getInstituteRecords`, {
            adminId,
            institutionId
        }, { withCredentials: true });

        if (res.data.success) {
            setData(res.data.records);
            setActiveTab("RECORD");
        } else {
            toast.error(res.data.message || "Failed to load records.");
        }
    } catch (error) {
        console.error("Error fetching records:", error);
        toast.error("Server error while fetching records.");
    }
};

export const deleteAdmissionReq = async (requestId, setData) => {
    try {
        const res = await axios.post(
            `${mainURL}/deleteAdmissionRequest`,
            { requestId },
            { withCredentials: true }
        );

        if (res.data.success) {
            setData((prev) => prev.filter((item) => item._id !== requestId));

            toast.success(res.data.message || "Request deleted.");
        } else {
            toast.error(res.data.message || "Failed to delete request.");
        }
    } catch (error) {
        console.log("deleteRAdmissionReq error:", error);
        toast.error("Server error.");
    }
};

export const deleteAdmissionRecord = async (admissionId, setData) => {
    try {

        const res = await axios.post(
            `${mainURL}/deleteAdmissionRecord`,
            { admissionId },
            { withCredentials: true }
        );

        if (res.data.success) {

            setData((prev) =>
                prev.filter((item) => item.admissionId !== admissionId)
            );

            toast.success(res.data.message || "Admission record deleted.");

        } else {

            toast.error(res.data.message || "Failed to delete admission record.");

        }

    } catch (error) {

        console.log("deleteAdmissionRecord error:", error);
        toast.error("Server error.");

    }
};

export const GetEducationNotificationCounts = (setCounts) => {
    axios.get(`/GetEducationNotificationCounts`, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setCounts({
                    admissions: res.data.admissionsCount,
                    requests: res.data.requestsCount
                });
            }
        }).catch((err) => {
            console.error("Error fetching notification counts:", err);
        });
}