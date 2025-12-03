import * as icon from "react-icons/fa";

// % % % % % % *EDUCTION PAGE* % % % % % %

// ========================================
// EDUCATION HOME - Schools , colleges & Uni
// ========================================
export const categories = [
    { title: "Explore School", description: "Explore top-rated schools offering excellent primary and secondary education with strong foundations.", icon: <icon.FaSchool className="icons" />, btn: "Visit Schools", link: "/edu/schools" },
    { title: "College's List", description: "Find the best colleges that prepare students for higher learning, skill development, and innovation.", icon: <icon.FaRegBuilding className="icons" />, btn: "Visit colleges", link: "/edu/colleges" },
    { title: "Universities", description: "Discover globally recognized universities offering advanced degrees and research opportunities.", icon: <icon.FaUniversity className="icons" />, btn: "Visit Universities", link: "/edu/uni" },
];

// ========================================
// EDUCATION HOME - Online Courses & Tutors
// ========================================
export const OtherResources = [
    { title: "Online Courses", description: "Explore top-rated courses offering excellent primary and secondary skills with strong foundations and high scope in future.", icon: <icon.FaNetworkWired className="icons" />, btn: "Online Courses", link: "/edu/onlineCourses" },
    { title: "Tutor Listing", description: "Find the best colleges that prepare students for higher learning, skill development, and innovation.", icon: <icon.FaChalkboardTeacher className="icons" />, btn: "Tutor List", link: "/edu/tutors" },
    { title: "Online Training", description: "Discover globally recognized universities offering advanced degrees and research opportunities.", icon: <icon.FaUniversity className="icons" />, btn: "Trainings", link: "/edu/onlineTraining" },
];

// &&&&&&&&&&&& *SCHOOLS DATA* &&&&&&&&&&&& \\

/* ================================
   SCHOOLS List & Links
================================ */
export const Schools = [
    { SchoolName: "Bright Future School", id: 1 },
    { SchoolName: "GreenField Public School", id: 2 },
    { SchoolName: "CityStar Academy", id: 3 },
    { SchoolName: "Unity Grammar School", id: 4 },
    { SchoolName: "SilverOak School System", id: 5 },
    { SchoolName: "Modern Vision School", id: 6 },
    { SchoolName: "Crescent High School", id: 7 }
];

// ========================================
// SCHOOLS CARD DATA
// ========================================
export const ScoolCardDta = [
    { img: "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Bright Future School", Desc: "A modern learning environment focused on academics and character building.", id: "1", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/5896843/pexels-photo-5896843.jpeg", InstName: "GreenField Public School", Desc: "Known for disciplined education and a balanced curriculum.", id: "2", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/256491/pexels-photo-256491.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "CityStar Academy", Desc: "Top-rated academy offering strong academic programs and activities.", id: "3", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/289738/pexels-photo-289738.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Unity Grammar School", Desc: "Focused on discipline, academic excellence, and student development.", id: "4", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/2305095/pexels-photo-2305095.jpeg", InstName: "SilverOak School System", Desc: "A reputable system offering advanced classroom learning.", id: "5", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/207669/pexels-photo-207669.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Modern Vision School", Desc: "Highly equipped school with a focus on modern education methods.", id: "6", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/12896161/pexels-photo-12896161.jpeg", InstName: "Crescent High School", Desc: "Providing a strong academic foundation with co-curricular activities.", id: "7", btn_txt: "Read More" }
];

// ========================================
// SCHOOL'S DETAILS ARRAY
// ========================================
export const Schools_Details = [
    { id: 1, Title: "Bright Future School", tag_line: "“Quality Education for a Bright Future”", A_UsPara: "Ideal Public School aims to provide modern education with a strong focus on discipline, character building, and academic excellence.", Institute_Info: [{ Foundation: "2005", Institute_Type: "Private, Co-educational", Medium: "English", Classes_Offered: "Playgroup to Grade 12" }], Facilities: ["Smart Classrooms", "Science & Computer Labs", "Library & Reading Hall", "Sports Ground", "Cafeteria & Medical Room", "School Transport"], Achievements: ["Top Board Results for 3 Consecutive Years", "District-Level Sports Champions", "Winners of National Science Quiz", "Ranked Among Top Private Schools in 2024"], Contact_Info: [{ Address: "Main City Road, Kohat", Email: "info@ips.edu.pk", Phone: "+92 333 0001234", website: "www.ips.edu.pk" }] },
    { id: 2, Title: "GreenField Public School", tag_line: "“Empowering Students with Knowledge & Skills”", A_UsPara: "Campus 2 offers a strong academic curriculum along with modern learning facilities to ensure quality education for all students.", Institute_Info: [{ Foundation: "2008", Institute_Type: "Private", Medium: "English", Classes_Offered: "Playgroup to Grade 10" }], Facilities: ["Interactive Classrooms", "Computer & Science Labs", "Play Area", "Library", "Transport Facility"], Achievements: ["Outstanding Board Results", "Winners of Inter-School Debates", "Top Position in National Math Olympiad"], Contact_Info: [{ Address: "Sector B, Kohat", Email: "contact@ips2.edu.pk", Phone: "+92 333 0005678", website: "www.ips2.edu.pk" }] },
    { id: 3, Title: "CityStar Academy", tag_line: "“Building Strong Foundations for Tomorrow”", A_UsPara: "Campus 3 focuses on combining academic excellence with extracurricular development to prepare well-rounded students.", Institute_Info: [{ Foundation: "2010", Institute_Type: "Private", Medium: "English", Classes_Offered: "Nursery to Grade 10" }], Facilities: ["Digital Classrooms", "Activity Rooms", "Science Lab", "Playground", "Transport Service"], Achievements: ["District Olympiad Participation", "Best Attendance Award School", "Top Performing School 2023"], Contact_Info: [{ Address: "University Road, Kohat", Email: "campus3@ips.edu.pk", Phone: "+92 333 1112233", website: "www.ips3.edu.pk" }] },
    { id: 4, Title: "Unity Grammar School", tag_line: "“Inspiring Young Minds to Achieve More”", A_UsPara: "Campus 4 provides a modern learning environment with well-trained staff dedicated to enhancing student growth.", Institute_Info: [{ Foundation: "2012", Institute_Type: "Private", Medium: "English", Classes_Offered: "Prep to Grade 10" }], Facilities: ["Science & Computer Labs", "Sports Ground", "Library", "CCTV & Security System"], Achievements: ["Winners of Regional Sports Events", "Excellent Board Exam Success Rate"], Contact_Info: [{ Address: "Model Town, Kohat", Email: "campus4@ips.edu.pk", Phone: "+92 333 1115566", website: "www.ips4.edu.pk" }] },
    { id: 5, Title: "SilverOak School System", tag_line: "“Committed to Excellence in Education”", A_UsPara: "Campus 5 offers strong academic programs with experienced faculty and advanced learning facilities.", Institute_Info: [{ Foundation: "2014", Institute_Type: "Private", Medium: "English", Classes_Offered: "Nursery to Grade 10" }], Facilities: ["Smart Learning Rooms", "Computer Lab", "Sports Area", "Library"], Achievements: ["Top 10 School Ranking in District Kohat", "Winners of English Spelling Bee"], Contact_Info: [{ Address: "City Center, Kohat", Email: "campus5@ips.edu.pk", Phone: "+92 333 1117788", website: "www.ips5.edu.pk" }] },
    { id: 6, Title: "Modern Vision School", tag_line: "“Creating a Culture of Learning & Discipline”", A_UsPara: "Campus 6 focuses on discipline, academic quality, and co-curricular activities to nurture confident individuals.", Institute_Info: [{ Foundation: "2016", Institute_Type: "Private", Medium: "English", Classes_Offered: "Nursery to Grade 10" }], Facilities: ["Modern Classrooms", "Science Lab", "Library", "Play Area"], Achievements: ["Top Positions in District Board Exams", "Science Exhibition Champions"], Contact_Info: [{ Address: "Cantt Area, Kohat", Email: "campus6@ips.edu.pk", Phone: "+92 333 1118899", website: "www.ips6.edu.pk" }] },
    { id: 7, Title: "Crescent High School", tag_line: "“Where Learning Meets Inspiration”", A_UsPara: "Campus 7 provides a nurturing educational environment with a focus on holistic development and academic performance.", Institute_Info: [{ Foundation: "2017", Institute_Type: "Private", Medium: "English", Classes_Offered: "Playgroup to Grade 9" }], Facilities: ["Computer Labs", "Library", "Sports Facilities", "Transport Services"], Achievements: ["Regular Participation in Inter-School Events", "Excellent Annual Exam Results"], Contact_Info: [{ Address: "Kohat Development Area", Email: "campus7@ips.edu.pk", Phone: "+92 333 1119900", website: "www.ips7.edu.pk" }] }
];

// &&&&&&&&&&&& *COLLEGES DATA* &&&&&&&&&&&& \\

// ========================================
// COLLEGES LIST
// ========================================
export const Colleges = [
    { CollegeName: "Frontier Science College", id: 1 },
    { CollegeName: "Kohat Model College", id: 2 },
    { CollegeName: "Superior Group of Colleges", id: 3 },
    { CollegeName: "Punjab College Kohat", id: 4 },
    { CollegeName: "ICMS Degree College", id: 5 },
    { CollegeName: "Global Degree College", id: 6 },
    { CollegeName: "Universal Science & Commerce College", id: 7 },
];


// ========================================
// COLLEGES CARD DATA
// ========================================
export const CollegeCardDta = [
    { img: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Frontier Science College", Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", id: "1", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Kohat Model College", Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", id: "2", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/289740/pexels-photo-289740.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Superior Group of Colleges", Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", id: "3", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Punjab College Kohat", Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", id: "4", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/373488/pexels-photo-373488.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "ICMS Degree College", Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", id: "5", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/934062/pexels-photo-934062.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Global Degree College", Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", id: "6", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/256457/pexels-photo-256457.jpeg?auto=compress&cs=tinysrgb&w=600", InstName: "Universal Science & Commerce College", Desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", id: "7", btn_txt: "Read More" }
];

// ========================================
// COLLEGES DETAILS ARRAY
// ========================================
export const Colleges_Details = [
    { id: 1, Title: "Frontier Science College", tag_line: "“Innovating Minds for a Brighter Tomorrow”", A_UsPara: "Frontier Science College focuses on nurturing scientific curiosity, critical thinking, and innovative research among students from diverse backgrounds.", Institute_Info: [{ Foundation: "2001", Institute_Type: "Private, Co-educational", Medium: "English", Classes_Offered: "Grade 11 to Grade 12" }], Facilities: ["Advanced Physics & Chemistry Labs", "Digital Classrooms", "Library with 15,000+ Books", "Sports Complex", "Cafeteria & Health Center", "Transportation Service"], Achievements: ["Regional Science Fair Winners", "100% Board Exam Results (Last 3 Years)", "National Robotics Competition Winners", "Top Ranked in STEM Education 2025"], Contact_Info: [{ Address: "12 Frontier Road, Kohat", Email: "info@frontierscience.edu.pk", Phone: "+92 331 1112233", website: "www.frontierscience.edu.pk" }] },
    { id: 2, Title: "Kohat Model College", tag_line: "“Empowering Students for Excellence”", A_UsPara: "Kohat Model College emphasizes holistic education, combining academics with extracurricular development to prepare students for future leadership.", Institute_Info: [{ Foundation: "1995", Institute_Type: "Public, Co-educational", Medium: "English & Urdu", Classes_Offered: "Grade 9 to Grade 12" }], Facilities: ["Science Labs", "Computer Labs", "Library", "Auditorium", "Sports Facilities", "Student Counseling Center"], Achievements: ["Top 10 in Provincial Board Exams", "Debate Competition Winners", "Annual Cultural Awards", "Environmental Awareness Programs"], Contact_Info: [{ Address: "45 Model Town, Kohat", Email: "contact@kmcollege.edu.pk", Phone: "+92 331 2233445", website: "www.kmcollege.edu.pk" }] },
    { id: 3, Title: "Superior Group of Colleges", tag_line: "“Quality Education, Bright Futures”", A_UsPara: "Superior Group of Colleges provides modern education facilities with a focus on business, science, and technology disciplines, fostering professional growth.", Institute_Info: [{ Foundation: "2005", Institute_Type: "Private", Medium: "English", Classes_Offered: "Grade 11 to Grade 12" }], Facilities: ["Digital Libraries", "Computer Labs", "Research Centers", "Sports Arena", "Cafeteria", "Bus Services"], Achievements: ["National Science Olympiad Winners", "Top Achievers in Board Exams", "Entrepreneurship Program Awards", "Student Exchange Programs"], Contact_Info: [{ Address: "56 College Avenue, Kohat", Email: "info@superior.edu.pk", Phone: "+92 331 3344556", website: "www.superior.edu.pk" }] },
    { id: 4, Title: "Punjab College Kohat", tag_line: "“Where Talent Meets Opportunity”", A_UsPara: "Punjab College Kohat offers structured academic programs along with skill-building activities, preparing students for higher education and career success.", Institute_Info: [{ Foundation: "1990", Institute_Type: "Private, Co-educational", Medium: "English", Classes_Offered: "Grade 9 to Grade 12" }], Facilities: ["Science Labs", "Library & Reading Rooms", "Computer Labs", "Sports Complex", "Cafeteria", "Transport Facilities"], Achievements: ["Top Scorers in Board Exams", "Inter-College Debate Winners", "Sports Trophies in Regional Competitions", "Art & Cultural Awards"], Contact_Info: [{ Address: "78 University Road, Kohat", Email: "info@punjabcollege.edu.pk", Phone: "+92 331 4455667", website: "www.punjabcollege.edu.pk" }] },
    { id: 5, Title: "ICMS Degree College", tag_line: "“Excellence in Education and Innovation”", A_UsPara: "ICMS Degree College specializes in commerce, management, and computer sciences, offering advanced learning tools and experienced faculty for professional development.", Institute_Info: [{ Foundation: "2000", Institute_Type: "Private", Medium: "English", Classes_Offered: "Grade 11 to Grade 12" }], Facilities: ["Business Labs", "Computer Labs", "Library with e-Books", "Auditorium", "Cafeteria", "Bus Services"], Achievements: ["National Business Competition Winners", "High Board Exam Scores", "Student Internships with Top Companies", "Annual Research Publications"], Contact_Info: [{ Address: "101 ICMS Road, Kohat", Email: "contact@icms.edu.pk", Phone: "+92 331 5566778", website: "www.icms.edu.pk" }] },
    { id: 6, Title: "Global Degree College", tag_line: "“Global Standards, Local Success”", A_UsPara: "Global Degree College provides internationally recognized academic programs, emphasizing critical thinking, global perspectives, and leadership skills.", Institute_Info: [{ Foundation: "2010", Institute_Type: "Private, Co-educational", Medium: "English", Classes_Offered: "Grade 11 to Grade 12" }], Facilities: ["Smart Classrooms", "Science Labs", "Library", "Sports Grounds", "Cafeteria", "Transport Facility"], Achievements: ["International Science & Math Olympiad Winners", "High Board Exam Pass Rates", "Debate and Cultural Champions", "Community Service Awards"], Contact_Info: [{ Address: "202 Global Avenue, Kohat", Email: "info@globalcollege.edu.pk", Phone: "+92 331 6677889", website: "www.globalcollege.edu.pk" }] },
    { id: 7, Title: "Universal Science & Commerce College", tag_line: "“Building Knowledge, Inspiring Innovation”", A_UsPara: "Universal Science & Commerce College combines scientific inquiry with commerce education, equipping students with practical skills and innovative thinking for the future.", Institute_Info: [{ Foundation: "2015", Institute_Type: "Private", Medium: "English", Classes_Offered: "Grade 11 to Grade 12" }], Facilities: ["Digital Labs", "Library & E-Resources", "Sports Arena", "Auditorium", "Cafeteria", "Transportation"], Achievements: ["Board Topper Awards", "National Science Fair Winners", "Entrepreneurship Program Achievements", "Cultural & Sports Event Awards"], Contact_Info: [{ Address: "303 Universal Street, Kohat", Email: "contact@universalcollege.edu.pk", Phone: "+92 331 7788990", website: "www.universalcollege.edu.pk" }] }
];

// &&&&&&&&&&&& *UNIVERSITIES DATA* &&&&&&&&&&&& \\


// ========================================
// UNIVERSITIES LIST
// ========================================
export const Universities = [
    { UniName: "Kohat University of Science & Technology", id: 1 },
    { UniName: "University of Peshawar Kohat Campus", id: 2 },
    { UniName: "Allama Iqbal Open University Kohat", id: 3 },
    { UniName: "COMSATS University Islamabad Kohat Campus", id: 4 },
    { UniName: "Iqra National University Kohat", id: 5 },
    { UniName: "Sarhad University of Science & IT Kohat", id: 6 },
    { UniName: "Global University of Kohat", id: 7 },
];

// ========================================
// UNIVERSITIES CARD DATA
// ========================================
export const UniCardDta = [
    { img: "https://images.pexels.com/photos/2305098/pexels-photo-2305098.jpeg", InstName: "Kohat University of Science & Technology", Desc: "Leading university in Kohat offering a wide range of science and technology programs.", id: "1", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg", InstName: "University of Peshawar Kohat Campus", Desc: "Renowned for quality education and research, providing diverse undergraduate and postgraduate programs.", id: "2", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/210661/pexels-photo-210661.jpeg", InstName: "Allama Iqbal Open University Kohat", Desc: "Focuses on distance learning with flexible programs and innovative educational approaches.", id: "3", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg", InstName: "COMSATS University Islamabad Kohat Campus", Desc: "Offers cutting-edge technology and science programs with modern labs and research facilities.", id: "4", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/256540/pexels-photo-256540.jpeg", InstName: "Iqra National University Kohat", Desc: "Committed to academic excellence and providing a student-centered learning environment.", id: "5", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg", InstName: "Sarhad University of Science & IT Kohat", Desc: "Known for technology and IT programs, with experienced faculty and modern infrastructure.", id: "6", btn_txt: "Read More" },
    { img: "https://images.pexels.com/photos/2305095/pexels-photo-2305095.jpeg", InstName: "Global University of Kohat", Desc: "Offers a variety of programs in business, arts, and sciences with global exposure.", id: "7", btn_txt: "Read More" }
];

// ========================================
// UNIVERSITIES DETAILS ARRAY
// ========================================
export const Unis_Details = [
    { id: 1, Title: "Kohat University of Science & Technology", tag_line: "Excellence in Science & Technology Education", A_UsPara: "KUST is a premier university in Kohat offering advanced programs in science, technology, and research.", Institute_Info: [{ Foundation: "2001", Institute_Type: "Public, Co-educational", Medium: "English", Program_Offered: "Computer Science, Electrical Engineering, Physics, Biotechnology" }], Facilities: ["Modern Labs", "Digital Classrooms", "Library with 50,000+ books", "Sports Complex", "Hostel Facilities", "Transportation Services"], Achievements: ["National Research Awards", "Top Ranked in Science & Technology", "Successful Alumni Worldwide", "International Collaborations"], Contact_Info: [{ Address: "University Road, Kohat", Email: "info@kust.edu.pk", Phone: "+92 921 1234567", website: "www.kust.edu.pk" }] },
    { id: 2, Title: "University of Peshawar Kohat Campus", tag_line: "Transforming Knowledge into Innovation", A_UsPara: "UoP Kohat Campus provides quality education and research opportunities in arts, science, and technology.", Institute_Info: [{ Foundation: "2005", Institute_Type: "Public", Medium: "English/Urdu", Program_Offered: "Mathematics, Business, Computer Science, Social Sciences" }], Facilities: ["Computer Labs", "Library", "Seminar Halls", "Sports Facilities", "Cafeteria", "Medical Services"], Achievements: ["National Academic Awards", "Top University Rankings", "Active Research Programs", "Community Engagement Initiatives"], Contact_Info: [{ Address: "Kohat Campus, University Road", Email: "contact@uopk.edu.pk", Phone: "+92 921 2345678", website: "www.uop.edu.pk" }] },
    { id: 3, Title: "Allama Iqbal Open University Kohat", tag_line: "Distance Learning with Quality", A_UsPara: "AIOU Kohat offers flexible learning programs with an emphasis on access to education for all.", Institute_Info: [{ Foundation: "1999", Institute_Type: "Public, Distance Learning", Medium: "English/Urdu", Program_Offered: "Education, Computer Science, Management, Social Sciences" }], Facilities: ["Online Learning Platform", "Regional Library", "Student Support Services", "Workshops", "Examination Centers"], Achievements: ["Leading Distance Education Institute", "High Enrollment Rates", "Accredited Programs", "Collaborative Research Projects"], Contact_Info: [{ Address: "Regional Campus, Kohat", Email: "info@aiou.edu.pk", Phone: "+92 921 3456789", website: "www.aiou.edu.pk" }] },
    { id: 4, Title: "COMSATS University Islamabad Kohat Campus", tag_line: "Innovation & Research Driven Education", A_UsPara: "CUI Kohat Campus is recognized for quality programs in technology, IT, and applied sciences.", Institute_Info: [{ Foundation: "2008", Institute_Type: "Private, Co-educational", Medium: "English", Program_Offered: "Software Engineering, Computer Science, Biotechnology, Mathematics" }], Facilities: ["Advanced Labs", "Digital Classrooms", "Library", "Auditorium", "Sports & Recreation", "Cafeteria"], Achievements: ["National Technology Awards", "Research Publications", "International Faculty Collaboration", "Industry Partnerships"], Contact_Info: [{ Address: "Tech Park, Kohat", Email: "info@comsats.edu.pk", Phone: "+92 921 4567890", website: "www.comsats.edu.pk" }] },
    { id: 5, Title: "Iqra National University Kohat", tag_line: "Empowering Future Leaders", A_UsPara: "INU Kohat focuses on holistic education, combining academics with leadership and innovation.", Institute_Info: [{ Foundation: "2010", Institute_Type: "Private, Co-educational", Medium: "English", Program_Offered: "Business, IT, Computer Science, Management" }], Facilities: ["Computer Labs", "Library", "Auditoriums", "Sports Facilities", "Cafeteria", "Hostels"], Achievements: ["Top Management Programs", "Award Winning Student Projects", "Industry Internships", "High Graduate Employability"], Contact_Info: [{ Address: "University Road, Kohat", Email: "info@inu.edu.pk", Phone: "+92 921 5678901", website: "www.inu.edu.pk" }] },
    { id: 6, Title: "Sarhad University of Science & IT Kohat", tag_line: "Knowledge, Innovation, Excellence", A_UsPara: "SUSIT Kohat is committed to providing quality education in IT and applied sciences with modern infrastructure.", Institute_Info: [{ Foundation: "2007", Institute_Type: "Private", Medium: "English", Program_Offered: "Computer Science, IT, Management, Engineering" }], Facilities: ["IT Labs", "Library", "Digital Classrooms", "Sports Ground", "Cafeteria", "Medical Services"], Achievements: ["Top IT Programs", "National Science Competitions Winners", "Research Publications", "Active Student Clubs"], Contact_Info: [{ Address: "Tech Road, Kohat", Email: "info@susit.edu.pk", Phone: "+92 921 6789012", website: "www.susit.edu.pk" }] },
    { id: 7, Title: "Global University of Kohat", tag_line: "Global Standards, Local Opportunities", A_UsPara: "Global University provides quality education with international exposure and modern learning techniques.", Institute_Info: [{ Foundation: "2012", Institute_Type: "Private, Co-educational", Medium: "English", Program_Offered: "Business, IT, Social Sciences, Management" }], Facilities: ["Smart Classrooms", "Library", "Computer Labs", "Auditorium", "Sports Complex", "Cafeteria"], Achievements: ["International Exchange Programs", "Research & Innovation Awards", "Industry Partnerships", "Student Achievements"], Contact_Info: [{ Address: "Main Campus, Kohat", Email: "info@globalu.edu.pk", Phone: "+92 921 7890123", website: "www.globalu.edu.pk" }] }
];

// &&&&&&&&&&&& *ONLINE COURSES DATA* &&&&&&&&&&&& \\

/* ================================
   ONLINE COURSES List & Links
================================ */
export const OnlineCourses = [
    { CourseName: "Full Stack Web Development", id: 1 },
    { CourseName: "Data Science & Machine Learning", id: 2 },
    { CourseName: "UI/UX Design Fundamentals", id: 3 },
    { CourseName: "Digital Marketing Masterclass", id: 4 },
    { CourseName: "Python Programming for Beginners", id: 5 },
    { CourseName: "Cybersecurity Essentials", id: 6 },
    { CourseName: "Artificial Intelligence & Deep Learning", id: 7 }
];

// ========================================
// ONLINE COURSES CARD DATA
// ========================================
export const OnlineCourseCardDta = [
    { img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg", InstName: "Full Stack Web Development", Desc: "Learn front-end & back-end development to become a full stack developer.", id: "1", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg", InstName: "Data Science & Machine Learning", Desc: "Master data analysis, statistics, and machine learning algorithms.", id: "2", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg", InstName: "UI/UX Design Fundamentals", Desc: "Design beautiful and user-friendly interfaces for web and mobile apps.", id: "3", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg", InstName: "Digital Marketing Masterclass", Desc: "Learn SEO, social media marketing, and advertising strategies.", id: "4", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg", InstName: "Python Programming for Beginners", Desc: "Start coding in Python and build real-world applications.", id: "5", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg", InstName: "Cybersecurity Essentials", Desc: "Learn how to secure systems, networks, and protect data online.", id: "6", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg", InstName: "Artificial Intelligence & Deep Learning", Desc: "Explore AI concepts, neural networks, and deep learning models.", id: "7", btn_txt: "Enroll Now" }
];

// ========================================
// ONLINE COURSES DETAILS ARRAY
// ========================================
export const OnlineCourses_Details = [
    { id: 1, Title: "Full Stack Web Development", tag_line: "“Build Complete Web Applications”", A_UsPara: "This course provides comprehensive training on both front-end and back-end web development using modern technologies.", Course_Info: [{ Duration: "6 Months", Mode: "Online", Skill_Level: "Beginner to Advanced", Languages: "HTML, CSS, JavaScript, Node.js, React" }], Facilities: ["Interactive Coding Labs", "Project-Based Learning", "Mentor Support", "Certificates"], Achievements: ["Build Portfolio Projects", "Deploy Real Applications", "Job Assistance"], Contact_Info: [{ Email: "info@fullstackcourses.com", Phone: "+92 300 1234567", website: "www.fullstackcourses.com" }] },
    { id: 2, Title: "Data Science & Machine Learning", tag_line: "“Analyze Data & Build Models”", A_UsPara: "Learn Python, data analysis, visualization, and machine learning to become a data science expert.", Course_Info: [{ Duration: "5 Months", Mode: "Online", Skill_Level: "Intermediate", Languages: "Python, R, SQL" }], Facilities: ["Hands-on Projects", "Jupyter Notebook Labs", "Mentor Guidance"], Achievements: ["Data Analysis Projects", "Predictive Models", "Industry-Ready Skills"], Contact_Info: [{ Email: "info@datasciencecourses.com", Phone: "+92 301 9876543", website: "www.datasciencecourses.com" }] },
    { id: 3, Title: "UI/UX Design Fundamentals", tag_line: "“Design Engaging Interfaces”", A_UsPara: "Focus on creating intuitive and appealing user interfaces with UX principles and design tools.", Course_Info: [{ Duration: "3 Months", Mode: "Online", Skill_Level: "Beginner", Tools: "Figma, Adobe XD, Sketch" }], Facilities: ["Design Labs", "Portfolio Projects", "Expert Mentorship"], Achievements: ["UI/UX Projects", "Portfolio Ready", "Design Certifications"], Contact_Info: [{ Email: "info@uxdesigncourses.com", Phone: "+92 302 5556677", website: "www.uxdesigncourses.com" }] },
    { id: 4, Title: "Digital Marketing Masterclass", tag_line: "“Grow Your Online Presence”", A_UsPara: "Learn all aspects of digital marketing including SEO, SEM, email campaigns, and social media strategies.", Course_Info: [{ Duration: "4 Months", Mode: "Online", Skill_Level: "Beginner to Intermediate" }], Facilities: ["Practical Assignments", "Real Campaigns", "Mentor Support"], Achievements: ["Marketing Portfolio", "Certifications", "Hands-on Campaign Experience"], Contact_Info: [{ Email: "info@digitalmarketing.com", Phone: "+92 303 1122334", website: "www.digitalmarketing.com" }] },
    { id: 5, Title: "Python Programming for Beginners", tag_line: "“Start Coding Today”", A_UsPara: "Learn Python from scratch and build practical applications, scripts, and projects.", Course_Info: [{ Duration: "2 Months", Mode: "Online", Skill_Level: "Beginner", Languages: "Python" }], Facilities: ["Coding Exercises", "Project Guidance", "Mentor Support"], Achievements: ["Mini Projects", "Practical Python Skills", "Completion Certificate"], Contact_Info: [{ Email: "info@pythoncourses.com", Phone: "+92 304 4455667", website: "www.pythoncourses.com" }] },
    { id: 6, Title: "Cybersecurity Essentials", tag_line: "“Protect Systems & Data”", A_UsPara: "Understand network security, system vulnerabilities, and data protection techniques in this essential course.", Course_Info: [{ Duration: "3 Months", Mode: "Online", Skill_Level: "Beginner to Intermediate" }], Facilities: ["Virtual Labs", "Simulated Hacking Scenarios", "Mentor Guidance"], Achievements: ["Security Projects", "Hands-on Experience", "Certification Provided"], Contact_Info: [{ Email: "info@cybersecurity.com", Phone: "+92 305 7788990", website: "www.cybersecurity.com" }] },
    { id: 7, Title: "Artificial Intelligence & Deep Learning", tag_line: "“Master AI Concepts”", A_UsPara: "Dive into AI fundamentals, neural networks, and deep learning frameworks to build intelligent applications.", Course_Info: [{ Duration: "6 Months", Mode: "Online", Skill_Level: "Advanced", Tools: "Python, TensorFlow, PyTorch" }], Facilities: ["Lab Projects", "AI Challenges", "Mentor Support"], Achievements: ["AI Projects", "Deep Learning Models", "Industry Ready"], Contact_Info: [{ Email: "info@aicourses.com", Phone: "+92 306 9988776", website: "www.aicourses.com" }] }
];

// &&&&&&&&&&&& *TUTORS DATA* &&&&&&&&&&&& \\

/* ================================
   TUTORS List & Links
================================ */
export const Tutors = [
    { TutorName: "Ali Khan", id: 1 },
    { TutorName: "Bilal Ahmed", id: 2 },
    { TutorName: "Hassan Raza", id: 3 },
    { TutorName: "Omar Malik", id: 4 },
    { TutorName: "Fahad Iqbal", id: 5 },
    { TutorName: "Usman Khan", id: 6 },
    { TutorName: "Omar Farooq", id: 7 }
];

// ========================================
// TUTORS CARD DATA
// ========================================
export const TutorCardDta = [
    { img: "https://images.pexels.com/photos/3184612/pexels-photo-3184612.jpeg", InstName: "Ali Khan", Desc: "Expert in Mathematics and Physics for high school and college students.", id: "1", btn_txt: "Contact Tutor" },
    { img: "https://images.pexels.com/photos/3184612/pexels-photo-3184612.jpeg", InstName: "Bilal Ahmed", Desc: "Specializes in English Literature and Writing Skills for all levels.", id: "2", btn_txt: "Contact Tutor" },
    { img: "https://images.pexels.com/photos/3184612/pexels-photo-3184612.jpeg", InstName: "Hassan Raza", Desc: "Professional Computer Science tutor with experience in coding and algorithms.", id: "3", btn_txt: "Contact Tutor" },
    { img: "https://images.pexels.com/photos/3184612/pexels-photo-3184612.jpeg", InstName: "Omar Malik", Desc: "Chemistry and Biology tutor with practical lab guidance for students.", id: "4", btn_txt: "Contact Tutor" },
    { img: "https://images.pexels.com/photos/3184612/pexels-photo-3184612.jpeg", InstName: "Fahad Iqbal", Desc: "Experienced in teaching History and Social Studies for middle & high school.", id: "5", btn_txt: "Contact Tutor" },
    { img: "https://images.pexels.com/photos/3184612/pexels-photo-3184612.jpeg", InstName: "Usman Khan", Desc: "Mathematics and Statistics tutor with focus on problem-solving skills.", id: "6", btn_txt: "Contact Tutor" },
    { img: "https://images.pexels.com/photos/3184612/pexels-photo-3184612.jpeg", InstName: "Omar Farooq", Desc: "Physics and Engineering tutor, specialized in practical experiments and theory.", id: "7", btn_txt: "Contact Tutor" }
];

// ========================================
// TUTORS DETAILS ARRAY
// ========================================
export const Tutors_Details = [
    { id: 1, Name: "Ali Khan", img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg", tag_line: "“Making Complex Concepts Simple”", About: "Ali Khan has 10+ years of experience teaching Mathematics and Physics to high school and college students, making learning interactive and effective.", Expertise: ["Mathematics", "Physics", "Calculus", "Algebra"], Achievements: ["Top Rated Tutor 2023", "Published Math Workbook", "Student Olympiad Mentor"], Contact_Info: [{ Email: "ali.khan@tutors.com", Phone: "+92 300 1234567", website: "www.alikhan-tutor.com" }] },
    { id: 2, Name: "Bilal Ahmed", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg", tag_line: "“Inspiring Excellence in Literature”", About: "Bilal Ahmed specializes in English Literature and creative writing, helping students improve comprehension, vocabulary, and essay writing.", Expertise: ["English Literature", "Creative Writing", "Grammar", "Essay Skills"], Achievements: ["Published Author", "Writing Competition Mentor", "Top Student Feedback"], Contact_Info: [{ Email: "bilal.ahmed@tutors.com", Phone: "+92 301 2345678", website: "www.bilalahmed-tutor.com" }] },
    { id: 3, Name: "Hassan Raza", img: "https://images.pexels.com/photos/614909/pexels-photo-614909.jpeg", tag_line: "“Coding Made Easy”", About: "Hassan Raza is a professional Computer Science tutor teaching programming, algorithms, and software development for beginners to advanced students.", Expertise: ["Programming", "Algorithms", "Data Structures", "Web Development"], Achievements: ["Developed Coding Bootcamp", "Mentored 200+ Students", "Hackathon Winner"], Contact_Info: [{ Email: "hassan.raza@tutors.com", Phone: "+92 302 3456789", website: "www.hassanraza-tutor.com" }] },
    { id: 4, Name: "Omar Malik", img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg", tag_line: "“Bringing Science to Life”", About: "Omar Malik teaches Chemistry and Biology with practical lab experience and interactive lessons for better understanding.", Expertise: ["Chemistry", "Biology", "Lab Experiments", "Science Projects"], Achievements: ["Science Fair Mentor", "Published Lab Manuals", "Award-Winning Teaching Methods"], Contact_Info: [{ Email: "omar.malik@tutors.com", Phone: "+92 303 4567890", website: "www.omarmalik-tutor.com" }] },
    { id: 5, Name: "Fahad Iqbal", img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg", tag_line: "“History Through Stories”", About: "Fahad Iqbal makes History and Social Studies engaging by connecting events with stories and modern examples.", Expertise: ["History", "Social Studies", "Civics", "World History"], Achievements: ["Historical Documentary Contributor", "Top Tutor Rating 2022", "Student Engagement Award"], Contact_Info: [{ Email: "fahad.iqbal@tutors.com", Phone: "+92 304 5678901", website: "www.fahadiqbal-tutor.com" }] },
    { id: 6, Name: "Usman Khan", img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg", tag_line: "“Math Simplified”", About: "Usman Khan focuses on making Mathematics and Statistics easy to understand with practical examples and problem-solving techniques.", Expertise: ["Mathematics", "Statistics", "Probability", "Algebra"], Achievements: ["Published Math Exercises", "Top Rated Online Tutor", "Mentored Students for Competitions"], Contact_Info: [{ Email: "usman.khan@tutors.com", Phone: "+92 305 6789012", website: "www.usmankhan-tutor.com" }] },
    { id: 7, Name: "Omar Farooq", img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg", tag_line: "“Physics Made Fun”", About: "Omar Farooq teaches Physics and Engineering concepts with practical demonstrations and hands-on experiments.", Expertise: ["Physics", "Engineering", "Mechanics", "Electronics"], Achievements: ["Physics Olympiad Mentor", "Developed Learning Kits", "Published Tutorials"], Contact_Info: [{ Email: "omar.farooq@tutors.com", Phone: "+92 306 7890123", website: "www.omarfarooq-tutor.com" }] }
];

// &&&&&&&&&&&& *ONLINE TRAINING DATA* &&&&&&&&&&&& \\

/* ================================
   ONLINE TRAININGS List & Links
================================ */
export const OnlineTrainings = [
    { TrainingName: "Full Stack Web Development", id: 1 },
    { TrainingName: "Digital Marketing Mastery", id: 2 },
    { TrainingName: "Graphic Design & UX/UI", id: 3 },
    { TrainingName: "Data Science & Analytics", id: 4 },
    { TrainingName: "Cyber Security Essentials", id: 5 },
    { TrainingName: "Artificial Intelligence & ML", id: 6 },
    { TrainingName: "Project Management Professional", id: 7 }
];

// ========================================
// ONLINE TRAINING CARD DATA
// ========================================
export const OnlineTrainingCardDta = [
    { img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", InstName: "Full Stack Web Development", Desc: "Comprehensive training on front-end, back-end, and deployment of web applications.", id: "1", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg", InstName: "Digital Marketing Mastery", Desc: "Learn SEO, social media marketing, and paid advertising to grow businesses online.", id: "2", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", InstName: "Graphic Design & UX/UI", Desc: "Design stunning graphics, websites, and mobile apps with creative tools and UX principles.", id: "3", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg", InstName: "Data Science & Analytics", Desc: "Master Python, R, SQL, and visualization to analyze and interpret complex datasets.", id: "4", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", InstName: "Cyber Security Essentials", Desc: "Protect systems and data by learning the fundamentals of cyber security and ethical hacking.", id: "5", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg", InstName: "Artificial Intelligence & ML", Desc: "Learn AI and Machine Learning algorithms, model building, and practical applications.", id: "6", btn_txt: "Enroll Now" },
    { img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", InstName: "Project Management Professional", Desc: "Develop project management skills, Agile, Scrum, and leadership to manage successful projects.", id: "7", btn_txt: "Enroll Now" }
];

// ========================================
// ONLINE TRAINING DETAILS ARRAY
// ========================================
export const OnlineTraining_Details = [
    { id: 1, Title: "Full Stack Web Development", tag_line: "“Build Modern Web Applications from Scratch”", About: "This training covers HTML, CSS, JavaScript, Node.js, React, databases, and deployment practices to create full-fledged web applications.", Modules: ["Front-end Development", "Back-end Development", "Databases & APIs", "Deployment & Hosting"], Achievements: ["Real-world Projects", "Portfolio-ready Skills", "Job Assistance"], Contact_Info: [{ Email: "fullstack@onlinetraining.com", Phone: "+92 300 1112233", website: "www.fullstacktraining.com" }] },
    { id: 2, Title: "Digital Marketing Mastery", tag_line: "“Grow Businesses with Modern Marketing Skills”", About: "Learn all aspects of digital marketing including SEO, social media, email marketing, and paid campaigns to boost online presence.", Modules: ["SEO", "Social Media Marketing", "PPC Advertising", "Email Marketing"], Achievements: ["Live Campaign Projects", "Certification of Completion", "Marketing Strategy Portfolio"], Contact_Info: [{ Email: "digital@onlinetraining.com", Phone: "+92 301 2223344", website: "www.digitalmarketingtraining.com" }] },
    { id: 3, Title: "Graphic Design & UX/UI", tag_line: "“Design Creative Interfaces & Graphics”", About: "This course teaches Adobe Photoshop, Illustrator, Figma, and UX/UI principles to design beautiful graphics and interfaces.", Modules: ["Graphic Design Tools", "UX/UI Principles", "Wireframing & Prototyping", "Portfolio Projects"], Achievements: ["Portfolio-ready Designs", "Creative Skill Development", "Professional Mentorship"], Contact_Info: [{ Email: "design@onlinetraining.com", Phone: "+92 302 3334455", website: "www.graphicdesigntraining.com" }] },
    { id: 4, Title: "Data Science & Analytics", tag_line: "“Unlock Insights from Complex Data”", About: "Learn Python, R, SQL, and data visualization to analyze and interpret data and make informed business decisions.", Modules: ["Python & R Programming", "Data Analysis", "Visualization Tools", "Machine Learning Basics"], Achievements: ["Data-driven Projects", "Certification & Portfolio", "Job-ready Skills"], Contact_Info: [{ Email: "datascience@onlinetraining.com", Phone: "+92 303 4445566", website: "www.datasciencetraining.com" }] },
    { id: 5, Title: "Cyber Security Essentials", tag_line: "“Protect Systems and Data from Threats”", About: "This training covers network security, ethical hacking, and threat analysis to secure digital systems.", Modules: ["Network Security", "Ethical Hacking", "Threat Analysis", "Cyber Law Basics"], Achievements: ["Hands-on Labs", "Security Certifications", "Practical Knowledge"], Contact_Info: [{ Email: "cybersecurity@onlinetraining.com", Phone: "+92 304 5556677", website: "www.cybersecuritytraining.com" }] },
    { id: 6, Title: "Artificial Intelligence & ML", tag_line: "“Learn AI and Machine Learning for Real-world Applications”", About: "Master AI concepts, machine learning algorithms, and model building to solve practical problems in different domains.", Modules: ["AI Fundamentals", "Machine Learning Models", "Neural Networks", "Project Implementation"], Achievements: ["AI Projects Portfolio", "Job Support", "Industry-recognized Certification"], Contact_Info: [{ Email: "ai@onlinetraining.com", Phone: "+92 305 6667788", website: "www.aitraining.com" }] },
    { id: 7, Title: "Project Management Professional", tag_line: "“Manage Projects Effectively & Efficiently”", About: "Learn project management frameworks, Agile, Scrum, risk management, and leadership to successfully manage projects.", Modules: ["Project Planning", "Agile & Scrum", "Risk Management", "Leadership Skills"], Achievements: ["PMP Certification Preparation", "Real Project Exercises", "Career Support"], Contact_Info: [{ Email: "pmp@onlinetraining.com", Phone: "+92 306 7778899", website: "www.pmponlinetraining.com" }] }
];

