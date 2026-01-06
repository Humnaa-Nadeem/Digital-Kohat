import React from "react";

export const categories = [
    {
        title: "Hospitals",
        description: "Major hospitals offering emergency and inpatient care.",
        icon: <span role="img" aria-label="hospital">🏥</span>,
        link: "/hospital/hospitals",
        btn: "Explore"
    },
    {
        title: "Clinics",
        description: "Outpatient clinics and specialist consulting centers.",
        icon: <span role="img" aria-label="clinic">🏨</span>,
        link: "/hospital/clinics",
        btn: "Explore"
    },
    {
        title: "Pharmacies",
        description: "Local pharmacies and medical stores for prescriptions.",
        icon: <span role="img" aria-label="pharmacy">💊</span>,
        link: "/hospital/pharmacies",
        btn: "Explore"
    },
    {
        title: "Diagnostic Centers",
        description: "Labs and imaging centers for tests and scans.",
        icon: <span role="img" aria-label="diagnostic">🧪</span>,
        link: "/hospital/diagnostics",
        btn: "Explore"
    },
    {
        title: "Ambulance Services",
        description: "Emergency transport and ambulance contacts.",
        icon: <span role="img" aria-label="ambulance">🚑</span>,
        link: "/hospital/ambulance",
        btn: "Explore"
    },
    {
        title: "Specialists",
        description: "Find available specialist doctors and clinics.",
        icon: <span role="img" aria-label="specialist">🩺</span>,
        link: "/hospital/specialists",
        btn: "Explore"
    }
];

export default categories;
