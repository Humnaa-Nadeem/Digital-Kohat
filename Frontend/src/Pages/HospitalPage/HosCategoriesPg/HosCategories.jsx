import React from "react";

export const categories = [
    {
        title: "Hospitals",
        description: "Major hospitals offering emergency and inpatient care.",
        icon: <span role="img" aria-label="hospital">🏥</span>,
        img: "https://images.unsplash.com/photo-1587351021759-3e566b9af955?q=80&w=1000&auto=format&fit=crop",
        link: "/hospital/hospitals",
        btn: "Explore"
    },
    {
        title: "Clinics",
        description: "Outpatient clinics and specialist consulting centers.",
        icon: <span role="img" aria-label="clinic">🏨</span>,
        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop",
        link: "/hospital/clinics",
        btn: "Explore"
    },
    {
        title: "Pharmacies",
        description: "Local pharmacies and medical stores for prescriptions.",
        icon: <span role="img" aria-label="pharmacy">💊</span>,
        img: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000&auto=format&fit=crop",
        link: "/hospital/pharmacies",
        btn: "Explore"
    },
    {
        title: "Diagnostic Centers",
        description: "Labs and imaging centers for tests and scans.",
        icon: <span role="img" aria-label="diagnostic">🧪</span>,
        img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
        link: "/hospital/diagnostics",
        btn: "Explore"
    },
    {
        title: "Ambulance Services",
        description: "Emergency transport and ambulance contacts.",
        icon: <span role="img" aria-label="ambulance">🚑</span>,
        img: "https://images.unsplash.com/photo-1625126596347-8cfb467e45e7?q=80&w=1000&auto=format&fit=crop", /* Ambulance real photo */
        link: "/hospital/ambulance",
        btn: "Explore"
    },
    {
        title: "Specialists",
        description: "Find available specialist doctors and clinics.",
        icon: <span role="img" aria-label="specialist">🩺</span>,
        img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop", /* Doctor real photo */
        link: "/hospital/specialists",
        btn: "Explore"
    }
];

export default categories;
