import axios from "axios";
const maniURL = "http://localhost:5500";

export const SendAdmnTabDataToDb = (administration, facilities, timings) => {
    axios.post(`${maniURL}/AddAdminTabData`, { administration, facilities , timings})
        .then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err)
    })
}
