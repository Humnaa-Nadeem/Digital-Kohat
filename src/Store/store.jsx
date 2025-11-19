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
        link: "/education" //Added link to navigate to education sector home page
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

// Data of education home page for D/F education Institute:
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