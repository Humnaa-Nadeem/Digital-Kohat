import axios from "axios";
<<<<<<< HEAD
const mainURL = "http://localhost:5500";
import { toast } from "react-toastify";


export const CreateEduCataAdmin = (AdminData, setActiveTab) => {
    axios.post(`${mainURL}/CreateEduCataAdmin`, AdminData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setActiveTab("SCHOOL");
=======
import { toast } from "react-toastify";

const mainURL = "http://localhost:5500";

// --- AUTH & CORE ---

export const SuperAdminFormSubmitted = (formData, setIsLoading) => {
    axios.post(`/SuperAdminLogin`, formData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                window.location.href = "/superadmin/dashboard";
            } else {
                setIsLoading(false);
                toast.error(res.data.message);
            }
        }).catch((err) => {
            setIsLoading(false);
            toast.error(err.message || "An error occurred during login.");
        });
};

export const VerifyTheSuperAdmin = (setRole, setSuperAdminEmail, setSAManagers) => {
    axios.get(`/GetSuperAdminDashboardData`, { withCredentials: true })
        .then((res) => {
            if (!res.data.success) {
                window.location.href = "/superadmin/login";
            } else {
                setRole(res.data.AccessTo);
                if (res.data.SAMail) {
                    setSAManagers(res.data.data.SAManagers);
                    setSuperAdminEmail(res.data.SAMail);
                }
            }
        })
        .catch(() => {
            window.location.href = "/superadmin/login";
        });
};

export const CreateSAManager = (formData, setSAManagers) => {
    axios.post(`${mainURL}/CreateSAManager`, formData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setSAManagers(prev => ([
                    ...prev,
                    { AccessTo: formData.AccessTo }
                ]));
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.error(err);
            toast.error("Something went wrong.");
        });
};

export const SAManagerDelete = (catagory, setSAManagers) => {
    axios.post(`${mainURL}/DeleteThSAManager`, { catagory }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setSAManagers(prev => prev.filter(m => m.AccessTo !== catagory));
                toast.success(res.data.message || "Manager deleted successfully");
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.error("err", err);
        });
};

// --- EDUCATION MODULE ---

export const CreateEduCataAdmin = (AdminData, setActiveTab, ServiceType) => {
    axios.post(`/CreateEduCataAdmin`, AdminData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setActiveTab(ServiceType);
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while creating the admin.");
<<<<<<< HEAD
        })
}

export const GetEduNewReqTabData = (dataOf, setRowData) => {
    let route;
    if (dataOf === "NEW_REQUESTS") {
        route = `${mainURL}/GetSADEduTabData`;
    } else if (dataOf === "SCHOOL") {
        route = `${mainURL}/GetSchoolEduTabData`;
=======
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
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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
<<<<<<< HEAD
            toast.error("An error occurred while fetching the data.");
        })
}

export const GetEduSecSchoolTabDataForSP = (dataOf, setRowData) => { // SP => Super Admin;
=======
            window.location.href = "/superadmin/login";
        });
};

export const GetEduSecSchoolTabDataForSP = (dataOf, setRowData) => {
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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
<<<<<<< HEAD
        })
}
=======
        });
};
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

export const ChangeAdminVerificationState = (adminId, setData) => {
    axios.post(`${mainURL}/ChangeAdminVerificationState`, { adminId }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setData(prevData => prevData.map(admin =>
<<<<<<< HEAD
                    admin.adminId === adminId
                        ? { ...admin, verified: !admin.verified }
                        : admin
=======
                    admin.adminId === adminId ? { ...admin, verified: !admin.verified } : admin
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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
<<<<<<< HEAD
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
=======
        });
};

export const ChangeInstState = async (adminId, InstId, ServiceType, setData) => {
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
                v.institutionId === InstId ? { ...v, instituteStatus: updatedStatus } : v
            )
        );
        toast.success("Institution state changed successfully");
    } catch (err) {
        window.location.href = "/superadmin/login";
    }
};
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

export const DeleteTheInst = (adminId, InstId, setData) => {
    axios.post(`${mainURL}/DeleteTheInst`, { adminId, InstId }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
<<<<<<< HEAD
                setData(prevData => prevData.filter(admin => admin.adminId !== adminId));
=======
                setData(prevData => prevData.filter(admin => admin.institutionId !== InstId));
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                toast.success(res.data.message);
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
<<<<<<< HEAD
            toast.error("An error occurred while deleting the institution.");
        })
}
=======
            window.location.href = "/superadmin/login";
        });
};
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

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
<<<<<<< HEAD
        })
}

// FOOD API CALLS
=======
        });
};

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
            setData(prevData =>
                prevData.map(row =>
                    row.institutionId === InstId ? { ...row, paymentPlan: updatedPlan } : row
                )
            );
            toast.success("Payment plan updated successfully");
        })
        .catch(() => {
            window.location.href = "/superadmin/login";
        });
};

export const ApproveAdmissionAndForward = (admissionId) => {
    axios.post(`${mainURL}/ApproveAdmissionAndForward`, { admissionId }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.error(err);
            toast.error("Something went wrong");
        });
};

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
        console.error("deleteRAdmissionReq error:", error);
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
            setData((prev) => prev.filter((item) => item.admissionId !== admissionId));
            toast.success(res.data.message || "Admission record deleted.");
        } else {
            toast.error(res.data.message || "Failed to delete admission record.");
        }
    } catch (error) {
        console.error("deleteAdmissionRecord error:", error);
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
};

// --- FOOD MODULE ---

>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
export const CreateFoodCataAdmin = (AdminData, setActiveTab) => {
    axios.post(`${mainURL}/CreateFoodCataAdmin`, AdminData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                setActiveTab("RESTAURANT");
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while creating the admin.");
<<<<<<< HEAD
        })
}

export const GetFoodNewReqTabData = (dataOf, setRowData) => {
    let route;
    // dataOf usually is the tab name
=======
        });
};

export const GetFoodNewReqTabData = (dataOf, setRowData) => {
    let route;
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
    if (dataOf === "NEW_REQUESTS") {
        route = `${mainURL}/GetSADFoodTabData`;
    } else if (dataOf === "RESTAURANT") {
        route = `${mainURL}/GetFoodTabData`;
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
<<<<<<< HEAD
        })
}
=======
        });
};
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

export const ChangeFoodAdminVerificationState = (adminId, setData) => {
    axios.post(`${mainURL}/ChangeFoodAdminVerificationState`, { adminId }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setData(prevData => prevData.map(admin =>
<<<<<<< HEAD
                    admin.adminId === adminId
                        ? { ...admin, verified: !admin.verified }
                        : admin
=======
                    admin.adminId === adminId ? { ...admin, verified: !admin.verified } : admin
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
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
<<<<<<< HEAD
        })
}
=======
        });
};
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

export const ChangeFoodInstState = (adminId, InstId, setData) => {
    axios.post(`${mainURL}/ChangeTheFoodInstState`, { adminId, InstId }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setData(prevData => prevData.map(admin =>
<<<<<<< HEAD
                    admin.adminId === adminId
                        ? { ...admin, status: !admin.status }
                        : admin
=======
                    admin.adminId === adminId ? { ...admin, status: !admin.status } : admin
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                ));
                toast.success("Food Service state changed successfully");
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while changing Food Service state.");
<<<<<<< HEAD
        })
}
=======
        });
};
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

export const DeleteTheFoodInst = (adminId, InstId, setData) => {
    axios.post(`${mainURL}/DeleteTheFoodInst`, { adminId, InstId }, { withCredentials: true })
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
            toast.error("An error occurred while deleting the Food Service.");
<<<<<<< HEAD
        })
}
=======
        });
};
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

export const deleteFoodRequest = (reqId, setRowData) => {
    axios.post(`${mainURL}/DeleteTheFoodReq`, { reqId }, { withCredentials: true })
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
<<<<<<< HEAD
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
        `${mainURL}/GetSuperAdminDashboardData`, { withCredentials: true }
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
    axios.post(`${mainURL}/SuperAdminLogin`, formData, { withCredentials: true })
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
    axios.post(`${mainURL}/CreateSAManager`, formData, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setSAManagers(prev => ([
                    ...prev,
                    {
                        AccessTo: formData.AccessTo
                    }
                ]));

                toast.success(res.data.message);
=======
        });
};

// --- BUSINESS MODULE ---

export const GetBusinessesByStatus = (status, setRowData) => {
    axios.post(`${mainURL}/GetBusinessesByStatus`, { status }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                setRowData(res.data.responseData);
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
<<<<<<< HEAD
            console.log(err);
            toast.error("something went wrong.")
        });
}

export const SAManagerDelete = (catagory, setSAManagers) => {
    axios.post(`${mainURL}/DeleteThSAManager`, { catagory }, { withCredentials: true })
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
=======
            toast.error("An error occurred while fetching business data.");
        });
};

export const UpdateBusinessStatus = (id, status, fromCollection, refreshData) => {
    axios.post(`${mainURL}/UpdateBusinessStatus`, { id, status, fromCollection }, { withCredentials: true })
        .then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                refreshData();
            } else {
                if (res.data.message === "Not authorized.") {
                    window.location.href = "/superadmin/login";
                } else {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            toast.error("An error occurred while updating status.");
        });
};

>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
