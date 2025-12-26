// import axios from "axios";
// const mainUrl = "http://localhost:5500";
// // Sending data of Education home page to the the database;
// export const SendEduHomeDtaToDb = (schools) => {
//     axios.post(`${mainUrl}/AddEduHomeDta`, schools)
//         .then((res) => {
//             console.log(res.data)
//         }).catch((err) => {
//             console.log(err);
//         })
// }

// // Geting data of Education home page to the the database;
// export const GetEduHomeDtaFrmDb = async (signal) => {
//     try {
//         const response = await axios.get(
//             `${mainUrl}/GetEduHomeDta`,
//             {
//                 signal: signal   // 👈 Axios listens to this
//             }
//         );

//         return response.data.DtaArr;   // 👈 return data, DO NOT set state here
//     } 
//     catch (error) {
//         // 👇 VERY IMPORTANT: ignore aborted requests
//         if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
//             // Request was cancelled → do nothing
//             return;
//         }

//         // 👇 Real errors only
//         console.error("API Error:", error);
//         throw error;
//     }
// };

// // Getting Schools Data:
// export const GetSchoolDtaFrmDb = async (signal) => {
//     try {
//         const response = await axios.get(
//             `${mainUrl}/GetSchoolDta`,
//             {
//                 signal: signal   // 👈 Axios listens to this
//             }
//         );
//         return response.data.DtaArr;   // 👈 return data, DO NOT set state here
//     } 
//     catch (error) {
//         // 👇 VERY IMPORTANT: ignore aborted requests
//         if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
//             console.log("Aborted");
//             // Request was cancelled → do nothing
//             return;
//         }

//         // 👇 Real errors only
//         console.error("API Error:", error);
//         throw error;
//     }
// };

// // Geting College Data;
// export const GetClgsDtaFrmDb = async (signal) => {
//     try {
//         const response = await axios.get(
//             `${mainUrl}/GetClgDta`,
//             {
//                 signal: signal   // 👈 Axios listens to this
//             }
//         );

//         return response.data.DtaArr;   // 👈 return data, DO NOT set state here
//     } 
//     catch (error) {
//         // 👇 VERY IMPORTANT: ignore aborted requests
//         if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
//             // Request was cancelled → do nothing
//             return;
//         }

//         // 👇 Real errors only
//         console.error("API Error:", error);
//         throw error;
//     }
// };

// // Geting Universities Data;
// export const GetUnisDtaFrmDb = async (signal) => {
//     try {
//         const response = await axios.get(
//             `${mainUrl}/GetUniDta`,
//             {
//                 signal: signal   // 👈 Axios listens to this
//             }
//         );

//         return response.data.DtaArr;   // 👈 return data, DO NOT set state here
//     } 
//     catch (error) {
//         // 👇 VERY IMPORTANT: ignore aborted requests
//         if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
//             // Request was cancelled → do nothing
//             return;
//         }

//         // 👇 Real errors only
//         console.error("API Error:", error);
//         throw error;
//     }
// };

// // Getting Online Courses Data:
// export const GetOCsDtaFrmDb = async (signal) => {
//     try {
//         const response = await axios.get(
//             `${mainUrl}/GetOCsDta`,
//             {
//                 signal: signal   // 👈 Axios listens to this
//             }
//         );

//         return response.data.DtaArr;   // 👈 return data, DO NOT set state here
//     } 
//     catch (error) {
//         // 👇 VERY IMPORTANT: ignore aborted requests
//         if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
//             // Request was cancelled → do nothing
//             return;
//         }

//         // 👇 Real errors only
//         console.error("API Error:", error);
//         throw error;
//     }
// };

// // Getting Online Trainings Data:
// export const GetOTsDtaFrmDb = async (signal) => {
//     try {
//         const response = await axios.get(
//             `${mainUrl}/GetOTsDta`,
//             {
//                 signal: signal   // 👈 Axios listens to this
//             }
//         );

//         return response.data.DtaArr;   // 👈 return data, DO NOT set state here
//     } 
//     catch (error) {
//         // 👇 VERY IMPORTANT: ignore aborted requests
//         if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
//             // Request was cancelled → do nothing
//             return;
//         }

//         // 👇 Real errors only
//         console.error("API Error:", error);
//         throw error;
//     }
// };

// // Getting Tutors Data:
// export const GetTutorsDtaFrmDb = async (signal) => {
//     try {
//         const response = await axios.get(
//             `${mainUrl}/GetTutrsDta`,
//             {
//                 signal: signal   // 👈 Axios listens to this
//             }
//         );

//         return response.data.DtaArr;   // 👈 return data, DO NOT set state here
//     } 
//     catch (error) {
//         // 👇 VERY IMPORTANT: ignore aborted requests
//         if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
//             // Request was cancelled → do nothing
//             return;
//         }

//         // 👇 Real errors only
//         console.error("API Error:", error);
//         throw error;
//     }
// };
