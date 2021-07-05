import React  from 'react';
import { BsGrid, BsListUl } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Link } from "react-router-dom";
import ListingListSidebar from "../../components/sidebars/ListingListSidebar";
import Button from "../../components/common/Button";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import Select from "react-select";
import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import sectiondata from "../../store/store";
import PlaceGrid from "../../components/places/PlaceGrid";

const state = {
    selectedCatOp: null,
    title: 'إظهار 1 إلى 6 من أصل 30 مُدخل',
    breadImg: breadcrumbimg,
    navs: [
        {
            path: '/listing-list',
            icon: <BsListUl />,
            active: false,
        },
        {
            path: '/listing-grid',
            icon: <BsGrid />,
            active: false,
        }
    ],
    shortby: [
        {
            value: 0,
            label: 'باختصار من قبل'
        },
        {
            value: 1,
            label: 'باختصار افتراضيًا'
        },
        {
            value: 2,
            label: 'تصنيف عالي'
        },
        {
            value: 3,
            label: 'الأكثر مراجعة'
        },
        {
            value: 4,
            label: 'قائمة شعبية'
        },
        {
            value: 5,
            label: 'أحدث قائمة'
        },
        {
            value: 6,
            label: 'قائمة أقدم'
        },
        {
            value: 7,
            label: 'السعر من الارخص للاعلى'
        },
        {
            value: 8,
            label: 'السعر الاعلى الى الادنى'
        },
        {
            value: 9,
            label: 'السعر الاعلى الى الادنى'
        },
        {
            value: 10,
            label: 'قائمة عشوائية'
        }
    ]
}

function ListRightSidebar() {
    return (
        <main className="list-right-sidebar">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="قائمة الشريط الجانبي الأيمن" MenuPgTitle="القوائم" img={state.breadImg} />

            {/* Place List */}
            <section className="card-area padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-lg-12">
                            <div className="generic-header margin-bottom-30px">
                                <ul className="generic-nav">
                                    {state.navs.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <Link to={item.path} className={item.active ? 'active' : ' '}>
                                                    <span className="d-inline-block">
                                                        {item.icon}
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div className="short-option ml-3 text-left">
                                    <Select
                                        placeholder="باختصار من قبل"
                                        options={state.shortby}
                                    />
                                </div>
                                <p className="showing__text text-right">
                                    {state.title}
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-8 row align-items-start">
                            <PlaceGrid griditems={sectiondata.placesgridmoreitems} />
                        </div>

                        <div className="col-lg-4">
                            <ListingListSidebar />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="button-shared text-center">
                                <Button text="تحميل المزيد" url="#" className="border-0">
                                    <span className="d-inline-block">
                                        <FiRefreshCw />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <NewsLetter
                content={sectiondata.calltoactions.newsletters.content}
                title={sectiondata.calltoactions.newsletters.title}
                btntext={sectiondata.calltoactions.newsletters.btntext}
                inputplaceholder={sectiondata.calltoactions.newsletters.inputplaceholder} />

            {/* Footer */}
            <Footer />

            {/* scroll top button */}
            <ScrollTopBtn />
        </main>
    );
}

export default ListRightSidebar;
