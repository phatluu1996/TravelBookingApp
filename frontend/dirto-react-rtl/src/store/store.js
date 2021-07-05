import React from 'react'
import {RiBuilding4Line, RiHotelBedLine, RiPlaneLine, RiReplyLine} from 'react-icons/ri';
import {GiChickenOven, GiPineTree, GiPositionMarker, GiWineGlass} from 'react-icons/gi';
import {
    BsBookmark,
    BsBriefcase,
    BsCheckCircle, BsEye,
    BsGear,
    BsHouseDoor,
    BsListCheck,
    BsMap,
    BsMusicNoteBeamed,
    BsPencil
} from 'react-icons/bs';
import {MdClose, MdFitnessCenter, MdStar, MdStarBorder, MdStarHalf} from 'react-icons/md';
import bannerbg1 from '../assets/images/hero-bg.jpg';
import img1 from "../assets/images/img1.jpg"; // 263*175
import img2 from "../assets/images/img7.jpg"; // 362*242
import authorimg from "../assets/images/small-team1.jpg"; // 67*60
import symble1 from "../assets/images/symble1.png";
import symble2 from "../assets/images/symble2.png";
import symble3 from "../assets/images/symble3.png";
import symble4 from "../assets/images/symble4.png";
import {TiArrowUnsorted, TiBrush, TiPlane} from "react-icons/ti";
import {
    IoIosCheckmarkCircle,
    IoIosFitness, IoIosRocket, IoMdCut,
    IoMdFitness,
    IoMdMusicalNotes, IoMdPaperPlane,
    IoMdStar,
    IoMdStarHalf
} from "react-icons/io";
import {
    FiBookOpen,
    FiCheck,
    FiCheckCircle, FiExternalLink,
    FiFilter,
    FiHeadphones, FiHeart,
    FiMail,
    FiMap,
    FiMusic,
    FiPlus,
    FiShoppingCart, FiThumbsUp, FiUsers
} from "react-icons/fi";
import {AiOutlineCar, AiOutlineEllipsis, AiOutlineHome, AiOutlineQuestionCircle, AiOutlineUser} from "react-icons/ai";
import team1 from "../assets/images/team2.jpg"; // 111*100
import team2 from "../assets/images/testi-img1.jpg"; // 106*95
import team3 from "../assets/images/testi-img2.jpg"; // 95*85
import team4 from "../assets/images/testi-img3.jpg"; // 83*75
import team6 from "../assets/images/testi-img4.jpg"; // 78*70
import {GoFile} from "react-icons/go";
import cta2mobileimg from "../assets/images/mobile.png";
import logo1 from "../assets/images/client-logo.png";
import darklogo from "../assets/images/logo2.png";
import {
    FaBehance, FaCogs,
    FaDribbble,
    FaFacebookF, FaInstagram,
    FaLinkedinIn, FaMinus, FaPlus, FaQuoteRight, FaRegComment, FaRegEdit,
    FaRegEnvelope, FaRegHeart, FaRegHospital, FaRegMap,
    FaRegMoneyBillAlt, FaRegTrashAlt, FaSearchDollar, FaSearchPlus, FaSort, FaStethoscope,
    FaTwitter, FaYoutube
} from "react-icons/fa";
import destinationimg1 from "../assets/images/img5.jpg";
import flag1 from "../assets/images/flag14.png";
import flag2 from "../assets/images/flag1.jpg";
import flag3 from "../assets/images/flag2.jpg";
import flag4 from "../assets/images/flag13.jpg";
import flag5 from "../assets/images/flag18.jpg";
import destinationimg6 from "../assets/images/img7.jpg";
import flag6 from "../assets/images/flag3.jpg";
import flag7 from "../assets/images/flag7.jpg";
import flag8 from "../assets/images/flag5.png";
import flag9 from "../assets/images/flag19.png";
import hiw3videoimg from "../assets/images/video-img2.jpg";
import {FcLineChart} from "react-icons/fc";
import dreamimg from "../assets/images/img6.jpg"; // 263*165
import hiw5videoimg from "../assets/images/video-img3.jpg";
import slicevideo from "../assets/video/slice-video.m4v";
import flag10 from "../assets/images/flag10.png";
import flag11 from "../assets/images/flag11.png";
import flag12 from "../assets/images/flag12.jpg";
import flag13 from "../assets/images/flag13.jpg";
import flag14 from "../assets/images/flag14.png";
import flag15 from "../assets/images/flag15.jpg";
import flag16 from "../assets/images/flag16.jpg";
import flag17 from "../assets/images/flag17.jpg";
import flag18 from "../assets/images/flag18.jpg";
import flag19 from "../assets/images/flag19.png";
import flag20 from "../assets/images/flag20.png";
import listingdetailsvideoimg from "../assets/images/img4.jpg";
import similarimg from "../assets/images/img8.jpg"; // 90*90
import breadcrumbimg from "../assets/images/bread-bg.jpg"; //1920*838
import userimage from "../assets/images/team1.jpg"; // 368*331
import imgboximg from "../assets/images/img10.jpg"; // 570*345
import about2img from "../assets/images/img2.jpg"; //389*259
import mainimage from "../assets/images/video-img.jpg";



const sectiondata = {
    headermenu: [
        {
            title: 'الصفحة الرئيسية',
            path: '/',
            dropdown: [
                {
                    title: 'المنزل الأول',
                    path: '/'
                },
                {
                    title: 'المنزل الثاني',
                    path: '/index2'
                },
                {
                    title: 'المنزل ثلاثة',
                    path: '/index3'
                },
                {
                    title: 'المنزل الرابع',
                    path: '/index4'
                },
                {
                    title: 'المنزل خمسة',
                    path: '/index5'
                }
            ]
        },
        {
            title: 'التصنيفات',
            path: '/all-categories',
            dropdown: [
                {
                    title: 'جميع الفئات',
                    path: '/all-categories'
                },
                {
                    title: 'جميع المواقع',
                    path: '/all-locations'
                },
                {
                    title: 'أفضل الأماكن',
                    path: '/top-place'
                }
            ]
        },
        {
            title: ' القوائم',
            path: '/listing-grid',
            dropdown: [
                {
                    title: 'قائمة الشبكة',
                    path: '/listing-grid'
                },
                {
                    title: 'عرض الخريطة',
                    path: '/list-map-view'
                },
                {
                    title: 'عرض الخريطة إثنان',
                    path: '/list-map-view2'
                },
                {
                    title: 'قائمة القائمة',
                    path: '/listing-list'
                },
                {
                    title: 'الشريط الجانبي الأيسر',
                    path: '/list-left-sidebar'
                },
                {
                    title: 'الشريط الجانبي الأيمن',
                    path: '/list-right-sidebar'
                },
                {
                    title: 'تفاصيل قائمة',
                    path: '/listing-details'
                },
                {
                    title: 'إضافة قائمة',
                    path: '/add-listing/new'
                }
            ]
        },
        {
            title: 'الصفحات ',
            path: '/user-profile',
            dropdown: [
                {
                    title: 'ملف تعريفي للمستخدم',
                    path: '/user-profile'
                },
                {
                    title: 'كبار المؤلفين ',
                    path: '/top-author'
                },
                {
                    title: 'لوحة القيادة',
                    path: '/dashboard'
                },
                {
                    title: 'الحجز  ',
                    path: '/booking'
                },
                {
                    title: 'تأكيد الحجز',
                    path: '/booking-confirmation'
                },
                {
                    title: 'فاتورة',
                    path: '/invoice'
                },
                {
                    title: 'التسعير',
                    path: '/pricing'
                },
                {
                    title: 'حول',
                    path: '/about'
                },
                {
                    title: 'التعليمات',
                    path: '/faq'
                },
                {
                    title: 'اتصل',
                    path: '/contact'
                },
                {
                    title: 'الصفحةأربعة مائة و أربعة',
                    path: '/page-404'
                },
                {
                    title: 'استعادة المرور ',
                    path: '/recover'
                }
            ]
        },
        {
            title: 'مدونة ',
            path: '/blog-full-width',
            dropdown: [
                {
                    title: 'العرض الكامل ',
                    path: '/blog-full-width'
                },
                {
                    title: 'شبكة بلوق',
                    path: '/blog-grid'
                },
                {
                    title: 'الشريط الجانبي الأيسر ',
                    path: '/blog-left-sidebar'
                },
                {
                    title: 'الشريط الجانبي الأيمن ',
                    path: '/blog-right-sidebar'
                },
                {
                    title: 'تفاصيل المدونة',
                    path: '/blog-single'
                }
            ]
        },
    ],
    herobanners: {
        banner1: {
            title: 'ماالذي تهتم به ',
            titleHighlight: [
                {
                    active: true,
                    text: 'الفنادق'
                },
                {
                    active: false,
                    text: 'مطاعم'
                },
                {
                    active: false,
                    text: 'محلات'
                },
                {
                    active: false,
                    text: 'صالونات'
                },
                {
                    active: false,
                    text: 'شقق سكنية'
                },
                {
                    active: false,
                    text: 'يسافر'
                },
                {
                    active: false,
                    text: 'اعمال'
                },
                {
                    active: false,
                    text: 'اللياقه البدنيه'
                }
            ],
            content: 'اكتشف أفضل الأماكن للإقامة وتناول الطعام والتسوق وزيارة أقرب مدينة إليك.',
            bgimage: bannerbg1,
        },
        banner2: {
            title: 'ابحث عن أفضل مكان في مدينتك',
            content: "كما سبق يساعدك في معرفة ما يحدث في مدينتك ، دعنا نستكشف.",
            categories: [
                {
                    path: '#',
                    text: 'شقق سكنية',
                    icon: <RiBuilding4Line />
                },
                {
                    path: '#',
                    text: 'مطاعم',
                    icon: <GiChickenOven />
                },
                {
                    path: '#',
                    text: 'السفر',
                    icon: <RiPlaneLine />
                },
                {
                    path: '#',
                    text: 'الأحداث',
                    icon: <BsMusicNoteBeamed />
                },
                {
                    path: '#',
                    text: 'اللياقه البدنيه',
                    icon: <IoMdFitness />
                },
                {
                    path: '#',
                    text: 'الفنادق',
                    icon: <RiHotelBedLine />
                }
            ],
            bgimage: bannerbg1
        },
        banner3: {
            title: 'ما هو برنامجك اليوم؟',
            content: "جميع المواقع المتميزة - من المطاعم والنوادي إلى صالات العرض والأماكن الشهيرة والمزيد ...",
            bgimage: bannerbg1
        },
        banner4: {
            sectitle: 'ابحث عن أفضل الأماكن لتكون',
            seccontent: "اكتشف أفضل الأماكن للإقامة وتناول الطعام والتسوق وزيارة أقرب مدينة إليك.",
            videobgsrc: slicevideo,
        },
    },
    categories: {
        featuredcategories: {
            connector: 'أو',
            title: 'تصفح الفئات المميزة:',
            items: [
                {
                    path: "#",
                    title: "شقق سكنية",
                    icon: <RiBuilding4Line />
                },
                {
                    path: "#",
                    title: "مطاعم",
                    icon: <GiChickenOven />
                },
                {
                    path: "#",
                    title: "السفر",
                    icon: <RiPlaneLine />
                },
                {
                    path: "#",
                    title: "الأحداث",
                    icon: <BsMusicNoteBeamed />
                },
                {
                    path: "#",
                    title: "اللياقه البدنيه",
                    icon: <MdFitnessCenter />
                },
                {
                    path: "#",
                    title: "الفنادق",
                    icon: <RiHotelBedLine />
                }
            ]
        },
        browsecategories: {
            sectitle: 'ماذا تحتاج لايجاده؟',
            seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح الأفضل لك ومتى يكون الأفضل لك. ",
            items: [
                {
                    id: 1,
                    icon: <GiChickenOven />,
                    title: 'مطاعم',
                    listingsNum: 42,
                    cardLink: '#'
                },
                {
                    id: 2,
                    icon: <RiHotelBedLine />,
                    title: 'الفنادق',
                    listingsNum: 22,
                    cardLink: '#'
                },
                {
                    id: 3,
                    icon: <FiShoppingCart />,
                    title: 'التسوق',
                    listingsNum: 7,
                    cardLink: '#'
                },
                {
                    id: 4,
                    icon: <IoMdCut />,
                    title: 'جمال وسبا',
                    listingsNum: 31,
                    cardLink: '#'
                },
                {
                    id: 5,
                    icon: <FaRegHospital />,
                    title: 'مستشفى',
                    listingsNum: 33,
                    cardLink: '#'
                },
                {
                    id: 6,
                    icon: <BsGear />,
                    title: 'خدمات',
                    listingsNum: 33,
                    cardLink: '#'
                },
                {
                    id: 7,
                    icon: <TiBrush />,
                    title: 'الفنون والتصميم',
                    listingsNum: 31,
                    cardLink: '#'
                },
                {
                    id: 8,
                    icon: <BsHouseDoor />,
                    title: 'العقارات',
                    listingsNum: 36,
                    cardLink: '#'
                },
                {
                    id: 9,
                    icon: <FaStethoscope />,
                    title: 'الصحة',
                    listingsNum: 22,
                    cardLink: '#'
                },
                {
                    id: 10,
                    icon: <FaSearchDollar />,
                    title: 'وظائف',
                    listingsNum: 40,
                    cardLink: '#'
                },
                {
                    id: 11,
                    icon: <TiPlane />,
                    title: 'يسافر',
                    listingsNum: 13,
                    cardLink: '#'
                },
                {
                    id: 12,
                    icon: <FiMusic />,
                    title: 'الأحداث',
                    listingsNum: 10,
                    cardLink: '#'
                }
            ]
        },
        browsecategories2: {
            sectitle: 'تصفح حسب الفئات',
            seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل الأفضل لك ومتى يكون الأفضل لك. ",
            categories: [
                {
                    img: img1,
                    icon: <GiChickenOven />,
                    title: 'مطاعم',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <TiPlane />,
                    title: 'يسافر',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <RiHotelBedLine />,
                    title: 'الفنادق',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <FiMusic />,
                    title: 'الأحداث',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <FiShoppingCart />,
                    title: 'محلات',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <IoIosFitness />,
                    title: 'اللياقه البدنيه',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <GiWineGlass />,
                    title: 'طعام شراب',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <TiBrush />,
                    title: 'تصميم فني',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <TiBrush />,
                    title: 'صالونات',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <FaRegMoneyBillAlt />,
                    title: 'وظائف',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <BsBriefcase />,
                    title: 'الأعمال',
                    cardLink: '#'
                },
                {
                    img: img1,
                    icon: <FaRegHospital />,
                    title: 'مستشفى',
                    cardLink: '#'
                }
            ]
        },
        popularcategories: {
            title: 'جمع:',
            lists: [
                {
                    url: '#',
                    title: 'السفر'
                },
                {
                    url: '#',
                    title: 'طعام'
                },
                {
                    url: '#',
                    title: 'اعمال'
                },
                {
                    url: '#',
                    title: 'صالون'
                },
                {
                    url: '#',
                    title: 'تنظيف'
                }
            ]
        }
    },
    popularcategories: {
        sectitle: 'الفئات الأكثر شهرة',
        seccontent: 'اغتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
        categories: [
            {
                icon: <GiChickenOven />,
                title: 'مطاعم',
                stitle: 'القوائم 12',
                url: '#',
                img: img1
            },
            {
                icon: <TiPlane />,
                title: 'يسافر',
                stitle: 'القوائم 34',
                url: '#',
                img: img1
            },
            {
                icon: <RiHotelBedLine />,
                title: 'الفنادق',
                stitle: 'القوائم 44',
                url: '#',
                img: img1
            },
            {
                icon: <IoMdMusicalNotes />,
                title: 'الأحداث',
                stitle: 'القوائم 65',
                url: '#',
                img: img1
            },
            {
                icon: <FiShoppingCart />,
                title: 'محلات',
                stitle: 'القوائم 10',
                url: '#',
                img: img1
            },
            {
                icon: <IoIosFitness />,
                title: 'اللياقه البدنيه',
                stitle: 'القوائم 9',
                url: '#',
                img: img1
            },
            {
                icon: <GiWineGlass />,
                title: 'طعام شراب',
                stitle: 'القوائم 13',
                url: '#',
                img: img1
            },
            {
                icon: <TiBrush />,
                title: 'تصميم فني',
                stitle: 'القوائم 15',
                url: '#',
                img: img1
            }
        ],
        morecats: [
            {
                icon: <TiBrush />,
                title: 'في الهواء الطلق',
                stitle: ' القوائم 20',
                url: '#',
                img: img1
            },
            {
                icon: <TiBrush />,
                title: 'الحياة الليلية',
                stitle: 'القوائم 20',
                url: '#',
                img: img1
            },
            {
                icon: <FaRegHospital />,
                title: 'المستشفيات',
                stitle: 'القوائم 20',
                url: '#',
                img: img1
            },
            {
                icon: <GiPineTree />,
                title: 'مغامرة',
                stitle: 'القوائم 23',
                url: '#',
                img: img1
            },
            {
                icon: <FiBookOpen />,
                title: 'التعليم',
                stitle: 'القوائم 40',
                url: '#',
                img: img1
            },
            {
                icon: <AiOutlineCar />,
                title: 'سيارات',
                stitle: 'القوائم 33',
                url: '#',
                img: img1
            },
            {
                icon: <BsBriefcase />,
                title: 'وظائف',
                stitle: 'القوائم 20',
                url: '#',
                img: img1
            },
            {
                icon: <FaRegMoneyBillAlt />,
                title: 'اعمال',
                stitle: 'القوائم 20',
                url: '#',
                img: img1
            }
        ]
    },
    populardestination: {
        sectitle: 'اكتشف وجهة مشهورة',
        seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. ",
        destinations: [
            {
                img: destinationimg1,
                cityFlag: flag1,
                cityName: 'كندا',
                listingTxt: 'القوائم 23',
                boxCol: '4',
                cardUrl: '#'
            },
            {
                img: img1,
                cityFlag: flag2,
                cityName: 'الولايات المتحدة الأمريكية',
                listingTxt: 'القوائم 21',
                boxCol: '4',
                cardUrl: '#'
            },
            {
                img: img1,
                cityFlag: flag3,
                cityName: 'المملكة المتحدة',
                listingTxt: 'القوائم 33',
                boxCol: '4',
                cardUrl: '#'
            },
            {
                img: img1,
                cityFlag: flag4,
                cityName: 'المكسيك',
                listingTxt: 'القوائم 14',
                boxCol: '3',
                cardUrl: '#'
            },
            {
                img: img1,
                cityFlag: flag5,
                cityName: 'كوستا ريكا',
                listingTxt: 'االقوائم 25',
                boxCol: '3',
                cardUrl: '#'
            },
            {
                img: destinationimg6,
                cityFlag: flag6,
                cityName: 'أستراليا',
                listingTxt: 'القوائم 11',
                boxCol: '3',
                cardUrl: '#'
            },
            {
                img: destinationimg6,
                cityFlag: flag7,
                cityName: 'نيوزيلندا ',
                listingTxt: 'القوائم 14',
                boxCol: '3',
                cardUrl: '#'
            },
            {
                img: destinationimg6,
                cityFlag: flag8,
                cityName: 'فرنسا',
                listingTxt: 'القوائم 65',
                boxCol: '6',
                cardUrl: '#'
            },
            {
                img: destinationimg6,
                cityFlag: flag9,
                cityName: 'إيطاليا',
                listingTxt: 'القوائم 98',
                boxCol: '6',
                cardUrl: '#'
            }
        ],
        viewmorebtn: 'عرض كل الوجهة',
        viewmorebtnurl: '/all-locations'
    },
    locations: [
        {
            img: flag1,
            title: 'الولايات المتحدة (2)',
            titleUrl: '#'
        },
        {
            img: flag2,
            title: 'لندن (4)',
            titleUrl: '#'
        },
        {
            img: flag3,
            title: 'أستراليا (7)',
            titleUrl: '#'
        },
        {
            img: flag4,
            title: 'اليابان (9)',
            titleUrl: '#'
        },
        {
            img: flag5,
            title: 'فرنسا (12)',
            titleUrl: '#'
        },
        {
            img: flag6,
            title: 'روسيا (14)',
            titleUrl: '#'
        },
        {
            img: flag7,
            title: 'نيوزيلندا (17)',
            titleUrl: '#'
        },
        {
            img: flag8,
            title: 'الهند (19)',
            titleUrl: '#'
        },
        {
            img: flag9,
            title: 'هولندا (15)',
            titleUrl: '#'
        },
        {
            img: flag10,
            title: 'السويد (17)',
            titleUrl: '#'
        },
        {
            img: flag11,
            title: 'السعودية (29)',
            titleUrl: '#'
        },
        {
            img: flag12,
            title: 'اسكتلندا (10)',
            titleUrl: '#'
        },
        {
            img: flag13,
            title: 'كندا (43)',
            titleUrl: '#'
        },
        {
            img: flag14,
            title: 'المكسيك (45)',
            titleUrl: '#'
        },
        {
            img: flag15,
            title: 'بنغلاديش (50)',
            titleUrl: '#'
        },
        {
            img: flag16,
            title: 'جنوب افريقيا (60)',
            titleUrl: '#'
        },
        {
            img: flag17,
            title: 'باكستان (48)',
            titleUrl: '#'
        },
        {
            img: flag18,
            title: 'كوستاريكا (33)',
            titleUrl: '#'
        },
        {
            img: flag19,
            title: 'إيطاليا (44)',
            titleUrl: '#'
        },
        {
            img: flag20,
            title: 'تايلاند (55)',
            titleUrl: '#'
        }
    ],
    howitworks: {
        hiw1: {
            sectitle: 'خطط لقضاء إجازة أحلامك',
            seccontent: 'اغتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
            items: [
                {
                    id: '1',
                    icon: <FiMap />,
                    title: 'ابحث عن مكان ممتع',
                    description: 'اغتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.'
                },
                {
                    id: '2',
                    icon: <FiMail />,
                    title: 'تواصل مع عدد قليل من المؤلفين',
                    description: 'اغتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.'
                },
                {
                    id: '3',
                    icon: <AiOutlineUser />,
                    title: 'احجز',
                    description: 'اغتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.'
                }
            ],
        },
        hiw2: {
            sectitle: 'ماذا نقدم',
            seccontent: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
            items: [
                {
                    active: false,
                    icon: <BsMap />,
                    title: 'أماكن رائعة',
                    description: 'هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم.'
                },
                {
                    active: false,
                    icon: <GiChickenOven />,
                    title: 'مطاعم رائعة',
                    description: 'هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم.'
                },
                {
                    active: false,
                    icon: <RiHotelBedLine />,
                    title: 'مطاعم رائعة',
                    description: 'هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم.'
                },
                {
                    active: true,
                    icon: <AiOutlineEllipsis />,
                    title: 'مطاعم رائعة...',
                    description: 'هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم.'
                }
            ]
        },
        hiw3: {
            sectitle: 'كيف يمكنني كسب المال مع ذلك؟',
            seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل.",
            videobtn: 'شاهد كيف يعمل',
            videoid: 'R2kiP9Qu7Pc',
            videoImg: hiw3videoimg,
            items: [
                {
                    id: '1',
                    icon: <FaRegMoneyBillAlt />,
                    title: 'القوائم المدفوعة',
                    desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل.'
                },
                {
                    id: '2',
                    icon: <FcLineChart />,
                    title: 'الترويج القوائم',
                    desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل.'
                },
                {
                    id: '3',
                    icon: <FaRegHeart />,
                    title: 'قوائم المطالبات المدفوعة',
                    desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل.'
                }
            ]
        },
        hiw4: {
            sectitle: 'ماذا نقدم',
            seccontent: "اغتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل  والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. ",
            items: [
                {
                    icon: <FiCheck />,
                    title: 'نحن محترفون',
                    desc: 'هناك العديد من الاختلافات المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية قد تعرضت للتغيير في شكل ما ، عن طريق إدخال الدعابة ،'
                },
                {
                    icon: <FiCheck />,
                    title: 'ضمان أفضل خدمة',
                    desc: 'هناك العديد من الاختلافات المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية قد تعرضت للتغيير في شكل ما ، عن طريق إدخال الدعابة ،'
                },
                {
                    icon: <FiCheck />,
                    title: 'نحن موثوقون ومضمونون',
                    desc: 'هناك العديد من الاختلافات المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية قد تعرضت للتغيير في شكل ما ، عن طريق إدخال الدعابة ،'
                },
                {
                    icon: <FiCheck />,
                    title: 'دعم عبر الإنترنت 24/7 ',
                    desc: 'هناك العديد من الاختلافات المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية قد تعرضت للتغيير في شكل ما ، عن طريق إدخال الدعابة ،'
                }
            ]
        },
        hiw5: {
            sectitle: 'لماذا أخترتنا',
            seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح الأفضل لك ومتى يكون الأفضل لك. ",
            items: [
                {
                    id: 1,
                    icon: <BsPencil />,
                    title: 'اختر كلمة رئيسية',
                    desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
                },
                {
                    id: 2,
                    icon: <GiPositionMarker />,
                    title: 'اختر موقعا',
                    desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
                },
                {
                    id: 3,
                    icon: <TiArrowUnsorted />,
                    title: 'اختر الفئة',
                    desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
                },
                {
                    id: 4,
                    icon: <FiCheck />,
                    title: 'عرض النتائج',
                    desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
                }
            ],
            videoBg: hiw5videoimg,
            videoBtn: 'شاهد كيف يعمل',
            videoid: 'R2kiP9Qu7Pc'
        },
        hiw6: {
            sectitle: 'كيف يعمل كما سبق',
            seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.",
            items: [
                {
                    id: 1,
                    icon: <FaSearchPlus />,
                    title: 'ابحث عن مكان',
                    description: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.'
                },
                {
                    id: 2,
                    icon: <FaRegMap />,
                    title: 'اختر موقعا',
                    description: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.'
                },
                {
                    id: 3,
                    icon: <FaSort />,
                    title: 'اختر تصنيف',
                    description: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.'
                },
                {
                    id: 4,
                    icon: <FiCheckCircle />,
                    title: 'انظر النتيجة',
                    description: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.'
                }
            ]
        },
        hiw7: {
            sectitle: 'لماذا أخترتنا',
            seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو",
            items: [
                {
                    icon: <FiHeadphones />,
                    title: 'دعم 24/7 ساعة',
                    desc: 'هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم. عيني أ من الحزن وأطراف الأرض'
                },
                {
                    icon: <FaCogs />,
                    title: 'لوحة الادارة',
                    desc: 'هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم. عيني أ من الحزن وأطراف الأرض'
                },
                {
                    icon: <FiThumbsUp />,
                    title: 'متوافق مع الجوال',
                    desc: 'هناك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم. عيني أ من الحزن وأطراف الأرض'
                }
            ]
        }
    },
    placesgrid: [
        {
            bedge: 'فتح جديد',
            title: 'فندق جوفيندور',
            titleIcon: <IoIosCheckmarkCircle />,
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'الفندق',
            cardTypeIcon: <RiHotelBedLine />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            websiteUrl: 'https://example.com',
            date: 'نشرت منذ شهر واحد',
            view: '204',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.7'
        },
        {
            bedge: 'فتح جديد',
            title: 'المكان المفضل بنك الطعام',
            titleIcon: <IoIosCheckmarkCircle />,
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'مطعم',
            cardTypeIcon: <GiChickenOven />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '204',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.5'
        },
        {
            bedge: 'مغلق',
            title: 'الشاطئ الأزرق الممر',
            titleIcon: '',
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'السفر',
            cardTypeIcon: <GiChickenOven />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '248',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.6'
        },
        {
            bedge: 'فتح جديد',
            title: 'فندق جوفيندور',
            titleIcon: <IoIosCheckmarkCircle />,
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'الفندق',
            cardTypeIcon: <RiHotelBedLine />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '248',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.6'
        },
        {
            bedge: 'فتح جديد',
            title: 'حزب الفرقة اللزجة',
            titleIcon: <IoIosCheckmarkCircle />,
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'حدث',
            cardTypeIcon: <IoMdMusicalNotes />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '248',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.4'
        },
        {
            bedge: 'مغلق',
            title: 'مول سينا ​​للملابس',
            titleIcon: '',
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'متجر',
            cardTypeIcon: <GiChickenOven />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '248',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.6'
        }
    ],
    placesgridmoreitems: [
        {
            bedge: 'فتح جديد',
            title: 'فندق جوفيندور',
            titleIcon: <IoIosCheckmarkCircle />,
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img1,
            cardType: 'الفندق',
            cardTypeIcon: <RiHotelBedLine />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            websiteUrl: 'https://example.com',
            date: 'نشرت منذ شهر واحد',
            view: '204',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.7'
        },
        {
            bedge: 'فتح جديد',
            title: 'المكان المفضل بنك الطعام',
            titleIcon: <IoIosCheckmarkCircle />,
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'مطعم',
            cardTypeIcon: <GiChickenOven />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '204',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.5'
        },
        {
            bedge: 'مغلق',
            title: 'الشاطئ الأزرق الممر',
            titleIcon: '',
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'السفر',
            cardTypeIcon: <GiChickenOven />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '248',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.6'
        },
        {
            bedge: 'فتح جديد',
            title: 'فندق جوفيندور',
            titleIcon: <IoIosCheckmarkCircle />,
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'الفندق',
            cardTypeIcon: <RiHotelBedLine />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '248',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.6'
        },
        {
            bedge: 'فتح جديد',
            title: 'حزب الفرقة اللزجة',
            titleIcon: <IoIosCheckmarkCircle />,
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'حدث',
            cardTypeIcon: <IoMdMusicalNotes />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '248',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.4'
        },
        {
            bedge: 'مغلق',
            title: 'مول سينا ​​للملابس',
            titleIcon: '',
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'متجر',
            cardTypeIcon: <GiChickenOven />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '248',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.6'
        },
        {
            bedge: 'فتح جديد',
            title: 'فندق جوفيندور',
            titleIcon: <IoIosCheckmarkCircle />,
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'الفندق',
            cardTypeIcon: <RiHotelBedLine />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '204',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.7'
        },
        {
            bedge: 'فتح جديد',
            title: 'المكان المفضل بنك الطعام',
            titleIcon: <IoIosCheckmarkCircle />,
            titleUrl: '/listing-details',
            stitle: 'شارع بيشوب ، نيويورك',
            image: img2,
            cardType: 'مطعم',
            cardTypeIcon: <GiChickenOven />,
            author: authorimg,
            authorUrl: '#',
            number: '(492) 492-4828',
            website: 'www.mysitelink.com',
            date: 'نشرت منذ شهر واحد',
            view: '204',
            ratings: [
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStar />,
                <IoMdStarHalf />,
                <IoMdStar className="last-star" />,
            ],
            ratingNum: '4.5'
        }
    ],
    listing: {
        sidebar: {
            widgetFilterCategory: {
                title: 'تصفية حسب الفئة',
                items: [
                    {
                        id: 1,
                        cat: ' السفر',
                        catNum: 11
                    },
                    {
                        id: 2,
                        cat: ' الفنون',
                        catNum: 22
                    },
                    {
                        id: 3,
                        cat: ' تقنية',
                        catNum: 9
                    },
                    {
                        id: 4,
                        cat: ' موضه',
                        catNum: 11
                    },
                    {
                        id: 5,
                        cat: ' تقنية',
                        catNum: 12
                    },
                    {
                        id: 6,
                        cat: ' أسلوب الحياة',
                        catNum: 48
                    },
                    {
                        id: 7,
                        cat: ' التصميم',
                        catNum: 23
                    },
                    {
                        id: 8,
                        cat: ' الحاسوب',
                        catNum: 28
                    },
                    {
                        id: 9,
                        cat: ' وظائف',
                        catNum: 24
                    },
                    {
                        id: 10,
                        cat: ' عقارات',
                        catNum: 40
                    },
                    {
                        id: 11,
                        cat: ' ملابس',
                        catNum: 23
                    },
                    {
                        id: 12,
                        cat: ' الجمال والسبا',
                        catNum: 18
                    },
                    {
                        id: 13,
                        cat: ' حدث',
                        catNum: 65
                    },
                    {
                        id: 14,
                        cat: ' الصحة واللياقة البدنية',
                        catNum: 34
                    },
                    {
                        id: 15,
                        cat: ' مطاعم',
                        catNum: 20
                    }
                ]
            },
            widgetFilterTags: {
                title: 'تصفية حسب العلامات',
                tags: [
                    {
                        path: '#',
                        title: 'تقنية'
                    },
                    {
                        path: '#',
                        title: 'موضه'
                    },
                    {
                        path: '#',
                        title: 'فن'
                    },
                    {
                        path: '#',
                        title: 'التصميم'
                    },
                    {
                        path: '#',
                        title: 'طعام'
                    },
                    {
                        path: '#',
                        title: 'تطوير'
                    },
                    {
                        path: '#',
                        title: 'تسويق'
                    },
                    {
                        path: '#',
                        title: 'فيديو'
                    },
                    {
                        path: '#',
                        title: 'موسيقى'
                    },
                    {
                        path: '#',
                        title: 'نمط الحياة'
                    },
                    {
                        path: '#',
                        title: 'مغامرة'
                    }
                ]
            },
            widgetFilterFeatures: {
                title: 'تصفية حسب الميزات',
                features: [
                    {
                        id: 1,
                        text: 'مصعد في المبنى'
                    },
                    {
                        id: 2,
                        text: 'مساحة عمل ودية'
                    },
                    {
                        id: 3,
                        text: 'الحجز الفوري'
                    },
                    {
                        id: 4,
                        text: 'انترنت لاسلكي'
                    },
                    {
                        id: 5,
                        text: 'مواقف مجانية للسيارات في المباني'
                    },
                    {
                        id: 6,
                        text: 'مواقف مجانية للسيارات في الشارع'
                    },
                    {
                        id: 7,
                        text: 'مسموح التدخين'
                    },
                    {
                        id: 8,
                        text: 'الأحداث'
                    },
                    {
                        id: 9,
                        text: 'تسهيلات لدخول المعاقين'
                    },
                    {
                        id: 10,
                        text: 'نظام إنذار'
                    },
                    {
                        id: 11,
                        text: 'كهرباء'
                    },
                    {
                        id: 12,
                        text: 'جراج ملحق'
                    },
                    {
                        id: 13,
                        text: 'كاميرات مراقبة'
                    },
                ]
            },
            widgetSortby: {
                title: 'صنف حسب',
                items: [
                    {
                        id: 1,
                        title: 'الأفضل مبيعًا'
                    },
                    {
                        id: 2,
                        title: 'الأحدث'
                    },
                    {
                        id: 3,
                        title: 'أفضل تصنيف'
                    },
                    {
                        id: 4,
                        title: 'الأقدم'
                    }
                ]
            },
            widgetPostedby: {
                title: 'منشور من طرف',
                items: [
                    {
                        title: 'تاجر'
                    },
                    {
                        title: 'فرد'
                    },
                    {
                        title: 'موزع'
                    }
                ]
            },
        },
        listinglists: [
            {
                bedge: 'فتح جديد',
                title: 'فندق جوفيندور',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'الفندق',
                cardTypeIcon: <RiHotelBedLine />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                websiteUrl: 'https://example.com',
                date: 'نشرت منذ شهر واحد',
                view: '204',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.7'
            },
            {
                bedge: 'فتح جديد',
                title: 'المكان المفضل بنك الطعام',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'مطعم',
                cardTypeIcon: <GiChickenOven />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '204',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.5'
            },
            {
                bedge: 'مغلق',
                title: 'الشاطئ الأزرق الممر',
                titleIcon: '',
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'السفر',
                cardTypeIcon: <GiChickenOven />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '248',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.6'
            },
            {
                bedge: 'فتح جديد',
                title: 'فندق جوفيندور',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'الفندق',
                cardTypeIcon: <RiHotelBedLine />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '248',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.6'
            },
            {
                bedge: 'فتح جديد',
                title: 'حزب الفرقة اللزجة',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'حدث',
                cardTypeIcon: <IoMdMusicalNotes />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '248',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.4'
            },
            {
                bedge: 'مغلق',
                title: 'مول سينا ​​للملابس',
                titleIcon: '',
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'متجر',
                cardTypeIcon: <GiChickenOven />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '248',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.6'
            }
        ]
    },
    listingDetails: {
        title: 'نودلز لذيذة مسحوبة باليد',
        description: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
        descriptiontitle: 'وصف',
        featurestitle: 'الميزات',
        featureslists: [
            {
                icon: <BsCheckCircle />,
                title: 'المكرونة سريعة التحضير'
            },
            {
                icon: <BsCheckCircle />,
                title: 'مسموح التدخين'
            },
            {
                icon: <BsCheckCircle />,
                title: 'مواقف الدراجات'
            },
            {
                icon: <BsCheckCircle />,
                title: 'انترنت لاسلكي'
            },
            {
                icon: <BsCheckCircle />,
                title: 'وقوف السيارات في الشارع'
            },
            {
                icon: <BsCheckCircle />,
                title: 'يقبل بطاقات الائتمان'
            }
        ],
        videotitle: 'فيديو',
        videoImg: listingdetailsvideoimg,
        videoid: 'R2kiP9Qu7Pc',
        videobtn: 'شاهد الفيديو',
        contactinfos: {
            title: 'معلومات للتواصل',
            address: '101 طريق إيست باركفيو ، نيويورك',
            email: 'example@gmail.com',
            number: '+7(111)123456789',
            website: 'www.techydevs.com',
            websiteUrl: 'https://techydevs.com',
            socials: [
                {
                    icon: <FaFacebookF />,
                    title: 'facebook',
                    url: 'https://facebook.com'
                },
                {
                    icon: <FaTwitter />,
                    title: 'twitter',
                    url: 'https://twitter.com'
                },
                {
                    icon: <FaInstagram />,
                    title: 'instagram',
                    url: 'https://instagram.com'
                },
                {
                    icon: <FaLinkedinIn />,
                    title: 'linkedinIn',
                    url: 'https://linkedin.com'
                },
                {
                    icon: <FaYoutube />,
                    title: 'youtube',
                    url: 'https://youtube.com'
                }
            ]
        },
        comments: [
            {
                img: team1,
                name: 'آدم سميث',
                date: 'تمت المراجعة منذ يومين',
                content: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. ',
                stars: [
                    <MdStar />,
                    <MdStar />,
                    <MdStar />,
                    <MdStar />,
                    <MdStarHalf />,
                ],
                replyBtn: 'الرد',
                replyBtnIcon: <RiReplyLine />,
                replyComments: [
                    {
                        img: team1,
                        name: 'جوليان سميث',
                        date: 'تمت المراجعة منذ 3 أيام',
                        content: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. ',
                        stars: [
                            <MdStar />,
                            <MdStar />,
                            <MdStar />,
                            <MdStar />,
                            <MdStarHalf />,
                        ],
                        replyBtn: 'الرد',
                        replyBtnIcon: <RiReplyLine />,
                    }
                ]
            },
            {
                img: team1,
                name: 'مات ديري',
                date: 'تمت المراجعة منذ 4 أيام',
                content: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. ',
                stars: [
                    <MdStar />,
                    <MdStar />,
                    <MdStar />,
                    <MdStar />,
                    <MdStar />,
                ],
                replyBtn: 'الرد',
                replyBtnIcon: <RiReplyLine />,
                replyComments: []
            }
        ],
        sidebar: {
            widgetAuthor: {
                authorImg: team2,
                authorName: 'مارك وليامسون',
                date: 'نشرت منذ 3 أيام',
                address: '101 باركفيو ، نيويورك',
                email: 'example@gmail.com',
                number: '+7(111)123456789',
                website: 'www.techydevs.com',
                websiteUrl: 'https://techydevs.com',
                socials: [
                    {
                        icon: <FaFacebookF />,
                        url: 'https://facebook.com'
                    },
                    {
                        icon: <FaTwitter />,
                        url: 'https://twitter.com'
                    },
                    {
                        icon: <FaInstagram />,
                        url: 'https://instagram.com'
                    },
                    {
                        icon: <FaDribbble />,
                        url: 'https://dribbble.com'
                    },
                    {
                        icon: <FaBehance />,
                        url: 'https://behance.be'
                    }
                ]
            },
            widgetStaticsInfo: {
                title: 'معلومات احصائية',
                lists: [
                    {
                        icon: <BsListCheck />,
                        text: '12 القوائم'
                    },
                    {
                        icon: <MdStarBorder />,
                        text: '4.4 التقييمات'
                    },
                    {
                        icon: <BsBookmark />,
                        text: '24 المرجعية'
                    },
                    {
                        icon: <BsEye />,
                        text: 'المشاهدات 745'
                    },
                    {
                        icon: <FiExternalLink />,
                        text: '120 مشاركة'
                    },
                    {
                        icon: <FaRegComment />,
                        text: '20 تعليق'
                    },
                    {
                        icon: <FiHeart />,
                        text: '120 الإعجابات'
                    }
                ]
            },
            widgetOpenHours: {
                title: 'ساعات العمل',
                stitle: 'مفتوح الان',
                items: [
                    {
                        day: 'يوم الاثنين',
                        time: '9 صباحًا - 5 مساءً',
                        close: false,
                    },
                    {
                        day: 'الثلاثاء',
                        time: '9 صباحًا - 5 مساءً',
                        close: false,
                    },
                    {
                        day: 'الأربعاء',
                        time: '9 صباحًا - 5 مساءً',
                        close: false,
                    },
                    {
                        day: 'الخميس',
                        time: '9 صباحًا - 5 مساءً',
                        close: false,
                    },
                    {
                        day: 'يوم الجمعة',
                        time: '9 صباحًا - 5 مساءً',
                        close: false,
                    },
                    {
                        day: 'اشعة الشمس',
                        time: 'مغلق',
                        close: true,
                    }
                ]
            },
            widgetCategories: {
                title: 'التصنيفات',
                lists: [
                    {
                        cat: 'مطعم',
                        catNum: 11,
                        url: '#'
                    },
                    {
                        cat: 'متجر',
                        catNum: 32,
                        url: '#'
                    },
                    {
                        cat: 'اللياقه البدنيه',
                        catNum: 21,
                        url: '#'
                    },
                    {
                        cat: 'حدث',
                        catNum: 24,
                        url: '#'
                    },
                    {
                        cat: 'شريط',
                        catNum: 14,
                        url: '#'
                    },
                    {
                        cat: 'صالون',
                        catNum: 11,
                        url: '#'
                    },
                    {
                        cat: 'جمال',
                        catNum: 10,
                        url: '#'
                    },
                ]
            },
            widgetTags: {
                title: 'سحابة الكلمات الدلالية',
                lists: [
                    {
                        text: 'السفر',
                        url: '#'
                    },
                    {
                        text: 'مطعم',
                        url: '#'
                    },
                    {
                        text: 'نادي رياضي',
                        url: '#'
                    },
                    {
                        text: 'طعام',
                        url: '#'
                    },
                    {
                        text: 'مكتب. مقر. مركز',
                        url: '#'
                    },
                    {
                        text: 'شريط',
                        url: '#'
                    },
                    {
                        text: 'الصحة',
                        url: '#'
                    },
                    {
                        text: 'موقف سيارة',
                        url: '#'
                    },
                    {
                        text: 'سهرات',
                        url: '#'
                    },
                    {
                        text: 'طبيب',
                        url: '#'
                    },
                    {
                        text: 'مواقف الدراجات',
                        url: '#'
                    },
                ]
            },
            widgetSimilarListing: {
                title: 'قوائم مماثلة',
                items: [
                    {
                        img: similarimg,
                        title: 'أفضل مسوق بيع العام المقبل',
                        titleUrl: '/blog-single',
                        price: '$19.00',
                        cat: 'جيم ولياقة بدنية',
                        catUrl: '#',
                        stars: [
                            <MdStar />,
                            <MdStar />,
                            <MdStar />,
                            <MdStar />,
                            <MdStarHalf />,
                        ]
                    },
                    {
                        img: similarimg,
                        title: 'كيف تجعل أفكارك حقيقة',
                        titleUrl: '/blog-single',
                        price: '$20.00',
                        cat: 'مطعم',
                        catUrl: '#',
                        stars: [
                            <MdStar />,
                            <MdStar />,
                            <MdStar />,
                            <MdStar />,
                            <MdStarHalf />,
                        ]
                    },
                    {
                        img: similarimg,
                        title: 'ما الذي يعترض طريق الإستراتيجية',
                        titleUrl: '/blog-single',
                        price: '$19.00',
                        cat: 'تصميم فني',
                        catUrl: '#',
                        stars: [
                            <MdStar />,
                            <MdStar />,
                            <MdStar />,
                            <MdStar />,
                            <MdStarHalf />,
                        ]
                    },
                    {
                        img: similarimg,
                        title: 'ما الذي يعترض طريق الإستراتيجية',
                        titleUrl: '/blog-single',
                        price: '$19.00',
                        cat: 'في الهواء الطلق',
                        catUrl: '#',
                        stars: [
                            <MdStar />,
                            <MdStar />,
                            <MdStar />,
                            <MdStar />,
                            <MdStarHalf />,
                        ]
                    },
                ]
            },
            widgetFollowConnect: {
                title: 'اتبع واتصل',
                socials: [
                    {
                        icon: <FaFacebookF />,
                        url: 'https://facebook.com'
                    },
                    {
                        icon: <FaTwitter />,
                        url: 'https://twitter.com'
                    },
                    {
                        icon: <FaInstagram />,
                        url: 'https://instagram.com'
                    },
                    {
                        icon: <FaDribbble />,
                        url: 'https://dribbble.com'
                    },
                    {
                        icon: <FaBehance />,
                        url: 'https://behance.be'
                    },
                ]
            }
        }
    },
    userprofile: {
        sidebar: {
            img: team2,
            name: 'مارك وليامسون',
            date: 'انضم منذ ٤ سنوات',
            address: '101 باركفيو ، نيويورك',
            number: '+7(111)123456789',
            email: 'example@gmail.com',
            website: 'www.techydevs.com',
            websiteUrl: 'https://techydevs.com',
            socials: [
                {
                    icon: <FaFacebookF />,
                    url: 'https://facebook.com'
                },
                {
                    icon: <FaTwitter />,
                    url: 'https://twitter.com'
                },
                {
                    icon: <FaInstagram />,
                    url: 'https://instagram.com'
                },
                {
                    icon: <FaDribbble />,
                    url: 'https://dribbble.com'
                },
                {
                    icon: <FaBehance />,
                    url: 'https://behance.be'
                }
            ]
        }
    },
    dashboard: {
        breadcrumbimg: breadcrumbimg,
        cards: [
            {
                img: img2,
                title: 'المكان المفضل بنك الطعام',
                subtitle: 'شارع بيشوب ، نيويورك',
                editTxt: 'تعديل',
                editIcon: <FaRegEdit />,
                deleteTxt: 'حذف',
                deleteIcon: <FaRegTrashAlt />,
                cardLink: '/listing-details'
            },
            {
                img: img2,
                title: 'بيتش بلو بوردووك',
                subtitle: 'شارع بيشوب ، نيويورك',
                editTxt: 'تعديل',
                editIcon: <FaRegEdit />,
                deleteTxt: 'حذف',
                deleteIcon: <FaRegTrashAlt />,
                cardLink: '/listing-details'
            },
            {
                img: img2,
                title: 'فندق حاكم',
                subtitle: 'شارع بيشوب ، نيويورك',
                editTxt: 'تعديل',
                editIcon: <FaRegEdit />,
                deleteTxt: 'حذف',
                deleteIcon: <FaRegTrashAlt />,
                cardLink: '/listing-details'
            },
            {
                img: img2,
                title: 'المكان المفضل بنك الطعام',
                subtitle: 'شارع بيشوب ، نيويورك',
                editTxt: 'تعديل',
                editIcon: <FaRegEdit />,
                deleteTxt: 'حذف',
                deleteIcon: <FaRegTrashAlt />,
                cardLink: '/listing-details'
            },
            {
                img: img2,
                title: 'بيتش بلو بوردووك',
                subtitle: 'شارع بيشوب ، نيويورك',
                editTxt: 'تعديل',
                editIcon: <FaRegEdit />,
                deleteTxt: 'حذف',
                deleteIcon: <FaRegTrashAlt />,
                cardLink: '/listing-details'
            },
            {
                img: img2,
                title: 'فندق حاكم',
                subtitle: 'شارع بيشوب ، نيويورك',
                editTxt: 'تعديل',
                editIcon: <FaRegEdit />,
                deleteTxt: 'حذف',
                deleteIcon: <FaRegTrashAlt />,
                cardLink: '/listing-details'
            }
        ],
        userImg: userimage,
        userName: 'مارك وليامسون',
        userbio: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
        address: '101 باركفيو ، نيويورك',
        phoneNum: '+7(111)123456789',
        website: 'www.techydevs.com',
    },
    teamdata: {
        sectitle: 'أعضاء فريق الخبراء لدينا',
        seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو",
        teams: [
            {
                img: userimage,
                title: 'كمال أحمد',
                titleUrl: '#',
                stitle: 'مستشار الأعمال',
                socials: [
                    {
                        icon: <FaFacebookF />,
                        url: 'https://facebook.com'
                    },
                    {
                        icon: <FaTwitter />,
                        url: 'https://twitter.com'
                    },
                    {
                        icon: <FaInstagram />,
                        url: 'https://instagram.com'
                    },
                    {
                        icon: <FaLinkedinIn />,
                        url: 'https://linkedin.com'
                    }
                ]
            },
            {
                img: userimage,
                title: 'قمران أحمد',
                titleUrl: '#',
                stitle: 'مصور فوتوغرافي',
                socials: [
                    {
                        icon: <FaFacebookF />,
                        url: 'https://facebook.com'
                    },
                    {
                        icon: <FaTwitter />,
                        url: 'https://twitter.com'
                    },
                    {
                        icon: <FaInstagram />,
                        url: 'https://instagram.com'
                    },
                    {
                        icon: <FaLinkedinIn />,
                        url: 'https://linkedin.com'
                    }
                ]
            },
            {
                img: userimage,
                title: 'تنبر أحمد',
                titleUrl: '#',
                stitle: 'المدير المشارك المرتبط',
                socials: [
                    {
                        icon: <FaFacebookF />,
                        url: 'https://facebook.com'
                    },
                    {
                        icon: <FaTwitter />,
                        url: 'https://twitter.com'
                    },
                    {
                        icon: <FaInstagram />,
                        url: 'https://instagram.com'
                    },
                    {
                        icon: <FaLinkedinIn />,
                        url: 'https://linkedin.com'
                    }
                ]
            },
            {
                img: userimage,
                title: 'جهين احمد',
                titleUrl: '#',
                stitle: 'مخرج',
                socials: [
                    {
                        icon: <FaFacebookF />,
                        url: 'https://facebook.com'
                    },
                    {
                        icon: <FaTwitter />,
                        url: 'https://twitter.com'
                    },
                    {
                        icon: <FaInstagram />,
                        url: 'https://instagram.com'
                    },
                    {
                        icon: <FaLinkedinIn />,
                        url: 'https://linkedin.com'
                    }
                ]
            },
        ]
    },
    pricingplan: [
        {
            icon: <IoMdPaperPlane />,
            title: 'الخطة الأساسية',
            price: '49',
            currency: '$',
            mo: 'كل شهر',
            features: [
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'قائمة واحدة',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'توفر 90 يوم',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'غير مميز',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'دعم محدود',
                },
                {
                    icon: <MdClose />,
                    iconClr: 'text-danger',
                    title: 'متوسط ​​نطاق السعر',
                },
                {
                    icon: <MdClose />,
                    iconClr: 'text-danger',
                    title: 'ساعات العمل',
                },
                {
                    icon: <MdClose />,
                    iconClr: 'text-danger',
                    title: 'مدى التوفر',
                },
                {
                    icon: <MdClose />,
                    iconClr: 'text-danger',
                    title: 'ظهرت في نتائج البحث',
                }
            ],
            buttonTxt: 'استمر',
            buttonUrl: '#',
            active: false
        },
        {
            icon: <RiPlaneLine />,
            title: 'خطة متقدمة',
            price: '99',
            currency: '$',
            mo: 'كل شهر',
            features: [
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'قائمة واحدة',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'توفر 90 يوم',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'غير مميز',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'دعم محدود',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'متوسط ​​نطاق السعر',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'ساعات العمل',
                },
                {
                    icon: <MdClose />,
                    iconClr: 'text-danger',
                    title: 'مدى التوفر',
                },
                {
                    icon: <MdClose />,
                    iconClr: 'text-danger',
                    title: 'ظهرت في نتائج البحث',
                }
            ],
            buttonTxt: 'استمر',
            buttonUrl: '#',
            active: true
        },
        {
            icon: <IoIosRocket />,
            title: 'خطة المؤسسة',
            price: '149',
            currency: '$',
            mo: 'كل شهر',
            features: [
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'قائمة واحدة',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'توفر 90 يوم',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'غير مميز',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'دعم محدود',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'متوسط ​​نطاق السعر',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'ساعات العمل',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'مدى التوفر',
                },
                {
                    icon: <FiCheck />,
                    iconClr: 'text-success',
                    title: 'ظهرت في نتائج البحث',
                }
            ],
            buttonTxt: 'استمر',
            buttonUrl: '#',
            active: false
        }
    ],
    aboutdata: {
        imagebox: [
            {
                img: imgboximg,
                title: 'وظائف',
                desc: 'مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو  لك. ',
                cardLink: '#'
            },
            {
                img: imgboximg,
                title: 'غرفة الأخبار',
                desc: 'مسلمًا أفضل. والله أعلم ما هو  لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. ',
                cardLink: '#'
            },
            {
                img: imgboximg,
                title: 'علاقات المستثمرين',
                desc: ' مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو  لك. ',
                cardLink: '#'
            }
        ],
        aboutst2: {
            title: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.",
            content1: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون",
            content2: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
            items: [
                {
                    img: about2img,
                    boxClass: 'mt-4'
                },
                {
                    img: about2img,
                    boxClass: ''
                },
                {
                    img: about2img,
                    boxClass: 'mt-4'
                },
                {
                    img: about2img,
                    boxClass: ''
                }
            ]
        }
    },
    mostvisitedplaces: {
        sectitle: 'الأماكن الأكثر زيارة',
        seccontent: 'اغتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
        places: [
            {
                bedge: 'فتح جديد',
                title: 'فندق جوفيندور',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img1,
                cardType: 'الفندق',
                cardTypeIcon: <RiHotelBedLine />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                websiteUrl: 'https://example.com',
                date: 'نشرت منذ شهر واحد',
                view: '204',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.7'
            },
            {
                bedge: 'فتح جديد',
                title: 'المكان المفضل بنك الطعام',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'مطعم',
                cardTypeIcon: <GiChickenOven />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '204',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.5'
            },
            {
                bedge: 'مغلق',
                title: 'الشاطئ الأزرق الممر',
                titleIcon: '',
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'السفر',
                cardTypeIcon: <GiChickenOven />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '248',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.6'
            },
            {
                bedge: 'فتح جديد',
                title: 'فندق جوفيندور',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'الفندق',
                cardTypeIcon: <RiHotelBedLine />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '248',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.6'
            },
            {
                bedge: 'فتح جديد',
                title: 'حزب الفرقة اللزجة',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'حدث',
                cardTypeIcon: <IoMdMusicalNotes />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '248',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.4'
            },
            {
                bedge: 'مغلق',
                title: 'مول سينا ​​للملابس',
                titleIcon: '',
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'متجر',
                cardTypeIcon: <GiChickenOven />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '248',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.6'
            },
            {
                bedge: 'فتح جديد',
                title: 'فندق جوفيندور',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'الفندق',
                cardTypeIcon: <RiHotelBedLine />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '204',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.7'
            },
            {
                bedge: 'فتح جديد',
                title: 'المكان المفضل بنك الطعام',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: img2,
                cardType: 'مطعم',
                cardTypeIcon: <GiChickenOven />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '204',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.5'
            }
        ]
    },
    recommendedplaces: {
        sectitle: 'الأماكن التي نوصي بزيارتها',
        seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة الأفضل لك ومتى يكون الأفضل لك. ",
        items: [
            {
                bedge: 'فتح جديد',
                title: 'فندق جوفيندور',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: destinationimg6,
                cardType: 'الفندق',
                cardTypeIcon: <RiHotelBedLine />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                websiteUrl: 'https://example.com',
                date: 'نشرت منذ شهر واحد',
                view: '204',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.7'
            },
            {
                bedge: 'فتح جديد',
                title: 'المكان المفضل بنك الطعام',
                titleIcon: <IoIosCheckmarkCircle />,
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: destinationimg6,
                cardType: 'مطعم',
                cardTypeIcon: <GiChickenOven />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '204',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.5'
            },
            {
                bedge: 'مغلق',
                title: 'الشاطئ الأزرق الممر',
                titleIcon: '',
                titleUrl: '/listing-details',
                stitle: 'شارع بيشوب ، نيويورك',
                image: destinationimg6,
                cardType: 'السفر',
                cardTypeIcon: <GiChickenOven />,
                author: authorimg,
                authorUrl: '#',
                number: '(492) 492-4828',
                website: 'www.mysitelink.com',
                date: 'نشرت منذ شهر واحد',
                view: '248',
                ratings: [
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStar />,
                    <IoMdStarHalf />,
                    <IoMdStar className="last-star" />,
                ],
                ratingNum: '4.6'
            }
        ]
    },
    dreamplaces: {
        sectitle: 'استكشف أماكن أحلامك',
        seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح ",
        places: [
            {
                img: dreamimg,
                country: 'الولايات المتحدة الأمريكية',
                badge: 'يكتشف',
                placeNum: 5,
                listingNum: 250,
                cardColumn: 6,
                cardLink: '#'
            },
            {
                img: dreamimg,
                country: 'المملكة المتحدة',
                badge: 'يكتشف',
                placeNum: 7,
                listingNum: 220,
                cardColumn: 6,
                cardLink: '#'
            },
            {
                img: dreamimg,
                country: 'أستراليا',
                badge: 'يكتشف',
                placeNum: 8,
                listingNum: 80,
                cardColumn: 4,
                cardLink: '#'
            },
            {
                img: dreamimg,
                country: 'نيوزيلندا',
                badge: 'يكتشف',
                placeNum: 9,
                listingNum: 190,
                cardColumn: 4,
                cardLink: '#'
            },
            {
                img: dreamimg,
                country: 'روسيا',
                badge: 'يكتشف',
                placeNum: 11,
                listingNum: 110,
                cardColumn: 4,
                cardLink: '#'
            }
        ],
        loadmoretext: 'تحميل المزيد'
    },
    funfacts: {
        funfact1: {
            sectitle: 'الأرقام تقول كل شيء',
            seccontent: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
            counteritems: [
                {
                    id: '1',
                    start: 0,
                    end: 150,
                    duration: '8',
                    separator: '',
                    decimal: ',',
                    prefix: ' ',
                    suffix: '+',
                    title: 'المشاريع المنجزة'
                },
                {
                    id: '2',
                    start: 0,
                    end: 3040,
                    duration: '8',
                    separator: '',
                    decimal: ',',
                    prefix: ' ',
                    suffix: '+',
                    title: 'عملاء سعداء'
                },
                {
                    id: '3',
                    start: 0,
                    end: 2020,
                    duration: '8',
                    separator: '',
                    decimal: ',',
                    prefix: ' ',
                    suffix: '+',
                    title: 'كوب من القهوة'
                },
                {
                    id: '4',
                    start: 0,
                    end: 350,
                    duration: '8',
                    separator: '',
                    decimal: ',',
                    prefix: ' ',
                    suffix: '+',
                    title: 'الفوز بجوائز'
                }
            ]
        },
        funfact2: {
            sectitle: 'الأرقام تقول كل شيء',
            seccontent: "اغتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل  والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. ",
            counteritems: [
                {
                    id: '1',
                    title: 'الحائز على الجوائز',
                    buttonTxt: 'نضم الان',
                    buttonUrl: '#',
                    start: 0,
                    end: 1150,
                    duration: 8,
                    separator: '',
                    decimal: ',',
                    prefix: ' ',
                    suffix: '+'
                },
                {
                    id: '2',
                    title: 'عملاء سعداء',
                    buttonTxt: 'نضم الان',
                    buttonUrl: '#',
                    start: 0,
                    end: 3040,
                    duration: 8,
                    separator: '',
                    decimal: ',',
                    prefix: ' ',
                    suffix: '+'
                },
                {
                    id: '3',
                    title: 'كوب من القهوة',
                    buttonTxt: 'نضم الان',
                    buttonUrl: '#',
                    start: 0,
                    end: 2020,
                    duration: 8,
                    separator: '',
                    decimal: ',',
                    prefix: ' ',
                    suffix: '+'
                },
                {
                    id: '4',
                    title: 'الحائز على الجوائز',
                    buttonTxt: 'نضم الان',
                    buttonUrl: '#',
                    start: 0,
                    end: 350,
                    duration: 8,
                    separator: '',
                    decimal: ',',
                    prefix: ' ',
                    suffix: '+'
                }
            ]
        },
        funfact3: [
            {
                id: 1,
                title: 'زوار جدد كل أسبوع',
                start: 0,
                end: 250,
                duration: 8,
                separator: '',
                decimal: ',',
                prefix: ' ',
                suffix: '+'
            },
            {
                id: 2,
                title: 'عملاء سعداء كل عام',
                start: 0,
                end: 3040,
                duration: 8,
                separator: '',
                decimal: ',',
                prefix: ' ',
                suffix: '+'
            },
            {
                id: 3,
                title: 'فاز بالجوائز',
                start: 0,
                end: 172,
                duration: 8,
                separator: '',
                decimal: ',',
                prefix: ' ',
                suffix: ''
            },
            {
                id: 4,
                title: 'قائمة جديدة كل أسبوع',
                start: 0,
                end: 150,
                duration: 8,
                separator: '',
                decimal: ',',
                prefix: ' ',
                suffix: '+'
            }
        ]
    },
    accordions: {
        sectitle: 'قائمة الأسئلة الشائعة',
        seccontent: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو",
        items: [
            {
                title: 'ما هو فيروس كورونا الجديد؟',
                desc: 'هناك العديد من الأشكال المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية تعرضت للتغيير بشكل ما ، عن طريق إدخال بعض الفكاهة أو الكلمات العشوائية التي لا تبدو قابلة للتصديق إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في منتصف النص',
                plus: <FaPlus />,
                minus: <FaMinus />,
                cardClass: 'mb-3'
            },
            {
                title: 'هل يمكنني إنشاء قائمة مجانية؟',
                desc: 'هناك العديد من الأشكال المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية تعرضت للتغيير بشكل ما ، عن طريق إدخال بعض الفكاهة أو الكلمات العشوائية التي لا تبدو قابلة للتصديق إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في منتصف النص',
                plus: <FaPlus />,
                minus: <FaMinus />,
                cardClass: 'mb-3'
            },
            {
                title: 'كم من الوقت يستغرق الحصول على الموافقة؟',
                desc: 'هناك العديد من الأشكال المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية تعرضت للتغيير بشكل ما ، عن طريق إدخال بعض الفكاهة أو الكلمات العشوائية التي لا تبدو قابلة للتصديق إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في منتصف النص',
                plus: <FaPlus />,
                minus: <FaMinus />,
                cardClass: 'mb-3'
            },
            {
                title: 'هل يجب علي الالتزام باشتراك سنوي؟',
                desc: 'هناك العديد من الأشكال المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية تعرضت للتغيير بشكل ما ، عن طريق إدخال بعض الفكاهة أو الكلمات العشوائية التي لا تبدو قابلة للتصديق إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في منتصف النص',
                plus: <FaPlus />,
                minus: <FaMinus />,
                cardClass: 'mb-3'
            },
            {
                title: 'هل قائمتي آمنة؟',
                desc: 'هناك العديد من الأشكال المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية تعرضت للتغيير بشكل ما ، عن طريق إدخال بعض الفكاهة أو الكلمات العشوائية التي لا تبدو قابلة للتصديق إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في منتصف النص',
                plus: <FaPlus />,
                minus: <FaMinus />,
                cardClass: 'mb-3'
            },
            {
                title: 'كيف يمكنني حذف القائمة؟',
                desc: 'هناك العديد من الأشكال المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية تعرضت للتغيير بشكل ما ، عن طريق إدخال بعض الفكاهة أو الكلمات العشوائية التي لا تبدو قابلة للتصديق إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في منتصف النص',
                plus: <FaPlus />,
                minus: <FaMinus />,
                cardClass: 'mb-3'
            },
            {
                title: 'ما هو موقع الإدراج؟',
                desc: 'هناك العديد من الأشكال المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية تعرضت للتغيير بشكل ما ، عن طريق إدخال بعض الفكاهة أو الكلمات العشوائية التي لا تبدو قابلة للتصديق إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في منتصف النص',
                plus: <FaPlus />,
                minus: <FaMinus />,
                cardClass: 'mb-3'
            },
            {
                title: 'لماذا اختار الناس هذه القائمة؟',
                desc: 'هناك العديد من الأشكال المتاحة لنصوص لوريم إيبسوم ، ولكن الغالبية تعرضت للتغيير بشكل ما ، عن طريق إدخال بعض الفكاهة أو الكلمات العشوائية التي لا تبدو قابلة للتصديق إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في إلى حد ما. إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك التأكد من عدم وجود أي شيء محرج مخفي في منتصف النص',
                plus: <FaPlus />,
                minus: <FaMinus />,
                cardClass: ''
            },
        ]
    },
    iconboxes: {
        iconlist1: [
            {
                id: 1,
                icon: <FiUsers />,
                title: 'اسأل المجتمع',
                subtitle: 'احصل على مساعدة من مليون مستخدم + ثورة'
            },
            {
                id: 2,
                icon: <FiBookOpen />,
                title: 'اقرأ مدونتنا',
                subtitle: 'تابع آخر الأخبار والقصص'
            },
            {
                id: 3,
                icon: <FaSort />,
                title: 'احصل على المساعدة في التطبيق',
                subtitle: 'ما عليك سوى التوجه إلى المساعدة في التطبيق'
            },
        ],
    },
    calltoactions: {
        cta1: {
            title: 'كما سبق هو أفضل طريقة للعثور على الشركات المحلية الرائعة واكتشافها',
            content: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
            btntext: 'إنشاء حساب',
            btnurl: '/sign-up',
            shapes: [
                {
                    img: symble1
                },
                {
                    img: symble2
                },
                {
                    img: symble3
                },
                {
                    img: symble4
                }
            ]
        },
        cta2: {
            title: 'كما يتوفر ذكري المظهر وتطبيق دائرة الداخلية',
            content: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى  غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. يكون الأفضل لك. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
            img: cta2mobileimg,
            featurelists: [
                {
                    icon: <GoFile />,
                    text: 'قائمة الوقت الحقيقي'
                },
                {
                    icon: <FiFilter />,
                    text: 'مرشح الميزانية للميزانية'
                },
                {
                    icon: <AiOutlineQuestionCircle />,
                    text: 'تخفيض سعر الإخطار'
                }
            ],
            shapes: [
                {
                    img: symble1
                },
                {
                    img: symble2
                },
                {
                    img: symble3
                },
                {
                    img: symble4
                }
            ]
        },
        cta3: {
            title: 'كما سبق هو أفضل طريقة للعثور على الشركات المحلية الرائعة واكتشافها',
            content: "كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة",
            btntext: 'إنشاء حساب',
            btnurl: '/sign-up'
        },
        cta4: {
            title: 'هل تريد الانضمام إلينا؟',
            content: "غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو",
            btntext: 'نضم الان',
            btnurl: '#'
        },
        newsletters: {
            title: 'اشترك في النشرة الإخبارية!',
            content: 'اشترك للحصول على آخر التحديثات والمعلومات.',
            btntext: 'الإشتراك',
            inputplaceholder: 'أدخل بريدك الإلكتروني'
        }
    },
    contactdata: {
        title: 'مكتبنا',
        img: destinationimg1,
        desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو',
        address: 'الولايات المتحدة الأمريكية 27TH بروكلين نيويورك',
        phoneNum: '+7(111)123456789',
        email: 'contact@dirto.com',
        opendays: 'من الإثنين إلى الجمعة',
        opendaytime: 'قام - حبم',
        closeday: 'من السبت إلى الأحد',
        mapoverlay: {
            address: 'ملبورن ، أستراليا ، 105 جنوب ',
            city: ' بارك افينيو',
            number: '2800 256 508',
            number2: '666 777 888',
            email1: 'needhelp@dirto.com',
            email2: 'inquiry@dirto.com'
        }
    },
    testimonialdata: {
        sectitle: 'ما قاله مستخدمينا',
        seccontent: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
        sliders: [
            {
                id: 1,
                img: team1,
                title: 'ريتشارد دو',
                designation: 'الولايات المتحدة الأمريكية',
                content: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. '
            },
            {
                id: 2,
                img: team1,
                title: 'تنبير احمد',
                designation: 'المملكة المتحدة',
                content: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. '
            },
            {
                id: 3,
                img: team1,
                title: 'احمد طنبير',
                designation: 'ملبورن أستراليا',
                content: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. '
            }
        ],
        tmimage: [
            {
                tmimg: team1
            },
            {
                tmimg: team2
            },
            {
                tmimg: team3
            },
            {
                tmimg: team4
            },
            {
                tmimg: team1
            },
            {
                tmimg: team6
            }
        ]
    },
    blogsidebar: {
        wAuthor: {
            img: team2,
            name: 'مارك وليامسون',
            designation: 'مطور ويب أول',
            content: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو',
            sociallinks: [
                {
                    icon: <FaFacebookF />,
                    url: 'https://facebook.com'
                },
                {
                    icon: <FaTwitter />,
                    url: 'https://twitter.com'
                },
                {
                    icon: <FaLinkedinIn />,
                    url: 'https://linkedin.com'
                },
                {
                    icon: <FaDribbble />,
                    url: 'https://dribbble.com'
                },
                {
                    icon: <FaBehance />,
                    url: 'https://behance.com'
                },
            ],
        },
        wPopularPosts: {
            title: 'منشورات شائعة',
            items: [
                {
                    img: similarimg,
                    title: 'أفضل مسوق بيع العام المقبل',
                    titleLink: '/blog-single',
                    date: '20 كانون الثاني 2019',
                    author: 'TechyDevs',
                    authorUrl: 'https://techydevs.com',
                    cardClass: 'mb-3',
                },
                {
                    img: similarimg,
                    title: 'كيف تجعل أفكارك حقيقة',
                    titleLink: '/blog-single',
                    date: '20 كانون الثاني 2019',
                    author: 'TechyDevs',
                    authorUrl: 'https://techydevs.com',
                    cardClass: 'mb-3',
                },
                {
                    img: similarimg,
                    title: 'ما الذي يعترض طريق الإستراتيجية',
                    titleLink: '/blog-single',
                    date: '20 كانون الثاني 2019',
                    author: 'TechyDevs',
                    authorUrl: 'https://techydevs.com',
                    cardClass: 'mb-3',
                },
                {
                    img: similarimg,
                    title: 'ما الذي يعترض طريق الإستراتيجية',
                    titleLink: '/blog-single',
                    date: '20 كانون الثاني 2019',
                    author: 'TechyDevs',
                    authorUrl: 'https://techydevs.com',
                    cardClass: '',
                },
            ]
        }
    },
    blogfullwidth: {
        items: [
            {
                img: img2,
                title: 'أكبر 50 مكان للفعاليات في المملكة المتحدة',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أفضل 10 متاجر ملابس في سيدني',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أفضل 15 فندق في الولايات المتحدة',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أكبر 50 مكان للفعاليات في المملكة المتحدة',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أفضل 10 متاجر ملابس في سيدني',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أفضل 15 فندق في الولايات المتحدة',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
        ],
        bl2colitems: [
            {
                img: img2,
                title: 'أكبر 50 مكان للفعاليات في المملكة المتحدة',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أفضل 10 متاجر ملابس في سيدني',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أفضل 15 فندق في الولايات المتحدة',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أكبر 50 مكان للفعاليات في المملكة المتحدة',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أفضل 10 متاجر ملابس في سيدني',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أفضل 15 فندق في الولايات المتحدة',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أفضل 10 متاجر ملابس في سيدني',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
            {
                img: img2,
                title: 'أفضل 15 فندق في الولايات المتحدة',
                titleLink: '/blog-single',
                desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو مسلمًا أفضل. والله أعلم ما هو',
                date: '12 يناير ، 2020',
                meta: 'نصائح وخدع',
                metaLink: '#',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                readmore: 'قراءة المزيد',
                readmoreLink: '/blog-single',
                likes: '340'
            },
        ]
    },
    blogDetails: {
        img: mainimage,
        author: 'تنبر أحمد',
        authorImg: authorimg,
        date: '12 فاب ، 2020',
        meta: 'نصائح وخدع',
        metaLink: '#',
        likes: '480',
        title: 'كيفية تحسين تجربة خدمة العملاء الخاصة بك',
        desc1: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هوغتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو ',
        desc2: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو',
        desc3: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو',
        desc4: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو',

        /* Blockquote */
        bgimg: mainimage,
        quoteIcon: <FaQuoteRight />,
        desc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هوغتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم الله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو ',
        name: '- ستيف جوبز',
        designation: 'مؤسس شركة آبل.',

        /* desc Images */
        images: [
            {
                img: img2
            },
            {
                img: img2
            },
            {
                img: img2
            }
        ],
        bltags: {
            title: 'العلامات: ',
            lists: [
                {
                    path: '#',
                    title: 'السفر'
                },
                {
                    path: '#',
                    title: 'طعام'
                },
            ]
        }
    },
    latestarticles: {
        sectitle: 'أحدث النصائح والمقالات',
        seccontent: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
        btntext: 'مشاهدة كل المنشورات',
        btnurl: '/blog-grid',
        items: [
            {
                img: img2,
                title: 'خمسون أروع أماكن الفعاليات في المملكة المتحدة',
                date: '25 ديسمبر 2020',
                description: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. ',
                author: 'ديفيد وايز',
                authorImg: authorimg,
                likeNum: '244',
                cardUrl: '/blog-single'
            },
            {
                img: img2,
                title: 'أفضل عشرة متاجر ملابس في سيدني',
                date: '26 ديسمبر 2020',
                description: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. ',
                author: 'مارك وينز',
                authorImg: authorimg,
                likeNum: '535',
                cardUrl: '/blog-single'
            },
            {
                img: img2,
                title: 'أفضل خمسة عشر فنادق في الولايات المتحدة',
                date: '27 ديسمبر 2020',
                description: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك. ',
                author: 'تنبير احمد',
                authorImg: authorimg,
                likeNum: '294',
                cardUrl: '/blog-single'
            }
        ]
    },
    authors: {
        sectitle: 'تعرف على أفضل المؤلفين',
        seccontent: 'أفضل 700 كاتب مشهور على الأوساخ. حسومات محسّنة يفوز يمكنني أن أكون أي لحم!حسومات محسّنة يفوز يمكنني أن أكون أي لحم!',
        sliders: [
            {
                authorImg: team2,
                authorName: 'ستيفن هارفي',
                city: 'أستراليا',
                authorStatus: 'مؤلف محترف',
                powerauthor: true,
                listingNum: '120',
                followers: '49',
                following: '49',
                buttonTxt: 'إتبع',
                buttonIcon: <FiPlus />
            },
            {
                authorImg: team2,
                authorName: 'تنبير احمد',
                city: 'الولايات المتحدة الأمريكية',
                authorStatus: 'مؤلف النخبة',
                powerauthor: false,
                listingNum: '130',
                followers: '55',
                following: '24',
                buttonTxt: 'إتبع',
                buttonIcon: <FiPlus />
            },
            {
                authorImg: team2,
                authorName: 'سراز خان',
                city: 'المملكة المتحدة',
                authorStatus: 'مؤلف النخبة',
                powerauthor: false,
                listingNum: '130',
                followers: '55',
                following: '24',
                buttonTxt: 'إتبع',
                buttonIcon: <FiPlus />
            },
            {
                authorImg: team2,
                authorName: 'دانيال ويف',
                city: 'إيطاليا',
                authorStatus: 'مؤلف محترف',
                powerauthor: true,
                listingNum: '130',
                followers: '55',
                following: '24',
                buttonTxt: 'إتبع',
                buttonIcon: <FiPlus />
            },
            {
                authorImg: team2,
                authorName: 'جوهين فيلا',
                city: 'بنغلاديش',
                authorStatus: 'مؤلف النخبة',
                powerauthor: false,
                listingNum: '130',
                followers: '55',
                following: '24',
                buttonTxt: 'إتبع',
                buttonIcon: <FiPlus />
            },
            {
                authorImg: team2,
                authorName: 'دانيال فيلا',
                city: 'كوستا ريكا',
                authorStatus: 'مؤلف محترف',
                powerauthor: true,
                listingNum: '130',
                followers: '55',
                following: '24',
                buttonTxt: 'إتبع',
                buttonIcon: <FiPlus />
            },
            {
                authorImg: team2,
                authorName: 'فلان الفلاني',
                city: 'فرنسا',
                authorStatus: 'مؤلف محترف',
                powerauthor: true,
                listingNum: '130',
                followers: '55',
                following: '24',
                buttonTxt: 'إتبع',
                buttonIcon: <FiPlus />
            }
        ],
    },
    clientlogos: [
        logo1,
        logo1,
        logo1,
        logo1,
        logo1,
        logo1,
        logo1,
    ],
    footerdata: {
        footerlogo: darklogo,
        footerdesc: 'غتنم كل يوم فرصة لتصبح مسلمًا أفضل. غتنم كل يوم فرصة لتصبح مسلمًا أفضل. والله أعلم ما هو الأفضل لك ومتى يكون الأفضل لك.',
        sociallinks: [
            {
                icon: <FaFacebookF />,
                url: 'https://facebook.com'
            },
            {
                icon: <FaTwitter />,
                url: 'https://twitter.com'
            },
            {
                icon: <FaLinkedinIn />,
                url: 'https://linkedin.com'
            },
            {
                icon: <FaDribbble />,
                url: 'https://dribbble.com'
            },
            {
                icon: <FaBehance />,
                url: 'https://behance.com'
            },
        ],
        footerquicklinks: {
            title: 'روابط سريعة',
            links: [
                {
                    path: '/about',
                    text: 'معلومات عنا'
                },
                {
                    path: '/sign-up',
                    text: 'سجل'
                },
                {
                    path: '/login',
                    text: 'تسجيل الدخول'
                },
                {
                    path: '/add-listing/new',
                    text: 'إضافة قائمة'
                },
                {
                    path: '/contact',
                    text: 'اتصل بنا'
                },
                {
                    path: '/pricing',
                    text: 'التسعير'
                }
            ]
        },
        footercategories: {
            title: 'التصنيفات',
            links: [
                {
                    path: '#',
                    text: 'محلات'
                },
                {
                    path: '#',
                    text: 'الفنادق'
                },
                {
                    path: '#',
                    text: 'مطاعم'
                },
                {
                    path: '#',
                    text: 'الحانات'
                },
                {
                    path: '#',
                    text: 'الأحداث'
                },
                {
                    path: '#',
                    text: 'اللياقه البدنيه'
                }
            ]
        },
        footercontact: {
            title: 'اتصل بنا',
            lists: [
                {
                    icon: <AiOutlineHome />,
                    text: 'ليتل بيكر ستريت ، ملبورن 12345'
                },
                {
                    icon: <FiHeadphones />,
                    text: '+ 61 23 8093 3400'
                },
                {
                    icon: <FaRegEnvelope />,
                    text: 'dirto@gmail.com'
                }
            ]
        },
        copyright: {
            menus: [
                {
                    path: '#',
                    title: 'البنود و الظروف'
                },
                {
                    path: '#',
                    title: 'سياسة خاصة'
                },
                {
                    path: '#',
                    title: 'مركز المساعدة'
                }
            ],
            languages: [
                'English',
                'Bangladesh',
                'Nepal',
                'America',
                'Arabic',
                'England',
            ]
        }
    }

}
export default sectiondata
