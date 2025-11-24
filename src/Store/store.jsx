import * as icon from "react-icons/fa";
import schoolImg from "../components/imgs/school.svg";
import restaurantImg from "../components/imgs/restaurant.svg";
import hospitalImg from "../components/imgs/hospitals.svg";
import businessImg from "../components/imgs/business.png";
import techImg from "../components/imgs/technicians.svg";
import tourismImg from "../components/imgs/tourism.png";

// Data of services that web offer; url = mainUrl
export const services = [
    {
        title: "Education",
        desc: "Search for quality learning institutions or register your own educational center.",
        img: schoolImg,
        link: "/edu"
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
        link: "/technicians"
    },
    {
        title: "Tourism",
        desc: "Plan visits or showcase local attractions and tourism spots.",
        img: tourismImg,
    },
];

// **************************************** Eduction-Sector Data *****************************************************\\ 

// Data for D/F education Institute (School , College , Uni): &&&&& Data for Url = mainUrl/edu
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

// Data of education home page for online courses etc: &&&&& Data for Url = mainUrl/edu
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
        title: "Online Training",
        description:
            "Discover globally recognized universities offering advanced degrees and research opportunities.",
        icon: <icon.FaUniversity className="icons" />,
        btn: "Visit Universities",
        link: "/edu/uni"
    },
];

// &&&&&&&&&&&& *SCHOOLS DATA* &&&&&&&&&&&& \\

// Array of Schools to form school list from; &&&&& Data for Url = mainUrl/edu/schools
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

// Data for schools card; &&&&& Data for Url = mainUrl/edu/schools
export const ScoolCardDta = [{
    img: schoolImg,
    InstName: "Ideal Public School", //Inst = Institue(School/College/Uni);
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "1",
    btn_txt: "Read More"
}, {
    img: schoolImg,
    InstName: "Ideal Public School 2",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "2",
    btn_txt: "Read More"
}, {
    img: schoolImg,
    InstName: "Ideal Public School 3",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "3",
    btn_txt: "Read More"
}, {
    img: schoolImg,
    InstName: "Ideal Public School 4",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "4",
    btn_txt: "Read More"
}, {
    img: schoolImg,
    InstName: "Ideal Public School 5",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "5",
    btn_txt: "Read More"
}, {
    img: schoolImg,
    InstName: "Ideal Public School 6",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "6",
    btn_txt: "Read More"
}, {
    img: schoolImg,
    InstName: "Ideal Public School 7",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "7",
    btn_txt: "Read More"
}];

// Array that contain the Schools Details; &&&&& Data for Url = mainUrl/edu/schools?id=[schoolId]
export const Schools_Details = [
    {
        id: 1,
        Title: "Green Valley International School",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private, Co-educational",
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
        Title: "Green Valley International School 2",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
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
        Title: "Green Valley International School 3",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
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
        Title: "Green Valley International School 4",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
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
        Title: "Green Valley International School 5",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
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
        Title: "Green Valley International School 6",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
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
        Title: "Green Valley International School 7",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
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
];

// &&&&&&&&&&&& *COLLEGES DATA* &&&&&&&&&&&& \\

//Array of Colleges to form College list from; &&&&& Data for Url = mainUrl/edu/colleges
export const Colleges = [
    {
        CollegeName: "College_1",
        id: 1
    },
    {
        CollegeName: "College_2",
        id: 2
    },
    {
        CollegeName: "College_3",
        id: 3
    },
    {
        CollegeName: "College_4",
        id: 4
    },
    {
        CollegeName: "College_5",
        id: 5
    },
    {
        CollegeName: "College_6",
        id: 6
    },
    {
        CollegeName: "College_7",
        id: 7
    },
];

// Data for Colleges card; &&&&& Data for Url = mainUrl/edu/Colleges
export const CollegeCardDta = [{
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "Shaheen Group of Colleges 1",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "1",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "Shaheen Group of Colleges 2",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "2",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "Shaheen Group of Colleges 3",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "3",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "Shaheen Group of Colleges 4",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "4",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "Shaheen Group of Colleges 5",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "5",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "Shaheen Group of Colleges 6",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "6",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "Shaheen Group of Colleges 7",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "7",
    btn_txt: "Read More"
}];

// Array that contain the Colleges Details; &&&&& Data for Url = mainUrl/edu/colleges?id=[collegeId]
export const Colleges_Details = [
    {
        id: 1,
        Title: "Green Valley International College",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private, Co-educational",
            Medium: "English",
            Classes_Offered: "Grand 11 to Grade 12"
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
        Title: "Green Valley International College 2",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Classes_Offered: "Grand 11 to Grade 12"
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
        Title: "Green Valley International College 3",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Classes_Offered: "Grand 11 to Grade 12"
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
        Title: "Green Valley International College 4",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Classes_Offered: "Grand 11 to Grade 12"
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
        Title: "Green Valley International College 5",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Classes_Offered: "Grand 11 to Grade 12"
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
        Title: "Green Valley International College 6",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Classes_Offered: "Grand 11 to Grade 12"
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
        Title: "Green Valley International College 7",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Classes_Offered: "Grand 11 to Grade 12"
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
];

// &&&&&&&&&&&& *UNIVERSITIES DATA* &&&&&&&&&&&& \\

//Array of Universities to form Uni list from; &&&&& Data for Url = mainUrl/edu/Uni
export const Universities = [
    {
        UniName: "KUST_1",
        id: 1
    },
    {
        UniName: "KUST_2",
        id: 2
    },
    {
        UniName: "KUST_3",
        id: 3
    },
    {
        UniName: "KUST_4",
        id: 4
    },
    {
        UniName: "KUST_5",
        id: 5
    },
    {
        UniName: "KUST_6",
        id: 6
    },
    {
        UniName: "KUST_7",
        id: 7
    },
];

// Data for Universities card; &&&&& Data for Url = mainUrl/edu/Uni
export const UniCardDta = [{
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "KUST 1",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "1",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "KUST 2",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "2",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "KUST 3",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "3",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "KUST 4",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "4",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "KUST 5",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "5",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "KUST 6",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "6",
    btn_txt: "Read More"
}, {
    img: "https://images.pexels.com/photos/27276221/pexels-photo-27276221.jpeg",
    InstName: "KUST 7",
    Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: "7",
    btn_txt: "Read More"
}];

// Array that contain the Universities Details; &&&&& Data for Url = mainUrl/edu/Uni?id=[UniId]
export const Unis_Details = [
    {
        id: 1,
        Title: "KUST",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private, Co-educational",
            Medium: "English",
            Program_Offered: "CS , BIO-TECH , PHYSICS , DPT etc"
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
        Title: "KUST 2",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Program_Offered: "CS , BIO-TECH , PHYSICS , DPT etc"
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
        Title: "KUST 3",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Program_Offered: "CS , BIO-TECH , PHYSICS , DPT etc"
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
        Title: "KUST 4",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Program_Offered: "CS , BIO-TECH , PHYSICS , DPT etc"
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
        Title: "KUST 5",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Program_Offered: "CS , BIO-TECH , PHYSICS , DPT etc"
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
        Title: "KUST 6",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Program_Offered: "CS , BIO-TECH , PHYSICS , DPT etc"
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
        Title: "KUST 7",
        tag_line: "“Shaping Future Leaders with Excellence”",
        A_UsPara: "Green Valley International School is committed to delivering high-quality education, focusing on academic excellence, character building, and personal growth.",
        Institute_Info: [{
            Foundation: "1998",
            Institute_Type: "Private",
            Medium: "English",
            Program_Offered: "CS , BIO-TECH , PHYSICS , DPT etc"
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
];

// **************************************** Technicians-Sector Data *****************************************************\\

// Data for D/F Technicial problem solver : &&&&& Data for Url = mainUrl/technicians;
export const Techicians_categories = [
    {
        title: "Electrical & Electronics",
        description:
            "Hire skilled electricians for wiring, repairs, installations, and safe electrical troubleshooting.",
        img: "https://images.pexels.com/photos/6636477/pexels-photo-6636477.jpeg",
        btn: "Electrical Experts",
        link: "/technicians/Electronic"
    },
    {
        title: "Plumbing and Gas",
        description:
            "Get expert plumbers for pipe repairs, drainage issues, gas fitting, leak detection, and maintenance.",
        img: "https://images.pexels.com/photos/16752780/pexels-photo-16752780.jpeg",
        btn: "Plumbing Experts",
        link: "/technicians/Plumbing"
    },
    {
        title: "Painting and Construction",
        description:
            "Find skilled painters and builders for walls, interiors, finishing work, renovations, and upgrades.",
        img: "https://images.pexels.com/photos/5505125/pexels-photo-5505125.jpeg",
        btn: "Painting Experts",
        link: "/technicians/Painting"
    },
    {
        title: "Carpentry and Furniture",
        description:
            "Hire professional carpenters for furniture making, wood repairs, fittings, custom work, and designs.",
        img: "https://images.pexels.com/photos/34862868/pexels-photo-34862868.jpeg",
        btn: "Carpentry Experts",
        link: "/technicians/Carpentry"
    },
    {
        title: "Cleaning and Maintenance",
        description:
            "Book cleaning experts for homes, offices, deep cleaning, repairs, routine care, and daily maintenance.",
        img: "https://images.pexels.com/photos/11349879/pexels-photo-11349879.jpeg",
        btn: "Cleaning Experts",
        link: "/technicians/Cleaning"
    },
    {
        title: "Gardening and Outdoor",
        description:
            "Find garden professionals for lawn care, plant work, landscaping, trimming, outdoor upkeep, and design.",
        img: "https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg",
        btn: "Gardening Experts",
        link: "/technicians/Gardening"
    }
];