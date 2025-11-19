import * as icon from "react-icons/fa";
import schoolImg from "../components/imgs/school.svg";
import restaurantImg from "../components/imgs/restaurant.svg";
import hospitalImg from "../components/imgs/hospitals.svg";
import businessImg from "../components/imgs/business.png";
import techImg from "../components/imgs/technicians.svg";
import tourismImg from "../components/imgs/tourism.png";

// Data of services that web offer;
export const services = [
    {
        title: "Education",
        desc: "Search for quality learning institutions or register your own educational center.",
        img: schoolImg,
        link: "/edu" //Added link to navigate to education sector home page
    },
    {
        title: "Restaurants",
        desc: "Discover or share the best dining spots and food services around you.",
        img: restaurantImg,
    },
    {
        title: "Hospitals",
        desc: "Find trusted medical care or connect your healthcare services with the community.",
        img: hospitalImg,
    },
    {
        title: "Businesses",
        desc: "Explore or promote local shops and businesses in your area.",
        img: businessImg,
    },
    {
        title: "Technicians",
        desc: "Hire skilled workers or offer your professional services with ease.",
        img: techImg,
    },
    {
        title: "Tourism",
        desc: "Plan visits or showcase local attractions and tourism spots.",
        img: tourismImg,
    },
];

// Data of education home page for D/F education Institute (School , College , Uni):
export const categories = [
    {
        title: "Explore School",
        description:
            "Explore top-rated schools offering excellent primary and secondary education with strong foundations.",
        icon: <icon.FaSchool className="icons" />,
        btn: "Visit Schools",
        link: "/edu/schools"
    },
    {
        title: "College's List",
        description:
            "Find the best colleges that prepare students for higher learning, skill development, and innovation.",
        icon: <icon.FaRegBuilding className="icons" />,
        btn: "Visit colleges",
        link: "/edu/colleges"
    },
    {
        title: "Universities",
        description:
            "Discover globally recognized universities offering advanced degrees and research opportunities.",
        icon: <icon.FaUniversity className="icons" />,
        btn: "Visit Universities",
        link: "/edu/uni"
    },
];

// Data of education home page for online courses etc:
export const OtherResources = [
    {
        title: "Online Courses",
        description:
            "Explore top-rated courses offering excellent primary and secondary skills with strong foundations and high scope in future.",
        icon: <icon.FaNetworkWired className="icons" />,
        btn: "Online Courses",
        link: "/edu/schools"
    },
    {
        title: "Tutor Listing",
        description:
            "Find the best colleges that prepare students for higher learning, skill development, and innovation.",
        icon: <icon.FaChalkboardTeacher className="icons" />,
        btn: "Tutor List",
        link: "/edu/colleges"
    },
    {
        title: "Universities",
        description:
            "Discover globally recognized universities offering advanced degrees and research opportunities.",
        icon: <icon.FaUniversity className="icons" />,
        btn: "Visit Universities",
        link: "/edu/uni"
    },
];

//Array of Schools to form school list from;

export const Schools = [
    {
        SchoolName: "School_1",
        id: 1
    },
    {
        SchoolName: "School_2",
        id: 2
    },
    {
        SchoolName: "School_3",
        id: 3
    },
    {
        SchoolName: "School_4",
        id: 4
    },
    {
        SchoolName: "School_5",
        id: 5
    },
    {
        SchoolName: "School_6",
        id: 6
    },
    {
        SchoolName: "School_7",
        id: 7
    },
];

// Array that contain the Schools Details;

export const Schools_Details = [
    {
        id: 1,
        Title: "Green Valley International School",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Schools_Info: [{
            Foundation: "1998",
            School_Type: "Private, Co-educational",
            Medium: "English",
            Classes_Offered: "Playgroup to Grade 12"
        }],
        Facilities: ["Digital Classrooms", "Science & Computer Labs", "Library with 10,000+ Books", "Sports Ground & Indoor Sports Complex"
            , "Cafeteria & Medical Room", "Transportation Available"
        ],
        Achievements: [
            "100% Board Exam Results (Last 5 Years)", "International Science Olympiad Winners", "National Sports Participation", "Top Ranked in Education Survey 2024"
        ],
        Contact_Info: [
            {
                Address: "123 Green Valley Road, Islamabad",
                Email: "info@gvis.edu.pk",
                Phone: "+92 331 1234567",
                website: "www.gvis.edu.pk",
            }
        ]
    },
    {
        id: 2,
        Title: "Allhumdulilah Green Valley International School 2",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Schools_Info: [{
            Foundation: "1998",
            School_Type: "Private",
            Medium: "English",
            Classes_Offered: "Playgroup to Grade 10"
        }],
        Facilities: ["Digital Classrooms", "Science & Computer Labs", "Library with 10,000+ Books", "Sports Ground & Indoor Sports Complex"
            , "Cafeteria & Medical Room", "Transportation Available"
        ],
        Achievements: [
            "100% Board Exam Results (Last 5 Years)", "International Science Olympiad Winners", "National Sports Participation", "Top Ranked in Education Survey 2024"
        ],
        Contact_Info: [
            {
                Address: "123 Green Valley Road, Islamabad",
                Email: "info@gvis.edu.pk",
                Phone: "+92 331 1234567",
                website: "www.gvis.edu.pk",
            }
        ]
    },
    {
        id: 3,
        Title: "Allhumdulilah Green Valley International School 3",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Schools_Info: [{
            Foundation: "1998",
            School_Type: "Private",
            Medium: "English",
            Classes_Offered: "Playgroup to Grade 10"
        }],
        Facilities: ["Digital Classrooms", "Science & Computer Labs", "Library with 10,000+ Books", "Sports Ground & Indoor Sports Complex"
            , "Cafeteria & Medical Room", "Transportation Available"
        ],
        Achievements: [
            "100% Board Exam Results (Last 5 Years)", "International Science Olympiad Winners", "National Sports Participation", "Top Ranked in Education Survey 2024"
        ],
        Contact_Info: [
            {
                Address: "123 Green Valley Road, Islamabad",
                Email: "info@gvis.edu.pk",
                Phone: "+92 331 1234567",
                website: "www.gvis.edu.pk",
            }
        ]
    },
    {
        id: 4,
        Title: "Allhumdulilah Green Valley International School 4",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Schools_Info: [{
            Foundation: "1998",
            School_Type: "Private",
            Medium: "English",
            Classes_Offered: "Playgroup to Grade 10"
        }],
        Facilities: ["Digital Classrooms", "Science & Computer Labs", "Library with 10,000+ Books", "Sports Ground & Indoor Sports Complex"
            , "Cafeteria & Medical Room", "Transportation Available"
        ],
        Achievements: [
            "100% Board Exam Results (Last 5 Years)", "International Science Olympiad Winners", "National Sports Participation", "Top Ranked in Education Survey 2024"
        ],
        Contact_Info: [
            {
                Address: "123 Green Valley Road, Islamabad",
                Email: "info@gvis.edu.pk",
                Phone: "+92 331 1234567",
                website: "www.gvis.edu.pk",
            }
        ]
    },
    {
        id: 5,
        Title: "Allhumdulilah Green Valley International School 5",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Schools_Info: [{
            Foundation: "1998",
            School_Type: "Private",
            Medium: "English",
            Classes_Offered: "Playgroup to Grade 10"
        }],
        Facilities: ["Digital Classrooms", "Science & Computer Labs", "Library with 10,000+ Books", "Sports Ground & Indoor Sports Complex"
            , "Cafeteria & Medical Room", "Transportation Available"
        ],
        Achievements: [
            "100% Board Exam Results (Last 5 Years)", "International Science Olympiad Winners", "National Sports Participation", "Top Ranked in Education Survey 2024"
        ],
        Contact_Info: [
            {
                Address: "123 Green Valley Road, Islamabad",
                Email: "info@gvis.edu.pk",
                Phone: "+92 331 1234567",
                website: "www.gvis.edu.pk",
            }
        ]
    },
    {
        id: 6,
        Title: "Allhumdulilah Green Valley International School 6",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Schools_Info: [{
            Foundation: "1998",
            School_Type: "Private",
            Medium: "English",
            Classes_Offered: "Playgroup to Grade 10"
        }],
        Facilities: ["Digital Classrooms", "Science & Computer Labs", "Library with 10,000+ Books", "Sports Ground & Indoor Sports Complex"
            , "Cafeteria & Medical Room", "Transportation Available"
        ],
        Achievements: [
            "100% Board Exam Results (Last 5 Years)", "International Science Olympiad Winners", "National Sports Participation", "Top Ranked in Education Survey 2024"
        ],
        Contact_Info: [
            {
                Address: "123 Green Valley Road, Islamabad",
                Email: "info@gvis.edu.pk",
                Phone: "+92 331 1234567",
                website: "www.gvis.edu.pk",
            }
        ]
    },
    {
        id: 7,
        Title: "Allhumdulilah Green Valley International School 7",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Schools_Info: [{
            Foundation: "1998",
            School_Type: "Private",
            Medium: "English",
            Classes_Offered: "Playgroup to Grade 10"
        }],
        Facilities: ["Digital Classrooms", "Science & Computer Labs", "Library with 10,000+ Books", "Sports Ground & Indoor Sports Complex"
            , "Cafeteria & Medical Room", "Transportation Available"
        ],
        Achievements: [
            "100% Board Exam Results (Last 5 Years)", "International Science Olympiad Winners", "National Sports Participation", "Top Ranked in Education Survey 2024"
        ],
        Contact_Info: [
            {
                Address: "123 Green Valley Road, Islamabad",
                Email: "info@gvis.edu.pk",
                Phone: "+92 331 1234567",
                website: "www.gvis.edu.pk",
            }
        ]
    }
]