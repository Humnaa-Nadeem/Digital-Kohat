import axios from "axios";
import { toast } from "react-toastify";
const mainURL = "http://localhost:5500"
export const GetSchoolCrdsDtaFrmDB = (SchoolCrds, setSchoolCrds) => {
    axios.get(`${mainURL}/getSchlCrdDta`)
        .then((res) => {
            if (res.data.success) {
                setSchoolCrds(prev => ([
                    ...prev,
                    res.data.SchlCrdData
                ]));
            } else {
                console.log(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const GetTheSchlData = (SchoolId, setFltedData, setDataOf) => {
    axios.post(`${mainURL}/getSchlWholeDta`, { SchoolId })
        .then((res) => {
            if (res.data.success) {
                setFltedData(res.data.SchlData);
                setDataOf("Db");
            } else {
                console.log(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const ChangeRatingData = (ratingData, id, setRatingSubmitted) => {
    axios.post(`${mainURL}/changeRatingData`, { ratingData, id })
        .then((res) => {
            if (res.data.success) {
                // setRatingSubmitted(true);
                toast.success("Your rating is submitted Successfully ✅");
            } else {
                window.scrollTo(0, 0);
                toast.error(res.data.message);
            }
        }).catch((err) => {
            toast.error("Something went wrong");
        })
}